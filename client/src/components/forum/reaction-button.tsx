import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { Heart, ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReactionButtonProps {
  threadId?: number;
  postId?: number;
  className?: string;
}

export default function ReactionButton({ threadId, postId, className }: ReactionButtonProps) {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);

  // Get current user's reaction
  const { data: userReaction } = useQuery({
    queryKey: [`/api/reactions/user`, { threadId, postId }],
    enabled: isAuthenticated && (!!threadId || !!postId),
  });

  // Get reaction counts
  const { data: reactions = [] } = useQuery({
    queryKey: [`/api/reactions`, { threadId, postId }],
    enabled: !!threadId || !!postId,
  });

  // Create or update reaction
  const reactionMutation = useMutation({
    mutationFn: async (type: string) => {
      const data = { 
        type, 
        ...(threadId && { threadId }), 
        ...(postId && { postId }) 
      };
      const response = await apiRequest("POST", "/api/reactions", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/reactions`, { threadId, postId }] });
      queryClient.invalidateQueries({ queryKey: [`/api/reactions/user`, { threadId, postId }] });
      if (threadId) {
        queryClient.invalidateQueries({ queryKey: [`/api/threads/${threadId}`] });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "No se pudo agregar la reacción.",
        variant: "destructive",
      });
    },
  });

  // Remove reaction
  const removeReactionMutation = useMutation({
    mutationFn: async () => {
      const params = new URLSearchParams();
      if (threadId) params.append('threadId', threadId.toString());
      if (postId) params.append('postId', postId.toString());
      
      const response = await apiRequest("DELETE", `/api/reactions?${params}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/reactions`, { threadId, postId }] });
      queryClient.invalidateQueries({ queryKey: [`/api/reactions/user`, { threadId, postId }] });
      if (threadId) {
        queryClient.invalidateQueries({ queryKey: [`/api/threads/${threadId}`] });
      }
    },
  });

  const handleReaction = (type: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Inicia sesión",
        description: "Debes iniciar sesión para reaccionar a las publicaciones.",
        variant: "destructive",
      });
      return;
    }

    if (userReaction?.type === type) {
      // Remove reaction if it's the same type
      removeReactionMutation.mutate();
    } else {
      // Add or change reaction
      reactionMutation.mutate(type);
    }
  };

  const getReactionCount = (type: string) => {
    return reactions.find((r: any) => r.type === type)?.count || 0;
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <ThumbsUp className="h-4 w-4" />;
      case 'heart':
        return <Heart className="h-4 w-4" />;
      case 'dislike':
        return <ThumbsDown className="h-4 w-4" />;
      default:
        return <ThumbsUp className="h-4 w-4" />;
    }
  };

  const reactionTypes = [
    { type: 'like', label: 'Me gusta' },
    { type: 'heart', label: 'Me encanta' },
  ];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {reactionTypes.map(({ type, label }) => {
        const count = getReactionCount(type);
        const isActive = userReaction?.type === type;
        
        return (
          <Button
            key={type}
            variant={isActive ? "default" : "outline"}
            size="sm"
            onClick={() => handleReaction(type)}
            disabled={reactionMutation.isPending || removeReactionMutation.isPending}
            className={cn(
              "flex items-center gap-1 h-8",
              isActive && type === 'like' && "bg-blue-500 hover:bg-blue-600",
              isActive && type === 'heart' && "bg-red-500 hover:bg-red-600"
            )}
          >
            {getIcon(type)}
            {count > 0 && <span className="text-xs">{count}</span>}
          </Button>
        );
      })}
    </div>
  );
}