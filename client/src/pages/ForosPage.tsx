// src/pages/forum/guest.tsx

import { useQuery } from "@tanstack/react-query";
import Footer from "@/components/layout/footer";
import CrisisBanner from "@/components/layout/crisis-banner";
import CategoryCard from "@/components/forum/category-card";
import RecentActivity from "@/components/forum/recent-activity";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Heart, Eye, Users, MessageCircle, Info, UserPlus } from "lucide-react";
import { Link } from "wouter";
import { mockCategories } from "@/data/mock-forum";
import { motion } from "framer-motion";

export default function Guest() {
  const { data: categories = mockCategories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["/api/categories"],
    queryFn: async () => mockCategories,
    initialData: mockCategories,
    retry: false,
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CrisisBanner />
      <header className="fixed top-0 inset-x-0 z-40 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">SafeSpace - Foros</h1>
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              Inicio
            </Button>
          </Link>
        </div>
      </header>

      <div className="pt-32 sm:pt-36">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="space-y-6 sticky top-24">
                <Card className="transition hover:shadow-lg border-none bg-gradient-to-br from-primary/10 to-primary/5">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center text-primary">
                      <Eye size={20} className="mr-2" />
                      Modo Visitante
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <p>
                      Estás explorando SafeSpace como visitante. Puedes leer todos los temas y obtener una vista completa de nuestra comunidad.
                    </p>
                    <ul className="space-y-2 text-xs text-muted-foreground">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                        Leer todos los temas
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                        Ver respuestas y comentarios
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                        Crear temas o responder
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                        Guardar o suscribirse
                      </li>
                    </ul>
                    <a href="/api/login">
                      <Button size="sm" className="w-full mt-4 transition hover:brightness-110">
                        Unirse para Participar
                      </Button>
                    </a>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Estadísticas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-muted-foreground">
                        <Users size={14} className="mr-2" />
                        Miembros activos
                      </span>
                      <Badge variant="secondary">2,847</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-muted-foreground">
                        <MessageCircle size={14} className="mr-2" />
                        Temas de apoyo
                      </span>
                      <Badge variant="secondary">1,234</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-muted-foreground">
                        <Heart size={14} className="mr-2" />
                        Mensajes
                      </span>
                      <Badge variant="secondary">8,956</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                  <CardContent className="p-4">
                    <Link href="/">
                      <Button variant="outline" className="w-full">
                        Volver al Inicio
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </aside>

            {/* Main content */}
            <div className="lg:col-span-3">
              <Alert className="mb-8">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Bienvenido a SafeSpace.</strong> Estás explorando como visitante. Puedes leer todos los temas y ver cómo nuestra comunidad se apoya mutuamente.
                </AlertDescription>
              </Alert>

              {/* Categorías */}
              <section className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold tracking-tight">Categorías de Apoyo</h2>
                  <Badge variant="outline">Solo lectura</Badge>
                </div>

                {categoriesLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Card key={i} className="animate-pulse">
                        <CardContent className="p-6 space-y-3">
                          <div className="h-6 bg-muted rounded w-2/3" />
                          <div className="h-4 bg-muted rounded w-full" />
                          <div className="h-4 bg-muted rounded w-1/2" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : categories && categories.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {categories.map((category: any) => (
                      <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CategoryCard
                          category={{
                            ...category,
                            stats: {
                              threadCount: Math.floor(Math.random() * 200) + 50,
                              postCount: Math.floor(Math.random() * 1000) + 200,
                              memberCount: Math.floor(Math.random() * 500) + 100,
                            },
                            subforums: category.subforums || []
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <MessageCircle className="mx-auto mb-4 text-muted-foreground" size={48} />
                      <h3 className="text-xl font-semibold mb-2">Aún no hay categorías</h3>
                      <p className="text-muted-foreground">
                        La comunidad está en proceso de configuración. Pronto habrá espacios de apoyo disponibles.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </section>

              {/* Actividad reciente */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold tracking-tight">Actividad Reciente</h2>
                  <Badge variant="outline">Últimas 24 horas</Badge>
                </div>
                <RecentActivity />
              </section>

              {/* CTA para unirse */}
              <Card className="mt-12 bg-gradient-to-r from-purple-600/10 to-pink-400/10 border-primary/10">
                <CardContent className="p-8 text-center">
                  <Heart className="mx-auto mb-4 text-primary" size={48} />
                  <h3 className="text-2xl font-bold mb-4">¿Listo para Unirte a la Comunidad?</h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Has visto cómo nuestra comunidad se apoya mutuamente. Únete de forma anónima
                    para participar en conversaciones, crear temas y recibir apoyo personalizado.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/api/login">
                      <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:brightness-110">
                        <UserPlus className="mr-2" size={20} />
                        Unirse de Forma Anónima
                      </Button>
                    </a>
                    <Link href="/">
                      <Button variant="outline" size="lg">
                        Volver al Inicio
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
