import React from 'react';
import { useLocation } from "wouter";

export default function AdventistaSidebar() {
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
    <aside className="hidden lg:flex flex-col fixed top-0 left-0 bottom-0 w-64 bg-gradient-to-b from-slate-900 to-slate-800 shadow-xl z-10">
      {/* Logo Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-lg p-1">
            <img 
              src="https://i.pinimg.com/736x/5a/75/b4/5a75b4878be3363d62de6a61e232f893.jpg" 
              alt="Logo Iglesia Adventista" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Iglesia Adventista</h1>
            <p className="text-xs text-slate-400">Panel Administrativo</p>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="mx-4 mt-4 mb-6">
        <div className="flex items-center space-x-3 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm">
          <div className="relative">
            <img 
              src={adminUser.avatar} 
              alt="Admin User" 
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-400/30" 
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800"></div>
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-white text-sm">{adminUser.name}</h2>
            <p className="text-xs text-blue-400 font-medium">{adminUser.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        <nav className="space-y-1">
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
              Principal
            </h3>
            <div className="space-y-1">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setLocation("/dashboard"); }}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                  isActive("/dashboard") 
                    ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-400 border border-blue-400/30 shadow-lg' 
                    : 'hover:bg-slate-700/50 text-slate-300 hover:text-white'
                }`}
              >
                <i className={`ri-dashboard-3-line text-xl ${isActive("/dashboard") ? 'text-blue-400' : 'text-slate-400 group-hover:text-blue-400'}`}></i>
                <span className="font-medium">Dashboard</span>
                {isActive("/dashboard") && <div className="w-2 h-2 bg-blue-400 rounded-full ml-auto animate-pulse"></div>}
              </a>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
              Ministerios
            </h3>
            <div className="space-y-1">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setLocation("/miembros"); }}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                  isActive("/miembros") 
                    ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-400 border border-blue-400/30 shadow-lg' 
                    : 'hover:bg-slate-700/50 text-slate-300 hover:text-white'
                }`}
              >
                <i className={`ri-team-line text-xl ${isActive("/miembros") ? 'text-blue-400' : 'text-slate-400 group-hover:text-blue-400'}`}></i>
                <span className="font-medium">Miembros</span>
              </a>

              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setLocation("/cursos"); }}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                  isActive("/cursos") 
                    ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-400 border border-blue-400/30 shadow-lg' 
                    : 'hover:bg-slate-700/50 text-slate-300 hover:text-white'
                }`}
              >
                <i className={`ri-book-open-line text-xl ${isActive("/cursos") ? 'text-blue-400' : 'text-slate-400 group-hover:text-blue-400'}`}></i>
                <span className="font-medium">Cursos Bíblicos</span>
              </a>

              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setLocation("/eventos"); }}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                  isActive("/eventos") 
                    ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-400 border border-blue-400/30 shadow-lg' 
                    : 'hover:bg-slate-700/50 text-slate-300 hover:text-white'
                }`}
              >
                <i className={`ri-calendar-event-line text-xl ${isActive("/eventos") ? 'text-blue-400' : 'text-slate-400 group-hover:text-blue-400'}`}></i>
                <span className="font-medium">Eventos</span>
              </a>

              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setLocation("/foros"); }}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                  isActive("/foros") 
                    ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-400 border border-blue-400/30 shadow-lg' 
                    : 'hover:bg-slate-700/50 text-slate-300 hover:text-white'
                }`}
              >
                <i className={`ri-discuss-line text-xl ${isActive("/foros") ? 'text-blue-400' : 'text-slate-400 group-hover:text-blue-400'}`}></i>
                <span className="font-medium">Foros</span>
              </a>

              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setLocation("/oraciones"); }}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                  isActive("/oraciones") 
                    ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-400 border border-blue-400/30 shadow-lg' 
                    : 'hover:bg-slate-700/50 text-slate-300 hover:text-white'
                }`}
              >
                <i className={`ri-heart-3-line text-xl ${isActive("/oraciones") ? 'text-blue-400' : 'text-slate-400 group-hover:text-blue-400'}`}></i>
                <span className="font-medium">Peticiones</span>
              </a>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
              Administración
            </h3>
            <div className="space-y-1">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setLocation("/meditaciones"); }}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                  isActive("/meditaciones") 
                    ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-400 border border-blue-400/30 shadow-lg' 
                    : 'hover:bg-slate-700/50 text-slate-300 hover:text-white'
                }`}
              >
                <i className={`ri-leaf-line text-xl ${isActive("/meditaciones") ? 'text-blue-400' : 'text-slate-400 group-hover:text-blue-400'}`}></i>
                <span className="font-medium">Meditaciones</span>
              </a>

              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setLocation("/donaciones"); }}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                  isActive("/donaciones") 
                    ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-400 border border-blue-400/30 shadow-lg' 
                    : 'hover:bg-slate-700/50 text-slate-300 hover:text-white'
                }`}
              >
                <i className={`ri-hand-coin-line text-xl ${isActive("/donaciones") ? 'text-blue-400' : 'text-slate-400 group-hover:text-blue-400'}`}></i>
                <span className="font-medium">Donaciones</span>
              </a>

              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setLocation("/admin/jobs"); }}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                  isActive("/admin/jobs") 
                    ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-400 border border-blue-400/30 shadow-lg' 
                    : 'hover:bg-slate-700/50 text-slate-300 hover:text-white'
                }`}
              >
                <i className={`ri-briefcase-line text-xl ${isActive("/admin/jobs") ? 'text-blue-400' : 'text-slate-400 group-hover:text-blue-400'}`}></i>
                <span className="font-medium">Empleos</span>
              </a>

              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setLocation("/configuracion"); }}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                  isActive("/configuracion") 
                    ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-400 border border-blue-400/30 shadow-lg' 
                    : 'hover:bg-slate-700/50 text-slate-300 hover:text-white'
                }`}
              >
                <i className={`ri-settings-3-line text-xl ${isActive("/configuracion") ? 'text-blue-400' : 'text-slate-400 group-hover:text-blue-400'}`}></i>
                <span className="font-medium">Configuración</span>
              </a>
            </div>
          </div>
        </nav>
      </div>

      {/* Footer with Church Info */}
      <div className="p-4 border-t border-slate-700">
        <div className="text-center">
          <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <i className="ri-church-line text-white text-sm"></i>
          </div>
          <p className="text-xs text-slate-400">
            Iglesia Adventista del
          </p>
          <p className="text-xs text-blue-400 font-semibold">
            Séptimo Día
          </p>
        </div>
      </div>
    </aside>
  );
}