import { ArrowDownIcon, ArrowUpIcon } from "@/lib/icons";

interface StatCardProps {
  title: string;
  value: string | number;
  percentChange: number;
  icon: "user" | "shopping-bag" | "money" | "store";
  iconColor: "primary" | "secondary" | "accent";
}

export default function StatCard({ title, value, percentChange, icon, iconColor }: StatCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "user":
        return <i className="ri-user-line text-xl text-primary"></i>;
      case "shopping-bag":
        return <i className="ri-shopping-bag-line text-xl text-secondary"></i>;
      case "money":
        return <i className="ri-money-dollar-circle-line text-xl text-accent"></i>;
      case "store":
        return <i className="ri-store-2-line text-xl text-primary"></i>;
      default:
        return <i className="ri-dashboard-line text-xl"></i>;
    }
  };

  const getIconBgColor = () => {
    switch (iconColor) {
      case "primary":
        return "bg-primary bg-opacity-10";
      case "secondary":
        return "bg-secondary bg-opacity-10";
      case "accent":
        return "bg-accent bg-opacity-10";
      default:
        return "bg-primary bg-opacity-10";
    }
  };

  return (
    <div className="dashboard-stat-card bg-white rounded-xl shadow-sm p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-neutral-500 text-sm">{title}</p>
          <h3 className="text-3xl font-bold text-neutral-800 mt-1">{value}</h3>
          <div className={`flex items-center mt-2 ${percentChange >= 0 ? 'text-success' : 'text-danger'}`}>
            {percentChange >= 0 ? 
              <ArrowUpIcon className="mr-1 h-4 w-4" /> : 
              <ArrowDownIcon className="mr-1 h-4 w-4" />
            }
            <span className="text-sm font-medium">{Math.abs(percentChange)}%</span>
          </div>
        </div>
        <div className={`w-12 h-12 rounded-full ${getIconBgColor()} flex items-center justify-center`}>
          {getIcon()}
        </div>
      </div>
    </div>
  );
}
