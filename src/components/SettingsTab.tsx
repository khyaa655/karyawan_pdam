import React, { useState } from 'react';

interface SettingsTabProps {
  adminName: string;
  setAdminName: (name: string) => void;
  adminRole: string;
  setAdminRole: (role: string) => void;
  adminAvatar: string;
  onSaveSettings: () => void;
}

export default function SettingsTab({
  adminName,
  setAdminName,
  adminRole,
  setAdminRole,
  adminAvatar,
  onSaveSettings
}: SettingsTabProps) {
  // Local editable states
  const [localName, setLocalName] = useState(adminName);
  const [localRole, setLocalRole] = useState(adminRole);
  const [localEmail, setLocalEmail] = useState('sarah.smith@pdam.utility');
  const [localEmpId, setLocalEmpId] = useState('ADM-2024-99');
  
  const [minWage, setMinWage] = useState(5200000);
  const [overtimeMultiplier, setOvertimeMultiplier] = useState('1.5');
  const [medicalPremium, setMedicalPremium] = useState(350000);
  
  const [autoApproveSick, setAutoApproveSick] = useState(true);
  const [sendPushAlerts, setSendPushAlerts] = useState(true);
  const [requireGeoLocation, setRequireGeoLocation] = useState(false);

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    setTimeout(() => {
      // Propagate settings to App-level state
      setAdminName(localName);
      setAdminRole(localRole);
      setSaving(false);
      setSavedSuccess(true);
      onSaveSettings();

      setTimeout(() => setSavedSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title */}
      <div className="select-none pb-4 border-b border-primary/10">
        <h2 className="text-4xl font-serif font-medium text-primary tracking-tight italic leading-tight">
          System Settings
        </h2>
        <p className="text-xs text-on-surface-variant mt-1.5 uppercase tracking-[0.1em]">
          Configure regional HR rules, utility rates, and administrative profiles.
        </p>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-12 gap-8">
        {/* Left Section: Admin Profile */}
        <div className="col-span-12 lg:col-span-6 space-y-6">
          <div className="bg-surface-bright border border-primary/10 rounded-none p-6">
            <h4 className="font-serif font-bold text-base text-primary mb-6 select-none italic">Administrator Profile</h4>
            
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-primary/5 select-none">
              <img 
                className="w-16 h-16 rounded-none border border-primary/10 object-cover" 
                src={adminAvatar} 
                alt="Sarah Smith" 
                referrerPolicy="no-referrer"
              />
              <div>
                <h5 className="font-serif font-bold text-sm text-primary">{localName}</h5>
                <p className="text-xs text-on-surface-variant font-medium">{localRole}</p>
                <p className="text-[10px] text-on-surface-variant uppercase mt-1.5 tracking-widest font-bold">System Admin</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5 select-none">Full Name</label>
                <input 
                  type="text" 
                  value={localName} 
                  onChange={(e) => setLocalName(e.target.value)}
                  className="w-full bg-surface-container-low border border-primary/10 rounded-none px-3 py-1.5 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary/50 focus:border-secondary transition-all font-sans"
                  placeholder="e.g. Sarah Smith"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5 select-none">Employee ID</label>
                  <input 
                    type="text" 
                    value={localEmpId}
                    onChange={(e) => setLocalEmpId(e.target.value)}
                    className="w-full bg-surface-container-low border border-primary/10 rounded-none px-3 py-1.5 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary/50 focus:border-secondary transition-all font-sans"
                    placeholder="e.g. ADM-2024-99"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5 select-none">Role Title</label>
                  <input 
                    type="text" 
                    value={localRole}
                    onChange={(e) => setLocalRole(e.target.value)}
                    className="w-full bg-surface-container-low border border-primary/10 rounded-none px-3 py-1.5 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary/50 focus:border-secondary transition-all font-sans"
                    placeholder="e.g. HR Manager"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5 select-none">Email Address</label>
                <input 
                  type="email" 
                  value={localEmail}
                  onChange={(e) => setLocalEmail(e.target.value)}
                  className="w-full bg-surface-container-low border border-primary/10 rounded-none px-3 py-1.5 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary/50 focus:border-secondary transition-all font-sans"
                  placeholder="sarah.smith@pdam.utility"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Policy Rules & Toggles */}
        <div className="col-span-12 lg:col-span-6 space-y-6">
          {/* Policy Variables Card */}
          <div className="bg-surface-bright border border-primary/10 rounded-none p-6">
            <h4 className="font-serif font-bold text-base text-primary mb-6 select-none italic">HR Policy Variables</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5 select-none">Regional Minimum Wage (UMR)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-on-surface-variant select-none">Rp</span>
                  <input 
                    type="number" 
                    value={minWage}
                    onChange={(e) => setMinWage(Number(e.target.value))}
                    className="w-full bg-surface-container-low border border-primary/10 rounded-none pl-9 pr-3 py-1.5 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary/50 focus:border-secondary transition-all font-mono"
                    placeholder="5200000"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5 select-none">Field Overtime Multiplier</label>
                  <select 
                    value={overtimeMultiplier}
                    onChange={(e) => setOvertimeMultiplier(e.target.value)}
                    className="w-full bg-surface-container-low border border-primary/10 rounded-none px-3 py-1.5 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary/50 cursor-pointer"
                  >
                    <option value="1.0">1.0x (Standard)</option>
                    <option value="1.5">1.5x (Regional rule)</option>
                    <option value="2.0">2.0x (Holiday rule)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5 select-none">Medical Premium / Month</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-on-surface-variant select-none">Rp</span>
                    <input 
                      type="number" 
                      value={medicalPremium}
                      onChange={(e) => setMedicalPremium(Number(e.target.value))}
                      className="w-full bg-surface-container-low border border-primary/10 rounded-none pl-9 pr-3 py-1.5 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary/50 focus:border-secondary transition-all font-mono"
                      placeholder="350000"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Workflow Toggles Card */}
          <div className="bg-surface-bright border border-primary/10 rounded-none p-6">
            <h4 className="font-serif font-bold text-base text-primary mb-5 select-none italic">HR Workflow Automation</h4>
            
            <div className="space-y-4">
              {/* Toggle 1 */}
              <div className="flex items-center justify-between py-1 border-b border-primary/5 select-none">
                <div>
                  <p className="text-xs font-serif font-bold text-primary">Auto-approve Single Day Sick Leaves</p>
                  <p className="text-[10px] text-on-surface-variant mt-0.5">Bypasses manager queue if valid doctor note is present.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAutoApproveSick(!autoApproveSick)}
                  className={`w-10 h-5 border p-0.5 transition-colors cursor-pointer outline-none relative rounded-none ${
                    autoApproveSick ? 'bg-secondary border-secondary' : 'bg-surface-container border-primary/20'
                  }`}
                >
                  <div className={`bg-white w-3.5 h-3.5 rounded-none transform transition-transform duration-200 ${
                    autoApproveSick ? 'translate-x-[18px]' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Toggle 2 */}
              <div className="flex items-center justify-between py-1 border-b border-primary/5 select-none">
                <div>
                  <p className="text-xs font-serif font-bold text-primary">Send Automated Push Alerts on Clock-out</p>
                  <p className="text-[10px] text-on-surface-variant mt-0.5">Notifies staff of compiled daily logged work hours.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSendPushAlerts(!sendPushAlerts)}
                  className={`w-10 h-5 border p-0.5 transition-colors cursor-pointer outline-none relative rounded-none ${
                    sendPushAlerts ? 'bg-secondary border-secondary' : 'bg-surface-container border-primary/20'
                  }`}
                >
                  <div className={`bg-white w-3.5 h-3.5 rounded-none transform transition-transform duration-200 ${
                    sendPushAlerts ? 'translate-x-[18px]' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Toggle 3 */}
              <div className="flex items-center justify-between py-1 select-none">
                <div>
                  <p className="text-xs font-serif font-bold text-primary">Require Geolocation Validation</p>
                  <p className="text-[10px] text-on-surface-variant mt-0.5">Enforces physical checking of field operation coordinates.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setRequireGeoLocation(!requireGeoLocation)}
                  className={`w-10 h-5 border p-0.5 transition-colors cursor-pointer outline-none relative rounded-none ${
                    requireGeoLocation ? 'bg-secondary border-secondary' : 'bg-surface-container border-primary/20'
                  }`}
                >
                  <div className={`bg-white w-3.5 h-3.5 rounded-none transform transition-transform duration-200 ${
                    requireGeoLocation ? 'translate-x-[18px]' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions Row */}
        <div className="col-span-12 flex justify-end gap-3 pt-4 select-none">
          {savedSuccess && (
            <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-wider animate-pulse">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              System Configuration Saved Successfully!
            </div>
          )}
          
          <button 
            type="button" 
            onClick={() => {
              setLocalName(adminName);
              setLocalRole(adminRole);
            }}
            className="px-6 py-2.5 bg-surface-bright hover:bg-primary/5 border border-primary/15 text-on-surface font-bold text-[10px] uppercase tracking-wider rounded-none cursor-pointer"
          >
            Reset to default
          </button>
          
          <button 
            type="submit" 
            disabled={saving}
            className="px-6 py-2.5 bg-primary hover:bg-black/90 text-white border border-primary font-bold text-[10px] uppercase tracking-wider rounded-none transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px] flex items-center justify-center gap-1.5"
          >
            {saving ? (
              <>
                <span className="animate-spin material-symbols-outlined text-xs">rotate_right</span>
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
