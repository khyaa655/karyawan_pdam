import React, { useState } from 'react';
import { Employee, LeaveRequest } from '../types';

interface LeaveRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  employees: Employee[];
  onAddLeave: (newLeave: LeaveRequest) => void;
}

export default function LeaveRequestModal({
  isOpen,
  onClose,
  employees,
  onAddLeave
}: LeaveRequestModalProps) {
  const [selectedEmpId, setSelectedEmpId] = useState(employees[0]?.id || '');
  const [leaveType, setLeaveType] = useState<'Annual' | 'Sick' | 'Maternity' | 'Unpaid'>('Annual');
  const [duration, setDuration] = useState('');
  const [daysCount, setDaysCount] = useState(1);
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedEmployee = employees.find(emp => emp.id === selectedEmpId) || employees[0];
    if (!selectedEmployee) return;

    const initials = selectedEmployee.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

    const newLeave: LeaveRequest = {
      id: 'leave-' + Date.now(),
      employeeId: selectedEmployee.employeeId,
      employeeName: selectedEmployee.name,
      department: selectedEmployee.department,
      leaveType,
      duration: duration || 'Oct 28 - Oct 29',
      daysCount,
      reason,
      status: 'Pending',
      avatarInitials: initials
    };

    onAddLeave(newLeave);
    onClose();

    // Reset fields
    setLeaveType('Annual');
    setDuration('');
    setDaysCount(1);
    setReason('');
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in p-4 select-none">
      <div className="bg-surface-bright border border-primary/15 rounded-none w-full max-w-lg shadow-none overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="px-6 py-4 border-b border-primary/10 flex justify-between items-center bg-surface-container-low/30">
          <h3 className="font-serif font-bold text-base text-primary flex items-center gap-2 italic">
            <span className="material-symbols-outlined text-secondary">event_busy</span>
            Create Leave Request
          </h3>
          <button 
            onClick={onClose} 
            className="p-1 text-on-surface-variant hover:bg-primary/5 hover:text-primary rounded-none transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Select Employee</label>
            <select 
              value={selectedEmpId}
              onChange={(e) => setSelectedEmpId(e.target.value)}
              className="w-full bg-surface-container-low border border-primary/10 rounded-none px-3 py-1.5 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary/50 cursor-pointer"
              required
            >
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} ({emp.employeeId} - {emp.department})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Leave Type</label>
              <select 
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value as any)}
                className="w-full bg-surface-container-low border border-primary/10 rounded-none px-3 py-1.5 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary/50 cursor-pointer"
              >
                <option value="Annual">Annual Leave</option>
                <option value="Sick">Sick Leave</option>
                <option value="Maternity">Maternity Leave</option>
                <option value="Unpaid">Unpaid Leave</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Days Count</label>
              <input 
                type="number" 
                value={daysCount} 
                min={1}
                max={90}
                onChange={(e) => setDaysCount(Number(e.target.value))}
                className="w-full bg-surface-container-low border border-primary/10 rounded-none px-3 py-1.5 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary/50 focus:border-secondary transition-all font-sans"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Duration/Dates Range</label>
            <input 
              type="text" 
              value={duration} 
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-surface-container-low border border-primary/10 rounded-none px-3 py-1.5 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary/50 focus:border-secondary transition-all font-sans"
              placeholder="e.g. Oct 28 - Oct 30"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Reason for request</label>
            <textarea 
              value={reason} 
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-surface-container-low border border-primary/10 rounded-none px-3 py-1.5 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary/50 focus:border-secondary transition-all h-20 resize-none font-sans"
              placeholder="e.g. Scheduled family holiday / medical appointment..."
              required
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 pt-4 border-t border-primary/10">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 bg-surface-bright hover:bg-primary/5 border border-primary/15 text-on-surface font-bold text-[10px] uppercase tracking-wider rounded-none cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-5 py-2 bg-primary hover:bg-black/90 text-white border border-primary font-bold text-[10px] uppercase tracking-wider rounded-none transition-all cursor-pointer"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
