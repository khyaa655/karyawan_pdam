import React, { useState, useMemo } from 'react';
import { LeaveRequest } from '../types';

interface LeaveTabProps {
  leaveRequests: LeaveRequest[];
  onApproveLeave: (id: string) => void;
  onRejectLeave: (id: string) => void;
}

export default function LeaveTab({
  leaveRequests,
  onApproveLeave,
  onRejectLeave
}: LeaveTabProps) {
  const [filterType, setFilterType] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');

  // Filter requests based on state
  const filteredRequests = useMemo(() => {
    if (filterType === 'All') return leaveRequests;
    return leaveRequests.filter((r) => r.status === filterType);
  }, [leaveRequests, filterType]);

  const pendingCount = leaveRequests.filter((r) => r.status === 'Pending').length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Title & Toolbar Actions */}
      <div className="flex justify-between items-end select-none pb-4 border-b border-primary/10">
        <div>
          <h2 className="text-4xl font-serif font-medium text-primary tracking-tight italic leading-tight">
            Leave Management
          </h2>
          <p className="text-xs text-on-surface-variant mt-1.5 uppercase tracking-[0.1em]">
            Review, approve, and track employee leave cycles.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-bright hover:bg-primary/5 border border-primary/15 text-primary font-bold text-[10px] uppercase tracking-wider rounded-none transition-all cursor-pointer">
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Filter
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-bright hover:bg-primary/5 border border-primary/15 text-primary font-bold text-[10px] uppercase tracking-wider rounded-none transition-all cursor-pointer">
            <span className="material-symbols-outlined text-sm">download</span>
            Export PDF
          </button>
        </div>
      </div>

      {/* Metric Cards Bento Grid */}
      <div className="grid grid-cols-12 gap-6 select-none">
        {/* Requests Pending */}
        <div className="col-span-12 md:col-span-4 bg-surface-bright border border-primary/10 rounded-none p-5 relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-on-surface-variant font-bold text-[9px] uppercase tracking-[0.2em] mb-1">Requests Pending</p>
            <h3 className="text-3xl font-serif font-medium text-primary">{pendingCount}</h3>
            <div className="mt-4 flex items-center gap-2 text-[#8A3F3F] font-bold text-[9px] uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm">priority_high</span>
              <span>4 High Priority</span>
            </div>
          </div>
          <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-9xl opacity-[0.02] pointer-events-none">
            pending_actions
          </span>
        </div>

        {/* Total Leave Taken */}
        <div className="col-span-12 md:col-span-4 bg-surface-bright border border-primary/10 rounded-none p-5 relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-on-surface-variant font-bold text-[9px] uppercase tracking-[0.2em] mb-1">Total Leave Taken (Month)</p>
            <h3 className="text-3xl font-serif font-medium text-secondary">
              148 <span className="text-xs font-serif font-normal uppercase tracking-wider text-on-surface-variant">Days</span>
            </h3>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-full bg-surface-container h-1 rounded-none overflow-hidden">
                <div className="bg-secondary h-full" style={{ width: '65%' }}></div>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-on-surface-variant whitespace-nowrap">65% Capacity</span>
            </div>
          </div>
          <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-9xl opacity-[0.02] pointer-events-none">
            equalizer
          </span>
        </div>

        {/* Department with Most Absence */}
        <div className="col-span-12 md:col-span-4 bg-primary text-white rounded-none p-5 relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[#EBE8DF] font-bold text-[9px] uppercase tracking-[0.2em] mb-1">Department with Most Absence</p>
            <h3 className="text-2xl font-serif font-medium italic">Field Operations</h3>
            <div className="mt-4 flex items-center gap-2 text-[#EBE8DF] font-bold text-[9px] uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span>+12% from last month</span>
            </div>
          </div>
          <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-9xl opacity-[0.04] pointer-events-none">
            water_drop
          </span>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-surface-bright border border-primary/10 rounded-none overflow-hidden">
        <div className="px-6 py-4 border-b border-primary/10 flex justify-between items-center bg-surface-container-low/30 select-none">
          <h4 className="font-serif font-bold text-base text-primary italic">Leave Requests</h4>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">View:</span>
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="text-[10px] uppercase tracking-wider border-none bg-transparent focus:ring-0 font-bold text-secondary cursor-pointer outline-none"
            >
              <option value="All">All Requests</option>
              <option value="Pending">Pending Only</option>
              <option value="Approved">Approved Only</option>
              <option value="Rejected">Rejected Only</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low/60 select-none border-b border-primary/10">
              <tr>
                <th className="px-6 py-4 text-[9px] font-bold text-on-surface-variant uppercase tracking-[0.18em]">Employee Name</th>
                <th className="px-6 py-4 text-[9px] font-bold text-on-surface-variant uppercase tracking-[0.18em]">Leave Type</th>
                <th className="px-6 py-4 text-[9px] font-bold text-on-surface-variant uppercase tracking-[0.18em]">Duration</th>
                <th className="px-6 py-4 text-[9px] font-bold text-on-surface-variant uppercase tracking-[0.18em]">Reason</th>
                <th className="px-6 py-4 text-[9px] font-bold text-on-surface-variant uppercase tracking-[0.18em] text-center">Status</th>
                <th className="px-6 py-4 text-[9px] font-bold text-on-surface-variant uppercase tracking-[0.18em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/5 rounded-none border border-primary/10 flex items-center justify-center text-primary font-bold text-[10px] select-none">
                        {req.avatarInitials}
                      </div>
                      <div>
                        <p className="font-serif font-bold text-primary text-xs">{req.employeeName}</p>
                        <p className="text-[10px] text-on-surface-variant">{req.department}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 border text-[9px] uppercase tracking-wider font-bold rounded-none ${
                      req.leaveType === 'Annual' 
                        ? 'border-secondary/35 text-secondary' 
                        : req.leaveType === 'Sick'
                        ? 'border-[#8A3F3F]/35 text-[#8A3F3F] bg-[#8A3F3F]/5'
                        : req.leaveType === 'Maternity'
                        ? 'border-primary/25 text-primary'
                        : 'border-primary/10 text-on-surface-variant'
                    }`}>
                      {req.leaveType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs font-serif font-bold text-primary">{req.duration}</p>
                    <p className="text-[10px] text-on-surface-variant">{req.daysCount} Days total</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-on-surface-variant truncate max-w-[220px]">
                      {req.reason}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-0.5 border text-[9px] uppercase tracking-wider font-bold rounded-none ${
                      req.status === 'Pending'
                        ? 'border-primary/25 text-primary'
                        : req.status === 'Approved'
                        ? 'border-secondary/35 text-secondary'
                        : 'border-[#8A3F3F]/35 text-[#8A3F3F]'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {req.status === 'Pending' ? (
                      <div className="flex justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => onApproveLeave(req.id)}
                          className="p-1 px-1.5 rounded-none bg-surface-bright text-secondary hover:bg-secondary hover:text-white border border-secondary/20 transition-all cursor-pointer" 
                          title="Approve"
                        >
                          <span className="material-symbols-outlined text-xs font-bold leading-none">check</span>
                        </button>
                        <button 
                          onClick={() => onRejectLeave(req.id)}
                          className="p-1 px-1.5 rounded-none bg-surface-bright text-[#8A3F3F] hover:bg-[#8A3F3F] hover:text-white border border-[#8A3F3F]/20 transition-all cursor-pointer" 
                          title="Reject"
                        >
                          <span className="material-symbols-outlined text-xs font-bold leading-none">close</span>
                        </button>
                      </div>
                    ) : (
                      <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-[18px]">more_vert</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Paging */}
        <div className="px-6 py-4 bg-surface-container-low/60 border-t border-primary/10 flex items-center justify-between select-none">
          <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
            Showing <span className="font-bold">1-{filteredRequests.length}</span> of <span className="font-bold">{filteredRequests.length}</span> requests
          </p>
          <div className="flex gap-1">
            <button className="p-1 rounded-none border border-primary/10 bg-surface-bright disabled:opacity-30 cursor-pointer text-on-surface">
              <span className="material-symbols-outlined text-xs leading-none">chevron_left</span>
            </button>
            <button className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-none uppercase tracking-wider">1</button>
            <button className="p-1 rounded-none border border-primary/10 bg-surface-bright cursor-pointer text-on-surface">
              <span className="material-symbols-outlined text-xs leading-none">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Insights and Balance Metrics Row */}
      <div className="grid grid-cols-12 gap-6">
        {/* Leave Balance Overview */}
        <div className="col-span-12 md:col-span-7 bg-surface-bright border border-primary/10 rounded-none p-6">
          <h4 className="font-serif font-bold text-base italic text-primary mb-4 flex items-center gap-2 select-none">
            <span className="material-symbols-outlined text-secondary">update</span>
            Leave Balance Overview
          </h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between group py-1 border-b border-primary/5">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant bg-surface-container rounded-none p-2 border border-primary/5">
                  person
                </span>
                <span className="text-xs font-medium text-on-surface">Average Days Taken / Employee</span>
              </div>
              <span className="text-xs font-serif font-bold text-primary">8.4 Days</span>
            </div>
            
            <div className="flex items-center justify-between group py-1 border-b border-primary/5">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant bg-surface-container rounded-none p-2 border border-primary/5">
                  beach_access
                </span>
                <span className="text-xs font-medium text-on-surface">Unused Annual Leave Ratio</span>
              </div>
              <span className="text-xs font-serif font-bold text-secondary">42%</span>
            </div>
            
            <div className="flex items-center justify-between group py-1">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant bg-surface-container rounded-none p-2 border border-primary/5">
                  warning
                </span>
                <span className="text-xs font-medium text-on-surface">Upcoming Critical Resource Gap</span>
              </div>
              <span className="px-2 py-0.5 border border-[#8A3F3F]/35 text-[#8A3F3F] text-[9px] uppercase tracking-wider font-bold rounded-none">
                Week 42
              </span>
            </div>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="col-span-12 md:col-span-5 bg-surface-container-low/40 border border-primary/10 rounded-none p-6 flex flex-col justify-between select-none">
          <div>
            <h4 className="font-serif font-bold text-base text-primary mb-3 italic">Quick Insights</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed font-sans">
              Monday mornings see the highest volume of sick leave reports. Consider staffing adjustments for front-desk and field operations during early week peaks.
            </p>
          </div>
          
          <div className="mt-4 p-4 bg-surface-bright border border-secondary/15 rounded-none">
            <p className="text-[9px] font-bold text-secondary uppercase tracking-[0.15em] mb-1">PRO-TIP</p>
            <p className="text-[10px] text-on-surface-variant leading-tight">
              Automated approval workflows can be configured in settings to speed up single-day sick leave approvals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
