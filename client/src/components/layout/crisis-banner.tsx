import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertTriangle, X } from "lucide-react";

export default function CrisisBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 border-l-4 border-red-400 p-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <AlertTriangle className="text-red-500 flex-shrink-0" size={20} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-red-800 dark:text-red-200">
                ¿Necesitas ayuda inmediata?
              </p>
              <p className="text-xs text-red-600 dark:text-red-300">
                Si estás en crisis, contacta servicios de emergencia
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="sm" 
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Recursos de Crisis
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <AlertTriangle className="text-red-500" size={20} />
                    <span>Recursos de Crisis</span>
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">
                      🚨 EMERGENCIAS INMEDIATAS
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Línea Nacional de Prevención del Suicidio:</strong>
                        <br />
                        <a href="tel:988" className="text-primary hover:underline font-mono">
                          988
                        </a>
                      </div>
                      <div>
                        <strong>Emergencias generales:</strong>
                        <br />
                        <a href="tel:911" className="text-primary hover:underline font-mono">
                          911
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-blue-600 mb-2">
                      💬 LÍNEAS DE APOYO
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Crisis Text Line:</strong>
                        <br />
                        Envía "HELLO" al <span className="font-mono">741741</span>
                      </div>
                      <div>
                        <strong>SAMHSA National Helpline:</strong>
                        <br />
                        <span className="font-mono">1-800-662-4357</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-lg">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>Recuerda:</strong> No estás solo. Hay ayuda disponible. 
                      Si estás en peligro inmediato, llama al 911.
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="text-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-950"
            >
              <X size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
