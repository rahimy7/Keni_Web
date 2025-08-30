import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@/lib/icons";
import { Helmet } from "react-helmet";

interface Subforo {
  id: number;
  nombre: string;
}

interface ForoCurso {
  id: number;
  curso: string;
  subforos: Subforo[];
}

export default function ForosPage() {
  const foros: ForoCurso[] = [
    {
      id: 1,
      curso: "Introducción a la Biblia",
      subforos: [
        { id: 1, nombre: "General" },
        { id: 2, nombre: "Lección 1" },
        { id: 3, nombre: "Lección 2" },
      ],
    },
    {
      id: 2,
      curso: "Discipulado Básico",
      subforos: [
        { id: 1, nombre: "General" },
        { id: 2, nombre: "Unidad 1" },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Administración de Foros</title>
      </Helmet>
      <div className="p-6 space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Administración de Foros</CardTitle>
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" />
              Nuevo Foro
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Curso</TableHead>
                  <TableHead>Subforos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {foros.map((foro) => (
                  <TableRow key={foro.id}>
                    <TableCell className="font-medium">{foro.curso}</TableCell>
                    <TableCell>
                      <ul className="list-disc pl-4 space-y-1">
                        {foro.subforos.map((subforo) => (
                          <li key={subforo.id}>{subforo.nombre}</li>
                        ))}
                      </ul>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

