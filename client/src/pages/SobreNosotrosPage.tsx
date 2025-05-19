import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { SearchIcon, FilterIcon, PlusIcon } from "@/lib/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { Helmet } from "react-helmet";

// Tipo para información sobre la iglesia
interface InformacionIglesia {
  mision: string;
  vision: string;
  historia: string;
  valores: { titulo: string; descripcion: string }[];
  horariosCultos: { dia: string; hora: string; tipo: string }[];
  contacto: {
    direccion: string;
    telefono: string;
    email: string;
    redesSociales: { nombre: string; url: string; icono: string }[];
  };
}

// Tipo para personal/liderazgo de la iglesia
interface LiderIglesia {
  id: number;
  nombre: string;
  cargo: string;
  descripcion: string;
  imageUrl: string;
  email: string;
  telefono: string;
}

export default function SobreNosotrosPage() {
  const [activeTab, setActiveTab] = useState("informacion");
  const [editMode, setEditMode] = useState(false);
  
  // Simulamos datos de la iglesia
  const informacionSimulada: InformacionIglesia = {
    mision: "Nuestra misión es glorificar a Dios a través de la adoración, el servicio y el evangelismo, ayudando a las personas a conocer a Jesucristo y crecer en su fe.",
    vision: "Ser una comunidad de fe vibrante que impacte positivamente a nuestra ciudad y al mundo, siendo luz y sal de la tierra como nos enseñó Jesús.",
    historia: "Nuestra iglesia fue fundada en 1985 por un pequeño grupo de creyentes comprometidos con llevar el evangelio a nuestra comunidad. A lo largo de los años, hemos crecido hasta convertirnos en un centro espiritual que sirve a cientos de familias en nuestra ciudad y más allá.\n\nEn 1995, construimos nuestro primer templo, y en 2010 nos expandimos a nuestras instalaciones actuales para atender mejor a nuestra creciente congregación. Durante estos años, hemos establecido múltiples ministerios que atienden a diversas necesidades de nuestra comunidad.",
    valores: [
      {
        titulo: "Fe Bíblica",
        descripcion: "Creemos en la Biblia como la palabra inspirada de Dios y nuestra guía suprema para la fe y la práctica."
      },
      {
        titulo: "Adoración Auténtica",
        descripcion: "Buscamos adorar a Dios en espíritu y en verdad, con todo nuestro corazón, alma, mente y fuerzas."
      },
      {
        titulo: "Comunidad Amorosa",
        descripcion: "Nos comprometemos a crear un ambiente de amor, aceptación y apoyo donde todos puedan crecer espiritualmente."
      },
      {
        titulo: "Servicio Desinteresado",
        descripcion: "Seguimos el ejemplo de Jesús al servir a otros con humildad y generosidad."
      },
      {
        titulo: "Evangelismo Compasivo",
        descripcion: "Compartimos las buenas nuevas de Jesucristo con amor y respeto, mostrando Su compasión por todos."
      }
    ],
    horariosCultos: [
      { dia: "Domingo", hora: "10:00 AM", tipo: "Culto Principal" },
      { dia: "Domingo", hora: "6:00 PM", tipo: "Servicio Vespertino" },
      { dia: "Miércoles", hora: "7:00 PM", tipo: "Estudio Bíblico" },
      { dia: "Viernes", hora: "7:30 PM", tipo: "Reunión de Jóvenes" },
      { dia: "Sábado", hora: "9:00 AM", tipo: "Oración Matutina" }
    ],
    contacto: {
      direccion: "Av. Principal 123, Ciudad Ejemplo",
      telefono: "(123) 456-7890",
      email: "contacto@iglesiaejemplo.org",
      redesSociales: [
        { nombre: "Facebook", url: "https://facebook.com/iglesiaejemplo", icono: "ri-facebook-fill" },
        { nombre: "Instagram", url: "https://instagram.com/iglesiaejemplo", icono: "ri-instagram-line" },
        { nombre: "YouTube", url: "https://youtube.com/iglesiaejemplo", icono: "ri-youtube-fill" },
        { nombre: "Twitter", url: "https://twitter.com/iglesiaejemplo", icono: "ri-twitter-fill" }
      ]
    }
  };

  // Simulamos datos del liderazgo
  const liderazgoSimulado: LiderIglesia[] = [
    {
      id: 1,
      nombre: "Pastor David López",
      cargo: "Pastor Principal",
      descripcion: "El Pastor David ha servido en nuestra iglesia por más de 15 años. Tiene una maestría en Teología y está casado con María, con quien tiene tres hijos.",
      imageUrl: "https://images.unsplash.com/photo-1537511446984-935f663eb1f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
      email: "pastor.david@iglesiaejemplo.org",
      telefono: "(123) 456-7891"
    },
    {
      id: 2,
      nombre: "Ana Rodríguez",
      cargo: "Pastora de Adoración",
      descripcion: "Ana lidera nuestro ministerio de adoración con pasión y excelencia. Tiene formación musical y ha servido en la iglesia durante 10 años.",
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
      email: "ana.rodriguez@iglesiaejemplo.org",
      telefono: "(123) 456-7892"
    },
    {
      id: 3,
      nombre: "Roberto Sánchez",
      cargo: "Pastor de Jóvenes",
      descripcion: "Roberto tiene un corazón para guiar a los jóvenes hacia Cristo. Ha estado sirviendo en el ministerio juvenil por 8 años.",
      imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
      email: "roberto.sanchez@iglesiaejemplo.org",
      telefono: "(123) 456-7893"
    },
    {
      id: 4,
      nombre: "Elena Martínez",
      cargo: "Directora de Educación Cristiana",
      descripcion: "Elena coordina todos nuestros programas educativos, desde niños hasta adultos. Tiene una licenciatura en Educación Cristiana.",
      imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
      email: "elena.martinez@iglesiaejemplo.org",
      telefono: "(123) 456-7894"
    },
    {
      id: 5,
      nombre: "Carlos Gómez",
      cargo: "Coordinador de Misiones",
      descripcion: "Carlos supervisa nuestros proyectos misioneros locales e internacionales. Ha participado en misiones en más de 10 países.",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
      email: "carlos.gomez@iglesiaejemplo.org",
      telefono: "(123) 456-7895"
    },
    {
      id: 6,
      nombre: "María Pérez",
      cargo: "Pastora de Mujeres",
      descripcion: "María lidera nuestro ministerio de mujeres con compasión y sabiduría. Está casada con el Pastor David y tiene una pasión por el discipulado.",
      imageUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
      email: "maria.perez@iglesiaejemplo.org",
      telefono: "(123) 456-7896"
    }
  ];

  // Simulamos cargas de datos
  const { data: informacion, isLoading: isLoadingInfo } = useQuery<InformacionIglesia>({
    queryKey: ['/api/informacion-iglesia'],
    queryFn: () => new Promise(resolve => {
      setTimeout(() => resolve(informacionSimulada), 1000);
    }),
    enabled: activeTab === "informacion"
  });

  const { data: liderazgo, isLoading: isLoadingLiderazgo } = useQuery<LiderIglesia[]>({
    queryKey: ['/api/liderazgo-iglesia'],
    queryFn: () => new Promise(resolve => {
      setTimeout(() => resolve(liderazgoSimulado), 1000);
    }),
    enabled: activeTab === "liderazgo"
  });

  // Estado local para el formulario de edición
  const [formData, setFormData] = useState<InformacionIglesia | null>(null);

  // Función para iniciar la edición
  const handleStartEdit = () => {
    setFormData(informacion || null);
    setEditMode(true);
  };

  // Función para guardar cambios
  const handleSaveChanges = () => {
    // Aquí iría la lógica para guardar los cambios en el backend
    setEditMode(false);
  };

  // Función para cancelar la edición
  const handleCancelEdit = () => {
    setFormData(null);
    setEditMode(false);
  };

  return (
    <>
      <Helmet>
        <title>Sobre Nosotros - Iglesia Admin</title>
        <meta name="description" content="Información sobre nuestra iglesia - Misión, visión, valores, historia, liderazgo y servicios" />
      </Helmet>
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-neutral-800">Sobre Nosotros</h1>
            <p className="text-neutral-500">Gestión de la información de nuestra iglesia</p>
          </div>
          <div className="mt-4 md:mt-0">
            {activeTab === "liderazgo" && (
              <Button className="bg-primary text-white">
                <PlusIcon className="h-4 w-4 mr-2" />
                Añadir Líder
              </Button>
            )}
            {activeTab === "informacion" && !editMode && (
              <Button 
                className="bg-primary text-white"
                onClick={handleStartEdit}
              >
                <i className="ri-edit-line mr-2"></i>
                Editar Información
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="informacion" className="mb-6" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="informacion">Información General</TabsTrigger>
            <TabsTrigger value="liderazgo">Liderazgo</TabsTrigger>
          </TabsList>

          <TabsContent value="informacion">
            {isLoadingInfo ? (
              // Skeleton loaders para información
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <Skeleton className="h-6 w-32" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Skeleton className="h-6 w-32" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              editMode && formData ? (
                // Modo de edición
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Misión y Visión</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1">Misión</label>
                          <Textarea 
                            value={formData.mision}
                            onChange={(e) => setFormData({...formData, mision: e.target.value})}
                            className="min-h-[100px]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1">Visión</label>
                          <Textarea 
                            value={formData.vision}
                            onChange={(e) => setFormData({...formData, vision: e.target.value})}
                            className="min-h-[100px]"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Nuestra Historia</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea 
                        value={formData.historia}
                        onChange={(e) => setFormData({...formData, historia: e.target.value})}
                        className="min-h-[200px]"
                      />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Valores</CardTitle>
                      <Button variant="outline" size="sm">
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Añadir Valor
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {formData.valores.map((valor, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                              <Input 
                                value={valor.titulo}
                                onChange={(e) => {
                                  const newValores = [...formData.valores];
                                  newValores[index].titulo = e.target.value;
                                  setFormData({...formData, valores: newValores});
                                }}
                                className="font-medium"
                              />
                              <Button variant="ghost" size="sm" className="text-neutral-500 hover:text-destructive">
                                <i className="ri-delete-bin-line"></i>
                              </Button>
                            </div>
                            <Textarea 
                              value={valor.descripcion}
                              onChange={(e) => {
                                const newValores = [...formData.valores];
                                newValores[index].descripcion = e.target.value;
                                setFormData({...formData, valores: newValores});
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Horarios de Cultos</CardTitle>
                      <Button variant="outline" size="sm">
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Añadir Horario
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {formData.horariosCultos.map((horario, index) => (
                          <div key={index} className="flex gap-4 items-center">
                            <Input 
                              value={horario.dia}
                              onChange={(e) => {
                                const newHorarios = [...formData.horariosCultos];
                                newHorarios[index].dia = e.target.value;
                                setFormData({...formData, horariosCultos: newHorarios});
                              }}
                              className="w-1/4"
                            />
                            <Input 
                              value={horario.hora}
                              onChange={(e) => {
                                const newHorarios = [...formData.horariosCultos];
                                newHorarios[index].hora = e.target.value;
                                setFormData({...formData, horariosCultos: newHorarios});
                              }}
                              className="w-1/4"
                            />
                            <Input 
                              value={horario.tipo}
                              onChange={(e) => {
                                const newHorarios = [...formData.horariosCultos];
                                newHorarios[index].tipo = e.target.value;
                                setFormData({...formData, horariosCultos: newHorarios});
                              }}
                              className="flex-1"
                            />
                            <Button variant="ghost" size="sm" className="text-neutral-500 hover:text-destructive">
                              <i className="ri-delete-bin-line"></i>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Información de Contacto</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1">Dirección</label>
                          <Input 
                            value={formData.contacto.direccion}
                            onChange={(e) => setFormData({
                              ...formData, 
                              contacto: {...formData.contacto, direccion: e.target.value}
                            })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1">Teléfono</label>
                          <Input 
                            value={formData.contacto.telefono}
                            onChange={(e) => setFormData({
                              ...formData, 
                              contacto: {...formData.contacto, telefono: e.target.value}
                            })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
                          <Input 
                            value={formData.contacto.email}
                            onChange={(e) => setFormData({
                              ...formData, 
                              contacto: {...formData.contacto, email: e.target.value}
                            })}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={handleCancelEdit}>Cancelar</Button>
                    <Button className="bg-primary text-white" onClick={handleSaveChanges}>Guardar Cambios</Button>
                  </div>
                </div>
              ) : (
                // Modo de visualización
                informacion && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Misión y Visión</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-semibold text-neutral-800">Nuestra Misión</h3>
                            <p className="text-neutral-600">{informacion.mision}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold text-neutral-800">Nuestra Visión</h3>
                            <p className="text-neutral-600">{informacion.vision}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Nuestra Historia</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-neutral-600 whitespace-pre-line">
                          {informacion.historia}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Nuestros Valores</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {informacion.valores.map((valor, index) => (
                            <div key={index} className="border rounded-lg p-4">
                              <h3 className="font-semibold text-neutral-800 mb-2">{valor.titulo}</h3>
                              <p className="text-neutral-600">{valor.descripcion}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Horarios de Cultos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-neutral-50 border-b border-neutral-200">
                              <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500">Día</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500">Hora</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500">Servicio</th>
                              </tr>
                            </thead>
                            <tbody>
                              {informacion.horariosCultos.map((horario, index) => (
                                <tr key={index} className="border-b border-neutral-200">
                                  <td className="px-4 py-3 text-sm text-neutral-800">{horario.dia}</td>
                                  <td className="px-4 py-3 text-sm text-neutral-800">{horario.hora}</td>
                                  <td className="px-4 py-3 text-sm text-neutral-800">{horario.tipo}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Información de Contacto</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <i className="ri-map-pin-line text-xl text-primary mt-1"></i>
                            <div>
                              <h3 className="font-semibold text-neutral-800">Dirección</h3>
                              <p className="text-neutral-600">{informacion.contacto.direccion}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <i className="ri-phone-line text-xl text-primary mt-1"></i>
                            <div>
                              <h3 className="font-semibold text-neutral-800">Teléfono</h3>
                              <p className="text-neutral-600">{informacion.contacto.telefono}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <i className="ri-mail-line text-xl text-primary mt-1"></i>
                            <div>
                              <h3 className="font-semibold text-neutral-800">Email</h3>
                              <p className="text-neutral-600">{informacion.contacto.email}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <i className="ri-global-line text-xl text-primary mt-1"></i>
                            <div>
                              <h3 className="font-semibold text-neutral-800">Redes Sociales</h3>
                              <div className="flex gap-2 mt-2">
                                {informacion.contacto.redesSociales.map((red, index) => (
                                  <a 
                                    key={index}
                                    href={red.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center text-primary hover:bg-opacity-20 transition-colors"
                                  >
                                    <i className={red.icono}></i>
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
              )
            )}
          </TabsContent>

          <TabsContent value="liderazgo">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {isLoadingLiderazgo ? (
                // Skeleton loaders para liderazgo
                [...Array(6)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center text-center space-y-3">
                        <Skeleton className="h-32 w-32 rounded-full" />
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                liderazgo && liderazgo.map((lider) => (
                  <Card key={lider.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                          <img 
                            src={lider.imageUrl}
                            alt={lider.nombre}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="font-semibold text-lg text-neutral-800">{lider.nombre}</h3>
                        <p className="text-primary font-medium text-sm mb-3">{lider.cargo}</p>
                        <p className="text-neutral-600 text-sm mb-4">{lider.descripcion}</p>
                        
                        <div className="w-full flex flex-col gap-2 text-sm">
                          <a href={`mailto:${lider.email}`} className="flex items-center justify-center gap-2 text-neutral-600 hover:text-primary">
                            <i className="ri-mail-line"></i>
                            <span>{lider.email}</span>
                          </a>
                          <a href={`tel:${lider.telefono}`} className="flex items-center justify-center gap-2 text-neutral-600 hover:text-primary">
                            <i className="ri-phone-line"></i>
                            <span>{lider.telefono}</span>
                          </a>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-center border-t pt-4">
                      <Button variant="outline" size="sm">Editar</Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}