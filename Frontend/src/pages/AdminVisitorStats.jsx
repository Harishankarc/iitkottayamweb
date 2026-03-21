import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, TrendingUp, Users, Eye } from 'lucide-react';
import API from '../api/api';
import { useTheme } from '../context/createContext';

const AdminVisitorStats = () => {
  const { darkMode } = useTheme();
  const [stats, setStats] = useState(null);
  const [period, setPeriod] = useState('all');
  const [groupBy, setGroupBy] = useState('day');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const periods = [
    { value: 'day', label: 'Last 24 Hours' },
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'year', label: 'Last Year' },
    { value: 'all', label: 'All Time' }
  ];

  const groupByOptions = [
    { value: 'day', label: 'Per Day' },
    { value: 'week', label: 'Per Week' },
    { value: 'month', label: 'Per Month' },
    { value: 'year', label: 'Per Year' }
  ];

  useEffect(() => {
    fetchVisitorStats();
  }, [period]);

  const fetchVisitorStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await API.get(`/api/visitors/stats?period=${period}`);
      const statsData = response?.data?.data || response?.data;
      setStats(statsData);
    } catch (err) {
      console.error('Error fetching visitor stats:', err);
      setError('Failed to load visitor statistics');
    } finally {
      setLoading(false);
    }
  };

  const bgMain = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const bgCard = darkMode ? 'bg-gray-800' : 'bg-white';
  const textPrimary = darkMode ? 'text-gray-100' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';

  const chartData = useMemo(() => {
    if (!stats?.dailyStats?.length) return [];

    const grouped = {};

    const getWeekKey = (dateInput) => {
      const date = new Date(dateInput);
      const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      const dayNum = utcDate.getUTCDay() || 7;
      utcDate.setUTCDate(utcDate.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(utcDate.getUTCFullYear(), 0, 1));
      const weekNo = Math.ceil((((utcDate - yearStart) / 86400000) + 1) / 7);
      return `${utcDate.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
    };

    stats.dailyStats.forEach((entry) => {
      const date = new Date(entry.date);
      let key = entry.date;

      if (groupBy === 'week') {
        key = getWeekKey(entry.date);
      } else if (groupBy === 'month') {
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      } else if (groupBy === 'year') {
        key = `${date.getFullYear()}`;
      }

      if (!grouped[key]) {
        grouped[key] = { label: key, uniqueVisitors: 0, totalVisits: 0 };
      }

      grouped[key].uniqueVisitors += entry.uniqueVisitors || 0;
      grouped[key].totalVisits += entry.totalVisits || 0;
    });

    return Object.values(grouped).sort((a, b) => a.label.localeCompare(b.label));
  }, [stats, groupBy]);

  return (
    <div className={`${bgMain} min-h-screen py-8 px-4`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`${bgCard} rounded-lg shadow-md p-6 mb-8`}>
          <div className="flex items-center justify-between mb-4">
            <h1 className={`${textPrimary} text-3xl font-bold flex items-center gap-2`}>
              <Eye className="w-8 h-8 text-green-600" />
              Visitor Analytics
            </h1>
          </div>

          {/* Period Selector */}
          <div className="flex flex-wrap gap-2">
            {periods.map(p => (
              <button
                key={p.value}
                onClick={() => setPeriod(p.value)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  period === p.value
                    ? 'bg-green-600 text-white'
                    : `${bgMain} ${textSecondary} border ${borderColor} hover:bg-green-600/10`
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Group By Selector */}
          <div className="mt-4">
            <p className={`${textSecondary} text-sm mb-2 font-medium`}>Show visitors as:</p>
            <div className="flex flex-wrap gap-2">
              {groupByOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setGroupBy(option.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    groupBy === option.value
                      ? 'bg-blue-600 text-white'
                      : `${bgMain} ${textSecondary} border ${borderColor} hover:bg-blue-600/10`
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <div className={`${bgCard} rounded-lg shadow-md p-12 text-center`}>
            <p className={textSecondary}>Loading visitor statistics...</p>
          </div>
        ) : stats ? (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Total Visits Card */}
              <div className={`${bgCard} rounded-lg shadow-md p-6`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={textSecondary}>Total Visits</p>
                    <p className={`${textPrimary} text-3xl font-bold mt-2`}>
                      {stats.summary?.totalVisits?.toLocaleString()}
                    </p>
                  </div>
                  <TrendingUp className="w-12 h-12 text-green-600 opacity-20" />
                </div>
              </div>

              {/* Unique Visitors Card */}
              <div className={`${bgCard} rounded-lg shadow-md p-6`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={textSecondary}>Unique Visitors</p>
                    <p className={`${textPrimary} text-3xl font-bold mt-2`}>
                      {stats.summary?.uniqueVisitors?.toLocaleString()}
                    </p>
                  </div>
                  <Users className="w-12 h-12 text-blue-600 opacity-20" />
                </div>
              </div>

              {/* Average Visits Per Visitor Card */}
              <div className={`${bgCard} rounded-lg shadow-md p-6`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={textSecondary}>Avg. Visits/Visitor</p>
                    <p className={`${textPrimary} text-3xl font-bold mt-2`}>
                      {(
                        stats.summary?.totalVisits / (stats.summary?.uniqueVisitors || 1)
                      ).toFixed(2)}
                    </p>
                  </div>
                  <Calendar className="w-12 h-12 text-purple-600 opacity-20" />
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Grouped Visitors Chart */}
              {chartData.length > 0 && (
                <div className={`${bgCard} rounded-lg shadow-md p-6`}>
                  <h2 className={`${textPrimary} text-lg font-bold mb-4`}>
                    Visitors {groupByOptions.find((g) => g.value === groupBy)?.label}
                  </h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={borderColor} />
                      <XAxis 
                        dataKey="label" 
                        stroke={textSecondary}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis stroke={textSecondary} tick={{ fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: darkMode ? '#1f2937' : '#fff',
                          border: `1px solid ${borderColor}`,
                          borderRadius: '8px'
                        }}
                        cursor={{ fill: 'rgba(34, 197, 94, 0.1)' }}
                      />
                      <Legend />
                      <Bar dataKey="uniqueVisitors" fill="#3b82f6" name="Unique Visitors" />
                      <Bar dataKey="totalVisits" fill="#22c55e" name="Total Visits" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Visits Trend Chart */}
              {chartData.length > 0 && (
                <div className={`${bgCard} rounded-lg shadow-md p-6`}>
                  <h2 className={`${textPrimary} text-lg font-bold mb-4`}>
                    Visit Trend {groupByOptions.find((g) => g.value === groupBy)?.label}
                  </h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={borderColor} />
                      <XAxis 
                        dataKey="label" 
                        stroke={textSecondary}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis stroke={textSecondary} tick={{ fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: darkMode ? '#1f2937' : '#fff',
                          border: `1px solid ${borderColor}`,
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="totalVisits" stroke="#22c55e" strokeWidth={2} name="Total Visits" />
                      <Line type="monotone" dataKey="uniqueVisitors" stroke="#3b82f6" strokeWidth={2} name="Unique Visitors" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Top Visitors Table */}
            {stats.topVisitors && stats.topVisitors.length > 0 && (
              <div className={`${bgCard} rounded-lg shadow-md p-6`}>
                <h2 className={`${textPrimary} text-lg font-bold mb-4`}>Top Visitors</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className={`border-b ${borderColor}`}>
                        <th className={`${textSecondary} text-left py-3 px-4 font-semibold`}>Visitor ID</th>
                        <th className={`${textSecondary} text-center py-3 px-4 font-semibold`}>Total Visits</th>
                        <th className={`${textSecondary} text-right py-3 px-4 font-semibold`}>Last Visited</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.topVisitors.map((visitor, idx) => (
                        <tr key={idx} className={`border-b ${borderColor} hover:${darkMode ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                          <td className={`${textPrimary} py-3 px-4 font-mono text-xs`}>
                            {visitor.visitorId.substring(0, 20)}...
                          </td>
                          <td className="text-center py-3 px-4">
                            <span className="bg-green-600/20 text-green-600 px-2 py-1 rounded font-bold">
                              {visitor.totalVisits}
                            </span>
                          </td>
                          <td className={`${textSecondary} text-right py-3 px-4 text-xs`}>
                            {new Date(visitor.lastVisitAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Date Range Info */}
            <div className={`${bgCard} rounded-lg shadow-md p-6 mt-8`}>
              <p className={textSecondary}>
                <span className="font-medium">Period:</span> {stats.dateRange?.start} to {stats.dateRange?.end}
              </p>
              <p className={`${textSecondary} mt-2`}>
                <span className="font-medium">View:</span> {groupByOptions.find((g) => g.value === groupBy)?.label}
              </p>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default AdminVisitorStats;
