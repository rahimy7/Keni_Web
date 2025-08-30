import { useLocation } from "wouter";
import { XIcon } from "@/lib/icons";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [location, setLocation] = useLocation();

  const handleNavigation = (path: string) => {
    setLocation(path);
    onClose();
  };

  const adminUser = {
    name: "Juan Pérez",
    role: "Administrador",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
  };

  // Determines if a nav item is active
  const isActive = (path: string) => {
    if (path === "/dashboard" && location === "/") return true;
    return location === path;
  };

  return (
    <nav className={`mobile-nav fixed top-0 left-0 bottom-0 w-64 bg-white z-30 shadow-lg p-4 lg:hidden flex flex-col ${isOpen ? 'active' : ''}`}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <h1 className="text-lg font-semibold text-primary">MiApp Admin</h1>
        </div>
        <button onClick={onClose} className="text-neutral-700 focus:outline-none">
          <XIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="flex items-center space-x-3 mb-8 p-3 bg-neutral-100 rounded-lg">
        <img 
          src={adminUser.avatar} 
          alt="Admin User" 
          className="w-10 h-10 rounded-full object-cover" 
        />
        <div>
          <h2 className="font-medium text-neutral-800">{adminUser.name}</h2>
          <p className="text-sm text-neutral-500">{adminUser.role}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-1">
          <li>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); handleNavigation("/dashboard"); }}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${isActive("/dashboard") ? 'bg-primary bg-opacity-10 text-primary font-medium' : 'hover:bg-neutral-100 text-neutral-600'}`}
            >
              <i className="ri-dashboard-line text-xl"></i>
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); handleNavigation("/usuarios"); }}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${isActive("/usuarios") ? 'bg-primary bg-opacity-10 text-primary font-medium' : 'hover:bg-neutral-100 text-neutral-600'}`}
            >
              <i className="ri-user-line text-xl"></i>
              <span>Usuarios</span>
            </a>
          </li>
          <li>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); handleNavigation("/pedidos"); }}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${isActive("/pedidos") ? 'bg-primary bg-opacity-10 text-primary font-medium' : 'hover:bg-neutral-100 text-neutral-600'}`}
            >
              <i className="ri-shopping-bag-line text-xl"></i>
              <span>Pedidos</span>
            </a>
          </li>
          <li>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); handleNavigation("/productos"); }}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${isActive("/productos") ? 'bg-primary bg-opacity-10 text-primary font-medium' : 'hover:bg-neutral-100 text-neutral-600'}`}
            >
              <i className="ri-store-2-line text-xl"></i>
              <span>Productos</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); handleNavigation("/foros"); }}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${isActive("/foros") ? 'bg-primary bg-opacity-10 text-primary font-medium' : 'hover:bg-neutral-100 text-neutral-600'}`}
            >
              <i className="ri-discuss-line text-xl"></i>
              <span>Foros</span>
            </a>
          </li>
          <li>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); handleNavigation("/configuracion"); }}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${isActive("/configuracion") ? 'bg-primary bg-opacity-10 text-primary font-medium' : 'hover:bg-neutral-100 text-neutral-600'}`}
            >
              <i className="ri-settings-3-line text-xl"></i>
              <span>Configuración</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="mt-4 pt-4 border-t border-neutral-200">
        <a 
          href="#" 
          onClick={(e) => e.preventDefault()}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-neutral-100 text-neutral-600"
        >
          <i className="ri-logout-box-line text-xl"></i>
          <span>Cerrar sesión</span>
        </a>
      </div>
    </nav>
  );
}
