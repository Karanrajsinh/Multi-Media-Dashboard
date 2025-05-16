import React, { useState } from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import {
  BarChart2,
  BarChart,
  Package,
  Clock,
  Activity,
  DollarSign
} from 'lucide-react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// TypeScript types for chart data
interface ChartData {
  labels: string[];
  datasets: Array<{
    label?: string;
    data: number[];
    borderColor?: string;
    backgroundColor: string | string[];
    tension?: number;
    fill?: boolean;
    borderRadius?: number;
    borderWidth?: number;
  }>;
}

const WelcomeCard = () => (
  <div className="relative flex justify-between p-6 overflow-hidden text-white rounded-lg shadow-md bg-primary">
    <div>
      <div className="flex items-center">
        <div className="p-2 bg-white rounded-lg bg-opacity-20">
          <BarChart2 className="w-5 h-5 text-white" />
        </div>
      </div>
      <h2 className="mt-4 text-xl font-semibold">Welcome Back<br />David</h2>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <div>
          <div className="text-sm opacity-80">Budget</div>
          <div className="mt-1 text-xl font-bold">$98,450</div>
        </div>
        <div>
          <div className="text-sm opacity-80">Budget</div>
          <div className="mt-1 text-xl font-bold">$2,440</div>
        </div>
      </div>
    </div>

    <div className="absolute -translate-y-1/2 -right-4 top-1/2">
      <img
        src="https://images.pexels.com/photos/7473041/pexels-photo-7473041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Target"
        className="w-48 h-auto"
      />
    </div>
  </div>
);

type StatsCardColor = 'teal' | 'pink' | 'indigo';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  color: StatsCardColor;
  chart: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, color, chart }) => (
  <div className={`bg-${color}-50 dark:bg-${color}-900/10 rounded-lg shadow-sm p-4 sm:p-6`}>
    <div className="mb-6">
      <h3 className={`text-${color}-600 dark:text-${color}-400 text-sm font-medium`}>{title}</h3>
      <div className="flex items-baseline mt-1">
        <div className="text-2xl font-bold">{value}</div>
        <div className={`ml-2 text-xs ${change.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
          {change}
        </div>
      </div>
    </div>
    <div>{chart}</div>
  </div>
);

const Dashboard = () => {
  const { isDarkMode } = useAppSelector(state => state.theme);
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);

  const products = ['App', 'Mobile', 'SaaS', 'Others'];

  // Line chart data for revenue forecast
  const revenueData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: '2024',
        data: [65, 80, 81, 56, 55, 75, 40, 20],
        borderColor: '#6366F1',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        tension: 0.4,
      },
      {
        label: '2023',
        data: [30, 40, 60, 70, 50, 60, 120, 100],
        borderColor: '#EC4899',
        backgroundColor: 'rgba(236, 72, 153, 0.2)',
        tension: 0.4,
      },
      {
        label: '2022',
        data: [45, 60, 55, 50, 45, 60, 55, 45],
        borderColor: '#06B6D4',
        backgroundColor: 'rgba(6, 182, 212, 0.2)',
        tension: 0.4,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: isDarkMode ? '#e5e7eb' : '#4b5563',
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: isDarkMode ? '#9ca3af' : '#6b7280',
        },
        grid: {
          color: isDarkMode ? '#374151' : '#e5e7eb',
        },
      },
      x: {
        ticks: {
          color: isDarkMode ? '#9ca3af' : '#6b7280',
        },
        grid: {
          color: isDarkMode ? '#374151' : '#e5e7eb',
        },
      },
    },
  };

  // Chart data
  const salesData: ChartData = {
    labels: ['0%', '25%', '50%', '75%'],
    datasets: [
      {
        data: [15, 35, 25, 25],
        backgroundColor: ['#6366F1', '#EC4899', '#06B6D4', '#e5e7eb'],
        borderWidth: 0,
      },
    ],
  };

  const customerData: ChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Customers',
        data: [12, 19, 10, 15, 20, 30, 25],
        borderColor: '#6366F1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const projectsData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'Projects',
        data: [65, 59, 80, 81, 56, 55, 40, 60, 55],
        backgroundColor: 'rgba(236, 72, 153, 0.8)',
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>

      {/* First row */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2">
          <WelcomeCard />
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Revenue Forecast</h3>
            <div className="flex space-x-2">
              {['2024', '2023', '2022'].map((year, index) => (
                <div key={year} className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full mr-1 ${index === 0
                      ? 'bg-primary'
                      : index === 1
                        ? 'bg-pink-500'
                        : 'bg-cyan-500'
                      }`}
                  ></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">{year}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Overview of Profit</p>

          <div className="w-full h-48 mt-4">
            <Line data={revenueData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
        <StatsCard
          title="Customers"
          value="36,358"
          change="-12%"
          color="teal"
          chart={
            <div className="w-full h-40 sm:h-48 lg:h-56">
              <Line
                data={customerData}
                options={{
                  ...chartOptions,
                  plugins: { legend: { display: false } },
                  elements: {
                    line: {
                      borderWidth: 2,
                    },
                    point: {
                      radius: 3,
                      hoverRadius: 5,
                    },
                  },
                  scales: {
                    ...chartOptions.scales,
                    x: {
                      ...chartOptions.scales.x,
                      grid: { display: false },
                    },
                    y: {
                      ...chartOptions.scales.y,
                      beginAtZero: true,
                      ticks: {
                        maxTicksLimit: 5,
                        color: isDarkMode ? '#9ca3af' : '#6b7280',
                      },
                    },
                  },
                }}
              />
            </div>
          }
        />

        <StatsCard
          title="Projects"
          value="78,298"
          change="+31.8%"
          color="pink"
          chart={
            <div className="w-full h-40 sm:h-48 lg:h-56">
              <Bar
                data={projectsData}
                options={{
                  ...chartOptions,
                  plugins: { legend: { display: false } },
                  scales: {
                    ...chartOptions.scales,
                    x: {
                      ...chartOptions.scales.x,
                      grid: { display: false },
                    },
                    y: {
                      ...chartOptions.scales.y,
                      beginAtZero: true,
                      ticks: {
                        maxTicksLimit: 5,
                        color: isDarkMode ? '#9ca3af' : '#6b7280',
                      },
                    },
                  },
                  elements: {
                    bar: {
                      borderRadius: 4,
                    },
                  },
                }}
              />
            </div>
          }
        />
      </div>

      {/* Looker Studio Dashboard */}
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-white rounded-lg shadow-sm dark:bg-gray-800 overflow-hidden">
        {iframeLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="w-12 h-12 border-4 rounded-full animate-spin border-primary border-t-transparent"></div>
          </div>
        )}
        {iframeError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <p className="text-lg font-medium">Failed to load dashboard</p>
              <p className="text-sm">Please try refreshing the page</p>
            </div>
          </div>
        )}

        <h3 className="p-4 text-lg font-medium text-gray-900 dark:text-white">Looker Studio Dashboard</h3>
        <p className="px-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
          Overview of your data and insights
        </p>
        <iframe
          src="https://lookerstudio.google.com/embed/reporting/79d97827-3aaa-4477-bb96-175b63f5db52/page/JgD"
          className="w-full h-full border-0"
          title="Looker Studio Dashboard"
          allowFullScreen
          onLoad={() => setIframeLoading(false)}
          onError={() => {
            setIframeLoading(false);
            setIframeError(true);
          }}
        />
      </div>

      {/* Third row */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">Your Performance</h3>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">Last check on 25 february</p>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="p-3 mr-4 bg-indigo-100 rounded-lg dark:bg-indigo-900/20">
                <Package className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">64 new orders</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Processing</div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="p-3 mr-4 bg-red-100 rounded-lg dark:bg-red-900/20">
                <Clock className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">4 orders</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">On hold</div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="p-3 mr-4 bg-teal-100 rounded-lg dark:bg-teal-900/20">
                <Activity className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">12 orders</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Delivered</div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">275</div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Learn insigs how to manage all aspects of your startup.
            </p>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Customers</h3>
            <div className="text-sm font-medium text-green-500">+26.5%</div>
          </div>
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Last 7 days</p>

          <div className="w-full h-40 mt-4">
            <Line
              data={customerData}
              options={{
                ...chartOptions,
                plugins: { legend: { display: false } },
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
            <div>
              <div className="text-gray-500 dark:text-gray-400">April 07 - April 14</div>
              <div className="font-medium text-gray-900 dark:text-white">6,380</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400">Last Week</div>
              <div className="font-medium text-gray-900 dark:text-white">4,298</div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-sm sm:p-6 dark:bg-gray-800">
          <div className="flex flex-col justify-between gap-2 mb-6 sm:flex-row sm:items-center sm:gap-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Sales Overview</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Last 7 days</p>
            </div>
            <select
              className="w-full sm:w-auto px-3 py-1.5 pr-8 text-sm text-gray-700 bg-gray-100 rounded-md appearance-none dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              defaultValue="Sep 2024"
            >
              <option>Sep 2024</option>
              <option>Aug 2024</option>
              <option>Jul 2024</option>
            </select>
          </div>

          <div className="relative mx-auto w-full max-w-[180px] lg:max-w-[240px] aspect-square">
            <Doughnut
              data={salesData}
              options={{
                cutout: '70%',
                maintainAspectRatio: true,
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="font-bold text-gray-900 lg:text-2xl dark:text-white">50%</div>
              <div className="text-xs text-gray-500 lg:text-sm dark:text-gray-400">Total Growth</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6 sm:grid-cols-4">
            {['0%', '25%', '50%', '75%'].map((value, index) => (
              <div key={value} className="flex flex-col items-center">
                <div
                  className={`w-3 h-3 rounded-full mb-2 ${['bg-primary', 'bg-pink-500', 'bg-cyan-500', 'bg-gray-300 dark:bg-gray-600'][index]
                    }`}
                />
                <div className="text-sm font-medium text-gray-900 dark:text-white">{value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Sales</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fourth row */}
      <div className="p-4 bg-white rounded-lg shadow-sm sm:p-6 dark:bg-gray-800">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Revenue by Product</h3>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-4 sm:grid-cols-4">
          {products.map((category, index) => (
            <button
              key={category}
              onClick={() => setActiveProductIndex(index)}
              className={`p-2 sm:p-3 rounded-lg flex items-center space-x-2 transition-colors ${activeProductIndex === index
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
            >
              <div
                className={`p-1.5 rounded-lg ${activeProductIndex === index ? 'bg-white/20' : 'bg-white/60 dark:bg-gray-600'
                  }`}
              >
                <BarChart className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">{category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Fifth row */}
      <div className="relative p-6 overflow-hidden bg-white rounded-lg shadow-sm dark:bg-gray-800">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-lg bg-primary/10 dark:bg-primary/20">
            <DollarSign className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total settlements</h3>
            <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">$122,580</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard