import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
); 

const LineChart = (props) => {
  const { t } = useTranslation();
  const { ordersStatistics } = props;
  const [chartData, setChartData] = useState(null);
  const [labels, setLabels] = useState([])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: t('growing')
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      }/* ,
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
      }, */
    },
  }

  useEffect(() => {
    const getPassedMonths = () => {
      const passedMonths = [];
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      const startDate = moment(`${currentYear}-01-01`);
      const endDate = moment(`${currentYear}-${currentMonth + 2}-01`);
      console.log(startDate, endDate);
      for(let i = 0; i < 12; i++) {
        const date = moment(startDate).add(i, 'months');
        if (moment(date).isBefore(endDate)) {
          passedMonths.push(date.format('MMMM'));
        }
      }
      setLabels(passedMonths);
    }
    getPassedMonths();
  }, [])

  useEffect(() => {
    if (ordersStatistics) {
      setChartData({
        labels: labels,
        datasets: [
          /* {
            label: 'Orders',
            data: ordersStatistics?.totalByMonth,
            borderColor: 'rgb(79, 107, 171)',
            backgroundColor: 'rgba(79, 107, 171, 0.6)',
            yAxisID: 'y',
          },
          {
            label: 'Accepted',
            data: ordersStatistics?.acceptedByMonth,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(126, 180, 105, 0.6)',
            yAxisID: 'y',
          }, */
          
          {
            label: t('total_sales'),
            data: ordersStatistics?.totalAcceptedOrdersPricesByMonth,
            borderColor: 'rgb(126, 180, 105)',
            backgroundColor: 'rgba(126, 180, 105, 0.6)',
          },

        ],
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ordersStatistics])

  if (!chartData || !chartData.datasets) { return null}

  console.log(labels);
  
  return (
    <Line options={options} data={chartData} />
  );
};

export default LineChart;
