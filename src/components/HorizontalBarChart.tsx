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

interface HorizontalBarChartProps {
  population: number[];
  names: string[];
}

const HorizontalBarChart = ({ population, names }: HorizontalBarChartProps) => {
	const options = {
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      barRoundness: 1,
    },
    barThickness: 40,
    scales: {
      y: {
        ticks: {
          callback: (label, index, labels) =>{
            // if label is longer return ...
            if(names[index].length > 15) return names[index].substring(0, 15) + '...'
            return names[index]
          },
        },
      },
      x: {
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
		<div style={{ width: 'auto', height: `${names.length * 60}px`}}>
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
            borderWidth: 2,
          },
        ]}}
      />
		</div>
	);
};

export default HorizontalBarChart;