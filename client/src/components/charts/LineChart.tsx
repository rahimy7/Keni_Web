import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '1 May', usuarios: 400 },
  { name: '8 May', usuarios: 600 },
  { name: '15 May', usuarios: 500 },
  { name: '22 May', usuarios: 700 },
  { name: '29 May', usuarios: 800 },
  { name: '5 Jun', usuarios: 1000 },
  { name: '12 Jun', usuarios: 1200 },
  { name: '19 Jun', usuarios: 1100 },
  { name: '26 Jun', usuarios: 1300 }
];

export default function LineChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart
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
        <Line 
          type="monotone" 
          dataKey="usuarios" 
          stroke="hsl(var(--primary))" 
          strokeWidth={2} 
          dot={{ r: 4, strokeWidth: 2 }} 
          activeDot={{ r: 6 }} 
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
