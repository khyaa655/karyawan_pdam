import React from 'react';
import { TabType } from '../types';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  adminName: string;
  adminRole: string;
  adminAvatar: string;
  onSubmitLeaveRequest: () => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  adminName,
  adminRole,
  adminAvatar,
  onSubmitLeaveRequest
}: SidebarProps) {
  const menuItems = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: 'dashboard' },
    { id: 'directory' as TabType, label: 'Directory', icon: 'group' },
    { id: 'attendance' as TabType, label: 'Attendance', icon: 'calendar_today' },
    { id: 'payroll' as TabType, label: 'Payroll', icon: 'payments' },
    { id: 'leave' as TabType, label: 'Leave', icon: 'event_busy' },
    { id: 'settings' as TabType, label: 'Settings', icon: 'settings' },
  ];

  return (
    <aside 
      id="sidebar-container"
      className="fixed left-0 top-0 h-full w-[260px] bg-surface-bright border-r border-primary/10 flex flex-col py-6 z-50 select-none"
    >
      {/* Brand Header */}
      <div className="px-6 mb-10 flex items-center gap-3">
        <div className="w-10 h-10 border border-primary flex items-center justify-center text-primary bg-transparent rounded-none">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            water_drop
          </span>
        </div>
        <div>
          <h1 className="font-serif font-bold text-xl italic tracking-tight text-primary">PDAM HRIS</h1>
          <p className="text-[9px] uppercase tracking-[0.2em] text-secondary font-bold">
            Municipal Water Utility
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow space-y-1">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-6 py-2.5 text-left transition-all duration-150 relative ${
                    isActive
                      ? 'text-primary font-serif italic text-base font-bold border-r border-primary bg-primary/5'
                      : 'text-on-surface-variant hover:bg-primary/5 hover:text-primary font-sans text-[10px] uppercase tracking-[0.15em] font-medium'
                  }`}
                >
                  <span 
                    className="material-symbols-outlined text-[18px]" 
                    style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Sidebar Action Button */}
      <div className="px-4 mb-6">
        <button
          onClick={onSubmitLeaveRequest}
          className="w-full bg-primary hover:bg-black/90 text-white py-3 px-4 rounded-none flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.15em] font-bold border border-primary transition-all duration-150 active:scale-[0.98] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          Request Leave
        </button>
      </div>

      {/* Profile Card Footer */}
      <div className="px-6 pt-4 border-t border-primary/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-none border border-primary/15 overflow-hidden bg-surface-container">
            <img 
              className="w-full h-full object-cover" 
              src={adminAvatar} 
              alt={adminName} 
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-serif font-bold text-on-surface truncate">{adminName}</p>
            <p className="text-[9px] uppercase tracking-wider text-on-surface-variant truncate">{adminRole}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
