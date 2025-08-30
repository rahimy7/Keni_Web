import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@shared/schema";

interface TopSellingProps {
  products: Product[];
  isLoading: boolean;
}

export default function TopSelling({ products, isLoading }: TopSellingProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="w-16 h-16 rounded-lg" />
              <div className="flex-1">
                <Skeleton className="h-5 w-48 mb-2" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="text-right">
                <Skeleton className="h-5 w-16 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-neutral-800">Productos Más Vendidos</h3>
        <a href="#todos-productos" className="text-primary hover:underline text-sm">Ver todos</a>
      </div>

      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="flex items-center space-x-4">
            <img
              src={product.imageUrl ?? ""}
              alt={product.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h4 className="font-medium text-neutral-800">{product.name}</h4>
              <p className="text-sm text-neutral-500">{product.category} | ID: {product.productId}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-neutral-800">{product.price}</p>
              <p className="text-xs text-success">+{product.sales} ventas</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
