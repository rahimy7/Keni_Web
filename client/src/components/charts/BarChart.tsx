import { useEffect, useRef } from "react";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Ene', Conexiones: 1000 },
  { name: 'Feb', Conexiones: 1200 },
  { name: 'Mar', Conexiones: 800 },
  { name: 'Abr', Conexiones: 1500 },
  { name: 'May', Conexiones: 1800 },
  { name: 'Jun', Conexiones: 1200 },
  { name: 'Jul', Conexiones: 2000 },
  { name: 'Ago', Conexiones: 2200 },
  { name: 'Sep', Conexiones: 1800 },
  { name: 'Oct', Conexiones: 2400 },
  { name: 'Nov', Conexiones: 2600 },
  { name: 'Dic', Conexiones: 3000 },
];

export default function BarChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip />
        <Bar dataKey="Conexiones" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
