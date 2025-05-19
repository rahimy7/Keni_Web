import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SaveIcon } from "@/lib/icons";
import { Helmet } from "react-helmet";

// Define the form schemas using zod
const profileFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  email: z.string().email({ message: "Introduce un email válido" }),
  bio: z.string().optional(),
});

const securityFormSchema = z.object({
  currentPassword: z.string().min(1, { message: "La contraseña actual es requerida" }),
  newPassword: z.string().min(8, { message: "La nueva contraseña debe tener al menos 8 caracteres" }),
  confirmPassword: z.string().min(8, { message: "Confirma la nueva contraseña" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

const notificationsFormSchema = z.object({
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(true),
  marketingEmails: z.boolean().default(false),
  activitySummary: z.boolean().default(true),
});

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("perfil");

  // Profile form
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Keni Lara",
      email: "k.lara@ejemplo.com",
      bio: "Administrador de la aplicación MiApp",
    },
  });

  // Security form
  const securityForm = useForm<z.infer<typeof securityFormSchema>>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Notifications form
  const notificationsForm = useForm<z.infer<typeof notificationsFormSchema>>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      emailNotifications: true,
      pushNotifications: true,
      marketingEmails: false,
      activitySummary: true,
    },
  });

  // Submit handlers
  const onProfileSubmit = (data: z.infer<typeof profileFormSchema>) => {
    console.log("Profile data:", data);
    // Handle profile update
  };

  const onSecuritySubmit = (data: z.infer<typeof securityFormSchema>) => {
    console.log("Security data:", data);
    // Handle security update
  };

  const onNotificationsSubmit = (data: z.infer<typeof notificationsFormSchema>) => {
    console.log("Notifications data:", data);
    // Handle notifications update
  };

  return (
    <>
      <Helmet>
        <title>Configuración - MiApp Admin</title>
        <meta name="description" content="Configuración de la cuenta de administrador para la aplicación MiApp - Gestiona tu perfil, seguridad y notificaciones" />
      </Helmet>
      <div className="p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-neutral-800">Configuración</h1>
          <p className="text-neutral-500">Gestiona la configuración de tu cuenta</p>
        </div>

        <Tabs defaultValue="perfil" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="perfil">Perfil</TabsTrigger>
            <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
            <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
          </TabsList>

          <TabsContent value="perfil">
            <Card>
              <CardHeader>
                <CardTitle>Información de Perfil</CardTitle>
                <CardDescription>Actualiza tu información personal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-32 rounded-full bg-neutral-200 mb-4 overflow-hidden">
                        <img 
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpwm93fwjovHMblv_ofyirT2Cm5zJQHMeT6Q&s" 
                          alt="Admin User" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <Button variant="outline" className="mb-2">Cambiar foto</Button>
                      <p className="text-xs text-neutral-500">JPG, GIF o PNG. Máximo 1MB</p>
                    </div>
                  </div>

                  <div className="md:w-2/3">
                    <Form {...profileForm}>
                      <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                        <FormField
                          control={profileForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nombre</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={profileForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={profileForm.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Biografía</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormDescription>
                                Breve descripción sobre ti.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button type="submit" className="bg-primary text-white">
                          <SaveIcon className="h-4 w-4 mr-2" />
                          Guardar cambios
                        </Button>
                      </form>
                    </Form>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seguridad">
            <Card>
              <CardHeader>
                <CardTitle>Seguridad</CardTitle>
                <CardDescription>Actualiza tu contraseña y la configuración de seguridad</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...securityForm}>
                  <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-4">
                    <FormField
                      control={securityForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contraseña actual</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={securityForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nueva contraseña</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormDescription>
                            Al menos 8 caracteres, incluyendo mayúsculas, minúsculas y números.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={securityForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirmar contraseña</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="bg-primary text-white">
                      <SaveIcon className="h-4 w-4 mr-2" />
                      Actualizar contraseña
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notificaciones">
            <Card>
              <CardHeader>
                <CardTitle>Notificaciones</CardTitle>
                <CardDescription>Configura tus preferencias de notificaciones</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...notificationsForm}>
                  <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <FormField
                        control={notificationsForm.control}
                        name="emailNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between">
                            <div className="space-y-0.5">
                              <FormLabel>Notificaciones por email</FormLabel>
                              <FormDescription>
                                Recibe actualizaciones importantes por email.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={notificationsForm.control}
                        name="pushNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between">
                            <div className="space-y-0.5">
                              <FormLabel>Notificaciones push</FormLabel>
                              <FormDescription>
                                Recibe notificaciones en tiempo real en tu dispositivo.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={notificationsForm.control}
                        name="marketingEmails"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between">
                            <div className="space-y-0.5">
                              <FormLabel>Emails de marketing</FormLabel>
                              <FormDescription>
                                Recibe información sobre nuevas características y promociones.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={notificationsForm.control}
                        name="activitySummary"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between">
                            <div className="space-y-0.5">
                              <FormLabel>Resumen de actividad</FormLabel>
                              <FormDescription>
                                Recibe un resumen semanal de la actividad de la aplicación.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button type="submit" className="bg-primary text-white">
                      <SaveIcon className="h-4 w-4 mr-2" />
                      Guardar preferencias
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
