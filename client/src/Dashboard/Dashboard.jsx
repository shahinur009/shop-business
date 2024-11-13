import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
    const [counts, setCounts] = useState({
        users: 0,
        products: 0,
        customers: 0,
        sales: 0,
        productsBuy: 0,
    });

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/dashboard-counts');
                setCounts(response.data);
                console.log(response?.data);
            } catch (error) {
                console.error('Error fetching counts:', error);
            }
        };
        fetchCounts();
    }, []);

    // Data for the Bar Chart
    const barChartData = {
        labels: ['মোট বিক্রি', 'মোট কাস্টমার', 'মোট প্রোডাক্ট', 'মোট কোম্পানি'],
        datasets: [
            {
                label: 'মোট ',
                data: [
                    counts.salesCount,
                    counts.customerCount,
                    counts.productCount,
                    counts.productsBuyCount,
                ],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    // Options for the Bar Chart
    const barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: Math.max(
                    counts.salesCount,
                    counts.customerCount,
                    counts.productCount,
                    counts.productsBuyCount
                ) + 5, // Adjust as needed
            },
        },
    };

    return (
        <section className="w-full h-screen bg-red-200 px-1 py-2 mb-3 overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 md:gap-4 gap-2">
                <div className="bg-red-500/70 text-white p-6 h-full text-center rounded-[100%] shadow-md">
                    <h2 className="md:text-lg text-sm font-bold">মোট প্রোডাক্ট</h2>
                    <p>{counts.productCount}</p>
                </div>
                <div className="bg-red-500/70 text-white p-6 h-full text-center rounded-[100%] shadow-md">
                    <h2 className="md:text-lg text-sm font-bold">মোট কাস্টমার</h2>
                    <p>{counts.customerCount}</p>
                </div>
                <div className="bg-red-500/70 text-white p-6 h-full text-center rounded-[100%] shadow-md">
                    <h2 className="md:text-lg text-sm font-bold">মোট বিক্রি</h2>
                    <p>{counts.salesCount}</p>
                </div>
                <div className="bg-red-500/70 text-white p-6 h-full text-center rounded-[100%] shadow-md">
                    <h2 className="md:text-lg text-sm font-bold">মোট কোম্পানি </h2>
                    <p>{counts.productsBuyCount}</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="mt-8 bg-red-200">
                <h3 className="text-sm md:text-xl font-semibold mb-4">চার্টে দেখুন </h3>
                <div className="bg-white px-10 py-5 rounded shadow-md " style={{ height: '350px' }}>
                    <Bar data={barChartData} options={barChartOptions} />
                </div>
            </div>
        </section>
    );
};

export default Dashboard;

    
    
    