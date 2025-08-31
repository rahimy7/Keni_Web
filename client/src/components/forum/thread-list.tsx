import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare, Eye, Pin, Lock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { Link } from "wouter";

interface ThreadListProps {
  threads?: any[];
  isLoading: boolean;
  categoryId?: number;
}

export default function ThreadList({ threads, isLoading, categoryId }: ThreadListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <div className="flex space-x-4">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <div className="text-right">
                  <Skeleton className="h-4 w-16 mb-1" />
                  <Skeleton className="h-3 w-12" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!threads || threads.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">No hay temas aún</h3>
          <p className="text-muted-foreground mb-4">
            Sé el primero en crear un tema en esta categoría.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-foreground">
        Temas Recientes ({threads.length})
      </h3>
      
      {threads.map((thread) => (
        <Card key={thread.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarFallback>UA</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  {thread.isSticky && (
                    <Badge variant="secondary">
                      <Pin size={10} className="mr-1" />
                      Fijado
                    </Badge>
                  )}
                  {thread.isLocked && (
                    <Badge variant="outline">
                      <Lock size={10} className="mr-1" />
                      Cerrado
                    </Badge>
                  )}
                </div>
                
                <h4 className="text-lg font-semibold mb-2">
                  <Link href={`/thread/${thread.id}`}>
                    <span className="hover:text-primary transition-colors cursor-pointer line-clamp-2">
                      {thread.title}
                    </span>
                  </Link>
                </h4>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                  <span>por {thread.author?.displayName || "Usuario Anónimo"}</span>
                  <span>•</span>
                  <span>
                    {formatDistanceToNow(new Date(thread.createdAt), { 
                      addSuffix: true, 
                      locale: es 
                    })}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <MessageSquare size={12} />
                    <span>{thread.replyCount || 0} respuestas</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye size={12} />
                    <span>{thread.viewCount || 0} visualizaciones</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right flex-shrink-0">
                <div className="text-xs text-muted-foreground mb-1">Última actividad</div>
                {thread.lastReplyAt ? (
                  <>
                    <div className="text-sm text-foreground">
                      {formatDistanceToNow(new Date(thread.lastReplyAt), { 
                        addSuffix: true, 
                        locale: es 
                      })}
                    </div>
                    <div className="text-xs text-muted-foreground">por Usuario Anónimo</div>
                  </>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(thread.createdAt), { 
                      addSuffix: true, 
                      locale: es 
                    })}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
