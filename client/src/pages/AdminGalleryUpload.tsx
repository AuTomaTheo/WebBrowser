import { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { Upload, Trash2, Image, Loader2, X, Check, FolderPlus, Folder, ChevronRight, ChevronDown, Plus } from "lucide-react";
import type { GalleryImage, GalleryEvent } from "@shared/schema";

const categories = [
  { id: "Nunți", label: "Nunți" },
  { id: "Botezuri", label: "Botezuri" },
  { id: "Workshops", label: "Workshops" },
  { id: "Tematice", label: "Tematice" }
];

interface UploadingFile {
  file: File;
  status: 'pending' | 'uploading' | 'done' | 'error';
  progress: number;
  error?: string;
}

export default function AdminGalleryUpload() {
  const [adminKey, setAdminKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    "Nunți": true,
    "Botezuri": false,
    "Workshops": false,
    "Tematice": false
  });
  const [selectedEvent, setSelectedEvent] = useState<GalleryEvent | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Nunți");
  const [newEventName, setNewEventName] = useState("");
  const [showNewEventInput, setShowNewEventInput] = useState<string | null>(null);
  
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const { data: events, isLoading: eventsLoading, refetch: refetchEvents } = useQuery<GalleryEvent[]>({
    queryKey: ['/api/gallery/events'],
    queryFn: async () => {
      const res = await fetch('/api/gallery/events');
      if (!res.ok) throw new Error('Failed to fetch events');
      return res.json();
    },
    enabled: isAuthenticated,
    staleTime: 0
  });

  const { data: eventImages, isLoading: imagesLoading } = useQuery<GalleryImage[]>({
    queryKey: ['/api/gallery/events', selectedEvent?.id, 'images'],
    queryFn: async () => {
      if (!selectedEvent) return [];
      const res = await fetch(`/api/gallery/events/${selectedEvent.id}/images`);
      return res.json();
    },
    enabled: isAuthenticated && !!selectedEvent
  });

  const createEventMutation = useMutation({
    mutationFn: async ({ name, category }: { name: string; category: string }) => {
      const res = await fetch(`/api/admin/gallery/events?key=${adminKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, category })
      });
      if (!res.ok) throw new Error('Failed to create event');
      return res.json();
    },
    onSuccess: async () => {
      setNewEventName("");
      setShowNewEventInput(null);
      await queryClient.invalidateQueries({ queryKey: ['/api/gallery/events'] });
      await queryClient.refetchQueries({ queryKey: ['/api/gallery/events'] });
      toast({ title: "Folder creat cu succes" });
    },
    onError: () => {
      toast({ title: "Eroare la creare folder", variant: "destructive" });
    }
  });

  const deleteEventMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/gallery/events/${id}?key=${adminKey}`, {
        method: 'DELETE'
      });
      if (!res.ok && res.status !== 204) throw new Error('Failed to delete event');
      return id;
    },
    onSuccess: async (deletedId) => {
      setSelectedEvent(null);
      await queryClient.invalidateQueries({ queryKey: ['/api/gallery/events'] });
      await queryClient.refetchQueries({ queryKey: ['/api/gallery/events'] });
      toast({ title: "Folder șters cu succes" });
    },
    onError: (error) => {
      console.error('Delete error:', error);
      toast({ title: "Eroare la ștergere", variant: "destructive" });
    }
  });

  const deleteImageMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/gallery/${id}?key=${adminKey}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete image');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/gallery/events', selectedEvent?.id, 'images'] });
      toast({ title: "Imagine ștearsă cu succes" });
    },
    onError: () => {
      toast({ title: "Eroare la ștergere", variant: "destructive" });
    }
  });

  const handleLogin = async () => {
    if (!adminKey.trim()) return;
    
    setIsLoggingIn(true);
    setLoginError("");
    
    try {
      const response = await fetch(`/api/admin/verify?key=${encodeURIComponent(adminKey)}`);
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setLoginError("Cheie de acces invalidă");
      }
    } catch (error) {
      setLoginError("Eroare la verificare");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !selectedEvent) return;

    const imageFiles = Array.from(files).filter(f => 
      f.type.startsWith('image/')
    );

    if (imageFiles.length === 0) {
      toast({ title: "Selectează doar fișiere imagine", variant: "destructive" });
      return;
    }

    const newUploadingFiles: UploadingFile[] = imageFiles.map(file => ({
      file,
      status: 'pending' as const,
      progress: 0
    }));

    setUploadingFiles(prev => [...prev, ...newUploadingFiles]);

    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      await uploadSingleFile(file);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const uploadSingleFile = async (file: File) => {
    if (!selectedEvent) return;
    
    try {
      setUploadingFiles(prev => prev.map((f) => 
        f.file === file ? { ...f, status: 'uploading' as const, progress: 10 } : f
      ));

      const uploadUrlResponse = await fetch(`/api/admin/gallery/upload-url?key=${adminKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: file.name })
      });

      if (!uploadUrlResponse.ok) {
        throw new Error('Failed to get upload URL');
      }

      const { uploadURL, objectPath } = await uploadUrlResponse.json();

      setUploadingFiles(prev => prev.map(f => 
        f.file === file ? { ...f, progress: 30 } : f
      ));

      const uploadResponse = await fetch(uploadURL, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type
        }
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file');
      }

      setUploadingFiles(prev => prev.map(f => 
        f.file === file ? { ...f, progress: 70 } : f
      ));

      const saveResponse = await fetch(`/api/admin/gallery/save?key=${adminKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: file.name,
          url: objectPath,
          category: selectedEvent.category,
          eventId: selectedEvent.id,
          alt: file.name.replace(/\.[^/.]+$/, "")
        })
      });

      if (!saveResponse.ok) {
        throw new Error('Failed to save image metadata');
      }

      setUploadingFiles(prev => prev.map(f => 
        f.file === file ? { ...f, status: 'done' as const, progress: 100 } : f
      ));

      queryClient.invalidateQueries({ queryKey: ['/api/gallery/events', selectedEvent.id, 'images'] });

    } catch (error) {
      console.error('Upload error:', error);
      setUploadingFiles(prev => prev.map(f => 
        f.file === file ? { ...f, status: 'error' as const, error: 'Upload failed' } : f
      ));
    }
  };

  const clearCompletedUploads = () => {
    setUploadingFiles(prev => prev.filter(f => f.status !== 'done'));
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const getEventsForCategory = (category: string) => {
    return events?.filter(e => e.category === category) || [];
  };

  const handleCreateEvent = (category: string) => {
    if (newEventName.trim()) {
      createEventMutation.mutate({ name: newEventName.trim(), category });
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Admin - Galerie</title>
        </Helmet>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <h1 className="text-2xl font-bold mb-6 text-center">Admin Galerie</h1>
            <p className="text-muted-foreground mb-4 text-center text-sm">
              Introdu cheia de acces pentru a administra galeria
            </p>
            <input
              type="password"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="Cheie de acces"
              className="w-full border rounded-md px-4 py-2 mb-2"
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              data-testid="input-admin-key"
              disabled={isLoggingIn}
            />
            {loginError && (
              <p className="text-red-500 text-sm mb-2">{loginError}</p>
            )}
            <Button 
              onClick={handleLogin} 
              className="w-full mt-2"
              data-testid="button-admin-login"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verificare...
                </>
              ) : (
                "Autentificare"
              )}
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin - Galerie</title>
      </Helmet>
      <div className="min-h-screen bg-gray-100 flex">
        <div className="w-72 bg-white shadow-lg flex-shrink-0 overflow-y-auto">
          <div className="p-4 border-b">
            <h1 className="text-lg font-bold">Administrare Galerie</h1>
          </div>
          
          <nav className="p-2">
            {categories.map((cat) => (
              <div key={cat.id} className="mb-1">
                <button
                  onClick={() => toggleCategory(cat.id)}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 text-left font-medium"
                  data-testid={`category-${cat.id}`}
                >
                  {expandedCategories[cat.id] ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  <span>{cat.label}</span>
                </button>
                
                {expandedCategories[cat.id] && (
                  <div className="ml-4 mt-1 space-y-1">
                    {eventsLoading ? (
                      <div className="px-3 py-2 text-sm text-muted-foreground">
                        Se încarcă...
                      </div>
                    ) : (
                      <>
                        {getEventsForCategory(cat.id).map((event) => (
                          <div
                            key={event.id}
                            className={`group flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer text-sm ${
                              selectedEvent?.id === event.id
                                ? 'bg-primary/10 text-primary'
                                : 'hover:bg-gray-100'
                            }`}
                            onClick={() => setSelectedEvent(event)}
                          >
                            <Folder className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate flex-1">{event.name}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (confirm('Ștergi acest folder?')) {
                                  deleteEventMutation.mutate(event.id);
                                }
                              }}
                              className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                        
                        {showNewEventInput === cat.id ? (
                          <div className="flex items-center gap-1 px-2">
                            <Input
                              value={newEventName}
                              onChange={(e) => setNewEventName(e.target.value)}
                              placeholder="Nume folder..."
                              className="h-8 text-sm"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleCreateEvent(cat.id);
                                if (e.key === 'Escape') {
                                  setShowNewEventInput(null);
                                  setNewEventName("");
                                }
                              }}
                              autoFocus
                            />
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0"
                              onClick={() => handleCreateEvent(cat.id)}
                              disabled={createEventMutation.isPending}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0"
                              onClick={() => {
                                setShowNewEventInput(null);
                                setNewEventName("");
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setShowNewEventInput(cat.id);
                              setNewEventName("");
                            }}
                            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 text-sm text-muted-foreground w-full"
                          >
                            <FolderPlus className="h-4 w-4" />
                            <span>Folder nou</span>
                          </button>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          {selectedEvent ? (
            <div className="max-w-5xl">
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">{selectedEvent.category}</div>
                    <h2 className="text-xl font-bold">{selectedEvent.name}</h2>
                  </div>
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                      data-testid="input-file-upload"
                    />
                    <Button 
                      onClick={() => fileInputRef.current?.click()}
                      className="gap-2"
                      data-testid="button-upload"
                    >
                      <Upload className="h-4 w-4" />
                      Încarcă imagini
                    </Button>
                  </div>
                </div>

                {uploadingFiles.length > 0 && (
                  <div className="mb-6 border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium">Încărcare în progres</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearCompletedUploads}
                        data-testid="button-clear-completed"
                      >
                        Șterge completate
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {uploadingFiles.map((uf, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm">
                          {uf.status === 'uploading' && <Loader2 className="h-4 w-4 animate-spin text-blue-500" />}
                          {uf.status === 'done' && <Check className="h-4 w-4 text-green-500" />}
                          {uf.status === 'error' && <X className="h-4 w-4 text-red-500" />}
                          {uf.status === 'pending' && <div className="h-4 w-4 rounded-full border-2 border-gray-300" />}
                          <span className="flex-1 truncate">{uf.file.name}</span>
                          <span className="text-muted-foreground">{uf.progress}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4">Imagini</h3>
                
                {imagesLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : eventImages && eventImages.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {eventImages.map((image) => (
                      <div key={image.id} className="relative group">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={image.url}
                            alt={image.alt || image.filename}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteImageMutation.mutate(image.id)}
                            disabled={deleteImageMutation.isPending}
                            data-testid={`button-delete-${image.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Image className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Nu există imagini în acest folder</p>
                    <p className="text-sm mt-2">Folosește butonul "Încarcă imagini" pentru a adăuga</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-muted-foreground">
                <Folder className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg">Selectează un folder din stânga</p>
                <p className="text-sm mt-2">sau creează unul nou pentru a începe</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
