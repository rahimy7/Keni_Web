import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchIcon, FilterIcon, PlusIcon, EyeIcon, EditIcon, DownloadIcon } from "@/lib/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { Order } from "@shared/schema";
import { Helmet } from "react-helmet";

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("todos");

  const { data: orders, isLoading } = useQuery<Order[]>({
    queryKey: ['/api/orders'],
  });

  const filteredOrders = orders?.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "todos") return matchesSearch;
    if (activeTab === "entregados") return matchesSearch && order.status.toLowerCase() === "entregado";
    if (activeTab === "en-proceso") return matchesSearch && order.status.toLowerCase() === "en proceso";
    if (activeTab === "cancelados") return matchesSearch && order.status.toLowerCase() === "cancelado";
    
    return matchesSearch;
  });

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
    <>
      <Helmet>
        <title>Pedidos - MiApp Admin</title>
        <meta name="description" content="Gestión de pedidos para la aplicación MiApp - Ver, buscar y administrar todos los pedidos realizados" />
      </Helmet>
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-neutral-800">Pedidos</h1>
            <p className="text-neutral-500">Gestión de pedidos de la aplicación</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Button variant="outline" className="flex items-center gap-2">
              <DownloadIcon className="h-4 w-4" />
              Exportar
            </Button>
            <Button className="bg-primary text-white">
              <PlusIcon className="h-4 w-4 mr-2" />
              Nuevo Pedido
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 h-4 w-4" />
                <Input
                  placeholder="Buscar pedidos..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <FilterIcon className="h-4 w-4" />
                Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="todos" className="mb-6" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="entregados">Entregados</TabsTrigger>
            <TabsTrigger value="en-proceso">En Proceso</TabsTrigger>
            <TabsTrigger value="cancelados">Cancelados</TabsTrigger>
          </TabsList>
        </Tabs>

        <Card>
          <CardHeader className="pb-0">
            <CardTitle>Lista de Pedidos</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
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
                    {filteredOrders && filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
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
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-sm text-neutral-500">
                          No se encontraron pedidos
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
