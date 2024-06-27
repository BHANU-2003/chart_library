import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale';
import 'bootstrap/dist/css/bootstrap.css'
import './chart.css'
import zoomPlugin from 'chartjs-plugin-zoom';
Chart.register(...registerables,zoomPlugin);


//Chart Componet Function
const ChartComponent = () => {
  const chartRef = useRef(null);
  //Creation of the Instances
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    console.log(ctx);

    //Data of sales
    const data = {
      datasets: [{
        label: 'Car Sales',
        data: [
          { x: new Date('2023-01-27T00:00:00'), y: 30 },
          { x: new Date('2023-02-27T01:00:00'), y: 60 },
          { x: new Date('2023-03-27T02:00:00'), y: 70 },
          { x: new Date('2023-04-27T00:00:00'), y: 80 },
          { x: new Date('2023-05-27T00:00:00'), y: 90 },
          { x: new Date('2023-06-27T00:00:00'), y: 30 },
          { x: new Date('2023-07-27T00:00:00'), y: 50 },
          { x: new Date('2023-08-27T00:00:00'), y: 20 },
          { x: new Date('2023-09-27T00:00:00'), y: 5 },
          { x: new Date('2023-10-27T00:00:00'), y: 40 },
          { x: new Date('2023-11-27T00:00:00'), y: 70 },
          { x: new Date('2023-12-27T00:00:00'), y: 90 },
        ],
        backgroundColor: [
          'rgba(255, 26, 104, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(0, 0, 0, 0.2)'
        ],
        borderColor: [
          'rgba(255, 26, 104, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(0, 0, 0, 1)'
        ],
        borderWidth: 1
      }]
    };

    const config = {
      type: 'bar',
      data,
      options: {
        borderWidth:500,
        cutout:60,
        aspectRatio:1.8,
        plugins:{
          zoom: {
            mode:'x',
            wheel:{
              enabled: true
            }
          }
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'hour',
              tooltipFormat: 'Pp',
              displayFormats: {
                hour: 'MMM dd, h:mm a'
              }
            },
            adapters: {
              date: {
                locale: enUS
              }
            }
          },
          y: {
            beginAtZero: true
          }
        }
      }
    };

    const newChartInstance = new Chart(ctx, config);
    setChartInstance(newChartInstance);
    

    // Assigning Chart.js version
    const chartVersion = document.getElementById('chartVersion');
    if (chartVersion) {
      chartVersion.innerText = Chart.version;
      console.log(chartVersion);
    }

    return () => {
      newChartInstance.destroy();
    };
  }, []);

  //Filter the date based on time
  const dateFilter = (unit) => {
    chartInstance.options.scales.x.time.unit = unit;
    chartInstance.update();
  };

  return (
    <div>
      <div className="chartMenu">
        <b><h1 className='chartHeading'>Chart Library</h1></b>  
      </div>
      <div className="chartCard">
        <div className="chartBox">
          <canvas className='graphChart' ref={chartRef} id="myChart"></canvas>
          <div>
            <button className='btn btn-primary m-2' onClick={() => dateFilter('hour')}>Hour</button>
            <button className='btn btn-primary m-2' onClick={() => dateFilter('day')}>Day</button>
            <button className='btn btn-primary m-2' onClick={() => dateFilter('month')}>Month</button>
            <button className='btn btn-primary m-2' onClick={() => dateFilter('year')}>Year</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;
