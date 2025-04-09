import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getQueryFn } from '@/lib/queryClient';
import { Product } from '@shared/schema';

export default function SearchResultsPage() {
  const [location] = useLocation();
  const queryString = location.includes('?') ? location.split('?')[1] : '';
  const searchParams = new URLSearchParams(queryString);
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [query, setQuery] = useState<string>(initialQuery);

  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    queryFn: getQueryFn({ on401: 'throw' })
  });

  // List of available services (this could come from an API if services were in the database)
  const services = [
    { id: 1, title: 'Buchete pentru nunți', category: 'nunta', description: 'Aranjamente florale pentru nuntă, elegante și sofisticate.' },
    { id: 2, title: 'Design floral evenimente', category: 'evenimente', description: 'Decorațiuni florale pentru evenimente speciale, personalizate.' },
    { id: 3, title: 'Aranjamente corporate', category: 'corporate', description: 'Buchete și aranjamente pentru sedii de firme și evenimente business.' },
    { id: 4, title: 'Workshop-uri florale', category: 'workshop', description: 'Învață arta aranjamentelor florale alături de designerii noștri.' },
    { id: 5, title: 'Abonamente florale', category: 'abonament', description: 'Flori proaspete livrate regulat la domiciliu sau la birou.' },
    { id: 6, title: 'Consultanță evenimente', category: 'consultanta', description: 'Sfaturi de specialitate pentru decorarea evenimentelor importante.' }
  ];

  // Filter products and services based on the search query
  const filteredProducts = products?.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) || 
    product.description.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredServices = services.filter(service => 
    service.title.toLowerCase().includes(query.toLowerCase()) || 
    service.description.toLowerCase().includes(query.toLowerCase()) ||
    service.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = () => {
    setQuery(searchQuery);
  };

  useEffect(() => {
    // Update the URL with the search query for shareable links
    const currentUrl = window.location.pathname;
    const newUrl = `${currentUrl}?q=${encodeURIComponent(query)}`;
    window.history.pushState({}, '', newUrl);
  }, [query]);

  return (
    <>
      <Helmet>
        <title>Rezultate căutare: {query} - Atelierul cu flori</title>
        <meta name="description" content={`Rezultate pentru ${query} - Produse și servicii la Atelierul cu flori`} />
      </Helmet>
      
      <section className="py-12 bg-[#F5F5F0]">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl text-center mb-8">Rezultate căutare</h1>
          
          <div className="max-w-xl mx-auto mb-10">
            <div className="flex items-center gap-2">
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Caută produse sau servicii..." 
                className="bg-white"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button onClick={handleSearch} className="bg-primary hover:bg-primary/90">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {query && (
            <div className="text-center mb-8">
              <p className="text-gray-600">
                {filteredProducts?.length || 0} produse și {filteredServices.length} servicii găsite pentru "{query}"
              </p>
            </div>
          )}
          
          {productsLoading ? (
            <div className="flex justify-center my-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-12">
              {/* Services Section */}
              <div>
                <h2 className="font-serif text-2xl text-primary mb-6">Servicii</h2>
                
                {filteredServices.length === 0 ? (
                  <div className="text-center bg-white p-8 rounded-lg shadow-sm">
                    <p className="text-gray-500">Niciun serviciu nu corespunde căutării tale.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredServices.map(service => (
                      <div key={service.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="font-serif text-xl text-primary mb-2">{service.title}</h3>
                        <p className="text-gray-600 mb-4">{service.description}</p>
                        <a 
                          href={`/${service.category}`} 
                          className="text-secondary hover:underline inline-flex items-center"
                        >
                          Vezi detalii
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Products Section */}
              <div>
                <h2 className="font-serif text-2xl text-primary mb-6">Produse</h2>
                
                {filteredProducts?.length === 0 ? (
                  <div className="text-center bg-white p-8 rounded-lg shadow-sm">
                    <p className="text-gray-500">Niciun produs nu corespunde căutării tale.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts?.map(product => (
                      <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={product.imageUrl} 
                            alt={product.name} 
                            className="w-full h-full object-cover transition-transform hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-serif text-lg text-primary truncate">{product.name}</h3>
                          <p className="text-gray-500 text-sm mb-2">{product.category}</p>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{Number(product.price).toFixed(2)} lei</span>
                            <a 
                              href={`/product/${product.id}`} 
                              className="text-secondary hover:underline text-sm"
                            >
                              Vezi detalii
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}