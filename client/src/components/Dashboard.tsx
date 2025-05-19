import { useState, useEffect } from 'react';
import StatCard from './StatCard';
import RecentOrders from './RecentOrders';
import TopSelling from './TopSelling';
import RecentActivity from './RecentActivity';
import BarChart from './charts/BarChart';
import LineChart from './charts/LineChart';
import { useQuery } from '@tanstack/react-query';
import { User, DashboardStats, Order, Product } from '@shared/schema';
import {
  DashboardIcon,
  DownloadIcon,
  PlusIcon,
  RefreshIcon, 
  MoreHorizontalIcon
} from '@/lib/icons';

const formatDate = (): string => {
  const options: Intl.DateTimeFormatOptions = { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  };
  return new Date().toLocaleDateString('es-ES', options);
};

export default function Dashboard() {
  const [statsData, setStatsData] = useState<DashboardStats | null>(null);
  
  const { data: stats, isLoading: statsLoading } = useQuery<DashboardStats>({
    queryKey: ['/api/dashboard/stats'],
  });

  const { data: orders, isLoading: ordersLoading } = useQuery<Order[]>({
    queryKey: ['/api/orders/recent'],
  });

  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/top-selling'],
  });

  const { data: activities, isLoading: activitiesLoading } = useQuery<any[]>({
    queryKey: ['/api/activities/recent'],
  });

  useEffect(() => {
    if (stats) {
      setStatsData(stats);
    }
  }, [stats]);

  return (
    <div className="p-4 md:p-6">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">¡Bienvenido, Pr. Keni!</h1>
          <p className="text-neutral-500">Panel de administración - {formatDate()}</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <button className="bg-white border border-neutral-200 text-neutral-700 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-neutral-50">
            <DownloadIcon className="h-4 w-4" />
            <span>Exportar</span>
          </button>
          <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary/90">
            <PlusIcon className="h-4 w-4" />
            <span>Nuevo</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Total Usuarios"
          value={statsData?.usersTotal || "5,248"}
          percentChange={statsData?.usersChange || 12.3}
          icon="user"
          iconColor="primary"
        />
        <StatCard 
          title="Total Pedidos"
          value={statsData?.ordersTotal || "1,473"}
          percentChange={statsData?.ordersChange || 8.2}
          icon="shopping-bag"
          iconColor="secondary"
        />
        <StatCard 
          title="Ingresos"
          value={statsData?.revenue || "$48,592"}
          percentChange={statsData?.revenueChange || -3.1}
          icon="money"
          iconColor="accent"
        />
        <StatCard 
          title="Productos"
          value={statsData?.productsTotal || "892"}
          percentChange={statsData?.productsChange || 4.7}
          icon="store"
          iconColor="primary"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-neutral-800">Interacciones Mensuales</h3>
            <div className="flex items-center space-x-2">
              <button className="text-neutral-400 hover:text-neutral-700">
                <RefreshIcon className="h-4 w-4" />
              </button>
              <button className="text-neutral-400 hover:text-neutral-700">
                <MoreHorizontalIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="chart-container">
            <BarChart />
          </div>
        </div>
        
        {/* Users Chart */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-neutral-800">Usuarios Activos</h3>
            <div className="flex items-center space-x-2">
              <button className="text-neutral-400 hover:text-neutral-700">
                <RefreshIcon className="h-4 w-4" />
              </button>
              <button className="text-neutral-400 hover:text-neutral-700">
                <MoreHorizontalIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="chart-container">
            <LineChart />
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <RecentOrders orders={orders || []} isLoading={ordersLoading} />

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <TopSelling products={products || []} isLoading={productsLoading} />
        </div>
        <div>
          <RecentActivity activities={activities || []} isLoading={activitiesLoading} />
        </div>
      </div>
    </div>
  );
}
