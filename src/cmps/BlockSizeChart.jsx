import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


export function BlockSizeChart({ data }) {

  const elContainer = document.querySelector('.main')
  const height = elContainer.offsetHeight
  return (
    <ResponsiveContainer width="100%" height={height * 0.3}>
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />

        <Area type="monotone" dataKey="MB" stroke="#f7941d" fill="rgba(247, 148, 29, 0.3)" />
      </AreaChart>
    </ResponsiveContainer>
  );

}
