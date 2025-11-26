import { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Upload, Trash2, Image, Loader2, X, Check } from "lucide-react";
import type { GalleryImage } from "@shared/schema";

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
  const [selectedCategory, setSelectedCategory] = useState<string>("Nunți");
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const { data: images, isLoading: imagesLoading } = useQuery<GalleryImage[]>({
    queryKey: ['/api/gallery'],
    enabled: isAuthenticated
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await fetch(`/api/admin/gallery/${id}?key=${adminKey}`, {
        method: 'DELETE'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/gallery'] });
      toast({ title: "Imagine ștearsă cu succes" });
    },
    onError: () => {
      toast({ title: "Eroare la ștergere", variant: "destructive" });
    }
  });

  const handleLogin = () => {
    if (adminKey.trim()) {
      setIsAuthenticated(true);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

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
      await uploadSingleFile(file, uploadingFiles.length + i);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const uploadSingleFile = async (file: File, index: number) => {
    try {
      setUploadingFiles(prev => prev.map((f, idx) => 
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
          category: selectedCategory,
          alt: file.name.replace(/\.[^/.]+$/, "")
        })
      });

      if (!saveResponse.ok) {
        throw new Error('Failed to save image metadata');
      }

      setUploadingFiles(prev => prev.map(f => 
        f.file === file ? { ...f, status: 'done' as const, progress: 100 } : f
      ));

      queryClient.invalidateQueries({ queryKey: ['/api/gallery'] });

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
              className="w-full border rounded-md px-4 py-2 mb-4"
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              data-testid="input-admin-key"
            />
            <Button 
              onClick={handleLogin} 
              className="w-full"
              data-testid="button-admin-login"
            >
              Autentificare
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
      <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h1 className="text-2xl font-bold mb-6">Administrare Galerie</h1>
            
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-end mb-6">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Categorie</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-[200px]" data-testid="select-category">
                    <SelectValue placeholder="Alege categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
            <h2 className="text-xl font-bold mb-4">Imagini existente</h2>
            
            {imagesLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : images && images.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image) => (
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
                        onClick={() => deleteMutation.mutate(image.id)}
                        disabled={deleteMutation.isPending}
                        data-testid={`button-delete-${image.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-2">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {image.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Image className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Nu există imagini în galerie</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
