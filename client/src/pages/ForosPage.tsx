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

export default function Guest() {
  const { data: categories = mockCategories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["/api/categories"],
    queryFn: async () => mockCategories,
    initialData: mockCategories,
    retry: false,
  });

  return (
    <div className="min-h-screen bg-background">
      <CrisisBanner />
      <header className="fixed top-0 inset-x-0 z-40 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold">Foros</h1>
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/20">
              Inicio
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content with padding for fixed header */}
      <div className="pt-32 sm:pt-36">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Guest Sidebar */}
            <aside className="lg:col-span-1">
              <div className="space-y-6 sticky top-24">
                {/* Visitor Info */}
                <Card className="border-none shadow-sm bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center text-primary">
                      <Eye size={20} className="mr-2" />
                      Modo Visitante
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-foreground/80">
                      Estás explorando SafeSpace como visitante. Puedes leer todos los temas y obtener una vista completa de nuestra comunidad.
                    </p>
                    <div className="space-y-2 text-xs text-foreground/60">
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Leer todos los temas
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Ver respuestas y comentarios
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        Crear temas o responder
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        Guardar o suscribirse
                      </div>
                    </div>
                    <a href="/api/login">
                      <Button size="sm" className="w-full mt-4">
                        Unirse para Participar
                      </Button>
                    </a>
                  </CardContent>
                </Card>

                {/* Community Stats */}
                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Estadísticas de la Comunidad</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center text-muted-foreground">
                        <Users size={14} className="mr-2" />
                        Miembros activos
                      </span>
                      <Badge variant="secondary">2,847</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center text-muted-foreground">
                        <MessageCircle size={14} className="mr-2" />
                        Temas de apoyo
                      </span>
                      <Badge variant="secondary">1,234</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center text-muted-foreground">
                        <Heart size={14} className="mr-2" />
                        Mensajes de apoyo
                      </span>
                      <Badge variant="secondary">8,956</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Navigation back */}
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

            <div className="lg:col-span-3">
              {/* Welcome Message */}
              <Alert className="mb-8">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Bienvenido a SafeSpace.</strong> Estás explorando como visitante.
                  Puedes leer todos los temas y ver cómo nuestra comunidad se apoya mutuamente.
                  Si deseas participar activamente, puedes unirte de forma anónima en cualquier momento.
                </AlertDescription>
              </Alert>

              {/* Categories */}
              <section className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Categorías de Apoyo</h2>
                  <Badge variant="outline">Solo lectura</Badge>
                </div>

                {categoriesLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Card key={i} className="animate-pulse">
                        <CardContent className="p-6">
                          <div className="h-6 bg-muted rounded mb-4"></div>
                          <div className="h-4 bg-muted rounded mb-2"></div>
                          <div className="h-4 bg-muted rounded w-3/4"></div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : categories && categories.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {categories.map((category: any) => (
                      <CategoryCard
                        key={category.id}
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

              {/* Recent Activity */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Actividad Reciente</h2>
                  <Badge variant="outline">Últimas 24 horas</Badge>
                </div>

                <RecentActivity />
              </section>

              {/* Join CTA */}
              <Card className="mt-12 bg-gradient-to-r from-primary/10 to-purple-600/10 border-primary/20">
                <CardContent className="p-8 text-center">
                  <Heart className="mx-auto mb-4 text-primary" size={48} />
                  <h3 className="text-2xl font-bold mb-4">¿Listo para Unirte a la Comunidad?</h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Has visto cómo nuestra comunidad se apoya mutuamente. Únete de forma anónima
                    para participar en conversaciones, crear temas y recibir apoyo personalizado.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/api/login">
                      <Button size="lg" className="bg-primary hover:bg-primary/90">
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