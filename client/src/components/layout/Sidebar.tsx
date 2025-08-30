import { useLocation } from "wouter";

export default function Sidebar() {
  const [location, setLocation] = useLocation();

  const adminUser = {
    name: "Pastor Keni",
    role: "Administrador",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpwm93fwjovHMblv_ofyirT2Cm5zJQHMeT6Q&s"
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
              <i className="ri-calendar-line text-xl"></i>
              <span>Eventos</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setLocation("/foros"); }}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${isActive("/foros") ? 'bg-primary bg-opacity-10 text-primary font-medium' : 'hover:bg-neutral-100 text-neutral-600'}`}
            >
              <i className="ri-discuss-line text-xl"></i>
              <span>Foros</span>
            </a>
          </li>
          <li>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setLocation("/empleos"); }}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${isActive("/empleos") ? 'bg-primary bg-opacity-10 text-primary font-medium' : 'hover:bg-neutral-100 text-neutral-600'}`}
            >
              <i className="ri-briefcase-line text-xl"></i>
              <span>Empleos</span>
            </a>
          </li>
          <li>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setLocation("/finanzas"); }}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${isActive("/finanzas") ? 'bg-primary bg-opacity-10 text-primary font-medium' : 'hover:bg-neutral-100 text-neutral-600'}`}
            >
              <i className="ri-money-dollar-circle-line text-xl"></i>
              <span>Finanzas</span>
            </a>
          </li>
          <li>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setLocation("/configuracion"); }}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${isActive("/configuracion") ? 'bg-primary bg-opacity-10 text-primary font-medium' : 'hover:bg-neutral-100 text-neutral-600'}`}
            >
              <i className="ri-settings-line text-xl"></i>
              <span>Configuración</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}