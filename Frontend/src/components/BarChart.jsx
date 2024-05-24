import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function BarChart(props) {
    const { data } = props;
    const { t } = useTranslation();
    const [chartData, setChartData] = useState();
    const year = new Date().getFullYear();
    const [labels, setLabels] = useState([])
    const options = {
        responsive: true,
        plugins: {
          title: {
            display: false,
          },
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
        if (data && data.length > 0) {
            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: `${t('total_payments')} ${year}`,
                        backgroundColor: 'rgba(68, 183, 30, 0.5)',
                        borderColor: 'rgba(68, 183, 30, 0.7)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(68, 183, 30, 0.7)',
                        hoverBorderColor: 'rgba(68, 183, 30, 0.7)',
                        data: data,
                    },
                    
                    
                ]
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [data])

    if (!chartData || !chartData.datasets) { return null}

    return (
        <Bar
            options={options}
            data={chartData}
        />
  )
}

export default BarChart