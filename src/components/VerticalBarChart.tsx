import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
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
            borderColor:  'rgba(9, 74, 118, 0.54)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderWidth: 3,
          },
        ]}}
      />
		</div>
	);
};

export default VerticalBarChart;