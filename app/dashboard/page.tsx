'use client';

import { LogOut } from 'lucide-react';

export default function Dashboard() {
  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="bg-blue-700 text-white p-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">میز کار وکالت</h1>
          <button onClick={logout} className="flex items-center gap-2 hover:bg-blue-800 px-4 py-2 rounded-lg transition">
            <LogOut className="w-5 h-5" /> خروج
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-5xl mb-4">پرونده</div>
            <p className="text-3xl font-bold text-blue-600">۱۲</p>
            <p className="text-gray-600">پرونده فعال</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-5xl mb-4">وظیفه</div>
            <p className="text-3xl font-bold text-red-600">۵</p>
            <p className="text-gray-600">وظیفه امروز</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-5xl mb-4">نامه</div>
            <p className="text-3xl font-bold text-green-600">۸</p>
            <p className="text-gray-600">نامه در انتظار</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-700">خوش آمدید!</h2>
          <p className="text-lg text-gray-700 leading-8">
            سیستم مدیریت پرونده وکالت شخصی شما با موفقیت راه‌اندازی شد.<br />
            از این به بعد می‌تونید پرونده، وظیفه، تقویم و پیگیری‌هاتون رو اینجا مدیریت کنید.
          </p>
        </div>
      </div>
    </div>
  );
}
