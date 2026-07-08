import React, { useState } from 'react';
import { TabType, Employee, LeaveRequest, PayrollBatch } from './types';
import { INITIAL_EMPLOYEES, INITIAL_LEAVE_REQUESTS, INITIAL_PAYROLL_BATCHES } from './data';

// Component Imports
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardTab from './components/DashboardTab';
import DirectoryTab from './components/DirectoryTab';
import AttendanceTab from './components/AttendanceTab';
import PayrollTab from './components/PayrollTab';
import LeaveTab from './components/LeaveTab';
import SettingsTab from './components/SettingsTab';

// Modal Imports
import AddEmployeeModal from './components/AddEmployeeModal';
import LeaveRequestModal from './components/LeaveRequestModal';
import EmployeeDetailModal from './components/EmployeeDetailModal';

export default function App() {
  // Global Navigation State
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Global Administrative Profile (reactive to Settings changes!)
  const [adminName, setAdminName] = useState('Sarah Smith');
  const [adminRole, setAdminRole] = useState('HR Manager');
  const adminAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUi1eh9-a3o3g9Q9b0iC1_vsguWvgv4yAKYXPgkn_BQ_YCQpD37-PvwfByGwLq8w6ogeMhIP2Fs3itCsN0U4eGgR1I2h-XIRJqYpN2UEm7ah89yLTwYJlLodmRv_X9It1zijiCdvGc4qheTJC1AvR4Czq0xRjOyxOpI7p21mbLYMhCvy4TN_6Ow_Ja-ulgfvcR-3NpBvAbXUebyS3WuiRrvyZNg6cmNuVcqEMAsxbhSVFBgt5XnfKyI4F7vmoQ1QcxWQIpyBk8WPkJ';

  // Global Data States
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(INITIAL_LEAVE_REQUESTS);
  const [payrollBatches, setPayrollBatches] = useState<PayrollBatch[]>(INITIAL_PAYROLL_BATCHES);

  // Modal Visibility States
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [isLeaveRequestOpen, setIsLeaveRequestOpen] = useState(false);
  const [selectedEmployeeForDetail, setSelectedEmployeeForDetail] = useState<Employee | null>(null);

  // Toast System States
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Toast Trigger Helper
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // State Handler Actions
  const handleAddEmployee = (newEmp: Employee) => {
    setEmployees((prev) => [newEmp, ...prev]);
    showToast(`Successfully registered ${newEmp.name} (ID: ${newEmp.employeeId}) to database!`);
  };

  const handleAddLeaveRequest = (newLeave: LeaveRequest) => {
    setLeaveRequests((prev) => [newLeave, ...prev]);
    showToast(`Leave request submitted for ${newLeave.employeeName}. Status: Pending.`, 'info');
  };

  const handleApproveLeave = (id: string) => {
    const targetRequest = leaveRequests.find((r) => r.id === id);
    if (!targetRequest) return;

    // 1. Update Leave request status
    setLeaveRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: 'Approved' } : req))
    );

    // 2. Update the corresponding employee's status to 'On Leave'
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.employeeId === targetRequest.employeeId ? { ...emp, status: 'On Leave', checkIn: '-', checkOut: '-', totalHours: '0h' } : emp
      )
    );

    showToast(`Leave request for ${targetRequest.employeeName} has been approved. Employee status set to On Leave.`);
  };

  const handleRejectLeave = (id: string) => {
    const targetRequest = leaveRequests.find((r) => r.id === id);
    if (!targetRequest) return;

    setLeaveRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: 'Rejected' } : req))
    );

    showToast(`Leave request for ${targetRequest.employeeName} has been rejected.`, 'error');
  };

  const handleChangeEmployeeStatus = (empId: string, newStatus: Employee['status']) => {
    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id === empId) {
          const updatedEmp = { ...emp, status: newStatus };
          if (newStatus === 'On Leave') {
            updatedEmp.checkIn = '-';
            updatedEmp.checkOut = '-';
            updatedEmp.totalHours = '0h';
          } else if (newStatus === 'Active' && emp.checkIn === '-') {
            updatedEmp.checkIn = '08:00 AM';
            updatedEmp.checkOut = '04:30 PM';
            updatedEmp.totalHours = '8.5h';
          }
          return updatedEmp;
        }
        return emp;
      })
    );
    
    // Sync the local detail view if it's currently open
    if (selectedEmployeeForDetail && selectedEmployeeForDetail.id === empId) {
      setSelectedEmployeeForDetail((prev) => prev ? { ...prev, status: newStatus } : null);
    }

    showToast(`Employment status updated successfully.`);
  };

  const handleRunNewPayroll = () => {
    showToast('Calculating and preparing monthly payroll adjustments...', 'info');

    setTimeout(() => {
      const newBatch: PayrollBatch = {
        id: 'batch-' + Date.now(),
        name: `Payroll Correction - ${new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`,
        dateProcessed: 'Just now',
        status: 'Draft',
        recipientsCount: employees.length,
        totalAmount: employees.reduce((sum, e) => sum + e.netPay, 0)
      };

      setPayrollBatches((prev) => [newBatch, ...prev]);
      showToast(`Successfully computed and added payroll draft of Rp ${newBatch.totalAmount.toLocaleString('id-ID')}`);
    }, 1200);
  };

  const handleExportPayslips = () => {
    showToast('Compiling payslips and initializing high-resolution PDF package download...', 'info');
    setTimeout(() => {
      showToast('Payroll Payslip collection compiled successfully. Downloading...', 'success');
    }, 1500);
  };

  const handleSaveSettingsFeedback = () => {
    showToast('System configuration and HR variable policies updated successfully.');
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-on-surface flex font-sans">
      
      {/* 1. INTERACTIVE SIDEBAR */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        adminName={adminName}
        adminRole={adminRole}
        adminAvatar={adminAvatar}
        onSubmitLeaveRequest={() => setIsLeaveRequestOpen(true)}
      />

      {/* 2. MAIN APP FRAME CONTENT */}
      <div className="flex-1 pl-[260px] pt-16 flex flex-col min-h-screen">
        
        {/* Fixed Top App Header */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          adminName={adminName}
          adminRole={adminRole}
          adminAvatar={adminAvatar}
        />

        {/* Scrollable View Area */}
        <main className="p-8 flex-1 max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && (
            <DashboardTab
              employees={employees}
              leaveRequests={leaveRequests}
              onAddRecruitment={() => setIsAddEmployeeOpen(true)}
              onSelectEmployee={(emp) => setSelectedEmployeeForDetail(emp)}
              onViewAllActivities={() => {
                setActiveTab('directory');
                setSearchQuery('');
              }}
            />
          )}

          {activeTab === 'directory' && (
            <DirectoryTab
              employees={employees}
              searchQuery={searchQuery}
              onAddEmployee={() => setIsAddEmployeeOpen(true)}
              onSelectEmployee={(emp) => setSelectedEmployeeForDetail(emp)}
            />
          )}

          {activeTab === 'attendance' && (
            <AttendanceTab
              employees={employees}
              searchQuery={searchQuery}
              onManualEntry={() => {
                showToast('Manual sign-in check logged successfully.');
              }}
            />
          )}

          {activeTab === 'payroll' && (
            <PayrollTab
              employees={employees}
              payrollBatches={payrollBatches}
              onRunNewPayroll={handleRunNewPayroll}
              onExportPayslips={handleExportPayslips}
            />
          )}

          {activeTab === 'leave' && (
            <LeaveTab
              leaveRequests={leaveRequests}
              onApproveLeave={handleApproveLeave}
              onRejectLeave={handleRejectLeave}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsTab
              adminName={adminName}
              setAdminName={setAdminName}
              adminRole={adminRole}
              setAdminRole={setAdminRole}
              adminAvatar={adminAvatar}
              onSaveSettings={handleSaveSettingsFeedback}
            />
          )}
        </main>
      </div>

      {/* 3. MODAL OVERLAYS */}
      <AddEmployeeModal
        isOpen={isAddEmployeeOpen}
        onClose={() => setIsAddEmployeeOpen(false)}
        onAdd={handleAddEmployee}
      />

      <LeaveRequestModal
        isOpen={isLeaveRequestOpen}
        onClose={() => setIsLeaveRequestOpen(false)}
        employees={employees}
        onAddLeave={handleAddLeaveRequest}
      />

      <EmployeeDetailModal
        employee={selectedEmployeeForDetail}
        isOpen={selectedEmployeeForDetail !== null}
        onClose={() => setSelectedEmployeeForDetail(null)}
        onChangeStatus={handleChangeEmployeeStatus}
      />

      {/* 4. REAL-TIME INTERACTIVE TOAST FEEDBACK PANEL */}
      {toast && (
        <div 
          id="toast-notification-pane"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl border shadow-xl bg-white animate-slide-up max-w-sm border-outline-variant/60"
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            toast.type === 'success' 
              ? 'bg-green-50 text-emerald-600' 
              : toast.type === 'error'
              ? 'bg-rose-50 text-error'
              : 'bg-blue-50 text-secondary'
          }`}>
            <span className="material-symbols-outlined text-[18px]">
              {toast.type === 'success' ? 'check_circle' : toast.type === 'error' ? 'cancel' : 'info'}
            </span>
          </div>
          <div className="flex-1">
            <h6 className="text-xs font-bold text-primary">System Notification</h6>
            <p className="text-[11px] text-on-surface-variant leading-tight mt-0.5">{toast.message}</p>
          </div>
          <button 
            onClick={() => setToast(null)}
            className="text-on-surface-variant/40 hover:text-primary transition-colors ml-2"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}
    </div>
  );
}
