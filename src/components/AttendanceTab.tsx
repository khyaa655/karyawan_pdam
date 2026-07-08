import React, { useState, useMemo } from 'react';
import { Employee } from '../types';

interface AttendanceTabProps {
  employees: Employee[];
  searchQuery: string;
  onManualEntry: () => void;
}

export default function AttendanceTab({
  employees,
  searchQuery,
  onManualEntry
}: AttendanceTabProps) {
  const [selectedDept, setSelectedDept] = useState('All');
  const [attendanceDate, setAttendanceDate] = useState('2023-10-27');

  // Attendance simulation derived from our employee database
  const attendanceRecords = useMemo(() => {
    return employees.map(emp => {
      // Establish defaults or custom checkins based on mock
      let checkIn = emp.checkIn;
      let checkOut = emp.checkOut;
      let hours = emp.totalHours;
      let status: 'On Time' | 'Late' | 'On Leave' = 'On Time';
      let delayText = '';

      if (emp.status === 'On Leave') {
        status = 'On Leave';
        checkIn = '-';
        checkOut = '-';
        hours = '0h';
      } else if (emp.name === 'Rina Putri') {
        status = 'Late';
        checkIn = '08:15 AM';
        delayText = 'Late (15m)';
      } else if (emp.name === 'Dewi Lestari') {
        status = 'Late';
        checkIn = '08:05 AM';
        delayText = 'Late (5m)';
      } else {
        status = 'On Time';
      }

      return {
        ...emp,
        checkIn,
        checkOut,
        hours,
        attendanceStatus: status,
        delayText
      };
    }).filter(record => {
      const matchesSearch = record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            record.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = selectedDept === 'All' || record.department.toLowerCase().includes(selectedDept.toLowerCase());
      return matchesSearch && matchesDept;
    });
  }, [employees, searchQuery, selectedDept]);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title & Toolbar Actions */}
      <div className="flex justify-between items-end select-none pb-4 border-b border-primary/10">
        <div>
          <h2 className="text-4xl font-serif font-medium text-primary tracking-tight italic leading-tight">
            Attendance Tracking
          </h2>
          <p className="text-xs text-on-surface-variant mt-1.5 uppercase tracking-[0.1em]">
            Real-time overview of personnel presence and logistics.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-bright hover:bg-primary/5 border border-primary/15 text-on-surface font-bold text-[10px] uppercase tracking-wider rounded-none transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-sm">file_download</span>
            Export Report
          </button>
          <button 
            onClick={onManualEntry}
            className="flex items-center gap-2 px-5 py-2 bg-primary hover:bg-black/90 text-white text-[10px] uppercase tracking-wider font-bold rounded-none border border-primary transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Manual Entry
          </button>
        </div>
      </div>

      {/* KPI Bento Grid Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 select-none">
        <div className="bg-surface-bright p-5 border border-primary/10 rounded-none">
          <div className="flex justify-between items-start border-b border-primary/5 pb-3 mb-3 w-full">
            <div>
              <p className="text-[9px] text-on-surface-variant uppercase tracking-[0.2em] font-semibold mb-1">Present Today</p>
              <h3 className="text-3xl font-serif font-medium text-primary">482</h3>
            </div>
            <div className="w-10 h-10 border border-primary/10 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                how_to_reg
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-secondary">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            <span className="text-[9px] uppercase tracking-wider font-bold">94% of total staff</span>
          </div>
        </div>

        <div className="bg-surface-bright p-5 border border-primary/10 rounded-none">
          <div className="flex justify-between items-start border-b border-primary/5 pb-3 mb-3 w-full">
            <div>
              <p className="text-[9px] text-on-surface-variant uppercase tracking-[0.2em] font-semibold mb-1">Late Arrivals</p>
              <h3 className="text-3xl font-serif font-medium text-[#8A3F3F]">24</h3>
            </div>
            <div className="w-10 h-10 border border-[#8A3F3F]/10 flex items-center justify-center text-[#8A3F3F]">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                alarm_on
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[#8A3F3F]">
            <span className="material-symbols-outlined text-sm">priority_high</span>
            <span className="text-[9px] uppercase tracking-wider font-bold">5% increase from avg</span>
          </div>
        </div>

        <div className="bg-surface-bright p-5 border border-primary/10 rounded-none">
          <div className="flex justify-between items-start border-b border-primary/5 pb-3 mb-3 w-full">
            <div>
              <p className="text-[9px] text-on-surface-variant uppercase tracking-[0.2em] font-semibold mb-1">Absent</p>
              <h3 className="text-3xl font-serif font-medium text-primary">12</h3>
            </div>
            <div className="w-10 h-10 border border-primary/10 flex items-center justify-center text-on-surface-variant">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                person_off
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-on-surface-variant/70">
            <span className="material-symbols-outlined text-sm">info</span>
            <span className="text-[9px] uppercase tracking-wider font-bold">Unexcused records</span>
          </div>
        </div>

        <div className="bg-surface-bright p-5 border border-primary/10 rounded-none">
          <div className="flex justify-between items-start border-b border-primary/5 pb-3 mb-3 w-full">
            <div>
              <p className="text-[9px] text-on-surface-variant uppercase tracking-[0.2em] font-semibold mb-1">On Leave</p>
              <h3 className="text-3xl font-serif font-medium text-secondary">31</h3>
            </div>
            <div className="w-10 h-10 border border-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                beach_access
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-secondary">
            <span className="material-symbols-outlined text-sm">event</span>
            <span className="text-[9px] uppercase tracking-wider font-bold">Scheduled leave</span>
          </div>
        </div>
      </div>

      {/* Filters Toolbar Bar */}
      <div className="bg-surface-bright p-4 border border-primary/10 rounded-none flex flex-wrap items-center justify-between gap-4 select-none">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.15em]">Filters:</span>
          <div className="flex items-center gap-2">
            <div className="relative">
              <select 
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="appearance-none bg-surface-container-low border border-primary/10 text-[10px] uppercase tracking-wider py-1.5 pl-3 pr-8 rounded-none font-bold focus:ring-0 cursor-pointer outline-none text-on-surface"
              >
                <option value="All">All Departments</option>
                <option value="Field Operations">Field Operations</option>
                <option value="Finance">Finance</option>
                <option value="IT">IT</option>
                <option value="Public Relations">Public Relations</option>
                <option value="Water Quality">Water Quality</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-on-surface-variant">
                keyboard_arrow_down
              </span>
            </div>
            
            <div className="relative">
              <input 
                type="date" 
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                className="bg-surface-container-low border border-primary/10 text-[10px] uppercase tracking-wider py-1.5 px-3 rounded-none font-bold text-on-surface outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-on-surface-variant">
          <span>Showing 1-{attendanceRecords.length} of {attendanceRecords.length} records</span>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-surface-bright border border-primary/10 rounded-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/60 text-[9px] uppercase tracking-[0.18em] text-on-surface-variant border-b border-primary/10 select-none">
                <th className="px-6 py-4 font-bold">Employee Name</th>
                <th className="px-6 py-4 font-bold">Department</th>
                <th className="px-6 py-4 font-bold">Check-In</th>
                <th className="px-6 py-4 font-bold">Check-Out</th>
                <th className="px-6 py-4 font-bold">Total Hours</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {attendanceRecords.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-sm text-on-surface-variant font-serif italic">
                    No records found matching filters.
                  </td>
                </tr>
              ) : (
                attendanceRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-primary/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          className="w-8 h-8 rounded-none object-cover border border-primary/10" 
                          src={record.avatar} 
                          alt={record.name}
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="text-xs font-serif font-bold text-on-surface">{record.name}</p>
                          <p className="text-[10px] text-on-surface-variant">Emp ID: #{record.employeeId.slice(-4)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-on-surface-variant font-sans">
                      {record.department}
                    </td>
                    <td className={`px-6 py-4 text-xs font-medium font-mono ${
                      record.attendanceStatus === 'Late' ? 'text-[#8A3F3F] font-bold' : 'text-on-surface'
                    }`}>
                      {record.checkIn}
                    </td>
                    <td className="px-6 py-4 text-xs text-on-surface font-medium font-mono">
                      {record.checkOut}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 select-none">
                        <span className="text-xs font-semibold text-on-surface font-mono">{record.hours}</span>
                        {record.hours !== '0h' && (
                          <div className="w-16 h-1 bg-surface-container rounded-none overflow-hidden">
                            <div 
                              className="bg-secondary h-full" 
                              style={{ width: record.hours.includes('8.5') ? '85%' : record.hours.includes('8.25') ? '82%' : '86%' }}
                            ></div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 border text-[9px] uppercase tracking-wider font-bold rounded-none ${
                        record.attendanceStatus === 'On Time'
                          ? 'border-secondary/35 text-secondary'
                          : record.attendanceStatus === 'Late'
                          ? 'border-[#8A3F3F]/35 text-[#8A3F3F] bg-[#8A3F3F]/5'
                          : 'border-primary/10 text-on-surface-variant'
                      }`}>
                        {record.attendanceStatus === 'Late' ? record.delayText : record.attendanceStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-[18px]">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* CSV Download Link */}
        <div className="p-6 bg-surface-container-low/60 border-t border-primary/10 flex justify-between items-center select-none">
          <button className="text-[10px] font-bold uppercase tracking-wider text-primary hover:underline cursor-pointer">
            Download full log as CSV
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant">Page 1 of 35</span>
            <div className="flex gap-1">
              <button disabled className="p-1 rounded-none bg-surface-bright border border-primary/10 opacity-40 cursor-not-allowed">
                <span className="material-symbols-outlined text-xs">arrow_back</span>
              </button>
              <button className="w-6 h-6 rounded-none bg-primary text-white text-[10px] font-bold flex items-center justify-center">1</button>
              <button className="w-6 h-6 rounded-none bg-surface-bright border border-primary/10 text-[10px] hover:bg-primary/5 transition-colors flex items-center justify-center">2</button>
              <button className="p-1 rounded-none bg-surface-bright border border-primary/10 hover:bg-primary/5 transition-colors">
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Insight Section - 2 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weekly Attendance Trend Chart */}
        <div className="bg-surface-bright border border-primary/10 p-6 rounded-none">
          <h4 className="text-base font-serif font-bold text-primary mb-4 italic">Weekly Attendance Trend</h4>
          <div className="h-48 flex items-end justify-between gap-4 px-2 select-none">
            {[
              { day: 'MON', height: '95%', active: false },
              { day: 'TUE', height: '92%', active: false },
              { day: 'WED', height: '88%', active: false },
              { day: 'THU', height: '96%', active: false },
              { day: 'FRI', height: '94%', active: true }
            ].map((bar, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-surface-container/50 rounded-none h-[90%] relative">
                  <div 
                    className={`absolute bottom-0 w-full rounded-none transition-all duration-300 ${
                      bar.active ? 'bg-secondary' : 'bg-primary/15 hover:bg-secondary/70'
                    }`}
                    style={{ height: bar.height }}
                  ></div>
                </div>
                <span className="text-[9px] font-bold mt-2 uppercase tracking-wider text-on-surface-variant">{bar.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Department Performance List */}
        <div className="bg-surface-bright border border-primary/10 p-6 rounded-none flex flex-col justify-between">
          <div>
            <h4 className="text-base font-serif font-bold text-primary mb-4 italic">Department Performance</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 select-none">
                  <span className="text-xs font-semibold text-on-surface">Production</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">98% punctuality</span>
                </div>
                <div className="w-full h-1 bg-surface-container rounded-none overflow-hidden">
                  <div className="h-full bg-secondary" style={{ width: '98%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1 select-none">
                  <span className="text-xs font-semibold text-on-surface">Engineering</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">92% punctuality</span>
                </div>
                <div className="w-full h-1 bg-surface-container rounded-none overflow-hidden">
                  <div className="h-full bg-secondary" style={{ width: '92%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1 select-none">
                  <span className="text-xs font-semibold text-on-surface">Customer Service</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70">85% punctuality</span>
                </div>
                <div className="w-full h-1 bg-surface-container rounded-none overflow-hidden">
                  <div className="h-full bg-primary/20" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
