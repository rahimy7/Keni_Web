import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Eye, Users, Calendar, UserCheck } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { Link } from "wouter";

interface CategoryCardProps {
  category: {
    id: number;
    name: string;
    description: string;
    icon: string;
    color: string;
    slug: string;
    schedule?: string;
    maxParticipants?: number;
    stats: {
      threadCount: number;
      postCount: number;
      memberCount: number;
      lastActivity?: {
        threadId: number;
        userId: string;
        timestamp: Date;
      };
    };
    subforums: Array<{
      id: number;
      name: string;
    }>;
  };
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const iconMap: Record<string, React.ComponentType<any>> = {
    brain: () => <i className="fas fa-brain" />,
    sun: () => <i className="fas fa-sun" />,
    "hands-helping": () => <i className="fas fa-hands-helping" />,
    heart: () => <i className="fas fa-heart" />,
    "user-md": () => <i className="fas fa-user-md" />,
  };

  const IconComponent = iconMap[category.icon] || (() => <i className="fas fa-comments" />);

  return (
    <Card className="category-card">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <div className={`category-icon ${category.color}`}>
              <IconComponent />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-foreground mb-1">
                <Link href={`/category/${category.slug}`}>
                  <span className="hover:text-primary transition-colors cursor-pointer">
                    {category.name}
                  </span>
                </Link>
              </h3>
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                {category.description}
              </p>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-2">
                <div className="flex items-center space-x-1">
                  <MessageSquare size={12} />
                  <span>{category.stats.threadCount} temas</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye size={12} />
                  <span>{category.stats.postCount} respuestas</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users size={12} />
                  <span>{category.stats.memberCount} miembros</span>
                </div>
              </div>
              
              {/* Group Schedule and Participants Info */}
              {(category.schedule || category.maxParticipants) && (
                <div className="flex items-center space-x-4 text-xs text-blue-600">
                  {category.schedule && (
                    <div className="flex items-center space-x-1">
                      <Calendar size={12} />
                      <span>{category.schedule}</span>
                    </div>
                  )}
                  {category.maxParticipants && (
                    <div className="flex items-center space-x-1">
                      <UserCheck size={12} />
                      <span>{category.maxParticipants} participantes máx.</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="text-right flex-shrink-0 ml-4">
            <div className="text-xs text-muted-foreground mb-1">Último post</div>
            {category.stats.lastActivity ? (
              <>
                <div className="text-sm text-foreground">
                  {formatDistanceToNow(new Date(category.stats.lastActivity.timestamp), { 
                    addSuffix: true, 
                    locale: es 
                  })}
                </div>
                <div className="text-xs text-muted-foreground">por Usuario Anónimo</div>
              </>
            ) : (
              <div className="text-sm text-muted-foreground">Sin actividad</div>
            )}
          </div>
        </div>
        
        {/* Subforos */}
        {category.subforums.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {category.subforums.slice(0, 3).map((subforum) => (
                <Badge key={subforum.id} variant="secondary" className="subforum-tag">
                  <MessageSquare size={10} className="mr-1" />
                  {subforum.name}
                </Badge>
              ))}
              {category.subforums.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{category.subforums.length - 3} más
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
