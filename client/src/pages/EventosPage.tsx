import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchIcon, FilterIcon, PlusIcon, CalendarIcon } from "@/lib/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { Helmet } from "react-helmet";

// Tipo para los eventos
interface Evento {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  lugar: string;
  tipo: string;
  imageUrl: string;
}

export default function EventosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("todos");

  // Simulamos datos de eventos para la iglesia
  const eventosSimulados: Evento[] = [
    {
      id: 1,
      titulo: "Culto Dominical",
      descripcion: "Servicio principal de adoración y predicación",
      fecha: "21 Mayo, 2023",
      hora: "10:00 AM",
      lugar: "Auditorio Principal",
      tipo: "culto",
      imageUrl: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200"
    },
    {
      id: 2,
      titulo: "Estudio Bíblico",
      descripcion: "Estudio profundo de las Escrituras",
      fecha: "23 Mayo, 2023",
      hora: "7:00 PM",
      lugar: "Salón 103",
      tipo: "estudio",
      imageUrl: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200"
    },
    {
      id: 3,
      titulo: "Retiro Espiritual",
      descripcion: "Fin de semana de renovación espiritual",
      fecha: "26-28 Mayo, 2023",
      hora: "Todo el día",
      lugar: "Campamento El Redentor",
      tipo: "retiro",
      imageUrl: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200"
    },
    {
      id: 4,
      titulo: "Grupo de Jóvenes",
      descripcion: "Reunión semanal para jóvenes",
      fecha: "26 Mayo, 2023",
      hora: "6:30 PM",
      lugar: "Área de Jóvenes",
      tipo: "jovenes",
      imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200"
    },
    {
      id: 5,
      titulo: "Concierto de Alabanza",
      descripcion: "Noche de adoración con invitados especiales",
      fecha: "2 Junio, 2023",
      hora: "7:00 PM",
      lugar: "Auditorio Principal",
      tipo: "especial",
      imageUrl: "https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200"
    },
    {
      id: 6,
      titulo: "Capacitación de Liderazgo",
      descripcion: "Entrenamiento para líderes de ministerios",
      fecha: "8 Junio, 2023",
      hora: "9:00 AM",
      lugar: "Salón de Conferencias",
      tipo: "capacitacion",
      imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f8e1c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200"
    }
  ];

  // Simulamos una carga de datos
  const { data: eventos, isLoading } = useQuery<Evento[]>({
    queryKey: ['/api/eventos'],
    queryFn: () => new Promise(resolve => {
      setTimeout(() => resolve(eventosSimulados), 1000);
    })
  });

  const filteredEventos = eventos?.filter(evento => {
    const matchesSearch = 
      evento.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evento.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evento.lugar.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "todos") return matchesSearch;
    if (activeTab === "cultos") return matchesSearch && evento.tipo === "culto";
    if (activeTab === "estudios") return matchesSearch && evento.tipo === "estudio";
    if (activeTab === "jovenes") return matchesSearch && evento.tipo === "jovenes";
    if (activeTab === "especiales") return matchesSearch && (evento.tipo === "especial" || evento.tipo === "retiro");
    
    return matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>Eventos - Iglesia Admin</title>
        <meta name="description" content="Gestión de eventos para la iglesia - Ver, buscar y administrar todos los eventos y actividades" />
      </Helmet>
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-neutral-800">Eventos</h1>
            <p className="text-neutral-500">Gestión de eventos y actividades de la iglesia</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-primary text-white">
              <PlusIcon className="h-4 w-4 mr-2" />
              Añadir Evento
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 h-4 w-4" />
                <Input
                  placeholder="Buscar eventos..."
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
            <TabsTrigger value="cultos">Cultos</TabsTrigger>
            <TabsTrigger value="estudios">Estudios</TabsTrigger>
            <TabsTrigger value="jovenes">Jóvenes</TabsTrigger>
            <TabsTrigger value="especiales">Especiales</TabsTrigger>
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
                    <Skeleton className="h-4 w-1/2" />
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            filteredEventos && filteredEventos.length > 0 ? (
              filteredEventos.map((evento) => (
                <Card key={evento.id} className="overflow-hidden">
                  <div className="relative">
                    <img 
                      src={evento.imageUrl}
                      alt={evento.titulo}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="bg-primary/90 text-white px-2 py-1 rounded text-xs font-medium">
                        {evento.tipo.charAt(0).toUpperCase() + evento.tipo.slice(1)}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg text-neutral-800 mb-1">{evento.titulo}</h3>
                    <p className="text-sm text-neutral-600 mb-3">{evento.descripcion}</p>
                    
                    <div className="flex items-center text-sm text-neutral-500 mb-2">
                      <CalendarIcon className="h-4 w-4 mr-2 text-neutral-400" />
                      <span>{evento.fecha} • {evento.hora}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-neutral-500">
                      <i className="ri-map-pin-line mr-2 text-neutral-400"></i>
                      <span>{evento.lugar}</span>
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm" className="text-xs">
                        Editar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full py-8 text-center text-sm text-neutral-500">
                No se encontraron eventos
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}