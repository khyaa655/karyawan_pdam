export interface Employee {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  department: string;
  position: string;
  status: 'Active' | 'On Leave' | 'Probation' | 'Retired';
  dateUpdated: string;
  avatar: string;
  checkIn: string;
  checkOut: string;
  totalHours: string;
  basicSalary: number;
  allowances: number;
  netPay: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  leaveType: 'Annual' | 'Sick' | 'Maternity' | 'Unpaid';
  duration: string;
  daysCount: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  avatarInitials: string;
}

export interface PayrollBatch {
  id: string;
  name: string;
  dateProcessed: string;
  status: 'Paid' | 'Processing' | 'Draft';
  recipientsCount: number;
  totalAmount: number;
}

export type TabType = 'dashboard' | 'directory' | 'attendance' | 'payroll' | 'leave' | 'settings';
