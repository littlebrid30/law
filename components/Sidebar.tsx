import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FolderOpen, Calendar, Mail, Monitor, Settings, ChevronLeft } from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'داشبورد', href: '/dashboard' },
  { icon: FolderOpen, label: 'پرونده‌ها', href: '/cases' },
  { icon: Calendar, label: 'تقویم', href: '/calendar' },
  { icon: Mail, label: 'پیگیری نامه‌ها', href: '/letters' },
  { icon: Monitor, label: 'مانیتورینگ', href: '/monitoring' },
  { icon: Settings, label: 'تنظیمات', href: '/settings' },
];

export function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
  const pathname = usePathname();

  return (
    <div className={`fixed right-0 top-0 h-full bg-white dark:bg-gray-800 shadow-2xl transition-all duration-300 z-50 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="p-4 border-b dark:border-gray-700">
        <div className="flex items-center justify-between">
          {isOpen && <h2 className="text-xl font-bold text-blue-600">مدیریت وکالت</h2>}
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <ChevronLeft className={`w-6 h-6 transition-transform ${!isOpen && 'rotate-180'}`} />
          </button>
        </div>
      </div>
      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div className={`flex items-center px-6 py-4 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors ${isActive ? 'bg-blue-100 dark:bg-blue-900 border-r-4 border-blue-600' : ''}`}>
                <Icon className="w-6 h-6 text-blue-600" />
                {isOpen && <span className="mr-4 text-lg">{item.label}</span>}
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
