import { Skeleton } from "@/components/ui/skeleton";

interface Activity {
  id: number;
  type: "user" | "order" | "refund" | "message";
  message: string;
  timeAgo: string;
}

interface RecentActivityProps {
  activities: Activity[];
  isLoading: boolean;
}

export default function RecentActivity({ activities, isLoading }: RecentActivityProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex space-x-3">
              <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
              <div className="flex-1">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user":
        return <i className="ri-user-add-line text-sm text-primary"></i>;
      case "order":
        return <i className="ri-shopping-bag-line text-sm text-success"></i>;
      case "refund":
        return <i className="ri-refund-line text-sm text-warning"></i>;
      case "message":
        return <i className="ri-mail-line text-sm text-secondary"></i>;
      default:
        return <i className="ri-information-line text-sm text-primary"></i>;
    }
  };

  const getActivityBgColor = (type: string) => {
    switch (type) {
      case "user":
        return "bg-primary bg-opacity-10";
      case "order":
        return "bg-success bg-opacity-10";
      case "refund":
        return "bg-warning bg-opacity-10";
      case "message":
        return "bg-secondary bg-opacity-10";
      default:
        return "bg-primary bg-opacity-10";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-neutral-800">Actividad Reciente</h3>
        <a href="#todas-actividades" className="text-primary hover:underline text-sm">Ver todas</a>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex space-x-3">
            <div className={`w-8 h-8 rounded-full ${getActivityBgColor(activity.type)} flex items-center justify-center flex-shrink-0`}>
              {getActivityIcon(activity.type)}
            </div>
            <div>
              <p className="text-sm text-neutral-700" dangerouslySetInnerHTML={{ __html: activity.message }}></p>
              <p className="text-xs text-neutral-500">{activity.timeAgo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
