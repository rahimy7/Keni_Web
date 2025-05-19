import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchIcon, FilterIcon, PlusIcon } from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Helmet } from "react-helmet";

// Tipo para las donaciones
interface Donacion {
  id: number;
  monto: number;
  donante: string;
  email: string;
  fecha: string;
  metodo: "tarjeta" | "transferencia" | "efectivo" | "otro";
  proposito: string;
  estado: "completada" | "pendiente" | "fallida";
  recurrente: boolean;
}

// Tipo para las campañas de donación
interface CampañaDonacion {
  id: number;
  titulo: string;
  descripcion: string;
  meta: number;
  recaudado: number;
  fechaInicio: string;
  fechaFin: string;
  imageUrl: string;
  estado: "activa" | "completada" | "proxima";
}

export default function DonacionesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("donaciones");
  const [activeSubTab, setActiveSubTab] = useState("todas");

  // Simulamos datos de donaciones
  const donacionesSimuladas: Donacion[] = [
    {
      id: 1,
      monto: 150.00,
      donante: "María González",
      email: "maria@example.com",
      fecha: "19 Mayo, 2023",
      metodo: "tarjeta",
      proposito: "Diezmo",
      estado: "completada",
      recurrente: true
    },
    {
      id: 2,
      monto: 250.00,
      donante: "Roberto Sánchez",
      email: "roberto@example.com",
      fecha: "18 Mayo, 2023",
      metodo: "transferencia",
      proposito: "Misiones",
      estado: "completada",
      recurrente: false
    },
    {
      id: 3,
      monto: 50.00,
      donante: "Carlos Pérez",
      email: "carlos@example.com",
      fecha: "15 Mayo, 2023",
      metodo: "efectivo",
      proposito: "Construcción",
      estado: "completada",
      recurrente: false
    },
    {
      id: 4,
      monto: 100.00,
      donante: "Laura Martínez",
      email: "laura@example.com",
      fecha: "14 Mayo, 2023",
      metodo: "tarjeta",
      proposito: "Diezmo",
      estado: "completada",
      recurrente: true
    },
    {
      id: 5,
      monto: 75.00,
      donante: "Miguel Hernández",
      email: "miguel@example.com",
      fecha: "12 Mayo, 2023",
      metodo: "tarjeta",
      proposito: "General",
      estado: "pendiente",
      recurrente: false
    },
    {
      id: 6,
      monto: 200.00,
      donante: "Ana Díaz",
      email: "ana@example.com",
      fecha: "10 Mayo, 2023",
      metodo: "transferencia",
      proposito: "Misiones",
      estado: "completada",
      recurrente: false
    }
  ];

  // Simulamos datos de campañas de donación
  const campañasSimuladas: CampañaDonacion[] = [
    {
      id: 1,
      titulo: "Apoyo Misionero",
      descripcion: "Campaña para recaudar fondos para nuestros misioneros en América Latina",
      meta: 5000,
      recaudado: 3200,
      fechaInicio: "1 Mayo, 2023",
      fechaFin: "31 Mayo, 2023",
      imageUrl: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
      estado: "activa"
    },
    {
      id: 2,
      titulo: "Renovación del Templo",
      descripcion: "Fondos para la renovación y ampliación de nuestro templo principal",
      meta: 15000,
      recaudado: 8500,
      fechaInicio: "15 Abril, 2023",
      fechaFin: "15 Julio, 2023",
      imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
      estado: "activa"
    },
    {
      id: 3,
      titulo: "Ayuda Comunitaria",
      descripcion: "Apoyo a familias necesitadas de nuestra comunidad con alimentos y recursos",
      meta: 2500,
      recaudado: 1800,
      fechaInicio: "1 Mayo, 2023",
      fechaFin: "31 Mayo, 2023",
      imageUrl: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
      estado: "activa"
    },
    {
      id: 4,
      titulo: "Equipos Audiovisuales",
      descripcion: "Actualización de nuestros equipos de audio y video para las transmisiones",
      meta: 3500,
      recaudado: 3500,
      fechaInicio: "1 Marzo, 2023",
      fechaFin: "30 Abril, 2023",
      imageUrl: "https://images.unsplash.com/photo-1551817958-20204d6ab212?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
      estado: "completada"
    },
    {
      id: 5,
      titulo: "Campamento Juvenil",
      descripcion: "Fondos para el próximo campamento de jóvenes en las montañas",
      meta: 4000,
      recaudado: 1200,
      fechaInicio: "15 Mayo, 2023",
      fechaFin: "15 Junio, 2023",
      imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
      estado: "activa"
    },
    {
      id: 6,
      titulo: "Misión Navideña",
      descripcion: "Preparativos para nuestra misión especial de Navidad",
      meta: 6000,
      recaudado: 0,
      fechaInicio: "1 Octubre, 2023",
      fechaFin: "15 Diciembre, 2023",
      imageUrl: "https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
      estado: "proxima"
    }
  ];

  // Simulamos cargas de datos
  const { data: donaciones, isLoading: isLoadingDonaciones } = useQuery<Donacion[]>({
    queryKey: ['/api/donaciones'],
    queryFn: () => new Promise(resolve => {
      setTimeout(() => resolve(donacionesSimuladas), 1000);
    }),
    enabled: activeTab === "donaciones"
  });

  const { data: campañas, isLoading: isLoadingCampañas } = useQuery<CampañaDonacion[]>({
    queryKey: ['/api/campañas'],
    queryFn: () => new Promise(resolve => {
      setTimeout(() => resolve(campañasSimuladas), 1000);
    }),
    enabled: activeTab === "campañas"
  });

  const filteredDonaciones = donaciones?.filter(donacion => {
    const matchesSearch = 
      donacion.donante.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donacion.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donacion.proposito.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeSubTab === "todas") return matchesSearch;
    if (activeSubTab === "recurrentes") return matchesSearch && donacion.recurrente;
    if (activeSubTab === "completadas") return matchesSearch && donacion.estado === "completada";
    if (activeSubTab === "pendientes") return matchesSearch && donacion.estado === "pendiente";
    
    return matchesSearch;
  });

  const filteredCampañas = campañas?.filter(campaña => {
    const matchesSearch = 
      campaña.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaña.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeSubTab === "todas") return matchesSearch;
    if (activeSubTab === "activas") return matchesSearch && campaña.estado === "activa";
    if (activeSubTab === "completadas") return matchesSearch && campaña.estado === "completada";
    if (activeSubTab === "proximas") return matchesSearch && campaña.estado === "proxima";
    
    return matchesSearch;
  });

  const getEstadoClass = (estado: string) => {
    switch (estado) {
      case "completada":
        return "bg-success bg-opacity-10 text-success";
      case "pendiente":
        return "bg-warning bg-opacity-10 text-warning";
      case "fallida":
        return "bg-destructive bg-opacity-10 text-destructive";
      case "activa":
        return "bg-primary bg-opacity-10 text-primary";
      case "proxima":
        return "bg-neutral-200 text-neutral-600";
      default:
        return "bg-neutral-200 text-neutral-600";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <>
      <Helmet>
        <title>Donaciones - Iglesia Admin</title>
        <meta name="description" content="Gestión de donaciones y campañas - Ver, registrar y administrar todas las donaciones y campañas de la iglesia" />
      </Helmet>
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-neutral-800">Donaciones</h1>
            <p className="text-neutral-500">Gestión de donaciones y campañas de recaudación</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            {activeTab === "donaciones" ? (
              <Button className="bg-primary text-white">
                <PlusIcon className="h-4 w-4 mr-2" />
                Nueva Donación
              </Button>
            ) : (
              <Button className="bg-primary text-white">
                <PlusIcon className="h-4 w-4 mr-2" />
                Nueva Campaña
              </Button>
            )}
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 h-4 w-4" />
                <Input
                  placeholder={activeTab === "donaciones" ? "Buscar donaciones..." : "Buscar campañas..."}
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

        <Tabs defaultValue="donaciones" className="mb-6" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="donaciones">Donaciones</TabsTrigger>
            <TabsTrigger value="campañas">Campañas</TabsTrigger>
          </TabsList>

          <TabsContent value="donaciones">
            <Tabs defaultValue="todas" className="mt-4 mb-6" onValueChange={setActiveSubTab}>
              <TabsList>
                <TabsTrigger value="todas">Todas</TabsTrigger>
                <TabsTrigger value="recurrentes">Recurrentes</TabsTrigger>
                <TabsTrigger value="completadas">Completadas</TabsTrigger>
                <TabsTrigger value="pendientes">Pendientes</TabsTrigger>
              </TabsList>
            </Tabs>

            {isLoadingDonaciones ? (
              // Tabla de skeleton para donaciones
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-neutral-50 border-b border-neutral-200">
                        <tr>
                          <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-neutral-500">ID</th>
                          <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-neutral-500">Donante</th>
                          <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-neutral-500">Monto</th>
                          <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-neutral-500">Fecha</th>
                          <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-neutral-500">Propósito</th>
                          <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-neutral-500">Método</th>
                          <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-neutral-500">Estado</th>
                          <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-neutral-500">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...Array(5)].map((_, i) => (
                          <tr key={i} className="border-b border-neutral-200">
                            <td className="whitespace-nowrap px-4 py-3 text-sm text-neutral-800">
                              <Skeleton className="h-4 w-16" />
                            </td>
                            <td className="whitespace-nowrap px-4 py-3 text-sm text-neutral-800">
                              <Skeleton className="h-4 w-32" />
                            </td>
                            <td className="whitespace-nowrap px-4 py-3 text-sm text-neutral-800">
                              <Skeleton className="h-4 w-16" />
                            </td>
                            <td className="whitespace-nowrap px-4 py-3 text-sm text-neutral-800">
                              <Skeleton className="h-4 w-24" />
                            </td>
                            <td className="whitespace-nowrap px-4 py-3 text-sm text-neutral-800">
                              <Skeleton className="h-4 w-20" />
                            </td>
                            <td className="whitespace-nowrap px-4 py-3 text-sm text-neutral-800">
                              <Skeleton className="h-4 w-20" />
                            </td>
                            <td className="whitespace-nowrap px-4 py-3 text-sm text-neutral-800">
                              <Skeleton className="h-4 w-20" />
                            </td>
                            <td className="whitespace-nowrap px-4 py-3 text-sm text-neutral-800">
                              <Skeleton className="h-4 w-16" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ) : (
              filteredDonaciones && filteredDonaciones.length > 0 ? (
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-neutral-50 border-b border-neutral-200">
                          <tr>
                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-neutral-500">ID</th>
                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-neutral-500">Donante</th>
                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-neutral-500">Monto</th>
                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-neutral-500">Fecha</th>
                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-neutral-500">Propósito</th>
                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-neutral-500">Método</th>
                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-neutral-500">Estado</th>
                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-neutral-500">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredDonaciones.map((donacion) => (
                            <tr key={donacion.id} className="border-b border-neutral-200">
                              <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-neutral-800">
                                #{donacion.id.toString().padStart(4, '0')}
                              </td>
                              <td className="whitespace-nowrap px-4 py-3 text-sm text-neutral-800">
                                <div>
                                  <div className="font-medium">{donacion.donante}</div>
                                  <div className="text-neutral-500 text-xs">{donacion.email}</div>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-neutral-800">
                                {formatCurrency(donacion.monto)}
                              </td>
                              <td className="whitespace-nowrap px-4 py-3 text-sm text-neutral-600">
                                {donacion.fecha}
                              </td>
                              <td className="whitespace-nowrap px-4 py-3 text-sm text-neutral-600">
                                {donacion.proposito}
                              </td>
                              <td className="whitespace-nowrap px-4 py-3 text-sm text-neutral-600">
                                {donacion.metodo.charAt(0).toUpperCase() + donacion.metodo.slice(1)}
                              </td>
                              <td className="whitespace-nowrap px-4 py-3 text-sm">
                                <Badge variant="outline" className={`${getEstadoClass(donacion.estado)} border-0`}>
                                  {donacion.estado.charAt(0).toUpperCase() + donacion.estado.slice(1)}
                                </Badge>
                              </td>
                              <td className="whitespace-nowrap px-4 py-3 text-sm">
                                <div className="flex space-x-2">
                                  <Button variant="outline" size="sm">
                                    Ver
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <i className="ri-more-2-fill"></i>
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="py-8 text-center text-sm text-neutral-500">
                  No se encontraron donaciones
                </div>
              )
            )}
          </TabsContent>

          <TabsContent value="campañas">
            <Tabs defaultValue="todas" className="mt-4 mb-6" onValueChange={setActiveSubTab}>
              <TabsList>
                <TabsTrigger value="todas">Todas</TabsTrigger>
                <TabsTrigger value="activas">Activas</TabsTrigger>
                <TabsTrigger value="completadas">Completadas</TabsTrigger>
                <TabsTrigger value="proximas">Próximas</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {isLoadingCampañas ? (
                // Skeleton loaders para campañas
                [...Array(6)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <Skeleton className="h-40 w-full rounded-md" />
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <div className="flex justify-between">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                filteredCampañas && filteredCampañas.length > 0 ? (
                  filteredCampañas.map((campaña) => (
                    <Card key={campaña.id} className="overflow-hidden">
                      <div className="relative">
                        <img 
                          src={campaña.imageUrl}
                          alt={campaña.titulo}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge 
                            variant="outline" 
                            className={`${getEstadoClass(campaña.estado)} border-0`}
                          >
                            {campaña.estado === "proxima" ? "Próxima" : campaña.estado.charAt(0).toUpperCase() + campaña.estado.slice(1)}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg text-neutral-800 mb-1">{campaña.titulo}</h3>
                        <p className="text-sm text-neutral-600 mb-4 line-clamp-2">{campaña.descripcion}</p>
                        
                        <div className="mb-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-neutral-600">Progreso</span>
                            <span className="font-medium">{Math.round((campaña.recaudado / campaña.meta) * 100)}%</span>
                          </div>
                          <div className="w-full bg-neutral-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${Math.min(100, Math.round((campaña.recaudado / campaña.meta) * 100))}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between text-sm text-neutral-600 mb-2">
                          <span>Meta: {formatCurrency(campaña.meta)}</span>
                          <span className="font-medium">{formatCurrency(campaña.recaudado)}</span>
                        </div>
                        
                        <div className="text-xs text-neutral-500 mb-4">
                          {campaña.fechaInicio} - {campaña.fechaFin}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end border-t pt-4">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Ver Detalles
                          </Button>
                          <Button variant="outline" size="sm">
                            Editar
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full py-8 text-center text-sm text-neutral-500">
                    No se encontraron campañas
                  </div>
                )
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}