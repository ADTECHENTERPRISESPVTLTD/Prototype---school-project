'use client'

import { useState } from 'react'
import Header from '@/components/header'
import { BarChart3, Users, TrendingUp, PieChart, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('analytics')

  const analyticsData = [
    { label: 'Total Enrollment', value: 1250, change: '+5%' },
    { label: 'Pass Rate', value: '92%', change: '+2%' },
    { label: 'Average Percentage', value: '91%', change: '+2.5%' },
    { label: 'Faculty Count', value: 125, change: '+3' },
  ]

  const departmentStats = [
    { name: 'Science', students: 350, growth: '+8%', performance: 'Excellent' },
    { name: 'Arts', students: 280, growth: '+5%', performance: 'Very Good' },
    { name: 'Commerce', students: 420, growth: '+12%', performance: 'Excellent' },
    { name: 'Sports', students: 200, growth: '+3%', performance: 'Good' },
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">School Analytics & Reporting</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {analyticsData.map((metric, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
              <p className="text-gray-600 text-sm font-medium">{metric.label}</p>
              <div className="flex justify-between items-end mt-2">
                <p className="text-3xl font-bold text-blue-600">{metric.value}</p>
                <span className="text-green-600 text-sm font-medium">{metric.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200 flex-wrap">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex-1 min-w-fit px-6 py-4 font-medium border-b-2 transition ${
                activeTab === 'analytics'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 className="inline mr-2" size={18} />
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('departments')}
              className={`flex-1 min-w-fit px-6 py-4 font-medium border-b-2 transition ${
                activeTab === 'departments'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <PieChart className="inline mr-2" size={18} />
              Departments
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex-1 min-w-fit px-6 py-4 font-medium border-b-2 transition ${
                activeTab === 'users'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Users className="inline mr-2" size={18} />
              User Management
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'analytics' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Enrollment Trend</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">2022</span>
                          <span className="text-sm font-bold text-gray-900">1050</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '84%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">2023</span>
                          <span className="text-sm font-bold text-gray-900">1150</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">2024</span>
                          <span className="text-sm font-bold text-gray-900">1250</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Pass Rate</span>
                        <span className="font-bold text-green-600">92%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Attendance Rate</span>
                        <span className="font-bold text-green-600">96%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Student Satisfaction</span>
                        <span className="font-bold text-green-600">4.7/5</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Teacher Performance</span>
                        <span className="font-bold text-green-600">4.6/5</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                  Download Full Report
                </button>
              </div>
            )}

            {activeTab === 'departments' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Department</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Students</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Growth</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Performance</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentStats.map((dept, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{dept.name}</td>
                        <td className="py-3 px-4 text-gray-600">{dept.students}</td>
                        <td className="py-3 px-4 text-green-600 font-medium">{dept.growth}</td>
                        <td className="py-3 px-4">
                          <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                            {dept.performance}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">User Statistics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-gray-600 text-sm">Active Users</p>
                      <p className="text-2xl font-bold text-blue-600 mt-1">2,450</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Admin Accounts</p>
                      <p className="text-2xl font-bold text-purple-600 mt-1">25</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">New This Month</p>
                      <p className="text-2xl font-bold text-green-600 mt-1">156</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Inactive</p>
                      <p className="text-2xl font-bold text-orange-600 mt-1">234</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Recent Activities</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-700">New student registration</span>
                      <span className="text-gray-600 text-sm">2 hours ago</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-700">Faculty password reset</span>
                      <span className="text-gray-600 text-sm">5 hours ago</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-700">Admin report generated</span>
                      <span className="text-gray-600 text-sm">1 day ago</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-700">System maintenance completed</span>
                      <span className="text-gray-600 text-sm">2 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

<Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
    </main>
  )
}
