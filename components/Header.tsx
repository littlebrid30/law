'use client';

import { useState, useEffect } from 'react';
import { Search, Settings, Menu, User } from 'lucide-react';
import moment from 'jalali-moment';

export function Header({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean; setSidebarOpen: (open: boolean) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentJalali, setCurrentJalali] = useState('');

  useEffect(() => {
    const updateDate = () => {
      setCurrentJalali(moment().locale('fa').format('dddd DD MMMM YYYY'));
    };
    updateDate();
    const interval = setInterval(updateDate, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md px-6 py-4 flex items-center justify-between border-b dark:border-gray-700">
      <div className="flex items-center gap-4">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
          <Menu className="w-6 h-6" />
        </button>
        <div className="relative">
          <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="جستجوی آنی در همه پرونده‌ها، وظایف، نامه‌ها..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-12 pl-4 py-3 w-96 rounded-lg border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          {currentJalali}
        </div>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
          <Settings className="w-6 h-6" />
        </button>
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
          و
        </div>
      </div>
    </header>
  );
}
