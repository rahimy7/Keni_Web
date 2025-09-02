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

// Tipo para los miembros de la iglesia
interface Miembro {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  fechaRegistro: string;
  fechaNacimiento: string;
  estado: "activo" | "inactivo" | "nuevo";
  ministerios: string[];
  imageUrl: string;
  notas: string;
  bautizado: boolean;
  miembroDesde: string;
}

export default function MiembrosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("todos");

  // Simulamos datos de miembros
  const miembrosSimulados: Miembro[] = [
    {
      id: 1,
      nombre: "María González",
      email: "maria@example.com",
      telefono: "(123) 456-7890",
      direccion: "Calle Principal 123",
      fechaRegistro: "15 Enero, 2022",
      fechaNacimiento: "12 Marzo, 1985",
      estado: "activo",
      ministerios: ["Adoración", "Escuela Dominical"],
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
      notas: "Excelente voz para el coro",
      bautizado: true,
      miembroDesde: "2018"
    },
    {
      id: 2,
      nombre: "Carlos Rodríguez",
      email: "carlos@example.com",
      telefono: "(123) 456-7891",
      direccion: "Avenida Central 456",
      fechaRegistro: "20 Febrero, 2022",
      fechaNacimiento: "24 Julio, 1990",
      estado: "activo",
      ministerios: ["Jóvenes", "Medios"],
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
      notas: "Responsable del equipo de sonido",
      bautizado: true,
      miembroDesde: "2016"
    },
    {
      id: 3,
      nombre: "Ana Martínez",
      email: "ana@example.com",
      telefono: "(123) 456-7892",
      direccion: "Calle Secundaria 789",
      fechaRegistro: "10 Marzo, 2022",
      fechaNacimiento: "15 Octubre, 1988",
      estado: "activo",
      ministerios: ["Mujeres", "Oración"],
      imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
      notas: "Coordina el grupo de oración de los martes",
      bautizado: true,
      miembroDesde: "2015"
    },
    {
      id: 4,
      nombre: "Roberto Sánchez",
      email: "roberto@example.com",
      telefono: "(123) 456-7893",
      direccion: "Pasaje Las Flores 234",
      fechaRegistro: "5 Abril, 2023",
      fechaNacimiento: "30 Enero, 1992",
      estado: "nuevo",
      ministerios: [],
      imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
      notas: "Interesado en el ministerio de jóvenes",
      bautizado: false,
      miembroDesde: "2023"
    },
    {
      id: 5,
      nombre: "Laura Pérez",
      email: "laura@example.com",
      telefono: "(123) 456-7894",
      direccion: "Avenida Los Pinos 567",
      fechaRegistro: "18 Mayo, 2021",
      fechaNacimiento: "8 Abril, 1982",
      estado: "activo",
      ministerios: ["Niños", "Evangelismo"],
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
      notas: "Maestra de escuela dominical para niños de 6-8 años",
      bautizado: true,
      miembroDesde: "2012"
    },
    {
      id: 6,
      nombre: "Miguel Hernández",
      email: "miguel@example.com",
      telefono: "(123) 456-7895",
      direccion: "Calle del Sol 890",
      fechaRegistro: "22 Junio, 2020",
      fechaNacimiento: "17 Septiembre, 1975",
      estado: "inactivo",
      ministerios: ["Administración"],
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
      notas: "Se mudó temporalmente por trabajo",
      bautizado: true,
      miembroDesde: "2010"
    }
  ];

  // Simulamos una carga de datos
  const { data: miembros, isLoading } = useQuery<Miembro[]>({
    queryKey: ['/api/miembros'],
    queryFn: () => new Promise(resolve => {
      setTimeout(() => resolve(miembrosSimulados), 1000);
    })
  });

  const filteredMiembros = miembros?.filter(miembro => {
    const matchesSearch = 
      miembro.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      miembro.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      miembro.telefono.toLowerCase().includes(searchTerm.toLowerCase()) ||
      miembro.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      miembro.ministerios.some(m => m.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeTab === "todos") return matchesSearch;
    if (activeTab === "activos") return matchesSearch && miembro.estado === "activo";
    if (activeTab === "inactivos") return matchesSearch && miembro.estado === "inactivo";
    if (activeTab === "nuevos") return matchesSearch && miembro.estado === "nuevo";
    
    return matchesSearch;
  });

  const getEstadoClass = (estado: string) => {
    switch (estado) {
      case "activo":
        return "bg-success bg-opacity-10 text-success";
      case "inactivo":
        return "bg-neutral-200 text-neutral-600";
      case "nuevo":
        return "bg-primary bg-opacity-10 text-primary";
      default:
        return "bg-neutral-200 text-neutral-600";
    }
  };

  return (
    <>
      <Helmet>
        <title>Miembros - Iglesia Admin</title>
        <meta name="description" content="Gestión de miembros de la iglesia - Ver, registrar y administrar todos los miembros de la congregación" />
      </Helmet>
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-neutral-800">Miembros</h1>
            <p className="text-neutral-500">Gestión de miembros de la iglesia</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-primary text-white">
              <PlusIcon className="h-4 w-4 mr-2" />
              Nuevo Miembro
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 h-4 w-4" />
                <Input
                  placeholder="Buscar miembros..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button className="bg-white border border-slate-300 text-neutral-700 hover:bg-slate-100">
  <FilterIcon className="h-4 w-4" />
  Filtros
</Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="todos" className="mb-6" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="activos">Activos</TabsTrigger>
            <TabsTrigger value="inactivos">Inactivos</TabsTrigger>
            <TabsTrigger value="nuevos">Nuevos</TabsTrigger>
          </TabsList>
        </Tabs>

        {isLoading ? (
          // Tabla de skeleton para miembros
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-neutral-50 border-b border-neutral-200">
                    <tr>
                      <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-neutral-500">Miembro</th>
                      <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-neutral-500">Contacto</th>
                      <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-neutral-500">Estado</th>
                      <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-neutral-500">Ministerios</th>
                      <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-neutral-500">Registro</th>
                      <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-neutral-500">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(5)].map((_, i) => (
                      <tr key={i} className="border-b border-neutral-200">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div>
                              <Skeleton className="h-4 w-32" />
                              <Skeleton className="h-3 w-24 mt-1" />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-24 mt-1" />
                        </td>
                        <td className="px-4 py-3">
                          <Skeleton className="h-6 w-16 rounded-full" />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            <Skeleton className="h-6 w-16 rounded-full" />
                            <Skeleton className="h-6 w-16 rounded-full" />
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Skeleton className="h-4 w-24" />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <Skeleton className="h-8 w-16 rounded" />
                            <Skeleton className="h-8 w-8 rounded" />
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
          filteredMiembros && filteredMiembros.length > 0 ? (
          <Card>
  <CardContent className="p-0">
    <div className="overflow-x-auto">
      <table className="w-full bg-white text-sm">
        <thead className="bg-neutral-50 border-b border-neutral-200">
          <tr>
            <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-neutral-500">Miembro</th>
            <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-neutral-500">Contacto</th>
            <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-neutral-500">Estado</th>
            <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-neutral-500">Ministerios</th>
            <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-neutral-500">Registro</th>
            <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-neutral-500">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredMiembros.map((miembro) => (
            <tr
              key={miembro.id}
              className="bg-white even:bg-slate-50 hover:bg-slate-100 transition"
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <img
                      src={miembro.imageUrl}
                      alt={miembro.nombre}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-neutral-800">{miembro.nombre}</div>
                    <div className="text-xs text-neutral-500">Miembro desde {miembro.miembroDesde}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="text-neutral-800">{miembro.email}</div>
                <div className="text-xs text-neutral-500">{miembro.telefono}</div>
              </td>
              <td className="px-4 py-3">
                <Badge
                  variant="outline"
                  className={`${getEstadoClass(miembro.estado)} border-0`}
                >
                  {miembro.estado.charAt(0).toUpperCase() + miembro.estado.slice(1)}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  {miembro.ministerios.length > 0 ? (
                    miembro.ministerios.map((ministerio, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-neutral-100 text-neutral-800 border-0"
                      >
                        {ministerio}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-xs text-neutral-500">Ninguno</span>
                  )}
                </div>
              </td>
              <td className="px-4 py-3 text-neutral-600">{miembro.fechaRegistro}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Ver Perfil
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
  <CardFooter className="flex items-center justify-between border-t p-4 bg-white">
    <div className="text-sm text-neutral-500">
      Mostrando <span className="font-medium">{filteredMiembros.length}</span> de{" "}
      <span className="font-medium">{miembros?.length}</span> miembros
    </div>
    <div className="flex gap-2">
      <Button variant="outline" size="sm" disabled>
        Anterior
      </Button>
      <Button variant="outline" size="sm" disabled>
        Siguiente
      </Button>
    </div>
  </CardFooter>
</Card>

          ) : (
            <div className="py-8 text-center text-sm text-neutral-500 bg-white rounded-lg shadow">
              No se encontraron miembros
            </div>
          )
        )}

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Estadísticas de Miembros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-600">Miembros Activos</span>
                    <span className="font-medium">{miembros?.filter(m => m.estado === "activo").length || 0}</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div 
                      className="bg-slate-500 h-2 rounded-full"  
                      style={{ width: `${miembros ? (miembros.filter(m => m.estado === "activo").length / miembros.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-600">Miembros Inactivos</span>
                    <span className="font-medium">{miembros?.filter(m => m.estado === "inactivo").length || 0}</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div 
                      className="bg-slate-500 h-2 rounded-full" 
                      style={{ width: `${miembros ? (miembros.filter(m => m.estado === "inactivo").length / miembros.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-600">Miembros Nuevos</span>
                    <span className="font-medium">{miembros?.filter(m => m.estado === "nuevo").length || 0}</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div 
                      className="bg-slate-500 h-2 rounded-full"  
                      style={{ width: `${miembros ? (miembros.filter(m => m.estado === "nuevo").length / miembros.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-600">Bautizados</span>
                    <span className="font-medium">{miembros?.filter(m => m.bautizado).length || 0}</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div 
                      className="bg-slate-500 h-2 rounded-full"  
                      style={{ width: `${miembros ? (miembros.filter(m => m.bautizado).length / miembros.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ministerios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {miembros && (
                  (() => {
                    const ministeriosCount: Record<string, number> = {};
                    miembros.forEach(miembro => {
                      miembro.ministerios.forEach(ministerio => {
                        ministeriosCount[ministerio] = (ministeriosCount[ministerio] || 0) + 1;
                      });
                    });
                    
                    return Object.entries(ministeriosCount)
                      .sort(([,countA], [,countB]) => countB - countA)
                      .map(([ministerio, count], index) => (
                        <div key={index}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-neutral-600">{ministerio}</span>
                            <span className="font-medium">{count}</span>
                          </div>
                          <div className="w-full bg-neutral-200 rounded-full h-2">
                            <div 
                              className="bg-slate-500 h-2 rounded-full"
                              style={{ width: `${(count / miembros.length) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ));
                  })()
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Miembros Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isLoading ? (
                  [...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24 mt-1" />
                      </div>
                    </div>
                  ))
                ) : (
                  miembros && miembros
                    .sort((a, b) => new Date(b.fechaRegistro).getTime() - new Date(a.fechaRegistro).getTime())
                    .slice(0, 5)
                    .map((miembro) => (
                      <div key={miembro.id} className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          <img 
                            src={miembro.imageUrl} 
                            alt={miembro.nombre}
                            className="h-full w-full object-cover" 
                          />
                        </div>
                        <div>
                          <div className="font-medium text-neutral-800">{miembro.nombre}</div>
                          <div className="text-xs text-neutral-500">Registrado: {miembro.fechaRegistro}</div>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}