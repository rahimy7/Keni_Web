import { useEffect, useRef } from "react";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Ene', ventas: 1000 },
  { name: 'Feb', ventas: 1200 },
  { name: 'Mar', ventas: 800 },
  { name: 'Abr', ventas: 1500 },
  { name: 'May', ventas: 1800 },
  { name: 'Jun', ventas: 1200 },
  { name: 'Jul', ventas: 2000 },
  { name: 'Ago', ventas: 2200 },
  { name: 'Sep', ventas: 1800 },
  { name: 'Oct', ventas: 2400 },
  { name: 'Nov', ventas: 2600 },
  { name: 'Dic', ventas: 3000 },
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
        <Bar dataKey="ventas" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
