import React from 'react';

const StudentGrades = ({ grades }) => {
  // Функция для вычисления средней оценки
  const calculateAverage = (grades) => {
    if (Array.isArray(grades)) {
      const total = grades.reduce((sum, grade) => sum + grade, 0);
      return (total / grades.length).toFixed(2);
    }
    return grades; // если оценка одна, просто возвращаем её
  };

  if (!grades || Object.keys(grades).length === 0) {
    return <p>Оценки не найдены.</p>;
  }

  return (
    <div className="container">
      <h2>Ваши оценки</h2>
      <table className="grades-table">
        <thead>
          <tr>
            <th>Предмет</th>
            <th>Оценка</th>
            <th>Средняя оценка</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(grades).map(([subject, grade], index) => (
            <tr key={index}>
              <td>{subject}</td>
              <td>{Array.isArray(grade) ? grade.join(', ') : grade}</td>
              <td>{calculateAverage(grade)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentGrades;
