import React from 'react';
import { Employee, LeaveRequest } from '../types';

interface DashboardTabProps {
  employees: Employee[];
  leaveRequests: LeaveRequest[];
  onAddRecruitment: () => void;
  onSelectEmployee: (emp: Employee) => void;
  onViewAllActivities: () => void;
}

export default function DashboardTab({
  employees,
  leaveRequests,
  onAddRecruitment,
  onSelectEmployee,
  onViewAllActivities
}: DashboardTabProps) {
  // Compute some dashboard statistics dynamically based on state
  const totalEmployees = employees.length + 1243; // base from mock
  const pendingLeavesCount = leaveRequests.filter(r => r.status === 'Pending').length;
  
  // Recent 4 employees for "Recent Employee Updates"
  const recentEmployees = employees.slice(0, 4);

  // Workforce Overview static chart data with interactive hover
  const monthlyData = [
    { name: 'May', count: 1180, height: '65%', active: false },
    { name: 'Jun', count: 1210, height: '72%', active: false },
    { name: 'Jul', count: 1205, height: '70%', active: false },
    { name: 'Aug', count: 1232, height: '85%', active: false },
    { name: 'Sep', count: 1240, height: '88%', active: false },
    { name: 'Oct', count: totalEmployees, height: '95%', active: true }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner / Hero */}
      <section className="flex justify-between items-end pb-4 border-b border-primary/10">
        <div>
          <h2 className="text-4xl font-serif font-medium text-primary leading-tight tracking-tight italic">
            Welcome back, Sarah
          </h2>
          <p className="text-xs text-on-surface-variant mt-1.5 uppercase tracking-[0.1em]">
            Personnel Gazette &bull; Today is Oct 24
          </p>
        </div>
        <button
          onClick={onAddRecruitment}
          className="bg-primary hover:bg-black/90 text-white px-6 py-2.5 rounded-none text-[10px] uppercase tracking-[0.2em] font-bold flex items-center border border-primary transition-all duration-150 active:scale-[0.98] cursor-pointer"
        >
          <span className="material-symbols-outlined mr-2 text-[16px]">add</span>
          New Recruitment
        </button>
      </section>

      {/* KPI Stats Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Total Employees */}
        <div className="bg-surface-bright border border-primary/10 rounded-none p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center border-b border-primary/5 pb-3 mb-3 w-full">
            <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>
              group
            </span>
            <span className="text-secondary font-bold text-[9px] tracking-wider uppercase">
              +2.5% YoY
            </span>
          </div>
          <div>
            <p className="text-[9px] text-on-surface-variant uppercase font-bold tracking-[0.25em]">
              Total Employees
            </p>
            <h3 className="text-3xl font-serif font-medium text-primary mt-1">
              {totalEmployees.toLocaleString()}
            </h3>
          </div>
        </div>

        {/* Card 2: Attendance Rate */}
        <div className="bg-surface-bright border border-primary/10 rounded-none p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center border-b border-primary/5 pb-3 mb-3 w-full">
            <span className="material-symbols-outlined text-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>
              check_circle
            </span>
            <span className="text-on-surface-variant font-bold text-[9px] tracking-wider uppercase">
              Nominal
            </span>
          </div>
          <div>
            <p className="text-[9px] text-on-surface-variant uppercase font-bold tracking-[0.25em]">
              Attendance Rate
            </p>
            <h3 className="text-3xl font-serif font-medium text-primary mt-1">
              94%
            </h3>
          </div>
        </div>

        {/* Card 3: Pending Leave */}
        <div className="bg-surface-bright border border-primary/10 rounded-none p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center border-b border-primary/5 pb-3 mb-3 w-full">
            <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>
              pending_actions
            </span>
            <span className="text-secondary font-bold text-[9px] tracking-wider uppercase">
              {pendingLeavesCount} pending
            </span>
          </div>
          <div>
            <p className="text-[9px] text-on-surface-variant uppercase font-bold tracking-[0.25em]">
              Pending Leave
            </p>
            <h3 className="text-3xl font-serif font-medium text-primary mt-1">
              {pendingLeavesCount}
            </h3>
          </div>
        </div>

        {/* Card 4: Active Projects */}
        <div className="bg-surface-bright border border-primary/10 rounded-none p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center border-b border-primary/5 pb-3 mb-3 w-full">
            <span className="material-symbols-outlined text-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>
              water_drop
            </span>
            <span className="text-secondary font-bold text-[9px] tracking-wider uppercase">
              Active
            </span>
          </div>
          <div>
            <p className="text-[9px] text-on-surface-variant uppercase font-bold tracking-[0.25em]">
              Active Projects
            </p>
            <h3 className="text-3xl font-serif font-medium text-primary mt-1">
              8
            </h3>
          </div>
        </div>
      </section>

      {/* Analytics Column Structure */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workforce Overview Bar Chart */}
        <div className="lg:col-span-2 bg-surface-bright border border-primary/10 rounded-none p-6">
          <div className="flex justify-between items-center mb-6 select-none">
            <h4 className="font-serif font-bold text-base text-primary italic">Workforce Overview</h4>
            <div className="relative">
              <select className="bg-surface-container-low border border-primary/10 rounded-none text-[10px] uppercase tracking-wider font-semibold py-1 px-2.5 focus:ring-0 cursor-pointer">
                <option>Last 6 Months</option>
                <option>Year to Date</option>
              </select>
            </div>
          </div>
          
          <div className="h-64 w-full relative flex items-end justify-between gap-4 pt-10 px-4">
            {monthlyData.map((data, index) => (
              <div 
                key={index} 
                className={`flex-1 rounded-none relative group transition-all duration-300 cursor-pointer ${
                  data.active 
                    ? 'bg-secondary hover:bg-secondary/90' 
                    : 'bg-primary/10 hover:bg-primary/20'
                }`}
                style={{ height: data.height }}
              >
                {/* Tooltip on Hover */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-none shadow-md pointer-events-none transition-all duration-200 z-10 whitespace-nowrap">
                  {data.count.toLocaleString()} Employees
                </div>
                <div className={`absolute bottom-[-28px] left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-wider font-semibold text-on-surface-variant ${
                  data.active ? 'font-bold text-primary' : 'font-medium'
                }`}>
                  {data.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Breakdown Donut Chart */}
        <div className="bg-surface-bright border border-primary/10 rounded-none p-6">
          <h4 className="font-serif font-bold text-base text-primary mb-6 italic">Attendance Today</h4>
          <div className="flex flex-col items-center justify-center h-64">
            <div className="relative w-40 h-40 select-none">
              {/* SVG Donut Chart */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle 
                  cx="18" 
                  cy="18" 
                  r="15.9155" 
                  fill="none" 
                  className="text-surface-container" 
                  stroke="currentColor" 
                  strokeWidth="3.5"
                />
                <circle 
                  cx="18" 
                  cy="18" 
                  r="15.9155" 
                  fill="none" 
                  stroke="var(--color-secondary)" 
                  strokeWidth="3.5"
                  strokeDasharray="94 100" 
                  strokeLinecap="square"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-serif font-medium text-primary">94%</span>
                <span className="text-[9px] text-on-surface-variant uppercase font-bold tracking-[0.2em]">
                  On-Time
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 w-full mt-6 text-center select-none">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-on-surface-variant">On-time</p>
                <p className="text-xs font-serif font-bold text-secondary">1,173</p>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-on-surface-variant">Late</p>
                <p className="text-xs font-serif font-bold text-primary">42</p>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-on-surface-variant">Absent</p>
                <p className="text-xs font-serif font-bold text-[#8A3F3F]">33</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Employee Updates Table Section */}
      <section className="bg-surface-bright border border-primary/10 rounded-none overflow-hidden">
        <div className="px-6 py-4 border-b border-primary/10 flex justify-between items-center select-none">
          <h4 className="font-serif font-bold text-base text-primary italic">Recent Employee Updates</h4>
          <button 
            onClick={onViewAllActivities}
            className="text-secondary font-bold text-[10px] uppercase tracking-widest hover:underline cursor-pointer"
          >
            View All Activities
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low/60 text-[9px] text-on-surface-variant uppercase font-bold tracking-[0.18em] border-b border-primary/10">
              <tr>
                <th className="px-6 py-3.5">Employee Name</th>
                <th className="px-6 py-3.5">Department</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Date Updated</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {recentEmployees.map((emp) => (
                <tr 
                  key={emp.id} 
                  onClick={() => onSelectEmployee(emp)}
                  className="hover:bg-primary/5 transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-3.5">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-none bg-surface-container flex items-center justify-center mr-3 overflow-hidden border border-primary/10">
                        <img 
                          className="w-full h-full object-cover" 
                          src={emp.avatar} 
                          alt={emp.name} 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="text-xs font-serif font-bold text-primary group-hover:text-secondary transition-colors">
                        {emp.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-on-surface-variant text-xs font-sans">
                    {emp.department}
                  </td>
                  <td className="px-6 py-3.5">
                    <span className={`px-2 py-0.5 border text-[9px] uppercase tracking-wider font-bold rounded-none ${
                      emp.status === 'Active' 
                        ? 'bg-transparent border-secondary/35 text-secondary' 
                        : emp.status === 'On Leave'
                        ? 'bg-transparent border-primary/25 text-primary'
                        : 'bg-transparent border-[#8A3F3F]/35 text-[#8A3F3F]'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-on-surface-variant text-xs font-sans">
                    {emp.dateUpdated}
                  </td>
                  <td className="px-6 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                    <button 
                      onClick={() => onSelectEmployee(emp)}
                      className="material-symbols-outlined text-on-surface-variant hover:text-primary p-1 rounded-none hover:bg-surface-container-low transition-all cursor-pointer"
                    >
                      more_vert
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
