import { Employee, LeaveRequest, PayrollBatch } from './types';

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'emp-1',
    employeeId: 'ID-2024-001',
    name: 'Budi Santoso',
    email: 'budi.s@pdam.utility',
    department: 'Field Operations',
    position: 'Senior Analyst',
    status: 'Active',
    dateUpdated: 'Oct 24, 2023',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANpgfDWSA1um_u-iCBYCFXTd4TyRzTlRWMm19C7S4xD3LhVYU3F1ICpfZUwEjjuIVwUQIIeOA6m_FmFaP-NVEZEBtec_HsvoJg9s1hLscaYlT4mVr9JBkPiRMZQCzKxCxS8eGKcRkFMyYlYazRBFUoFZpnJKwdDdpl58MlyxvOS_s979e04umcxnKvE-4SJKYAQCTlKvDho7DdZqeudwatingOz_i1hSTqBttXW3ZQCrrUGg19N_cZ2LaGwkytNbLJR5Yzd8iiCWRh',
    checkIn: '07:55 AM',
    checkOut: '04:30 PM',
    totalHours: '8.5h',
    basicSalary: 7500000,
    allowances: 1250000,
    netPay: 8750000
  },
  {
    id: 'emp-2',
    employeeId: 'ID-2024-045',
    name: 'Siti Aminah',
    email: 'siti.a@pdam.utility',
    department: 'Finance',
    position: 'Accountant',
    status: 'Active',
    dateUpdated: 'Oct 23, 2023',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZvMWoZiPJstNwMyx2IB9CnOhOAGrPBi9dCk6ASHyZG-2cIFImbznFPHG6hZM98pQBJ7KimkBN1853f3hBNdcMIPtGIIJK5IB9NnXj5czava9D1X4trHa3O373s0MscZ_mnVpJBAKecfC8NUM5IDK69kE39Ws_vYDW86gy7MxQwV3IP92LIHGhKwWkvwpLdiQXQt0-IxK7Jns80dtZHuzsgCgQ5pv-Sfs3EnSMHbYRakSRlHSTXc00S638VLIGZzsoX8-bKA8T4CfX',
    checkIn: '08:15 AM',
    checkOut: '05:00 PM',
    totalHours: '8.25h',
    basicSalary: 12000000,
    allowances: 3400000,
    netPay: 15400000
  },
  {
    id: 'emp-3',
    employeeId: 'ID-2023-112',
    name: 'Andi Wijaya',
    email: 'andi.w@pdam.utility',
    department: 'Field Operations',
    position: 'Supervisor',
    status: 'On Leave',
    dateUpdated: 'Oct 23, 2023',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0nbCI9p12BKF4z43oO_v-8equ4UDJEVxCI2hCFbxwUY4CSNJJm08Zyd4EjadXqkVWJ7Uxr1C5HRN_qkbzlo_N7XW9Lhc4Es6Cd4Ur_DKYDsbYsFd3ZM0AQfuqCwKv5N75v0SfS5uI2HtScuI1s5BvTID0b6wPF44eEMJrFhXwTVxKo_ojDjA9nkRCJ8wuPkeo7br_6pUN_UF94M4aJzH4hEP9diWVVPSRFzxrR_lkmPp_EjDk6W9wRlehzCeuuHsva0igaZZ8oPQ1',
    checkIn: '-',
    checkOut: '-',
    totalHours: '0h',
    basicSalary: 6800000,
    allowances: 800000,
    netPay: 7600000
  },
  {
    id: 'emp-4',
    employeeId: 'ID-2024-089',
    name: 'Rina Putri',
    email: 'rina.p@pdam.utility',
    department: 'IT',
    position: 'System Admin',
    status: 'Probation',
    dateUpdated: 'Oct 23, 2023',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9Ycb-1Ran9Gh1thpc2g7H8NkjeR6RJPy_m4oK5livwIm7gwxno7rY9t5W3cKzMJPwAP1jntVWX5EiVmCqwy_zYNrRJaPwU6yBe3-GnaLb1DNhxTMuRGq-pHygIJigpRDQVviwbrud53-_9Do0Tb05SGg2ST31Em-J_ik5HJjVkQ1We8Ur97UeW-gLaejd_TnjjctqnhC-bUUbdDdkZKy3O_btU9v2Itl0_0tQuKnuf05_5S98pamL3YkzJj31MY68CN_9-2kZmRr9',
    checkIn: '08:15 AM',
    checkOut: '05:00 PM',
    totalHours: '8.25h',
    basicSalary: 5200000,
    allowances: 450000,
    netPay: 5650000
  },
  {
    id: 'emp-5',
    employeeId: 'ID-2022-005',
    name: 'Donny Pratama',
    email: 'donny.p@pdam.utility',
    department: 'Finance',
    position: 'Head of Dept.',
    status: 'Active',
    dateUpdated: 'Oct 23, 2023',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvs7D2WRFIz4lVVryEf3rCVtPOu_Jvz4XBBvRm8FxbBCnAMDQ6v3pqKG8C41tIpg8SfCO4qjBItNcgnl5htUf0RlO4rLCOujf_NBp4HzkO_baEDeUoAd7uavttQQDvHhZuOkU2v5dVGnZwfhxEzIE2OkcWrFCD7B9N6NPsewGeQofVYtSeEDNlb-Dz3DgXm-IT-_S5AqQwPZU7oV2drR7vwHMC-VVqd76RrFcRnk4aAdA_xNWVv0f2zZMQlO3nmkQNBqamqIKmojiN',
    checkIn: '07:45 AM',
    checkOut: '04:15 PM',
    totalHours: '8.5h',
    basicSalary: 15000000,
    allowances: 4500000,
    netPay: 19500000
  },
  {
    id: 'emp-6',
    employeeId: 'ID-2023-018',
    name: 'Dewi Lestari',
    email: 'dewi.l@pdam.utility',
    department: 'Public Relations',
    position: 'PR Officer',
    status: 'Probation',
    dateUpdated: 'Oct 22, 2023',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXj6Qw5vahJzIP3YaPUJeC8aMJYW0n03btbBj70SCPKCYEswq8Qo8OZGxWf55-3oAoNrVNHr38JGmYflJ1LSy_70BTtbW9Ygrhzkc-YQa__lAjYbI03rzFapBCJveNzCMAL48-UUNQVp78QtE5GXAhdIkpY13lWLJf3ebEwOK05JbT94tpvatLeCleLl1BasmeYEs6f8sXPQq7xui_SoCCWHy4gJdEKzpSm8YdjUeZ86mZecnU1TeKxwqTWZvUdmsZ9YDNjAJ3kARl',
    checkIn: '08:05 AM',
    checkOut: '04:45 PM',
    totalHours: '8.6h',
    basicSalary: 6200000,
    allowances: 800000,
    netPay: 7000000
  },
  {
    id: 'emp-7',
    employeeId: 'ID-2023-042',
    name: 'Siti Rahayu',
    email: 'siti.r@pdam.utility',
    department: 'Finance & Accounting',
    position: 'Accounting Officer',
    status: 'On Leave',
    dateUpdated: 'Oct 23, 2023',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxcV7v4lQI1C76fTQQwmgkNxKKaJotdrO63Wd8qQSvwASw6uy_FiayE-g9E9KmPeLGRvhU15gRUIYFbjxdavyJmXroU0gZKkM7xJq-7vY01kxVwfWpp3gOLt2ujkecXrX3UA6Fm1CC8mx8TP9BQM09nGKnxP6KHeOvrodOBWeLklyaUyMM-OfmZFeL6oH7BG2zQgGIPkP1g-3yIsNrxmnw20JinzceC2sloCK7_IBzU6OHUuvoCwECI-Yu_Itjo0uNIJa0pnqEsarX',
    checkIn: '-',
    checkOut: '-',
    totalHours: '0h',
    basicSalary: 7200000,
    allowances: 1100000,
    netPay: 8300000
  }
];

export const INITIAL_LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: 'leave-1',
    employeeId: 'ID-2024-002',
    employeeName: 'Budi Pratama',
    department: 'Maintenance Unit',
    leaveType: 'Annual',
    duration: 'Oct 12 - Oct 15',
    daysCount: 4,
    reason: 'Family gathering in Yogyakarta',
    status: 'Pending',
    avatarInitials: 'BP'
  },
  {
    id: 'leave-2',
    employeeId: 'ID-2024-045',
    employeeName: 'Siti Aminah',
    department: 'Customer Service',
    leaveType: 'Sick',
    duration: 'Oct 09 - Oct 10',
    daysCount: 2,
    reason: 'Doctor recommended bed rest',
    status: 'Approved',
    avatarInitials: 'SA'
  },
  {
    id: 'leave-3',
    employeeId: 'ID-2024-089',
    employeeName: 'Rina Wijaya',
    department: 'Financial Admin',
    leaveType: 'Maternity',
    duration: 'Sep 15 - Dec 15',
    daysCount: 90,
    reason: 'Third trimester leave',
    status: 'Approved',
    avatarInitials: 'RW'
  },
  {
    id: 'leave-4',
    employeeId: 'ID-2024-001',
    employeeName: 'Agus Setiawan',
    department: 'Network Technician',
    leaveType: 'Unpaid',
    duration: 'Oct 01 - Oct 01',
    daysCount: 1,
    reason: 'Personal business matters',
    status: 'Rejected',
    avatarInitials: 'AS'
  },
  {
    id: 'leave-5',
    employeeId: 'ID-2024-118',
    employeeName: 'Maya Dwi',
    department: 'Laboratory',
    leaveType: 'Annual',
    duration: 'Oct 20 - Oct 22',
    daysCount: 3,
    reason: 'Vacation during school break',
    status: 'Pending',
    avatarInitials: 'MD'
  }
];

export const INITIAL_PAYROLL_BATCHES: PayrollBatch[] = [
  {
    id: 'batch-1',
    name: 'September 2023 Full',
    dateProcessed: 'Sep 28, 2023',
    status: 'Paid',
    recipientsCount: 1248,
    totalAmount: 4282400000
  },
  {
    id: 'batch-2',
    name: 'Q3 Performance Bonus',
    dateProcessed: 'Oct 15, 2023',
    status: 'Processing',
    recipientsCount: 1248,
    totalAmount: 842000000
  },
  {
    id: 'batch-3',
    name: 'Overtime Adjustment',
    dateProcessed: 'Last edited 2h ago',
    status: 'Draft',
    recipientsCount: 185,
    totalAmount: 124500000
  }
];
