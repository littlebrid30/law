'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { initDb } from '@/lib/db';

export default function CasesPage() {
  const [cases, setCases] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [newCaseName, setNewCaseName] = useState('');
  const [newCaseColor, setNewCaseColor] = useState('#3b82f6');

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    const db = initDb();
    const result = await db.execute('SELECT * FROM cases');
    setCases(result.rows);
  };

  const createCase = async () => {
    if (!newCaseName.trim()) return;
    const db = initDb();
    await db.execute('INSERT INTO cases (name, color) VALUES (?, ?)', [newCaseName, newCaseColor]);
    setNewCaseName('');
    setOpen(false);
    loadCases();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-blue-700">پرونده‌های من</h1>
        <Button onClick={() => setOpen(true)} className="text-lg px-8">+ ایجاد پرونده جدید</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cases.map((c: any) => (
          <div key={c.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all cursor-pointer border-t-8" style={{ borderColor: c.color }}>
            <div className="text-6xl text-center mb-4">{c.icon || 'پرونده'}</div>
            <h3 className="text-xl font-bold text-center">{c.name}</h3>
            <div className="mt-4 text-center space-y-2 text-sm">
              <p>وظایف: ۱۲ (۶ انجام شده)</p>
              <p>درصد پیشرفت: ۵۰٪</p>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>ایجاد پرونده جدید</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="نام پرونده" value={newCaseName} onChange={(e) => setNewCaseName(e.target.value)} className="text-right" />
            <div>
              <label>رنگ پرونده</label>
              <input type="color" value={newCaseColor} onChange={(e) => setNewCaseColor(e.target.value)} className="w-full h-12 rounded mt-2" />
            </div>
            <div className="flex gap-3">
              <Button onClick={createCase} className="flex-1">ایجاد</Button>
              <Button variant="outline" onClick={() => setOpen(false)}>انصراف</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
