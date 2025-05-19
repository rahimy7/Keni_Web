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

// Tipo para las meditaciones
interface Meditacion {
  id: number;
  titulo: string;
  descripcion: string;
  autor: string;
  duracion: string;
  categoria: "diaria" | "biblica" | "devocional" | "oracion" | "adoracion";
  fechaPublicacion: string;
  imageUrl: string;
  audioUrl: string;
  reproducciones: number;
  favoritos: number;
}

export default function MeditacionesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("todas");

  // Simulamos datos de meditaciones
  const meditacionesSimuladas: Meditacion[] = [
    {
      id: 1,
      titulo: "La Paz de Dios",
      descripcion: "Meditación sobre cómo encontrar paz en tiempos difíciles a través de la palabra de Dios.",
      autor: "Pastor David López",
      duracion: "15 min",
      categoria: "diaria",
      fechaPublicacion: "19 Mayo, 2023",
      imageUrl: "https://images.unsplash.com/photo-1476611338391-6f395a0dd82e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
      audioUrl: "/meditaciones/la-paz-de-dios.mp3",
      reproducciones: 256,
      favoritos: 42
    },
    {
      id: 2,
      titulo: "Salmo 23 - El Señor es mi Pastor",
      descripcion: "Reflexión profunda sobre uno de los salmos más amados y su significado para nuestra vida diaria.",
      autor: "Lic. Ana Gómez",
      duracion: "12 min",
      categoria: "biblica",
      fechaPublicacion: "17 Mayo, 2023",
      imageUrl: "https://images.unsplash.com/photo-1590586767908-40a3e637aada?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
      audioUrl: "/meditaciones/salmo-23.mp3",
      reproducciones: 189,
      favoritos: 35
    },
    {
      id: 3,
      titulo: "Momentos de Adoración",
      descripcion: "Meditación guiada con música de adoración para conectar con Dios a través de la alabanza.",
      autor: "Min. Carlos Rodríguez",
      duracion: "20 min",
      categoria: "adoracion",
      fechaPublicacion: "15 Mayo, 2023",
      imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
      audioUrl: "/meditaciones/momentos-adoracion.mp3",
      reproducciones: 312,
      favoritos: 58
    },
    {
      id: 4,
      titulo: "Oración por Sanidad",
      descripcion: "Guía de oración para aquellos que buscan sanidad física, emocional o espiritual.",
      autor: "Pastor David López",
      duracion: "18 min",
      categoria: "oracion",
      fechaPublicacion: "10 Mayo, 2023",
      imageUrl: "https://images.unsplash.com/photo-1498435999018-61fff81efb8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
      audioUrl: "/meditaciones/oracion-sanidad.mp3",
      reproducciones: 275,
      favoritos: 47
    },
    {
      id: 5,
      titulo: "Devocional: Fruto del Espíritu",
      descripcion: "Reflexión sobre el fruto del Espíritu Santo y cómo cultivarlo en nuestra vida diaria.",
      autor: "Dra. María Sánchez",
      duracion: "10 min",
      categoria: "devocional",
      fechaPublicacion: "8 Mayo, 2023",
      imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
      audioUrl: "/meditaciones/fruto-espiritu.mp3",
      reproducciones: 198,
      favoritos: 31
    },
    {
      id: 6,
      titulo: "Fe en Tiempos Difíciles",
      descripcion: "Meditación para fortalecer nuestra fe cuando enfrentamos pruebas y tribulaciones.",
      autor: "Pastor Roberto Fernández",
      duracion: "14 min",
      categoria: "diaria",
      fechaPublicacion: "5 Mayo, 2023",
      imageUrl: "https://images.unsplash.com/photo-1519834662252-2f0d87927254?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
      audioUrl: "/meditaciones/fe-tiempos-dificiles.mp3",
      reproducciones: 223,
      favoritos: 39
    }
  ];

  // Simulamos una carga de datos
  const { data: meditaciones, isLoading } = useQuery<Meditacion[]>({
    queryKey: ['/api/meditaciones'],
    queryFn: () => new Promise(resolve => {
      setTimeout(() => resolve(meditacionesSimuladas), 1000);
    })
  });

  const filteredMeditaciones = meditaciones?.filter(meditacion => {
    const matchesSearch = 
      meditacion.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meditacion.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meditacion.autor.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "todas") return matchesSearch;
    if (activeTab === "diarias") return matchesSearch && meditacion.categoria === "diaria";
    if (activeTab === "biblicas") return matchesSearch && meditacion.categoria === "biblica";
    if (activeTab === "devocionales") return matchesSearch && meditacion.categoria === "devocional";
    if (activeTab === "oracion") return matchesSearch && meditacion.categoria === "oracion";
    if (activeTab === "adoracion") return matchesSearch && meditacion.categoria === "adoracion";
    
    return matchesSearch;
  });

  const getCategoriaClass = (categoria: string) => {
    switch (categoria) {
      case "diaria":
        return "bg-primary bg-opacity-10 text-primary";
      case "biblica":
        return "bg-secondary bg-opacity-10 text-secondary";
      case "devocional":
        return "bg-success bg-opacity-10 text-success";
      case "oracion":
        return "bg-warning bg-opacity-10 text-warning";
      case "adoracion":
        return "bg-destructive bg-opacity-10 text-destructive";
      default:
        return "bg-neutral-200 text-neutral-600";
    }
  };

  const getCategoriaNombre = (categoria: string) => {
    switch (categoria) {
      case "diaria":
        return "Diaria";
      case "biblica":
        return "Bíblica";
      case "devocional":
        return "Devocional";
      case "oracion":
        return "Oración";
      case "adoracion":
        return "Adoración";
      default:
        return categoria.charAt(0).toUpperCase() + categoria.slice(1);
    }
  };

  return (
    <>
      <Helmet>
        <title>Meditaciones - Iglesia Admin</title>
        <meta name="description" content="Gestión de meditaciones y audios - Ver, crear y administrar todas las meditaciones guiadas y devocionales de la iglesia" />
      </Helmet>
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-neutral-800">Meditaciones</h1>
            <p className="text-neutral-500">Gestión de meditaciones guiadas y devocionales</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-primary text-white">
              <PlusIcon className="h-4 w-4 mr-2" />
              Nueva Meditación
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 h-4 w-4" />
                <Input
                  placeholder="Buscar meditaciones..."
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
            <TabsTrigger value="diarias">Diarias</TabsTrigger>
            <TabsTrigger value="biblicas">Bíblicas</TabsTrigger>
            <TabsTrigger value="devocionales">Devocionales</TabsTrigger>
            <TabsTrigger value="oracion">Oración</TabsTrigger>
            <TabsTrigger value="adoracion">Adoración</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            // Skeleton loaders para cuando está cargando
            [...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <Skeleton className="h-40 w-full rounded-md" />
                    <Skeleton className="h-5 w-3/4" />
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
            filteredMeditaciones && filteredMeditaciones.length > 0 ? (
              filteredMeditaciones.map((meditacion) => (
                <Card key={meditacion.id} className="overflow-hidden">
                  <div className="relative">
                    <img 
                      src={meditacion.imageUrl}
                      alt={meditacion.titulo}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4 w-full">
                      <Badge 
                        variant="outline" 
                        className={`${getCategoriaClass(meditacion.categoria)} border-0 mb-2`}
                      >
                        {getCategoriaNombre(meditacion.categoria)}
                      </Badge>
                      <h3 className="font-semibold text-lg text-white">{meditacion.titulo}</h3>
                      <p className="text-white/80 text-sm">{meditacion.autor}</p>
                    </div>
                    <div className="absolute top-2 right-2 bg-black/30 text-white px-2 py-1 rounded text-xs">
                      {meditacion.duracion}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-neutral-600 mb-4 line-clamp-2">{meditacion.descripcion}</p>
                    
                    <div className="flex justify-between text-sm text-neutral-500">
                      <div className="flex items-center">
                        <i className="ri-play-circle-line mr-1"></i>
                        <span>{meditacion.reproducciones} reproducciones</span>
                      </div>
                      <div className="flex items-center">
                        <i className="ri-heart-line mr-1"></i>
                        <span>{meditacion.favoritos}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <Button variant="outline" size="sm" className="flex items-center">
                      <i className="ri-play-fill mr-1"></i>
                      Reproducir
                    </Button>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Editar
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
                No se encontraron meditaciones
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}