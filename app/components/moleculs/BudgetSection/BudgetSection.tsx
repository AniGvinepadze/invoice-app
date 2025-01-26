'use client';

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
  browser: string;
  visitors: number;
  color: string;
}

const chartData: ChartData[] = [
  { browser: 'Entertainment', visitors: 50.0, color: '#277C78' },
  { browser: 'Bills', visitors: 750.0, color: '#82C9D7' },
  { browser: 'Dining Out', visitors: 75.0, color: '#F2CDAC' },
  { browser: 'Personal Care', visitors: 100.0, color: '#626070' },
];

const PieChartComponent: React.FC = () => {
  const totalVisitors = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.visitors, 0),
    []
  );

  return (
    <div style={{ maxWidth: 500 }}>
      <div style={{ position: 'relative', height: '300px' }}>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={chartData}
              dataKey='visitors'
              nameKey='browser'
              cx='50%'
              innerRadius={93}
              outerRadius={150}
              paddingAngle={1}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value: number) => `$${value}`}
              contentStyle={{
                borderRadius: '50px',
              }}
            />
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
              fontSize: '30px',
              fontWeight: 'bold',
              marginBottom: '6px',
            }}
          >
            $338
          </span>
          <br />
          <span style={{ color: '#6b7280' }}>of ${totalVisitors} limit </span>
        </div>
      </div>
    </div>
  );
};

export default PieChartComponent;
