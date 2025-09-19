import { Line, Doughnut } from "react-chartjs-2"
import { ArcElement, CategoryScale, Chart as ChartJS, Filler, Legend, LinearScale, LineElement, PointElement, Tooltip } from "chart.js"
import { getLast7Days } from "../../lib/features";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler);

const labels = getLast7Days();

const LineChart = ({ data = [] }) => {

    const chartData = {
        labels,
        datasets: [
            {
                id: 1,
                label: 'Messages',
                data,
                fill: true,
                borderColor: "#590959",
                backgroundColor: "#d7bfd7"
            }
        ],
    }

    return <Line data={chartData} options={{
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: false
                }
            }
        }
    }} />
}

const DoughnutChart = ({ data = [], labels = [] }) => {

    const chartData = {
        labels,
        datasets: [
            {
                id: 1,
                label: 'Total Chats VS Group Chats',
                data,
                fill: true,
                borderColor: ["#590959", "#20086f"],
                backgroundColor: ["#d7bfd7", "#a394d5"],
            }
        ],
    }

    return <Doughnut data={chartData} options={{
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                display: false
            },
            y: {
                display: false
            }
        },
        spacing: 5,
    }} />
}

export {
    LineChart,
    DoughnutChart
}