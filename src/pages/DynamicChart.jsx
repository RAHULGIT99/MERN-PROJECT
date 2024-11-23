import React from 'react';
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

const DynamicChart = ({ data }) => {
  if (!data || !data.fields || !data.barChartData || !data.pieChartData) {
    return <p>Please provide valid data.</p>;
  }

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '20px' }}>
      {/* Bar Chart Section */}
      <div style={{ textAlign: 'center' }}>
        <h3>Bar Chart</h3>
        <BarChart
          width={600}
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
            animationBegin={0}       // Animation starts immediately after component renders
            animationDuration={2000} // Duration of the bar animation
            animationEasing="ease-out" // Smooth animation effect
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
            isAnimationActive={true}      // Enables animation for the pie chart
            animationBegin={0}            // Animation starts immediately
            animationDuration={2000}      // Duration of the pie animation
            animationEasing="ease-in-out" // Smooth animation effect
          >
            {data.pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </PieChart>
        <p>The pie chart shows satisfaction levels of users</p>
      </div>
    </div>
  );
};

export default DynamicChart;