
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface VerticalBarChartProps {
  population: number[];
  names: string[];
}

const VerticalBarChart = ({ population, names }: VerticalBarChartProps) => {
	const options = {
    aspectRatio: 3.5,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y:{
        ticks: {
          callback: (value, index, values) =>{
            if(value>=1000000) return value/1000000+' M'
            return value
          },
        },
      }
    }
  };

	return (
		<div style={{ minWidth: '80vw', minHeight: '50vh'}}>
      <Bar
        options={options}
        data={{
          labels: names,
          datasets: [
          {
            label: 'Population',
            data: population,
            borderColor: [
              'rgba(108, 9, 31, 0.63)',
              'rgba(112, 66, 19, 0.67)',
              'rgba(129, 93, 9, 0.68)',
              'rgba(10, 85, 85, 0.7)',
              'rgba(9, 74, 118, 0.54)',
              'rgba(44, 19, 94, 0.72)'
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderWidth: 3,
          },
        ]}}
      />
		</div>
	);
};

export default VerticalBarChart;