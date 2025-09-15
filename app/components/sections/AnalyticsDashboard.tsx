'use client';

import { useEffect, useState } from 'react';
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
import { getAnalyticsData } from '../../lib/analytics';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState({
    visitors: 0,
    projectClicks: {},
    formSubmissions: 0,
  });

  useEffect(() => {
    const data = getAnalyticsData();
    console.log('AnalyticsDashboard data:', data); // Debug log
    setAnalytics(data);
  }, []);

  const chartData = {
    labels: ['Visitors', 'Form Submissions', ...Object.keys(analytics.projectClicks)],
    datasets: [
      {
        label: 'Analytics',
        data: [
          analytics.visitors,
          analytics.formSubmissions,
          ...Object.values(analytics.projectClicks),
        ],
        backgroundColor: 'rgba(51, 187, 207, 0.5)',
        borderColor: 'rgba(51, 187, 207, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <section id="analytics" className="w-full py-20">
      <h2 className="text-[36px] gradient-text text-center font-bold mb-10">Analytics Dashboard</h2>
      <div className="max-w-5xl mx-auto px-4 glassmorphism p-6 bg-[#1B1F29] rounded-[12px] shadow-card">
        <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      </div>
    </section>
  );
}
