import React from 'react';
import { Employee, PayrollBatch } from '../types';

interface PayrollTabProps {
  employees: Employee[];
  payrollBatches: PayrollBatch[];
  onRunNewPayroll: () => void;
  onExportPayslips: () => void;
}

export default function PayrollTab({
  employees,
  payrollBatches,
  onRunNewPayroll,
  onExportPayslips
}: PayrollTabProps) {
  // Compute total monthly payroll sum from employees
  const totalPayrollValue = employees.reduce((acc, emp) => acc + emp.netPay, 0) + 4240000000; // Mock factor
  const totalEmployeesCount = employees.length + 1243;

  // Render Rupiah currency nicely
  const formatRupiah = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Title & Toolbar Actions */}
      <div className="flex justify-between items-end select-none pb-4 border-b border-primary/10">
        <div>
          <h2 className="text-4xl font-serif font-medium text-primary tracking-tight italic leading-tight">
            Payroll Management
          </h2>
          <p className="text-xs text-on-surface-variant mt-1.5 uppercase tracking-[0.1em]">
            Manage salaries, allowances, and monthly batches for PDAM employees.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onExportPayslips}
            className="flex items-center gap-2 px-5 py-2.5 bg-surface-bright border border-secondary text-secondary font-bold text-[10px] uppercase tracking-wider rounded-none hover:bg-primary/5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">file_download</span>
            Export Payslips
          </button>
          
          <button 
            onClick={onRunNewPayroll}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-black/90 text-white rounded-none font-bold text-[10px] uppercase tracking-wider border border-primary transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
            Run New Payroll
          </button>
        </div>
      </div>

      {/* Bento Grid KPI Overview */}
      <div className="grid grid-cols-12 gap-6 select-none">
        {/* Total Net Pay */}
        <div className="col-span-12 md:col-span-4 bg-surface-bright border border-primary/10 rounded-none p-6 relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-on-surface-variant font-bold text-[9px] uppercase tracking-[0.2em] mb-2">
              Total Monthly Net Pay
            </p>
            <h3 className="text-3xl font-serif font-medium text-primary">Rp 4.28B</h3>
            <div className="mt-4 flex items-center gap-2 text-secondary font-bold text-[9px] uppercase tracking-wider">
              <span className="material-symbols-outlined text-[18px]">trending_up</span>
              <span>+2.4% from last month</span>
            </div>
          </div>
          <div className="absolute right-[-10px] bottom-[-20px] opacity-[0.03] pointer-events-none">
            <span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: "'wght' 200" }}>
              account_balance_wallet
            </span>
          </div>
        </div>

        {/* Employees Paid */}
        <div className="col-span-12 md:col-span-4 bg-surface-bright border border-primary/10 rounded-none p-6 flex flex-col justify-between">
          <div>
            <p className="text-on-surface-variant font-bold text-[9px] uppercase tracking-[0.2em] mb-2">
              Total Employees Paid
            </p>
            <h3 className="text-3xl font-serif font-medium text-primary">{totalEmployeesCount.toLocaleString()}</h3>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-[10px] uppercase tracking-wider font-bold mb-2">
              <span className="text-on-surface-variant">Processed Status</span>
              <span className="text-primary">1,240 / 1,248</span>
            </div>
            <div className="w-full h-1 bg-surface-container rounded-none overflow-hidden">
              <div className="h-full bg-secondary" style={{ width: '99%' }}></div>
            </div>
          </div>
        </div>

        {/* Budget Status Donut */}
        <div className="col-span-12 md:col-span-4 bg-surface-bright border border-primary/10 rounded-none p-6">
          <p className="text-on-surface-variant font-bold text-[9px] uppercase tracking-[0.2em] mb-2">
            Budget Utilization
          </p>
          <div className="flex items-center gap-4 mt-2">
            <div className="relative w-16 h-16 flex-shrink-0 select-none">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle 
                  className="text-surface-container" 
                  cx="18" 
                  cy="18" 
                  fill="none" 
                  r="15.9155" 
                  stroke="currentColor" 
                  strokeWidth="3.5"
                />
                <circle 
                  className="text-secondary" 
                  cx="18" 
                  cy="18" 
                  fill="none" 
                  r="15.9155" 
                  stroke="currentColor" 
                  strokeDasharray="80 100" 
                  strokeLinecap="square"
                  strokeWidth="3.5"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-serif font-bold text-xs">80%</span>
            </div>
            <div>
              <p className="font-serif font-bold text-sm text-primary italic">On Track</p>
              <p className="text-on-surface-variant text-[10px] uppercase tracking-wide leading-tight mt-1">
                Annual projection looks highly stable.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Details Structure */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Table Section */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="bg-surface-bright border border-primary/10 rounded-none overflow-hidden">
            <div className="px-6 py-4 border-b border-primary/10 flex justify-between items-center bg-surface-container-low/30 select-none">
              <h4 className="font-serif font-bold text-base text-primary italic">Monthly Payroll Details</h4>
              <div className="flex gap-2">
                <button className="p-1 hover:bg-surface-container rounded-none transition-colors cursor-pointer text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]">filter_list</span>
                </button>
                <button className="p-1 hover:bg-surface-container rounded-none transition-colors cursor-pointer text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]">more_vert</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low/60 text-[9px] uppercase font-bold tracking-[0.18em] text-on-surface-variant border-b border-primary/10 select-none">
                    <th className="px-6 py-3">Employee Name</th>
                    <th className="px-6 py-3">Position</th>
                    <th className="px-6 py-3 text-right">Basic Salary</th>
                    <th className="px-6 py-3 text-right">Allowances</th>
                    <th className="px-6 py-3 text-right">Net Pay</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5">
                  {employees.slice(0, 5).map((emp, index) => {
                    // Custom formatting fallback
                    const initials = emp.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
                    const initialsBg = index % 2 === 0 ? 'bg-primary/5 text-primary' : 'bg-surface-container text-secondary';
                    return (
                      <tr key={emp.id} className="hover:bg-primary/5 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-none text-[9px] uppercase tracking-wider flex items-center justify-center font-bold border border-primary/10 ${initialsBg}`}>
                              {initials}
                            </div>
                            <div>
                              <p className="text-xs font-serif font-bold text-primary">{emp.name}</p>
                              <p className="text-[10px] text-on-surface-variant font-mono">EMP-00{emp.employeeId.slice(-3)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs text-on-surface-variant font-sans">
                          {emp.position}
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-xs text-on-surface">
                          {emp.basicSalary.toLocaleString('id-ID')}
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-xs text-on-surface">
                          {emp.allowances.toLocaleString('id-ID')}
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-xs font-bold text-secondary">
                          {emp.netPay.toLocaleString('id-ID')}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 border text-[9px] uppercase tracking-wider font-bold rounded-none ${
                            emp.status === 'Active' 
                              ? 'border-secondary/35 text-secondary' 
                              : emp.status === 'On Leave'
                              ? 'border-primary/25 text-primary'
                              : 'border-primary/10 text-on-surface-variant'
                          }`}>
                            {emp.status === 'Active' ? 'Paid' : emp.status === 'On Leave' ? 'Processing' : 'Draft'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="px-6 py-4 border-t border-primary/10 flex justify-between items-center text-xs select-none bg-surface-container-low/60">
              <span className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant">Showing 1 to 5 of {totalEmployeesCount} entries</span>
              <div className="flex gap-1">
                <button className="px-3 py-1 border border-primary/10 rounded-none bg-surface-bright hover:bg-primary/5 transition-colors cursor-pointer text-[9px] uppercase tracking-wider font-bold text-on-surface">Previous</button>
                <button className="px-3 py-1 bg-primary text-white font-bold rounded-none text-[9px] uppercase tracking-wider">1</button>
                <button className="px-3 py-1 border border-primary/10 rounded-none bg-surface-bright hover:bg-primary/5 transition-colors cursor-pointer text-[9px] uppercase tracking-wider text-on-surface">2</button>
                <button className="px-3 py-1 border border-primary/10 rounded-none bg-surface-bright hover:bg-primary/5 transition-colors cursor-pointer text-[9px] uppercase tracking-wider text-on-surface">Next</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Batches Sidebar Section */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Batches list */}
          <div className="bg-surface-bright border border-primary/10 rounded-none p-6">
            <h4 className="font-serif font-bold text-base text-primary mb-6 select-none italic">Recent Batches</h4>
            <div className="space-y-6">
              {payrollBatches.map((batch) => (
                <div key={batch.id} className="flex items-start gap-4">
                  <div className={`mt-1 w-10 h-10 flex-shrink-0 rounded-none border flex items-center justify-center ${
                    batch.status === 'Paid' 
                      ? 'bg-transparent border-secondary/35 text-secondary' 
                      : batch.status === 'Processing'
                      ? 'bg-transparent border-primary/25 text-primary'
                      : 'bg-transparent border-primary/10 text-on-surface-variant'
                  }`}>
                    <span className="material-symbols-outlined text-[18px]">
                      {batch.status === 'Paid' ? 'check_circle' : batch.status === 'Processing' ? 'hourglass_top' : 'description'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start select-none">
                      <p className="text-xs font-serif font-bold text-primary truncate">{batch.name}</p>
                      <span className={`text-[9px] font-bold uppercase tracking-wider ${
                        batch.status === 'Paid' 
                          ? 'text-secondary' 
                          : batch.status === 'Processing'
                          ? 'text-primary'
                          : 'text-on-surface-variant'
                      }`}>
                        {batch.status}
                      </span>
                    </div>
                    <p className="text-on-surface-variant text-[10px] mt-0.5">{batch.status === 'Paid' ? 'Processed' : 'Status'} on {batch.dateProcessed}</p>
                    <p className="text-secondary font-serif font-bold text-xs mt-1">{formatRupiah(batch.totalAmount)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-2.5 text-secondary font-bold text-[10px] uppercase tracking-[0.15em] border border-primary/15 hover:bg-primary/5 rounded-none transition-colors cursor-pointer select-none">
              View All Batches
            </button>
          </div>

          {/* Compliance Card with Water Facility Background */}
          <div className="relative rounded-none overflow-hidden aspect-square flex flex-col justify-end p-6 group border border-primary/10">
            <div className="absolute inset-0 z-0">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQWgRVHJAclbYdxM6kTrYTvjSop2VckA-w72wrRaFDYZ6WNspLCPkn-aMtaH8TSbqRLJl05THV7rHwh9Ra6VsmWqf460QplUOMxxSa1y_127DwnhGmNbhvM27ErEzN5GujoEYEge8XK3cBaKK2viSaqHV4SbGNtRDMJB8vhDWx8DbENo_DyklqpxyEsArahQgkp3zDl8RcSBp4TRkq4S9TZlnNPEKvYhKfLfcLuDkYHzUB-sW8JiEpJ6adBXvE5KJjZw_iXMZmgd2V" 
                alt="Water treatment plant aerial" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-transparent"></div>
            </div>
            
            <div className="relative z-10 text-white select-none">
              <h5 className="font-serif font-bold text-sm mb-2 italic">Utility Payroll Compliance</h5>
              <p className="text-[11px] opacity-85 leading-relaxed mb-4">
                Ensuring all 1,200+ dedicated staff are compensated accurately and on time, reflecting our commitment to the city's essential services.
              </p>
              <a className="inline-flex items-center gap-1.5 text-[#EBE8DF] hover:text-white font-bold text-[9px] uppercase tracking-widest transition-colors" href="#">
                Review Regional Guidelines
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
