import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchIcon, FilterIcon, PlusIcon, HeartIcon } from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Helmet } from "react-helmet";

// Tipo para las peticiones de oración
interface PeticionOracion {
  id: number;
  peticion: string;
  autor: string;
  fechaCreacion: string;
  estado: "pendiente" | "en-oracion" | "respondida";
  contadorOraciones: number;
  privada: boolean;
  categoria: string;
}

export default function OracionesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("todas");

  // Simulamos datos de peticiones de oración
  const peticionesSimuladas: PeticionOracion[] = [
    {
      id: 1,
      peticion: "Por la salud de mi madre que está hospitalizada",
      autor: "María Rodríguez",
      fechaCreacion: "Hace 2 horas",
      estado: "en-oracion",
      contadorOraciones: 24,
      privada: false,
      categoria: "salud"
    },
    {
      id: 2,
      peticion: "Por mi examen de mañana",
      autor: "Carlos Gómez",
      fechaCreacion: "Hace 5 horas",
      estado: "pendiente",
      contadorOraciones: 8,
      privada: false,
      categoria: "educacion"
    },
    {
      id: 3,
      peticion: "Por mi familia y trabajo",
      autor: "Roberto Sánchez",
      fechaCreacion: "Hace 1 día",
      estado: "pendiente",
      contadorOraciones: 12,
      privada: true,
      categoria: "familia"
    },
    {
      id: 4,
      peticion: "Agradecimiento por nueva oportunidad laboral",
      autor: "Ana Martínez",
      fechaCreacion: "Hace 2 días",
      estado: "respondida",
      contadorOraciones: 37,
      privada: false,
      categoria: "trabajo"
    },
    {
      id: 5,
      peticion: "Por la paz en mi hogar",
      autor: "Pedro Díaz",
      fechaCreacion: "Hace 3 días",
      estado: "en-oracion",
      contadorOraciones: 19,
      privada: false,
      categoria: "familia"
    },
    {
      id: 6,
      peticion: "Por dirección en decisiones importantes",
      autor: "Laura Fernández",
      fechaCreacion: "Hace 4 días",
      estado: "respondida",
      contadorOraciones: 28,
      privada: false,
      categoria: "direccion"
    }
  ];

  // Simulamos una carga de datos
  const { data: peticiones, isLoading } = useQuery<PeticionOracion[]>({
    queryKey: ['/api/oraciones'],
    queryFn: () => new Promise(resolve => {
      setTimeout(() => resolve(peticionesSimuladas), 1000);
    })
  });

  const filteredPeticiones = peticiones?.filter(peticion => {
    const matchesSearch = 
      peticion.peticion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      peticion.autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      peticion.categoria.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "todas") return matchesSearch;
    if (activeTab === "pendientes") return matchesSearch && peticion.estado === "pendiente";
    if (activeTab === "en-oracion") return matchesSearch && peticion.estado === "en-oracion";
    if (activeTab === "respondidas") return matchesSearch && peticion.estado === "respondida";
    
    return matchesSearch;
  });

  const getStatusClass = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return "bg-warning bg-opacity-10 text-warning";
      case "en-oracion":
        return "bg-primary bg-opacity-10 text-primary";
      case "respondida":
        return "bg-success bg-opacity-10 text-success";
      default:
        return "bg-neutral-200 text-neutral-600";
    }
  };

  const getStatusText = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return "Pendiente";
      case "en-oracion":
        return "En Oración";
      case "respondida":
        return "Respondida";
      default:
        return "Desconocido";
    }
  };

  return (
    <>
      <Helmet>
        <title>Peticiones de Oración - Iglesia Admin</title>
        <meta name="description" content="Gestión de peticiones de oración - Ver, responder y administrar las peticiones de oración de la congregación" />
      </Helmet>
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-neutral-800">Peticiones de Oración</h1>
            <p className="text-neutral-500">Gestiona las peticiones de oración de la comunidad</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-primary text-white">
              <PlusIcon className="h-4 w-4 mr-2" />
              Nueva Petición
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 h-4 w-4" />
                <Input
                  placeholder="Buscar peticiones..."
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

        <Tabs defaultValue="todas" className="mb-6" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="todas">Todas</TabsTrigger>
            <TabsTrigger value="pendientes">Pendientes</TabsTrigger>
            <TabsTrigger value="en-oracion">En Oración</TabsTrigger>
            <TabsTrigger value="respondidas">Respondidas</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            // Skeleton loaders para cuando está cargando
            [...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-16 mb-2" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <div className="flex justify-between mt-4">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            filteredPeticiones && filteredPeticiones.length > 0 ? (
              filteredPeticiones.map((peticion) => (
                <Card key={peticion.id} className="overflow-hidden">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-3">
                      <Badge 
                        variant="outline" 
                        className={`${getStatusClass(peticion.estado)} border-0`}
                      >
                        {getStatusText(peticion.estado)}
                      </Badge>
                      {peticion.privada && (
                        <Badge variant="outline" className="bg-neutral-100 text-neutral-600">
                          Privada
                        </Badge>
                      )}
                    </div>
                    <p className="text-neutral-800 mb-4">
                      {peticion.peticion}
                    </p>
                    <div className="flex justify-between text-sm text-neutral-500">
                      <span>{peticion.autor}</span>
                      <span>{peticion.fechaCreacion}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <div className="flex items-center text-neutral-500 text-sm">
                      <HeartIcon className="h-4 w-4 mr-1 text-secondary" />
                      <span>{peticion.contadorOraciones} oraciones</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Responder
                      </Button>
                      <Button variant="outline" size="sm">
                        <i className="ri-more-2-fill"></i>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full py-8 text-center text-sm text-neutral-500">
                No se encontraron peticiones de oración
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}