import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Footer from "@/components/layout/footer";
import Sidebar from "@/components/layout/Sidebar";
import CrisisBanner from "@/components/layout/crisis-banner";
import ThreadList from "@/components/forum/thread-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Users, MessageSquare, Eye, Home } from "lucide-react";
import { Link } from "wouter";

export default function Subforum() {
  const { slug } = useParams();
  
  const { data: subforum, isLoading: subforumLoading } = useQuery({
    queryKey: [`/api/subforums/${slug}`],
  });

  const { data: threads, isLoading: threadsLoading } = useQuery({
    queryKey: [`/api/subforums/${subforum?.id}/threads`],
    enabled: !!subforum?.id,
  });

  if (subforumLoading) {
    return (
      <div className="min-h-screen bg-background">
               
        <div className="pt-32 sm:pt-36">
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <Sidebar />
              <div className="lg:col-span-3">
                <Skeleton className="h-6 w-full mb-4" />
                <Skeleton className="h-32 w-full mb-8" />
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full" />
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
        
        <Footer />
      </div>
    );
  }

  if (!subforum) {
    return (
      <div className="min-h-screen bg-background">
        <CrisisBanner />
        <Header />
        
        <div className="pt-32 sm:pt-36">
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <Sidebar />
              <div className="lg:col-span-3">
                <Card>
                  <CardContent className="p-8 text-center">
                    <h2 className="text-2xl font-bold mb-2">Subforo no encontrado</h2>
                    <p className="text-muted-foreground mb-4">
                      El subforo que buscas no existe o ha sido removido.
                    </p>
                    <Button asChild>
                      <Link href="/">Volver al inicio</Link>
                    </Button>
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

  return (
    <div className="min-h-screen bg-background">
      <CrisisBanner />
      <Header />
      
      <div className="pt-32 sm:pt-36">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <Sidebar />
            
            <div className="lg:col-span-3">
              {/* Breadcrumb */}
              <Breadcrumb className="mb-6">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/">
                        <Home size={16} />
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href={`/category/${subforum.category?.slug}`}>
                        {subforum.category?.name}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <span className="font-medium">{subforum.name}</span>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              {/* Subforum Header */}
              <Card className="mb-8">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{subforum.name}</CardTitle>
                      <p className="text-muted-foreground mb-4">{subforum.description}</p>
                      
                      {/* Stats */}
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <MessageSquare size={16} />
                          <span>{subforum.threadCount || 0} temas</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye size={16} />
                          <span>{subforum.postCount || 0} respuestas</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users size={16} />
                          <span>{subforum.memberCount || 0} miembros</span>
                        </div>
                      </div>
                    </div>
                    <Button>
                      <Plus size={16} className="mr-2" />
                      Nuevo Tema
                    </Button>
                  </div>
                </CardHeader>
              </Card>

              {/* Threads */}
              <ThreadList 
                threads={threads} 
                isLoading={threadsLoading}
                showCategory={false}
              />
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}