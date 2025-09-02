import React from 'react';
import { 
  Users, BookOpen, MessageSquare, Heart, Calendar, 
  TrendingUp, Activity, Zap, PlusCircle, Download,
  BarChart3, PieChart, Award, Clock
} from 'lucide-react';

// Interfaces
interface StatCardProps {
  title: string;
  value: number;
  subtitle?: string;
  change?: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  trend?: 'up' | 'down';
}

interface QuickActionProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  onClick: () => void;
}

// Datos mock para el dashboard de la iglesia
const mockIglesiaStats = {
  cursos: {
    total: 24,
    activos: 18,
    completados: 6,
    participantes: 847,
    nuevosEstesMes: 23
  },
  foros: {
    categorias: 8,
    subforos: 24,
    temasActivos: 156,
    interacciones: 3420,
    nuevasHoy: 47
  },
  oraciones: {
    peticiones: 189,
    pendientes: 23,
    atendidas: 166,
    participantes: 124,
    nuevasHoy: 8
  },
  seminarios: {
    programados: 12,
    completados: 8,
    participantes: 456,
    asistenciaPromedio: 85,
    proximosSemana: 3
  },
  fidelidad: {
    nivelPromedio: 78,
    miembrosComprometidos: 342,
    asistenciaRegular: 89,
    participacionActiva: 67
  },
  general: {
    miembrosTotal: 1247,
    nuevosEstesMes: 34,
    activosHoy: 178,
    crecimientoMensual: 8.5
  }
};

const recentActivity = [
  { 
    id: 1, 
    type: 'curso', 
    text: 'Nuevo curso "Fundamentos Bíblicos" iniciado', 
    time: 'Hace 2 horas',
    icon: BookOpen,
    color: 'text-blue-600 bg-blue-100'
  },
  { 
    id: 2, 
    type: 'oracion', 
    text: '5 nuevas peticiones de oración recibidas', 
    time: 'Hace 4 horas',
    icon: Heart,
    color: 'text-red-600 bg-red-100'
  },
  { 
    id: 3, 
    type: 'seminario', 
    text: 'Seminario "Matrimonio Cristiano" completado', 
    time: 'Hace 6 horas',
    icon: Calendar,
    color: 'text-green-600 bg-green-100'
  },
  { 
    id: 4, 
    type: 'foro', 
    text: '23 nuevas interacciones en foros', 
    time: 'Hace 8 horas',
    icon: MessageSquare,
    color: 'text-purple-600 bg-purple-100'
  }
];

export default function IglesiaDashboard() {
  const formatDate = (): string => {
    return new Date().toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, change, icon: Icon, color, trend = 'up' }) => (
    <div className="adventist-stat-card stat-card-adventist group">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change && (
          <div className={`flex items-center text-sm font-medium ${trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
            <TrendingUp className={`w-4 h-4 mr-1 ${trend === 'down' ? 'rotate-180' : ''}`} />
            <span>{change}%</span>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-slate-800 mb-1">{value.toLocaleString()}</h3>
        <p className="text-slate-600 text-sm font-semibold">{title}</p>
        {subtitle && (
          <p className="text-xs text-slate-500 mt-1 font-medium">{subtitle}</p>
        )}
      </div>
    </div>
  );

  const QuickAction: React.FC<QuickActionProps> = ({ title, description, icon: Icon, color, onClick }) => (
    <button 
      onClick={onClick}
      className="adventist-card group text-left hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="flex items-center space-x-3 p-4">
        <div className={`p-3 rounded-xl ${color} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h4 className="font-semibold text-slate-800">{title}</h4>
          <p className="text-sm text-slate-600">{description}</p>
        </div>
      </div>
    </button>
  );

  return (
    <div className="p-4 md:p-6 space-y-6 bg-gradient-to-br from-slate-100 to-slate-200/50 min-h-screen">
      {/* Header con estilo Adventista */}
      <div className="adventist-header rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-4">
           
            <div>
              <h1 className="text-2xl font-bold">¡Bienvenido, Pr. Keni!</h1>
              <p className="text-slate-300">Panel Administrativo - {formatDate()}</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="adventist-button-secondary flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </button>
            <button className="adventist-button-primary flex items-center">
              <PlusCircle className="w-4 h-4 mr-2" />
              Nuevo
            </button>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Miembros"
          value={mockIglesiaStats.general.miembrosTotal}
          subtitle={`+${mockIglesiaStats.general.nuevosEstesMes} este mes`}
          change={mockIglesiaStats.general.crecimientoMensual}
          icon={Users}
          color="bg-gradient-to-br from-slate-700 to-slate-800"
        />
        <StatCard
          title="Cursos Activos"
          value={mockIglesiaStats.cursos.activos}
          subtitle={`${mockIglesiaStats.cursos.participantes} participantes`}
          change={12.3}
          icon={BookOpen}
          color="bg-gradient-to-br from-slate-600 to-slate-700"
        />
        <StatCard
          title="Interacciones Foro"
          value={mockIglesiaStats.foros.interacciones}
          subtitle={`+${mockIglesiaStats.foros.nuevasHoy} hoy`}
          change={18.7}
          icon={MessageSquare}
          color="bg-gradient-to-br from-blue-600 to-blue-700"
        />
        <StatCard
          title="Peticiones Oración"
          value={mockIglesiaStats.oraciones.peticiones}
          subtitle={`${mockIglesiaStats.oraciones.pendientes} pendientes`}
          change={5.2}
          icon={Heart}
          color="bg-gradient-to-br from-red-500 to-red-600"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Seminarios"
          value={mockIglesiaStats.seminarios.programados}
          subtitle={`${mockIglesiaStats.seminarios.asistenciaPromedio}% asistencia promedio`}
          change={8.5}
          icon={Calendar}
          color="bg-gradient-to-br from-emerald-500 to-emerald-600"
        />
        <StatCard
          title="Nivel de Fidelidad"
          value={mockIglesiaStats.fidelidad.nivelPromedio}
          subtitle={`${mockIglesiaStats.fidelidad.miembrosComprometidos} comprometidos`}
          change={3.2}
          icon={Award}
          color="bg-gradient-to-br from-yellow-500 to-yellow-600"
        />
        <StatCard
          title="Participación Activa"
          value={mockIglesiaStats.fidelidad.participacionActiva}
          subtitle={`${mockIglesiaStats.general.activosHoy} activos hoy`}
          change={12.1}
          icon={Activity}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Participación por Ministerio */}
        <div className="adventist-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800">Participación por Ministerio</h3>
            <div className="p-2 bg-gradient-to-br from-amber-400 to-amber-500 rounded-lg">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Cursos Bíblicos', value: 847, max: 1000, color: 'bg-gradient-to-r from-slate-600 to-slate-700' },
              { name: 'Foros Comunitarios', value: 456, max: 600, color: 'bg-gradient-to-r from-amber-500 to-amber-600' },
              { name: 'Seminarios', value: 342, max: 400, color: 'bg-gradient-to-r from-blue-500 to-blue-600' },
              { name: 'Peticiones Oración', value: 189, max: 300, color: 'bg-gradient-to-r from-red-500 to-red-600' }
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold text-slate-700">{item.name}</span>
                  <span className="text-slate-600 font-medium">{item.value}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-3 rounded-full ${item.color} transition-all duration-1000 ease-out shadow-sm`}
                    style={{ width: `${(item.value / item.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actividad Reciente */}
        <div className="adventist-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800">Actividad Reciente</h3>
            <div className="p-2 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg">
              <Clock className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 group">
                <div className={`p-2 rounded-xl ${activity.color} group-hover:scale-110 transition-transform duration-200`}>
                  <activity.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800">{activity.text}</p>
                  <p className="text-xs text-slate-500 font-medium">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="adventist-card p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Acciones Rápidas</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickAction
            title="Nuevo Curso"
            description="Crear curso bíblico"
            icon={BookOpen}
            color="bg-gradient-to-br from-slate-600 to-slate-700"
            onClick={() => console.log('Crear curso')}
          />
          <QuickAction
            title="Agendar Seminario"
            description="Programar evento"
            icon={Calendar}
            color="bg-gradient-to-br from-amber-500 to-amber-600"
            onClick={() => console.log('Agendar seminario')}
          />
          <QuickAction
            title="Revisar Oraciones"
            description="Atender peticiones"
            icon={Heart}
            color="bg-gradient-to-br from-red-500 to-red-600"
            onClick={() => console.log('Revisar oraciones')}
          />
          <QuickAction
            title="Moderar Foros"
            description="Gestionar comunidad"
            icon={MessageSquare}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
            onClick={() => console.log('Moderar foros')}
          />
        </div>
      </div>

      {/* Métricas Detalladas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fidelidad y Compromiso */}
        <div className="adventist-card p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg">
              <Award className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Fidelidad y Compromiso</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-700">Asistencia Regular</span>
              <div className="flex items-center">
                <div className="w-20 bg-slate-200 rounded-full h-2.5 mr-2">
                  <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2.5 rounded-full shadow-sm" style={{width: '89%'}}></div>
                </div>
                <span className="text-sm font-bold text-slate-800">89%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-700">Participación Cursos</span>
              <div className="flex items-center">
                <div className="w-20 bg-slate-200 rounded-full h-2.5 mr-2">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 h-2.5 rounded-full shadow-sm" style={{width: '78%'}}></div>
                </div>
                <span className="text-sm font-bold text-slate-800">78%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-700">Actividad Foros</span>
              <div className="flex items-center">
                <div className="w-20 bg-slate-200 rounded-full h-2.5 mr-2">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full shadow-sm" style={{width: '67%'}}></div>
                </div>
                <span className="text-sm font-bold text-slate-800">67%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Próximos Eventos */}
        <div className="adventist-card p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Próximos Eventos</h3>
          </div>
          <div className="space-y-3">
            {[
              { titulo: 'Escuela Financiera', fecha: 'Dom 15 Oct', participantes: 45 },
              { titulo: 'Taller Matrimonios', fecha: 'Mié 18 Oct', participantes: 28 },
              { titulo: 'Estudio Proverbios', fecha: 'Vie 20 Oct', participantes: 67 }
            ].map((evento, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/60 hover:shadow-sm transition-all duration-200">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{evento.titulo}</p>
                  <p className="text-xs text-slate-600 font-medium">{evento.fecha}</p>
                </div>
                <span className="adventist-badge">
                  {evento.participantes} inscritos
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Resumen Semanal */}
        <div className="adventist-card p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Resumen Semanal</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-200/60">
              <span className="text-sm font-medium text-slate-700">Nuevos miembros</span>
              <span className="text-lg font-bold text-emerald-600">+12</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-200/60">
              <span className="text-sm font-medium text-slate-700">Cursos completados</span>
              <span className="text-lg font-bold text-blue-600">8</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl border border-purple-200/60">
              <span className="text-sm font-medium text-slate-700">Oraciones atendidas</span>
              <span className="text-lg font-bold text-purple-600">23</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl border border-amber-200/60">
              <span className="text-sm font-medium text-slate-700">Eventos realizados</span>
              <span className="text-lg font-bold text-amber-600">5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}