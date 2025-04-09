import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import { Order, OrderItem } from "@shared/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Package, Calendar, Clock, CreditCard } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// Extended Item interface
interface ExtendedOrderItem extends OrderItem {
  productName?: string;
}

// Extended Order type with items
interface ExtendedOrder extends Order {
  items?: ExtendedOrderItem[];
  totalAmount?: number;
}

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ro-RO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

// Helper to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('ro-RO', {
    style: 'currency',
    currency: 'RON',
  }).format(amount);
};

// Helper to get status badge color
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
    case 'finalizată':
      return 'bg-green-500';
    case 'processing':
    case 'în procesare':
      return 'bg-blue-500';
    case 'shipped':
    case 'expediată':
      return 'bg-purple-500';
    case 'cancelled':
    case 'anulată':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

export default function OrdersPage() {
  const { user } = useAuth();
  
  const { data: orders, isLoading, error } = useQuery<ExtendedOrder[]>({
    queryKey: ['/api/orders'],
    queryFn: getQueryFn({ on401: "throw" }),
    enabled: !!user,
  });

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Comenzile mele</h1>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-24 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : error ? (
        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <p className="text-muted-foreground">Nu am putut încărca istoricul comenzilor.</p>
            </div>
          </CardContent>
        </Card>
      ) : orders && orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <div>
                    <CardTitle>Comanda #{order.id}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <Calendar className="mr-1 h-4 w-4" />
                      {formatDate(order.createdAt.toString())}
                    </CardDescription>
                  </div>
                  <Badge className={`${getStatusColor(order.status)}`}>
                    {order.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="details">
                    <AccordionTrigger>Detalii comandă</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Adresă livrare</p>
                          <p className="text-sm">Strada Florilor 23</p>
                          <p className="text-sm">București, România</p>
                          <p className="text-sm">123456</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Metodă de plată</p>
                          <p className="text-sm flex items-center">
                            <CreditCard className="mr-1 h-4 w-4" /> 
                            Card (****1234)
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Data expediere</p>
                          <p className="text-sm flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            {order.status === 'shipped' || order.status === 'completed' 
                              ? formatDate(new Date().toString()) 
                              : 'În așteptare'}
                          </p>
                        </div>
                      </div>

                      <div className="border rounded-lg">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Produs</TableHead>
                              <TableHead className="text-right">Cantitate</TableHead>
                              <TableHead className="text-right">Preț</TableHead>
                              <TableHead className="text-right">Total</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {order.items && order.items.map((item, idx) => {
                              const price = typeof item.price === 'string' ? parseFloat(item.price) : 150;
                              return (
                                <TableRow key={idx}>
                                  <TableCell className="font-medium">{item.productName || "Buchet flori mixte"}</TableCell>
                                  <TableCell className="text-right">{item.quantity}</TableCell>
                                  <TableCell className="text-right">{formatCurrency(price)}</TableCell>
                                  <TableCell className="text-right">{formatCurrency(price * item.quantity)}</TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </div>

                      <div className="mt-4 flex flex-col items-end">
                        <div className="space-y-1 w-full max-w-[200px]">
                          {/* Calculate total from total field, which is a string in our schema */}
                          {(() => {
                            const totalAmount = typeof order.total === 'string' 
                              ? parseFloat(order.total) 
                              : 0;
                            
                            return (
                              <>
                                <div className="flex justify-between text-sm">
                                  <span>Subtotal:</span>
                                  <span>{formatCurrency(totalAmount * 0.81)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>TVA (19%):</span>
                                  <span>{formatCurrency(totalAmount * 0.19)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Livrare:</span>
                                  <span>{formatCurrency(15)}</span>
                                </div>
                                <div className="flex justify-between font-bold border-t pt-1 mt-1">
                                  <span>Total:</span>
                                  <span>{formatCurrency(totalAmount + 15)}</span>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <Package className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">Nu ai plasat încă nicio comandă</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Comenzile tale vor apărea aici după ce vei face prima achiziție.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}