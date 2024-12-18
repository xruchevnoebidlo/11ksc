import React, { useState } from 'react';

const AdminPanel = ({ users, addStudent, updateStudentGrades }) => {
  const [newStudent, setNewStudent] = useState({ username: '', password: '' });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newGrades, setNewGrades] = useState([{ subject: '', grade: '' }]);

  const handleAddStudent = () => {
    if (!newStudent.username || !newStudent.password) {
      alert('Заполните имя пользователя и пароль!');
      return;
    }
    addStudent({ ...newStudent, id: Date.now(), role: 'student', grades: {} });
    setNewStudent({ username: '', password: '' });
  };

  const handleAddGrades = () => {
    if (!selectedStudent) {
      alert('Выберите ученика!');
      return;
    }

    const updatedGrades = { ...selectedStudent.grades };

    newGrades.forEach(({ subject, grade }) => {
      if (subject && grade) {
        if (!Array.isArray(updatedGrades[subject])) {
          updatedGrades[subject] = []; // Если оценок ещё нет, создаём массив
        }
        updatedGrades[subject].push(Number(grade)); // Добавляем оценку как число
      }
    });

    updateStudentGrades(selectedStudent.id, updatedGrades);
    setNewGrades([{ subject: '', grade: '' }]);
  };

  const handleAddGradeField = () => {
    setNewGrades((prevGrades) => [...prevGrades, { subject: '', grade: '' }]);
  };

  const handleGradeChange = (index, field, value) => {
    const updatedGrades = [...newGrades];
    updatedGrades[index][field] = value;
    setNewGrades(updatedGrades);
  };

  const calculateAverage = (grades) => {
    if (!Array.isArray(grades) || grades.length === 0) return '—'; // Если оценок нет, возвращаем прочерк
    const total = grades.reduce((sum, grade) => sum + grade, 0);
    return (total / grades.length).toFixed(2); // Средняя оценка с округлением до 2 знаков
  };

  return (
    <div className="container">
      <h2>Панель администратора</h2>

      {/* Список учеников */}
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <h3>Список учеников</h3>
          <ul>
            {users.map((student) => (
              <li
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                style={{
                  cursor: 'pointer',
                  fontWeight: selectedStudent?.id === student.id ? 'bold' : 'normal',
                }}
              >
                {student.username}
              </li>
            ))}
          </ul>
        </div>

        {/* Оценки выбранного ученика */}
        <div style={{ flex: 2 }}>
          {selectedStudent ? (
            <div>
              <h3>Оценки ученика: {selectedStudent.username}</h3>
              {selectedStudent.grades && Object.keys(selectedStudent.grades).length > 0 ? (
                <table className="grades-table">
                  <thead>
                    <tr>
                      <th>Предмет</th>
                      <th>Оценки</th>
                      <th>Средняя оценка</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(selectedStudent.grades).map(([subject, grades], index) => (
                      <tr key={index}>
                        <td>{subject}</td>
                        <td>{Array.isArray(grades) ? grades.join(', ') : 'Нет оценок'}</td>
                        <td>{calculateAverage(grades)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Оценки отсутствуют.</p>
              )}
            </div>
          ) : (
            <p>Выберите ученика для просмотра оценок.</p>
          )}
        </div>
      </div>

      {/* Добавление ученика */}
      <div>
        <h3>Добавить ученика</h3>
        <input
          type="text"
          placeholder="Имя ученика"
          value={newStudent.username}
          onChange={(e) =>
            setNewStudent((prev) => ({ ...prev, username: e.target.value }))
          }
        />
        <input
          type="password"
          placeholder="Пароль"
          value={newStudent.password}
          onChange={(e) =>
            setNewStudent((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <button onClick={handleAddStudent}>Добавить ученика</button>
      </div>

      {/* Добавление нескольких оценок */}
      {selectedStudent && (
        <div>
          <h3>Добавить оценки для {selectedStudent.username}</h3>
          {newGrades.map((grade, index) => (
            <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <input
                type="text"
                placeholder="Предмет"
                value={grade.subject}
                onChange={(e) => handleGradeChange(index, 'subject', e.target.value)}
              />
              <input
                type="number"
                placeholder="Оценка"
                value={grade.grade}
                onChange={(e) => handleGradeChange(index, 'grade', e.target.value)}
              />
            </div>
          ))}
          <button onClick={handleAddGradeField}>Добавить ещё оценку</button>
          <button onClick={handleAddGrades}>Сохранить оценки</button>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
