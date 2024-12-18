import React from 'react';

const StudentDashboard = ({ currentUser }) => {
  return (
    <div>
      <h2>Личный кабинет: {currentUser.username}</h2>
      <table>
        <thead>
          <tr>
            <th>Предмет</th>
            <th>Оценки</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(currentUser.grades || {}).map(([subject, grades]) => (
            <tr key={subject}>
              <td>{subject}</td>
              <td>{grades.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDashboard;
