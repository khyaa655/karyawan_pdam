import React from 'react';
import { Employee } from '../types';

interface EmployeeDetailModalProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
  onChangeStatus: (id: string, newStatus: Employee['status']) => void;
}

export default function EmployeeDetailModal({
  employee,
  isOpen,
  onClose,
  onChangeStatus
}: EmployeeDetailModalProps) {
  if (!isOpen || !employee) return null;

  const formatRupiah = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in p-4 select-none">
      <div className="bg-surface-bright border border-primary/15 rounded-none w-full max-w-xl shadow-none overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="px-6 py-4 border-b border-primary/10 flex justify-between items-center bg-surface-container-low/30">
          <h3 className="font-serif font-bold text-base text-primary flex items-center gap-2 italic">
            <span className="material-symbols-outlined text-secondary">badge</span>
            Employee Personnel Dossier
          </h3>
          <button 
            onClick={onClose} 
            className="p-1 text-on-surface-variant hover:bg-primary/5 hover:text-primary rounded-none transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Top Banner (Photo + Name) */}
          <div className="flex items-center gap-5 bg-surface-container-low/30 p-4 rounded-none border border-primary/10">
            <img 
              className="w-16 h-16 rounded-none object-cover border border-primary/10 shadow-none" 
              src={employee.avatar} 
              alt={employee.name}
              referrerPolicy="no-referrer"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-serif font-bold text-base text-primary leading-snug">{employee.name}</h4>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-none text-[9px] font-bold uppercase tracking-wider ${
                  employee.status === 'Active'
                    ? 'bg-secondary/10 text-secondary border border-secondary/20'
                    : employee.status === 'On Leave'
                    ? 'bg-amber-100/60 text-amber-800 border border-amber-200/50'
                    : employee.status === 'Probation'
                    ? 'bg-primary/5 text-primary border border-primary/10'
                    : 'bg-red-100/60 text-red-800 border border-red-200/50'
                }`}>
                  {employee.status}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant font-medium mt-0.5">{employee.position} &bull; {employee.department}</p>
              <p className="text-[10px] text-on-surface-variant font-semibold tracking-wider uppercase mt-1">ID: {employee.employeeId}</p>
            </div>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-2 gap-6">
            {/* Contact & Status Card */}
            <div className="bg-surface-bright border border-primary/10 p-4 rounded-none space-y-3 shadow-none">
              <h5 className="font-serif font-bold text-xs text-primary uppercase tracking-wider border-b border-primary/5 pb-1.5 select-none italic">Employment Info</h5>
              
              <div>
                <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">Email Contact</p>
                <p className="text-xs font-medium text-on-surface truncate mt-0.5">{employee.email}</p>
              </div>

              <div>
                <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">Employment Status</p>
                <div className="relative mt-1">
                  <select 
                    value={employee.status}
                    onChange={(e) => onChangeStatus(employee.id, e.target.value as any)}
                    className="w-full bg-surface-container-low border border-primary/10 rounded-none px-2.5 py-1.5 text-xs text-on-surface font-semibold focus:outline-none focus:ring-1 focus:ring-secondary/50 cursor-pointer font-sans"
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Probation">Probation</option>
                    <option value="Retired">Retired</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Compensation & Financials */}
            <div className="bg-surface-bright border border-primary/10 p-4 rounded-none space-y-3 shadow-none">
              <h5 className="font-serif font-bold text-xs text-primary uppercase tracking-wider border-b border-primary/5 pb-1.5 select-none italic">Compensation Details</h5>
              
              <div>
                <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">Basic Salary</p>
                <p className="text-xs font-mono font-bold text-on-surface mt-0.5">{formatRupiah(employee.basicSalary)}</p>
              </div>

              <div>
                <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">Allowances</p>
                <p className="text-xs font-mono font-medium text-on-surface mt-0.5">{formatRupiah(employee.allowances)}</p>
              </div>

              <div className="pt-2 border-t border-primary/10">
                <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider text-secondary">Net Take-Home Pay</p>
                <p className="text-sm font-mono font-extrabold text-secondary mt-0.5">{formatRupiah(employee.netPay)}</p>
              </div>
            </div>
          </div>

          {/* Time & Attendance */}
          <div className="bg-surface-container-low/30 p-4 rounded-none border border-primary/10 space-y-3">
            <h5 className="font-serif font-bold text-xs text-primary uppercase tracking-wider pb-1.5 border-b border-primary/5 select-none italic">Attendance Log (Today)</h5>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">Check In</p>
                <p className="text-xs font-bold text-primary mt-1">{employee.checkIn}</p>
              </div>
              
              <div>
                <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">Check Out</p>
                <p className="text-xs font-bold text-primary mt-1">{employee.checkOut}</p>
              </div>

              <div>
                <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">Total Logged Hours</p>
                <p className="text-xs font-mono font-bold text-secondary mt-1">{employee.totalHours}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-6 py-4 border-t border-primary/10 bg-surface-container-low/25">
          <button 
            onClick={onClose}
            className="px-5 py-2 bg-primary hover:bg-black/90 text-white border border-primary font-bold text-[10px] uppercase tracking-wider rounded-none transition-all cursor-pointer"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}
