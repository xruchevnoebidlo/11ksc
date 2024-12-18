import React from 'react';

const ScheduleList = ({ schedule, deleteLecture }) => (
  <ul>
    {schedule.map((item, index) => (
      <li key={index}>
        {item.title} - Время: {item.lectureTime} - Аудитория: {item.classroomNumber}
        <button onClick={() => {
          console.log('Удаление лекции с индексом:', index); // Для отладки
          deleteLecture(index);
        }}>Удалить</button>
      </li>
    ))}
  </ul>
);

export default ScheduleList;
