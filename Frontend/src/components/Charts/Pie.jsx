// src/components/PieChartComponent.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, height, width }) => {
  console.log('👊 ~ file: Pie.jsx:9 ~ PieChart ~ width:', width);
  console.log('👊 ~ file: Pie.jsx:9 ~ PieChart ~ height:', height);
  const chartData = {
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        data: [data?.actifCount, data?.totalCount - data?.actifCount],
        backgroundColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],

        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <Pie data={chartData} options={options} height={height} width={width} />
  );
};

export default PieChart;
