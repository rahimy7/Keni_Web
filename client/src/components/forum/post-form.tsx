import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PostFormProps {
  onSubmit: (content: string) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  placeholder?: string;
  title?: string;
}

export default function PostForm({ 
  onSubmit, 
  onCancel, 
  isSubmitting = false, 
  placeholder = "Escribe tu mensaje aquí...",
  title = "Escribir respuesta"
}: PostFormProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content.trim());
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        className="min-h-32 resize-y"
        disabled={isSubmitting}
        required
      />
      
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Recuerda ser respetuoso y empático con otros miembros.
        </div>
        
        <div className="flex space-x-2">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
          )}
          <Button
            type="submit"
            disabled={!content.trim() || isSubmitting}
          >
            {isSubmitting ? "Publicando..." : "Publicar"}
          </Button>
        </div>
      </div>
    </form>
  );
}
