import Dashboard from "@/components/Dashboard";
import { Helmet } from "react-helmet";

export default function DashboardPage() {
  return (
    <>
      <Helmet>
        <title>Dashboard - MiApp Admin</title>
        <meta name="description" content="Panel de administración para la aplicación MiApp - Dashboard principal con estadísticas y resumen de actividad" />
      </Helmet>
      <Dashboard />
    </>
  );
}
