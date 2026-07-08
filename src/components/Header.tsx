import React from 'react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  adminName: string;
  adminRole: string;
  adminAvatar: string;
}

export default function Header({
  searchQuery,
  setSearchQuery,
  adminName,
  adminRole,
  adminAvatar
}: HeaderProps) {
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-260px)] h-16 bg-surface-bright/90 backdrop-blur-md border-b border-primary/10 flex justify-between items-center px-8 z-40">
      {/* Search Bar Container */}
      <div className="flex items-center flex-1 max-w-md">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-1 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-b border-primary/10 rounded-none py-1.5 pl-8 pr-4 text-xs font-sans text-on-surface placeholder-on-surface-variant/55 focus:outline-none focus:border-primary transition-all"
            placeholder="Search roster..."
          />
        </div>
      </div>

      {/* Right Side Utility Cluster */}
      <div className="flex items-center gap-4 select-none">
        {/* Notifications Icon with active badge */}
        <button className="relative p-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-2 right-2 block h-1.5 w-1.5 rounded-full bg-secondary"></span>
        </button>

        {/* Help Icon */}
        <button className="p-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
          <span className="material-symbols-outlined text-[20px]">help_outline</span>
        </button>

        {/* Vertical divider line */}
        <div className="h-6 w-[1px] bg-primary/10 mx-1"></div>

        {/* Administrator profile label */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs font-serif font-bold text-primary leading-tight">{adminName}</p>
            <p className="text-[9px] text-on-surface-variant uppercase tracking-[0.15em] font-medium">{adminRole}</p>
          </div>
          <img
            className="w-10 h-10 rounded-none border border-primary/15 object-cover"
            src={adminAvatar}
            alt={adminName}
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  );
}
