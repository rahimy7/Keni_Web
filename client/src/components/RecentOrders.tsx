import { Skeleton } from "@/components/ui/skeleton";
import { EyeIcon, EditIcon } from "@/lib/icons";
import { Order } from "@shared/schema";

interface RecentOrdersProps {
  orders: Order[];
  isLoading: boolean;
}

export default function RecentOrders({ orders, isLoading }: RecentOrdersProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-neutral-50">
              <tr>
                {[...Array(6)].map((_, i) => (
                  <th key={i} className="px-4 py-3">
                    <Skeleton className="h-4 w-full" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {[...Array(4)].map((_, i) => (
                <tr key={i}>
                  {[...Array(6)].map((_, j) => (
                    <td key={j} className="px-4 py-4">
                      <Skeleton className="h-4 w-full" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "entregado":
        return "bg-success bg-opacity-10 text-success";
      case "en proceso":
        return "bg-warning bg-opacity-10 text-warning";
      case "cancelado":
        return "bg-danger bg-opacity-10 text-danger";
      default:
        return "bg-neutral-200 text-neutral-600";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-neutral-800">Pedidos Recientes</h3>
        <a href="#todos-pedidos" className="text-primary hover:underline text-sm">Ver todos</a>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">ID Pedido</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Cliente</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Estado</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Fecha</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Total</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-neutral-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-neutral-800">
                  #{order.orderNumber}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-600">
                  <div className="flex items-center">
                    <img 
                      src={order.customer.avatarUrl} 
                      alt={order.customer.name} 
                      className="w-7 h-7 rounded-full mr-3 object-cover" 
                    />
                    {order.customer.name}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-600">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-600">{order.date}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-neutral-800">{order.total}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-600">
                  <div className="flex space-x-3">
                    <button className="text-primary hover:text-primary-dark">
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button className="text-neutral-400 hover:text-neutral-700">
                      <EditIcon className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
