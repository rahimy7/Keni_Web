import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Search, 
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  MessageSquare,
  TrendingUp,
  Building,
  Calendar,
  Mail,
  Phone,
  User,
  FileText,
  MoreHorizontal,
  Archive,
  Trash2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Helmet } from "react-helmet";

// Review form schema
const reviewFormSchema = z.object({
  status: z.enum(["pending", "reviewed", "accepted", "rejected"]),
  notes: z.string().optional(),
});

export default function AdminJobsPage() {
  const [activeTab, setActiveTab] = useState("applications");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);

  // Mock Data
  const mockJobStats = {
    totalJobs: 12,
    jobsThisMonth: 3,
    totalApplications: 28,
    applicationsThisWeek: 8,
    activeProfiles: 15,
    profilesAvailable: 12,
    successRate: "35.7"
  };

  const mockProfessionalAreas = [
    { id: 1, name: "Tecnología", description: "Desarrollo de software, IT, sistemas" },
    { id: 2, name: "Marketing", description: "Marketing digital, publicidad, ventas" },
    { id: 3, name: "Finanzas", description: "Contabilidad, análisis financiero, banca" },
    { id: 4, name: "Recursos Humanos", description: "Gestión de talento, reclutamiento" },
    { id: 5, name: "Diseño", description: "Diseño gráfico, UX/UI, creatividad" },
  ];

  const mockJobs = [
    {
      id: 1,
      title: "Desarrollador Frontend React",
      company: "TechCorp",
      description: "Buscamos un desarrollador frontend con experiencia en React y TypeScript para unirse a nuestro equipo de desarrollo de productos.",
      requirements: ["React", "TypeScript", "CSS", "Git"],
      benefits: ["Trabajo remoto", "Seguro médico", "Capacitaciones"],
      professionalAreaId: 1,
      location: "Santo Domingo, RD",
      jobType: "full-time",
      experienceLevel: "mid",
      salaryRange: "$35,000 - $45,000",
      contactEmail: "reclutamiento@techcorp.com",
      contactPhone: "809-555-0123",
      isActive: true,
      publishedBy: 1,
      createdAt: new Date(2024, 7, 15),
      updatedAt: new Date(2024, 7, 15)
    },
    {
      id: 2,
      title: "Especialista en Marketing Digital",
      company: "MarketPro",
      description: "Buscamos un especialista en marketing digital para gestionar nuestras campañas en redes sociales y SEO.",
      requirements: ["Google Ads", "Facebook Ads", "SEO", "Analytics"],
      benefits: ["Horario flexible", "Bonos por rendimiento"],
      professionalAreaId: 2,
      location: "Santiago, RD",
      jobType: "full-time",
      experienceLevel: "entry",
      salaryRange: "$25,000 - $32,000",
      contactEmail: "jobs@marketpro.com",
      isActive: true,
      publishedBy: 1,
      createdAt: new Date(2024, 7, 20),
      updatedAt: new Date(2024, 7, 20)
    },
    {
      id: 3,
      title: "Diseñador UX/UI",
      company: "DesignStudio",
      description: "Únete a nuestro equipo creativo como diseñador UX/UI para crear experiencias digitales excepcionales.",
      requirements: ["Figma", "Adobe XD", "Prototipado", "User Research"],
      benefits: ["Ambiente creativo", "Proyectos internacionales", "Crecimiento profesional"],
      professionalAreaId: 5,
      location: "Santo Domingo, RD",
      jobType: "full-time",
      experienceLevel: "senior",
      salaryRange: "$40,000 - $55,000",
      contactEmail: "careers@designstudio.com",
      contactPhone: "809-555-0456",
      isActive: true,
      publishedBy: 1,
      createdAt: new Date(2024, 7, 25),
      updatedAt: new Date(2024, 7, 25)
    }
  ];

  const mockProfiles = [
    {
      id: 1,
      userId: 2,
      fullName: "María González",
      email: "maria.gonzalez@ejemplo.com",
      phone: "809-555-1234",
      professionalAreaId: 1,
      experience: "3 años de experiencia en desarrollo frontend con React y Vue.js. He trabajado en proyectos de e-commerce y aplicaciones web corporativas.",
      skills: ["React", "Vue.js", "JavaScript", "TypeScript", "HTML", "CSS", "Git"],
      education: "Ingeniería en Sistemas, PUCMM",
      summary: "Desarrolladora frontend apasionada por crear interfaces de usuario intuitivas y responsivas. Me especializo en React y tengo experiencia trabajando en equipos ágiles.",
      expectedSalary: "$30,000 - $40,000",
      availableForWork: true,
      createdAt: new Date(2024, 7, 10),
      updatedAt: new Date(2024, 7, 10)
    },
    {
      id: 2,
      userId: 1,
      fullName: "Juan Pérez",
      email: "juan.perez@ejemplo.com",
      phone: "809-555-5678",
      professionalAreaId: 2,
      experience: "5 años en marketing digital, especializado en Google Ads y Facebook Ads. He gestionado presupuestos de hasta $50,000 mensuales.",
      skills: ["Google Ads", "Facebook Ads", "SEO", "Analytics", "Marketing Automation"],
      education: "Licenciatura en Marketing, UASD",
      summary: "Especialista en marketing digital con track record comprobado en generación de leads y optimización de ROI en campañas publicitarias digitales.",
      expectedSalary: "$35,000 - $45,000",
      availableForWork: true,
      createdAt: new Date(2024, 7, 12),
      updatedAt: new Date(2024, 7, 12)
    }
  ];

  const mockApplications = [
    {
      id: 1,
      jobId: 1,
      userProfileId: 1,
      coverLetter: "Estimado equipo de reclutamiento, estoy muy interesada en la posición de Desarrollador Frontend React. Mi experiencia de 3 años con React y TypeScript me ha permitido desarrollar aplicaciones web robustas y escalables. He trabajado en proyectos similares y estoy emocionada por la oportunidad de contribuir a TechCorp.",
      status: "pending",
      appliedAt: new Date(2024, 7, 28),
      createdAt: new Date(2024, 7, 28),
      updatedAt: new Date(2024, 7, 28),
      job: mockJobs[0],
      profile: mockProfiles[0]
    },
    {
      id: 2,
      jobId: 2,
      userProfileId: 2,
      coverLetter: "Hola equipo de MarketPro, soy Juan Pérez y me postulo para la posición de Especialista en Marketing Digital. Con 5 años de experiencia gestionando campañas de Google Ads y Facebook Ads, he logrado optimizar ROI en más del 150% en mis proyectos anteriores. Me encantaría aportar mi experiencia a su equipo.",
      status: "reviewed",
      reviewedBy: 1,
      reviewedAt: new Date(2024, 7, 29),
      notes: "Candidato prometedor con buena experiencia. Programar entrevista.",
      appliedAt: new Date(2024, 7, 26),
      createdAt: new Date(2024, 7, 26),
      updatedAt: new Date(2024, 7, 29),
      job: mockJobs[1],
      profile: mockProfiles[1]
    },
    {
      id: 3,
      jobId: 3,
      userProfileId: 1,
      coverLetter: "Aunque mi experiencia principal es en desarrollo frontend, tengo un gran interés en UX/UI y he completado varios cursos en Figma y diseño centrado en el usuario. Me gustaría hacer la transición al área de diseño y creo que mi background técnico sería un valor agregado.",
      status: "rejected",
      reviewedBy: 1,
      reviewedAt: new Date(2024, 7, 30),
      notes: "Perfil interesante pero buscamos alguien con más experiencia específica en UX/UI.",
      appliedAt: new Date(2024, 7, 27),
      createdAt: new Date(2024, 7, 27),
      updatedAt: new Date(2024, 7, 30),
      job: mockJobs[2],
      profile: mockProfiles[0]
    },
    {
      id: 4,
      jobId: null,
      userProfileId: 2,
      coverLetter: "Hola, soy Juan Pérez, especialista en marketing digital con 5 años de experiencia. Estoy abierto a nuevas oportunidades en el área de marketing y publicidad digital. Mi experiencia incluye gestión de campañas, SEO y analytics. Estaría encantado de discutir cómo puedo aportar valor a su organización.",
      status: "pending",
      appliedAt: new Date(2024, 7, 30),
      createdAt: new Date(2024, 7, 30),
      updatedAt: new Date(2024, 7, 30),
      job: null,
      profile: mockProfiles[1]
    }
  ];

  // Use mock data
  const jobStats = mockJobStats;
  const applications = mockApplications;
  const jobs = mockJobs;
  const profiles = mockProfiles;
  const professionalAreas = mockProfessionalAreas;

  // Review form
  const reviewForm = useForm({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      status: "pending" as const,
      notes: "",
    },
  });

  // Mock mutation handlers
  const handleReviewApplication = (data: any) => {
    console.log("Reviewing application:", selectedApplication?.id, data);
    setShowReviewDialog(false);
    setSelectedApplication(null);
  };

  const handleToggleJobStatus = (jobId: number) => {
    console.log("Toggling job status:", jobId);
  };

  const handleDeleteJob = (jobId: number) => {
    if (confirm("¿Está seguro de eliminar este empleo?")) {
      console.log("Deleting job:", jobId);
    }
  };

  const handleQuickReview = (applicationId: number, status: string) => {
    console.log("Quick review:", applicationId, status);
  };

  // Filter functions using useMemo for performance
  const filteredApplications = useMemo(() => {
    return applications.filter((app: any) => {
      const matchesSearch = 
        app.job?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.profile?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.job?.company?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = selectedStatus === "all" || app.status === selectedStatus;
      
      return matchesSearch && matchesStatus;
    });
  }, [applications, searchTerm, selectedStatus]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job: any) => {
      return (
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [jobs, searchTerm]);

  // Utility functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "reviewed": return "bg-blue-100 text-blue-800";
      case "accepted": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      pending: "Pendiente",
      reviewed: "Revisado",
      accepted: "Aceptado",
      rejected: "Rechazado"
    };
    return labels[status] || status;
  };

  const getJobTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      "full-time": "Tiempo Completo",
      "part-time": "Tiempo Parcial",
      "contract": "Contrato",
      "internship": "Prácticas"
    };
    return labels[type] || type;
  };

  const getExperienceLevelLabel = (level: string) => {
    const labels: { [key: string]: string } = {
      "entry": "Junior",
      "mid": "Intermedio",
      "senior": "Senior"
    };
    return labels[level] || level;
  };

  const getAreaName = (areaId: number | null) => {
    if (!areaId) return "Sin especificar";
    const area = professionalAreas.find((a: any) => a.id === areaId);
    return area?.name || "Sin especificar";
  };

  const onSubmitReview = (data: any) => {
    handleReviewApplication(data);
  };

  return (
    <>
      <Helmet>
        <title>Administración de Empleos - MiApp Admin</title>
        <meta name="description" content="Administra empleos, postulaciones y perfiles profesionales en el sistema" />
      </Helmet>
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-neutral-800">Administración de Empleos</h1>
          <p className="text-neutral-500">Gestiona empleos, postulaciones y perfiles profesionales</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Empleos</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{jobStats.totalJobs}</div>
              <p className="text-xs text-muted-foreground">
                +{jobStats.jobsThisMonth} este mes
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Postulaciones</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{jobStats.totalApplications}</div>
              <p className="text-xs text-muted-foreground">
                +{jobStats.applicationsThisWeek} esta semana
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Perfiles Activos</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{jobStats.activeProfiles}</div>
              <p className="text-xs text-muted-foreground">
                {jobStats.profilesAvailable} disponibles
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasa de Éxito</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{jobStats.successRate}%</div>
              <p className="text-xs text-muted-foreground">
                Postulaciones aceptadas
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Bar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por empleo, candidato o empresa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              {activeTab === "applications" && (
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full lg:w-64">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filtrar por estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="reviewed">Revisado</SelectItem>
                    <SelectItem value="accepted">Aceptado</SelectItem>
                    <SelectItem value="rejected">Rechazado</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white">
            <TabsTrigger value="applications" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Postulaciones ({filteredApplications.length})
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Empleos Publicados ({filteredJobs.length})
            </TabsTrigger>
            <TabsTrigger value="profiles" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Perfiles ({profiles.length})
            </TabsTrigger>
          </TabsList>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-4">
            {filteredApplications.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No se encontraron postulaciones
                  </h3>
                  <p className="text-gray-500">
                    {searchTerm || selectedStatus !== "all"
                      ? "Intenta ajustar tus filtros de búsqueda"
                      : "Las postulaciones aparecerán aquí cuando los usuarios se postulen"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredApplications.map((application: any) => (
                  <Card key={application.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">
                                {application.job?.title || "Postulación General"}
                              </h3>
                              {application.job && (
                                <p className="text-sm text-gray-600 flex items-center gap-1">
                                  <Building className="h-3 w-3" />
                                  {application.job.company}
                                </p>
                              )}
                            </div>
                            <Badge className={getStatusColor(application.status)}>
                              {getStatusLabel(application.status)}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {application.profile?.fullName || "Usuario"}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(application.appliedAt).toLocaleDateString()}
                            </span>
                            {application.job?.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {application.job.location}
                              </span>
                            )}
                          </div>

                          {application.coverLetter && (
                            <p className="text-sm text-gray-700 line-clamp-2 bg-gray-50 p-2 rounded">
                              {application.coverLetter}
                            </p>
                          )}

                          {application.notes && (
                            <div className="bg-blue-50 p-2 rounded">
                              <p className="text-xs font-medium text-blue-800">Notas del administrador:</p>
                              <p className="text-sm text-blue-700">{application.notes}</p>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedApplication(application);
                              reviewForm.reset({
                                status: application.status,
                                notes: application.notes || "",
                              });
                              setShowReviewDialog(true);
                            }}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Revisar
                          </Button>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={() => handleQuickReview(application.id, "accepted")}
                                className="text-green-600"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Aceptar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleQuickReview(application.id, "rejected")}
                                className="text-red-600"
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Rechazar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-4">
            {filteredJobs.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No se encontraron empleos
                  </h3>
                  <p className="text-gray-500">
                    {searchTerm
                      ? "Intenta ajustar tu búsqueda"
                      : "Los empleos publicados por usuarios aparecerán aquí"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredJobs.map((job: any) => (
                  <Card key={job.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{job.title}</CardTitle>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Building className="h-3 w-3" />
                            {job.company}
                          </p>
                        </div>
                        <Badge variant={job.isActive ? "default" : "secondary"}>
                          {job.isActive ? "Activo" : "Inactivo"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-700 line-clamp-2">{job.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {getJobTypeLabel(job.jobType)}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <User className="h-3 w-3 mr-1" />
                          {getExperienceLevelLabel(job.experienceLevel)}
                        </Badge>
                      </div>

                      {job.location && (
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {job.location}
                        </p>
                      )}

                      <div className="flex justify-between items-center pt-2">
                        <p className="text-xs text-gray-400">
                          {applications.filter((app: any) => app.jobId === job.id).length} postulaciones
                        </p>
                        
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleToggleJobStatus(job.id)}
                          >
                            <Archive className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteJob(job.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Profiles Tab */}
          <TabsContent value="profiles" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {profiles.map((profile: any) => (
                <Card key={profile.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{profile.fullName}</CardTitle>
                        <p className="text-sm text-gray-600">{getAreaName(profile.professionalAreaId)}</p>
                      </div>
                      <Badge variant={profile.availableForWork ? "default" : "secondary"}>
                        {profile.availableForWork ? "Disponible" : "No disponible"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {profile.summary && (
                      <p className="text-sm text-gray-700 line-clamp-3">{profile.summary}</p>
                    )}
                    
                    {profile.skills && profile.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {profile.skills.slice(0, 3).map((skill: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {profile.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{profile.skills.length - 3} más
                          </Badge>
                        )}
                      </div>
                    )}

                    {profile.expectedSalary && (
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        {profile.expectedSalary}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex gap-2">
                        {profile.email && (
                          <Button size="sm" variant="outline" className="h-7 w-7 p-0">
                            <Mail className="h-3 w-3" />
                          </Button>
                        )}
                        {profile.phone && (
                          <Button size="sm" variant="outline" className="h-7 w-7 p-0">
                            <Phone className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">
                        {applications.filter((app: any) => app.userProfileId === profile.id).length} postulaciones
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Review Application Dialog */}
        <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Revisar Postulación</DialogTitle>
              <DialogDescription>
                Revisa y actualiza el estado de la postulación de {selectedApplication?.profile?.fullName}
              </DialogDescription>
            </DialogHeader>
            
            {selectedApplication && (
              <div className="space-y-4">
                {/* Application Details */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <h4 className="font-medium">Detalles de la Postulación</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Empleo:</span> {selectedApplication.job?.title || "Postulación General"}
                    </div>
                    <div>
                      <span className="font-medium">Empresa:</span> {selectedApplication.job?.company || "N/A"}
                    </div>
                    <div>
                      <span className="font-medium">Candidato:</span> {selectedApplication.profile?.fullName}
                    </div>
                    <div>
                      <span className="font-medium">Fecha:</span> {new Date(selectedApplication.appliedAt).toLocaleDateString()}
                    </div>
                  </div>
                  
                  {selectedApplication.coverLetter && (
                    <div>
                      <span className="font-medium">Carta de Presentación:</span>
                      <p className="text-sm mt-1 bg-white p-2 rounded border">
                        {selectedApplication.coverLetter}
                      </p>
                    </div>
                  )}
                </div>

                {/* Review Form */}
                <Form {...reviewForm}>
                  <form onSubmit={reviewForm.handleSubmit(onSubmitReview)} className="space-y-4">
                    <FormField
                      control={reviewForm.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estado de la Postulación</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="pending">Pendiente</SelectItem>
                              <SelectItem value="reviewed">Revisado</SelectItem>
                              <SelectItem value="accepted">Aceptado</SelectItem>
                              <SelectItem value="rejected">Rechazado</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={reviewForm.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notas del Administrador (Opcional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              rows={4}
                              placeholder="Agregar comentarios sobre la postulación..."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end gap-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setShowReviewDialog(false)}
                      >
                        Cancelar
                      </Button>
                      <Button type="submit">
                        Actualizar Estado
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}