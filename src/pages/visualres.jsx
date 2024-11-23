import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const Visualres = () => {
  const location = useLocation();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (location.state && location.state.result) {
      setData(JSON.parse(location.state.result)); // Parse the data passed from the previous component
    }
  }, [location.state]);

  if (!data || !data.fields || !data.barChartData || !data.pieChartData) {
    return <p>Please provide valid data.</p>;
  }

  const colors = ['#00C49F', '#ed133b', '#0088FE', '#FFBB28', '#FF8042', '#AF19FF'];

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '20px' }}>
      {/* Bar Chart Section */}
      <div style={{ textAlign: 'center' }}>
        <h3>Bar Chart</h3>
        <BarChart
          width={700}
          height={400}
          data={data.barChartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="barValue"
            fill="#8884d8"
            animationBegin={0}
            animationDuration={2000}
            animationEasing="ease-out"
          />
        </BarChart>
        <p>The bar chart illustrates the performance of different aspects</p>
      </div>

      {/* Pie Chart Section */}
      <div style={{ textAlign: 'center' }}>
        <h3>Pie Chart</h3>
        <PieChart width={400} height={400}>
          <Pie
            data={data.pieChartData}
            dataKey="pieValue"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={60}
            fill="#8884d8"
            label
            isAnimationActive={true}
            animationBegin={0}
            animationDuration={2000}
            animationEasing="ease-in-out"
          >
            {data.pieChartData.map((entry, index) => (
              <Cell key={`cell - ${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </PieChart>
        <p>The pie chart showing satisfaction levels of Users</p>
      </div>
    </div>
  );
};

export default Visualres;
