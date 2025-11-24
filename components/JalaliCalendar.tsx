'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import jalaliPlugin from '@fullcalendar/jalali';
import moment from 'jalali-moment';

export default function JalaliCalendar() {
  const handleDateClick = (arg: any) => {
    alert('تاریخ کلیک شده: ' + moment(arg.date).format('jYYYY/jMM/jDD'));
  };

  const handleEventDrop = (info: any) => {
    // تاریخ جدید رو ذخیره کن
    console.log('تسک منتقل شد به:', moment(info.event.start).format('jYYYY/jMM/jDD'));
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, jalaliPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay'
        }}
        locale="fa"
        direction="rtl"
        events={[
          { title: 'جلسه با موکل', date: '1404-09-05', backgroundColor: '#3b82f6' },
          { title: 'پیگیری نامه', date: '1404-09-10', backgroundColor: '#ef4444' },
        ]}
        eventDrop={handleEventDrop}
        editable={true}
        dateClick={handleDateClick}
        height="auto"
      />
    </div>
  );
}
