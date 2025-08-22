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

// Tipo para los cursos
interface Curso {
  id: number;
  titulo: string;
  descripcion: string;
  instructor: string;
  duracion: string;
  nivel: "básico" | "intermedio" | "avanzado";
  categoria: string;
  imageUrl: string;
  inscritos: number;
}

export default function CursosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("todos");

  // Simulamos datos de cursos
  const cursosSimulados: Curso[] = [
    {
      id: 1,
      titulo: "Fundamentos Bíblicos",
      descripcion: "Estudio introductorio de los principios básicos de la Biblia y su aplicación práctica.",
      instructor: "Pastor David López",
      duracion: "8 semanas",
      nivel: "básico",
      categoria: "biblia",
      imageUrl: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
      inscritos: 42
    },
    {
      id: 2,
      titulo: "Liderazgo Cristiano",
      descripcion: "Capacitación para desarrollar habilidades de liderazgo basado en principios bíblicos.",
      instructor: "Dra. María Sánchez",
      duracion: "12 semanas",
      nivel: "intermedio",
      categoria: "liderazgo",
      imageUrl: "https://impulso06.com/wp-content/uploads/2023/01/liderazgo-en-la-empresa-10-formas-de-liderar-.png",
      inscritos: 28
    },
    {
      id: 3,
      titulo: "Discipulado",
      descripcion: "Aprende a discipular a otros de manera efectiva siguiendo el modelo de Jesús.",
      instructor: "Pastor Carlos Rodríguez",
      duracion: "10 semanas",
      nivel: "intermedio",
      categoria: "discipulado",
      imageUrl: "https://transformaelmundo.com/wp-content/uploads/2019/06/istockphoto-847575018-612x612.jpg?w=569&h=379",
      inscritos: 35
    },
    {
      id: 4,
      titulo: "Estudio del Antiguo Testamento",
      descripcion: "Profundiza en las enseñanzas y contexto histórico del Antiguo Testamento.",
      instructor: "Dr. Roberto Gómez",
      duracion: "16 semanas",
      nivel: "avanzado",
      categoria: "biblia",
      imageUrl: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
      inscritos: 22
    },
    {
      id: 5,
      titulo: "Evangelismo Práctico",
      descripcion: "Herramientas y estrategias para compartir el evangelio de manera efectiva.",
      instructor: "Lic. Juan Martínez",
      duracion: "6 semanas",
      nivel: "básico",
      categoria: "evangelismo",
      imageUrl: "https://images.unsplash.com/photo-1551818176-60579e574b91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
      inscritos: 56
    },
    {
      id: 6,
      titulo: "Matrimonio y Familia",
      descripcion: "Principios bíblicos para fortalecer las relaciones matrimoniales y familiares.",
      instructor: "Dra. Ana Pérez",
      duracion: "8 semanas",
      nivel: "intermedio",
      categoria: "familia",
      imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
      inscritos: 48
    }
  ];

  // Simulamos una carga de datos
  const { data: cursos, isLoading } = useQuery<Curso[]>({
    queryKey: ['/api/cursos'],
    queryFn: () => new Promise(resolve => {
      setTimeout(() => resolve(cursosSimulados), 1000);
    })
  });

  const filteredCursos = cursos?.filter(curso => {
    const matchesSearch = 
      curso.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      curso.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      curso.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      curso.categoria.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "todos") return matchesSearch;
    if (activeTab === "biblia") return matchesSearch && curso.categoria === "biblia";
    if (activeTab === "liderazgo") return matchesSearch && curso.categoria === "liderazgo";
    if (activeTab === "familia") return matchesSearch && curso.categoria === "familia";
    if (activeTab === "evangelismo") return matchesSearch && curso.categoria === "evangelismo";
    if (activeTab === "discipulado") return matchesSearch && curso.categoria === "discipulado";
    
    return matchesSearch;
  });

  const getNivelClass = (nivel: string) => {
    switch (nivel) {
      case "básico":
        return "bg-success bg-opacity-10 text-success";
      case "intermedio":
        return "bg-warning bg-opacity-10 text-warning";
      case "avanzado":
        return "bg-secondary bg-opacity-10 text-secondary";
      default:
        return "bg-neutral-200 text-neutral-600";
    }
  };

  return (
    <>
      <Helmet>
        <title>Cursos - Iglesia Admin</title>
        <meta name="description" content="Gestión de cursos y capacitaciones - Ver, crear y administrar todos los cursos que ofrece la iglesia" />
      </Helmet>
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-neutral-800">Cursos</h1>
            <p className="text-neutral-500">Gestión de cursos y capacitaciones de la iglesia</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-primary text-white">
              <PlusIcon className="h-4 w-4 mr-2" />
              Nuevo Curso
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 h-4 w-4" />
                <Input
                  placeholder="Buscar cursos..."
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
            <TabsTrigger value="biblia">Biblia</TabsTrigger>
            <TabsTrigger value="liderazgo">Liderazgo</TabsTrigger>
            <TabsTrigger value="discipulado">Discipulado</TabsTrigger>
            <TabsTrigger value="familia">Familia</TabsTrigger>
            <TabsTrigger value="evangelismo">Evangelismo</TabsTrigger>
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
            filteredCursos && filteredCursos.length > 0 ? (
              filteredCursos.map((curso) => (
                <Card key={curso.id} className="overflow-hidden">
                  <div className="relative">
                    <img 
                      src={curso.imageUrl}
                      alt={curso.titulo}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge 
                        variant="outline" 
                        className={`${getNivelClass(curso.nivel)} border-0`}
                      >
                        {curso.nivel.charAt(0).toUpperCase() + curso.nivel.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg text-neutral-800 mb-1">{curso.titulo}</h3>
                    <p className="text-sm text-neutral-600 mb-3 line-clamp-2">{curso.descripcion}</p>
                    
                    <div className="flex items-center text-sm text-neutral-500 mb-2">
                      <i className="ri-user-line mr-2 text-neutral-400"></i>
                      <span>{curso.instructor}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-neutral-500 mb-2">
                      <i className="ri-time-line mr-2 text-neutral-400"></i>
                      <span>{curso.duracion}</span>
                    </div>

                    <div className="flex items-center text-sm text-neutral-500">
                      <i className="ri-group-line mr-2 text-neutral-400"></i>
                      <span>{curso.inscritos} inscritos</span>
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
                No se encontraron cursos
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}