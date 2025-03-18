'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface ChartProps {
  chart: Record<string, number>;
}

const PieChartComponent: React.FC<ChartProps> = ({ chart }) => {
  const chartData = Object.keys(chart).map((key) => ({
    category: key,
    value: chart[key],
  }));

  const totalValue = chartData.reduce((acc, item) => acc + item.value, 0);

  const colors = [
    '#277C78',
    '#82C9D7',
    '#F2CDAC',
    '#626070',
    '#FF7F50',
    '#FFD700',
    '#FF1730',
    '#277d23',
    '#272c23',
  ];

  return (
    <div style={{ maxWidth: 400 }} className='relative '>
      <div style={{ position: 'relative', height: '300px' }}>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={chartData}
              dataKey='value'
              nameKey='category'
              cx='50%'
              innerRadius={80}
              outerRadius={120}
              paddingAngle={2}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `$${value}`} />
            {/* <Legend /> */}
          </PieChart>
        </ResponsiveContainer>

        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '6px',
            }}
          >
            ${totalValue}
          </span>
          <br />
          <span style={{ color: '#6b7280' }}>Total Expenses</span>
        </div>
      </div>
    </div>
  );
};

export default PieChartComponent;
