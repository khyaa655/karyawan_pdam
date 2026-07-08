import React, { useState, useMemo } from 'react';
import { Employee } from '../types';

interface DirectoryTabProps {
  employees: Employee[];
  searchQuery: string;
  onAddEmployee: () => void;
  onSelectEmployee: (emp: Employee) => void;
}

export default function DirectoryTab({
  employees,
  searchQuery,
  onAddEmployee,
  onSelectEmployee
}: DirectoryTabProps) {
  const [selectedDepartmentFilter, setSelectedDepartmentFilter] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const departments = ['All', 'Field Operations', 'Finance', 'IT', 'Public Relations', 'Water Quality'];

  // Filter employees based on search query AND department selection
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDept =
        selectedDepartmentFilter === 'All' ||
        emp.department.toLowerCase().includes(selectedDepartmentFilter.toLowerCase());

      return matchesSearch && matchesDept;
    });
  }, [employees, searchQuery, selectedDepartmentFilter]);

  // Pagination logic
  const itemsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / itemsPerPage));
  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredEmployees.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredEmployees, currentPage, itemsPerPage]);

  const totalMockEmployees = filteredEmployees.length + 1240; // Maintain base mock total

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Breadcrumbs and Page Title */}
      <div className="flex justify-between items-end select-none pb-4 border-b border-primary/10">
        <div>
          <nav className="flex text-[9px] font-bold text-on-surface-variant uppercase tracking-[0.25em] gap-2 mb-2">
            <span>Organization</span>
            <span>/</span>
            <span className="text-secondary font-extrabold">Employee Directory</span>
          </nav>
          <h2 className="text-4xl font-serif font-medium text-primary tracking-tight italic leading-tight">
            Employee Directory
          </h2>
          <p className="text-xs text-on-surface-variant mt-1">
            Manage and monitor personnel records across all municipal water departments.
          </p>
        </div>

        {/* Toolbar Buttons */}
        <div className="flex gap-3">
          {/* Department Filter Selector styled like a button */}
          <div className="relative">
            <select
              value={selectedDepartmentFilter}
              onChange={(e) => {
                setSelectedDepartmentFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none bg-surface-bright border border-primary/15 rounded-none px-4 py-2 pr-10 text-[10px] uppercase tracking-wider font-bold text-on-surface hover:bg-primary/5 transition-colors cursor-pointer outline-none"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === 'All' ? 'Filters: All Depts' : `Dept: ${dept}`}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-on-surface-variant">
              filter_list
            </span>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 border border-primary/15 text-on-surface font-bold text-[10px] uppercase tracking-wider rounded-none hover:bg-primary/5 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[16px]">download</span>
            Export
          </button>

          <button
            onClick={onAddEmployee}
            className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-black/90 text-white font-bold text-[10px] uppercase tracking-wider rounded-none border border-primary transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">person_add</span>
            Add New Employee
          </button>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 select-none">
        <div className="bg-surface-bright border border-primary/10 p-5 rounded-none">
          <p className="text-[9px] text-on-surface-variant uppercase tracking-[0.2em] font-semibold">Total Employees</p>
          <div className="flex justify-between items-end mt-2">
            <h3 className="text-3xl font-serif font-medium text-primary">{totalMockEmployees.toLocaleString()}</h3>
            <span className="text-[9px] font-bold text-secondary uppercase tracking-wider">
              +12 this month
            </span>
          </div>
        </div>

        <div className="bg-surface-bright border border-primary/10 p-5 rounded-none">
          <p className="text-[9px] text-on-surface-variant uppercase tracking-[0.2em] font-semibold">Field Operations</p>
          <div className="flex justify-between items-end mt-2">
            <h3 className="text-3xl font-serif font-medium text-primary">842</h3>
            <div className="w-16 h-1 bg-surface-container rounded-none overflow-hidden mb-2">
              <div className="h-full bg-secondary" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-surface-bright border border-primary/10 p-5 rounded-none">
          <p className="text-[9px] text-on-surface-variant uppercase tracking-[0.2em] font-semibold">On Leave</p>
          <div className="flex justify-between items-end mt-2">
            <h3 className="text-3xl font-serif font-medium text-secondary">34</h3>
            <span className="text-[9px] uppercase tracking-wider font-bold text-on-surface-variant mb-1">2.7% rate</span>
          </div>
        </div>

        <div className="bg-surface-bright border border-primary/10 p-5 rounded-none">
          <p className="text-[9px] text-on-surface-variant uppercase tracking-[0.2em] font-semibold">Vacant Roles</p>
          <div className="flex justify-between items-end mt-2">
            <h3 className="text-3xl font-serif font-medium text-primary">18</h3>
            <span className="material-symbols-outlined text-on-surface-variant/40 mb-1">trending_up</span>
          </div>
        </div>
      </div>

      {/* Main Employee Table */}
      <div className="bg-surface-bright border border-primary/10 rounded-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low/60 select-none border-b border-primary/10">
              <tr>
                <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                  <div className="flex items-center gap-2">
                    Employee Name 
                    <span className="material-symbols-outlined text-[14px]">arrow_downward</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                  Employee ID
                </th>
                <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                  Department
                </th>
                <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                  Position
                </th>
                <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                  Status
                </th>
                <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-[0.18em] text-on-surface-variant text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {paginatedEmployees.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-on-surface-variant font-serif italic">
                    No employees found matching the search criteria.
                  </td>
                </tr>
              ) : (
                paginatedEmployees.map((emp) => (
                  <tr 
                    key={emp.id} 
                    onClick={() => onSelectEmployee(emp)}
                    className="hover:bg-primary/5 transition-colors group cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          className="w-10 h-10 rounded-none object-cover border border-primary/10" 
                          src={emp.avatar} 
                          alt={emp.name}
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="text-xs font-serif font-bold text-primary group-hover:text-secondary transition-colors">
                            {emp.name}
                          </p>
                          <p className="text-[10px] text-on-surface-variant">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-on-surface font-mono">
                      {emp.employeeId}
                    </td>
                    <td className="px-6 py-4 text-xs text-on-surface font-sans">
                      {emp.department}
                    </td>
                    <td className="px-6 py-4 text-xs text-on-surface font-sans">
                      {emp.position}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 border text-[9px] uppercase tracking-wider font-bold rounded-none ${
                        emp.status === 'Active'
                          ? 'border-secondary/35 text-secondary'
                          : emp.status === 'On Leave'
                          ? 'border-primary/25 text-primary'
                          : emp.status === 'Probation'
                          ? 'border-outline/35 text-on-surface-variant'
                          : 'border-primary/10 text-on-surface-variant'
                      }`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => onSelectEmployee(emp)}
                        className="p-1 hover:bg-surface-container rounded-none text-on-surface-variant hover:text-primary transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 bg-surface-container-low/60 flex justify-between items-center border-t border-primary/10 select-none">
          <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
            Showing <span className="font-bold">{(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredEmployees.length)}</span> of <span className="font-bold">{filteredEmployees.length}</span> employees
          </p>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-none border border-primary/10 bg-surface-bright hover:bg-primary/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>
            
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 flex items-center justify-center rounded-none text-[10px] font-bold transition-all cursor-pointer ${
                  currentPage === i + 1
                    ? 'bg-primary text-white border border-primary font-bold'
                    : 'border border-primary/10 bg-surface-bright hover:bg-primary/5 text-on-surface'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button 
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-none border border-primary/10 bg-surface-bright hover:bg-primary/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
