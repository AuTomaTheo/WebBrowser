import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'wouter';

const products = [
  {
    id: 1,
    title: "Buchet Primăvară",
    price: 180,
    image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Aranjament Festiv",
    price: 250,
    image: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Buchet Trandafiri",
    price: 200,
    image: "https://images.unsplash.com/photo-1537033206914-9d3551ff8103?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Aranjament Rustic",
    price: 220,
    image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Buchet Mixt",
    price: 190,
    image: "https://images.unsplash.com/photo-1542212237-a2665b5cd2ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Aranjament de Masă",
    price: 170,
    image: "https://images.unsplash.com/photo-1531120364508-a6b656c3e78d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  }
];

export default function Shop() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-3xl text-primary mb-6">FLORĂRIE ONLINE</h1>
          <div className="w-20 h-1 bg-secondary mx-auto mb-8"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descoperă colecția noastră de buchete și aranjamente florale, create cu pasiune pentru a aduce bucurie și culoare în viața ta.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <Link key={product.id} href={`/shop/product/${product.id}`}>
              <a className="block group">
                <Card className="overflow-hidden">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4 text-center">
                    <h3 className="font-playfair text-primary text-lg mb-2">{product.title}</h3>
                    <p className="text-secondary font-semibold">{product.price} lei</p>
                  </CardContent>
                </Card>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
