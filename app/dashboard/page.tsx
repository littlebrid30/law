'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import moment from 'jalali-moment';
import { initDb } from '@/lib/db';

export default function Dashboard() {
  const [todayTasks, setTodayTasks] = useState(0);
  const [delayedTasks, setDelayedTasks] = useState(0);
  const [todaysList, setTodaysList] = useState<any[]>([]);

  useEffect(() => {
    const loadDashboard = async () => {
      const db = initDb();
      const today = moment().format('jYYYY/jMM/jDD');
      
      const tasks = await db.execute('SELECT * FROM tasks WHERE due_date = ?', [today]);
      const delayed = await db.execute('SELECT * FROM tasks WHERE due_date < ? AND completed = 0', [today]);
      
      setTodayTasks(tasks.rows.length);
      setDelayedTasks(delayed.rows.length);
      setTodaysList(tasks.rows.slice(0, 5));
    };
    loadDashboard();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-blue-700 dark:text-blue-400">میز کار وکالت</h1>

      {/* کارت‌های اصلی */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <h3 className="text-2xl font-bold">کارهای امروز</h3>
          <p className="text-5xl mt-4">{todayTasks}</p>
          <Button variant="secondary" className="mt-4">مشاهده در تقویم</Button>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-red-500 to-red-600 text-white">
          <h3 className="text-2xl font-bold">کارهای دارای تاخیر</h3>
          <p className="text-5xl mt-4">{delayedTasks}</p>
          <Button variant="secondary" className="mt-4">مشاهده لیست</Button>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
          <h3 className="text-2xl font-bold">نامه‌های پیگیری</h3>
          <p className="text-5xl mt-4">۱۲</p>
          <Button variant="secondary" className="mt-4">رفتن به پیگیری</Button>
        </Card>
      </div>

      {/* لیست کارهای امروز */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">کارهای من امروز</h2>
        <div className="space-y-3">
          {todaysList.length === 0 ? (
            <p className="text-gray-500 text-center py-8">هیچ وظیفه‌ای برای امروز ثبت نشده</p>
          ) : (
            todaysList.map((task: any) => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 cursor-pointer">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5" />
                  <div>
                    <p className="font-semibold">{task.title}</p>
                    <p className="text-sm text-gray-600">{task.description || 'بدون توضیح'}</p>
                  </div>
                </div>
                <span className="text-sm text-blue-600">{moment(task.due_date, 'jYYYY/jMM/jDD').format('jD jMMMM')}</span>
              </div>
            ))
          )}
          {todaysList.length > 4 && (
            <Button className="w-full mt-4">مشاهده همه وظایف</Button>
          )}
        </div>
      </Card>
    </div>
  );
}
