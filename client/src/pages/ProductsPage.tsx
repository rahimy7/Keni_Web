import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchIcon, FilterIcon, PlusIcon, EyeIcon, EditIcon, TrashIcon } from "@/lib/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@shared/schema";
import { Helmet } from "react-helmet";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("todos");

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const filteredProducts = products?.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.productId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "todos") return matchesSearch;
    if (activeTab === "electronica") return matchesSearch && product.category.toLowerCase() === "electrónica";
    if (activeTab === "ropa") return matchesSearch && product.category.toLowerCase() === "ropa";
    
    return matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>Productos - MiApp Admin</title>
        <meta name="description" content="Gestión de productos para la aplicación MiApp - Ver, buscar y administrar el inventario de productos" />
      </Helmet>
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-neutral-800">Productos</h1>
            <p className="text-neutral-500">Gestión de productos de la aplicación</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-primary text-white">
              <PlusIcon className="h-4 w-4 mr-2" />
              Añadir Producto
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 h-4 w-4" />
                <Input
                  placeholder="Buscar productos..."
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
            <TabsTrigger value="electronica">Electrónica</TabsTrigger>
            <TabsTrigger value="ropa">Ropa</TabsTrigger>
            <TabsTrigger value="hogar">Hogar</TabsTrigger>
          </TabsList>
        </Tabs>

        <Card>
          <CardHeader className="pb-0">
            <CardTitle>Lista de Productos</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <Skeleton className="h-40 w-full rounded-md" />
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <div className="flex justify-between">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts && filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                      <div className="relative">
                        <img
                          src={product.imageUrl ?? ""}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 right-2 flex space-x-1">
                          <Button size="icon" variant="outline" className="bg-white/80 h-8 w-8">
                            <EyeIcon className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="outline" className="bg-white/80 h-8 w-8">
                            <EditIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium text-neutral-800 mb-1">{product.name}</h3>
                        <p className="text-sm text-neutral-500 mb-3">{product.category} | ID: {product.productId}</p>
                        <div className="flex justify-between items-center">
                          <p className="font-medium text-neutral-800">{product.price}</p>
                          <p className="text-xs text-success">+{product.sales} ventas</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full py-8 text-center text-sm text-neutral-500">
                    No se encontraron productos
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
