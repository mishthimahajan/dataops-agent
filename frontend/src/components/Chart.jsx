import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart({ rewards }) {
  const data = {
    labels: rewards.map((_, i) => `Step ${i + 1}`),
    datasets: [
      {
        label: "Reward Progress",
        data: rewards,
        borderColor: "#22c55e",   // ✅ visible green line
        backgroundColor: "#4ade80",
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: "#22c55e"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "white"
        }
      }
    },
    scales: {
      x: {
        ticks: { color: "white" }
      },
      y: {
        ticks: { color: "white" },
        beginAtZero: true
      }
    }
  };

  return (
    <div style={{ width: "70%", margin: "20px auto" }}>
      <Line data={data} options={options} />
    </div>
  );
}