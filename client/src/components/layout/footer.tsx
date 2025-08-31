import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="text-white" size={16} />
              </div>
              <span className="font-semibold text-foreground">SafeSpace</span>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Una comunidad segura y anónima donde puedes encontrar apoyo, compartir experiencias y crecer junto a otros en un ambiente de comprensión y respeto mutuo.
            </p>
            <p className="text-xs text-muted-foreground">
              Recuerda: Este foro no sustituye la ayuda profesional. Si estás en crisis, busca ayuda inmediata.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="tel:988" className="hover:text-primary transition-colors">
                  Línea Nacional: 988
                </a>
              </li>
              <li>
                <a href="tel:911" className="hover:text-primary transition-colors">
                  Emergencias: 911
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Recursos de Autoayuda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Guías de Bienestar
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Comunidad</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Normas de la Comunidad
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Reportar Contenido
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contacto Moderadores
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center text-xs text-muted-foreground">
          <p>&copy; 2024 SafeSpace. Todos los derechos reservados. | Diseñado con ♥ para el bienestar mental</p>
        </div>
      </div>
    </footer>
  );
}
