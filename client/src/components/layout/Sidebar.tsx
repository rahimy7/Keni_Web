import { useLocation } from "wouter";

export default function Sidebar() {
  const [location, setLocation] = useLocation();

  const adminUser = {
    name: "Pastor David",
    role: "Administrador",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
  };

  // Determines if a nav item is active
  const isActive = (path: string) => {
    if (path === "/dashboard" && location === "/") return true;
    return location === path;
  };

  return (
    <aside className="hidden lg:flex flex-col fixed top-0 left-0 bottom-0 w-64 bg-white shadow-md z-10">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg">I</span>
          </div>
          <h1 className="text-lg font-semibold text-primary">Iglesia Admin</h1>
        </div>
      </div>

      <div className="flex items-center space-x-3 mx-4 p-3 bg-neutral-100 rounded-lg">
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

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <ul className="space-y-1">
          <li>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setLocation("/dashboard"); }}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${isActive("/dashboard") ? 'bg-primary bg-opacity-10 text-primary font-medium' : 'hover:bg-neutral-100 text-neutral-600'}`}
            >
              <i className="ri-dashboard-line text-xl"></i>
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setLocation("/miembros"); }}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${isActive("/miembros") ? 'bg-primary bg-opacity-10 text-primary font-medium' : 'hover:bg-neutral-100 text-neutral-600'}`}
            >
              <i className="ri-user-line text-xl"></i>
              <span>Miembros</span>
            </a>
          </li>
          <li>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setLocation("/eventos"); }}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${isActive("/eventos") ? 'bg-primary bg-opacity-10 text-primary font-medium' : 'hover:bg-neutral-100 text-neutral-600'}`}
            >
              <i className="ri-calendar-event-line text-xl"></i>
              <span>Eventos</span>
            </a>
          </li>
          <li>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setLocation("/oraciones"); }}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${isActive("/oraciones") ? 'bg-primary bg-opacity-10 text-primary font-medium' : 'hover:bg-neutral-100 text-neutral-600'}`}
            >
              <i className="ri-prayer-fill text-xl"></i>
              <span>Oraciones</span>
            </a>
          </li>
          <li>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setLocation("/cursos"); }}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${isActive("/cursos") ? 'bg-primary bg-opacity-10 text-primary font-medium' : 'hover:bg-neutral-100 text-neutral-600'}`}
            >
              <i className="ri-book-open-line text-xl"></i>
              <span>Cursos</span>
            </a>
          </li>
          <li>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setLocation("/donaciones"); }}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${isActive("/donaciones") ? 'bg-primary bg-opacity-10 text-primary font-medium' : 'hover:bg-neutral-100 text-neutral-600'}`}
            >
              <i className="ri-hand-heart-line text-xl"></i>
              <span>Donaciones</span>
            </a>
          </li>
          <li>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setLocation("/meditaciones"); }}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${isActive("/meditaciones") ? 'bg-primary bg-opacity-10 text-primary font-medium' : 'hover:bg-neutral-100 text-neutral-600'}`}
            >
              <i className="ri-mental-health-line text-xl"></i>
              <span>Meditaciones</span>
            </a>
          </li>
          <li>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setLocation("/sobre-nosotros"); }}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${isActive("/sobre-nosotros") ? 'bg-primary bg-opacity-10 text-primary font-medium' : 'hover:bg-neutral-100 text-neutral-600'}`}
            >
              <i className="ri-information-line text-xl"></i>
              <span>Sobre Nosotros</span>
            </a>
          </li>
          <li>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setLocation("/configuracion"); }}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${isActive("/configuracion") ? 'bg-primary bg-opacity-10 text-primary font-medium' : 'hover:bg-neutral-100 text-neutral-600'}`}
            >
              <i className="ri-settings-3-line text-xl"></i>
              <span>Configuración</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="p-4 border-t border-neutral-200">
        <a 
          href="#" 
          onClick={(e) => e.preventDefault()}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-neutral-100 text-neutral-600"
        >
          <i className="ri-logout-box-line text-xl"></i>
          <span>Cerrar sesión</span>
        </a>
      </div>
    </aside>
  );
}
