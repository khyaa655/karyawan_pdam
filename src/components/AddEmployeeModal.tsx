import React, { useState } from 'react';
import { Employee } from '../types';

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newEmp: Employee) => void;
}

export default function AddEmployeeModal({ isOpen, onClose, onAdd }: AddEmployeeModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Field Operations');
  const [position, setPosition] = useState('');
  const [basicSalary, setBasicSalary] = useState(6000000);
  const [allowance, setAllowance] = useState(1000000);
  const [status, setStatus] = useState<'Active' | 'On Leave' | 'Probation'>('Active');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Hotlinked placeholder avatars based on selected department for standard design consistency
    const deptAvatars: Record<string, string> = {
      'Field Operations': 'https://lh3.googleusercontent.com/aida-public/AB6AXuANpgfDWSA1um_u-iCBYCFXTd4TyRzTlRWMm19C7S4xD3LhVYU3F1ICpfZUwEjjuIVwUQIIeOA6m_FmFaP-NVEZEBtec_HsvoJg9s1hLscaYlT4mVr9JBkPiRMZQCzKxCxS8eGKcRkFMyYlYazRBFUoFZpnJKwdDdpl58MlyxvOS_s979e04umcxnKvE-4SJKYAQCTlKvDho7DdZqeudwatingOz_i1hSTqBttXW3ZQCrrUGg19N_cZ2LaGwkytNbLJR5Yzd8iiCWRh',
      'Finance': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZvMWoZiPJstNwMyx2IB9CnOhOAGrPBi9dCk6ASHyZG-2cIFImbznFPHG6hZM98pQBJ7KimkBN1853f3hBNdcMIPtGIIJK5IB9NnXj5czava9D1X4trHa3O373s0MscZ_mnVpJBAKecfC8NUM5IDK69kE39Ws_vYDW86gy7MxQwV3IP92LIHGhKwWkvwpLdiQXQt0-IxK7Jns80dtZHuzsgCgQ5pv-Sfs3EnSMHbYRakSRlHSTXc00S638VLIGZzsoX8-bKA8T4CfX',
      'IT': 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9Ycb-1Ran9Gh1thpc2g7H8NkjeR6RJPy_m4oK5livwIm7gwxno7rY9t5W3cKzMJPwAP1jntVWX5EiVmCqwy_zYNrRJaPwU6yBe3-GnaLb1DNhxTMuRGq-pHygIJigpRDQVviwbrud53-_9Do0Tb05SGg2ST31Em-J_ik5HJjVkQ1We8Ur97UeW-gLaejd_TnjjctqnhC-bUUbdDdkZKy3O_btU9v2Itl0_0tQuKnuf05_5S98pamL3YkzJj31MY68CN_9-2kZmRr9',
      'Public Relations': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXj6Qw5vahJzIP3YaPUJeC8aMJYW0n03btbBj70SCPKCYEswq8Qo8OZGxWf55-3oAoNrVNHr38JGmYflJ1LSy_70BTtbW9Ygrhzkc-YQa__lAjYbI03rzFapBCJveNzCMAL48-UUNQVp78QtE5GXAhdIkpY13lWLJf3ebEwOK05JbT94tpvatLeCleLl1BasmeYEs6f8sXPQq7xui_SoCCWHy4gJdEKzpSm8YdjUeZ86mZecnU1TeKxwqTWZvUdmsZ9YDNjAJ3kARl',
      'Water Quality': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxcV7v4lQI1C76fTQQwmgkNxKKaJotdrO63Wd8qQSvwASw6uy_FiayE-g9E9KmPeLGRvhU15gRUIYFbjxdavyJmXroU0gZKkM7xJq-7vY01kxVwfWpp3gOLt2ujkecXrX3UA6Fm1CC8mx8TP9BQM09nGKnxP6KHeOvrodOBWeLklyaUyMM-OfmZFeL6oH7BG2zQgGIPkP1g-3yIsNrxmnw20JinzceC2sloCK7_IBzU6OHUuvoCwECI-Yu_Itjo0uNIJa0pnqEsarX'
    };

    const newEmp: Employee = {
      id: 'emp-' + Date.now(),
      employeeId: 'ID-2024-' + Math.floor(100 + Math.random() * 900),
      name,
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@pdam.utility`,
      department,
      position: position || 'Analyst',
      status,
      dateUpdated: 'Oct 24, 2023',
      avatar: deptAvatars[department] || deptAvatars['Field Operations'],
      checkIn: '08:00 AM',
      checkOut: '04:30 PM',
      totalHours: '8.5h',
      basicSalary,
      allowances: allowance,
      netPay: basicSalary + allowance
    };

    onAdd(newEmp);
    onClose();

    // Reset Form Fields
    setName('');
    setEmail('');
    setPosition('');
    setBasicSalary(6000000);
    setAllowance(1000000);
    setStatus('Active');
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in p-4 select-none">
      <div className="bg-surface-bright border border-primary/15 rounded-none w-full max-w-lg shadow-none overflow-hidden animate-slide-up">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-primary/10 flex justify-between items-center bg-surface-container-low/30">
          <h3 className="font-serif font-bold text-base text-primary flex items-center gap-2 italic">
            <span className="material-symbols-outlined text-secondary">person_add</span>
            New Personnel Recruitment Form
          </h3>
          <button 
            onClick={onClose} 
            className="p-1 text-on-surface-variant hover:bg-primary/5 hover:text-primary rounded-none transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Full Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface-container-low border border-primary/10 rounded-none px-3 py-1.5 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary/50 focus:border-secondary transition-all font-sans"
              placeholder="e.g. Agung Setiawan"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Department</label>
              <select 
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-surface-container-low border border-primary/10 rounded-none px-3 py-1.5 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary/50 cursor-pointer"
              >
                <option value="Field Operations">Field Operations</option>
                <option value="Finance">Finance</option>
                <option value="IT">IT</option>
                <option value="Public Relations">Public Relations</option>
                <option value="Water Quality">Water Quality</option>
              </select>
            </div>
            
            <div>
              <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Position Role</label>
              <input 
                type="text" 
                value={position} 
                onChange={(e) => setPosition(e.target.value)}
                className="w-full bg-surface-container-low border border-primary/10 rounded-none px-3 py-1.5 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary/50 focus:border-secondary transition-all font-sans"
                placeholder="e.g. Senior Technician"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Email (Optional)</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-container-low border border-primary/10 rounded-none px-3 py-1.5 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary/50 focus:border-secondary transition-all font-sans"
              placeholder="e.g. agung.s@pdam.utility"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Basic Salary (Rp)</label>
              <input 
                type="number" 
                value={basicSalary} 
                onChange={(e) => setBasicSalary(Number(e.target.value))}
                className="w-full bg-surface-container-low border border-primary/10 rounded-none px-3 py-1.5 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary/50 focus:border-secondary font-mono"
                required
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Allowances (Rp)</label>
              <input 
                type="number" 
                value={allowance} 
                onChange={(e) => setAllowance(Number(e.target.value))}
                className="w-full bg-surface-container-low border border-primary/10 rounded-none px-3 py-1.5 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary/50 focus:border-secondary font-mono"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Status</label>
            <div className="flex gap-4">
              {['Active', 'Probation'].map((st) => (
                <label key={st} className="flex items-center gap-2 text-xs font-semibold text-primary cursor-pointer">
                  <input 
                    type="radio" 
                    name="modal-status" 
                    value={st} 
                    checked={status === st}
                    onChange={() => setStatus(st as any)}
                    className="text-secondary border-primary/20 bg-surface-bright focus:ring-0 focus:ring-offset-0 rounded-none w-3.5 h-3.5 cursor-pointer"
                  />
                  {st}
                </label>
              ))}
            </div>
          </div>

          {/* Modal Footer Buttons */}
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
              Register Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
