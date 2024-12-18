import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import AddSchedule from './AddSchedule';
import AddNotes from './AddNotes';
import NotesPage from './NotesPage';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import AdminPanel from './AdminPanel';
import StudentGrades from './StudentGrades';

const initialUsers = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
  { id: 2, username: 'student1', password: 'student123', role: 'student', grades: {} },
];

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [news, setNews] = useState([]);
  const [notes, setNotes] = useState([]);
  const [users, setUsers] = useState(initialUsers); // Для управления учениками

  // Загружаем данные из localStorage при первой загрузке
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const storedSchedule = localStorage.getItem('schedule');
    const storedTasks = localStorage.getItem('tasks');
    const storedNews = localStorage.getItem('news');
    const storedNotes = localStorage.getItem('notes');
    const storedUsers = localStorage.getItem('users');

    if (storedUser) setCurrentUser(JSON.parse(storedUser));
    if (storedSchedule) setSchedule(JSON.parse(storedSchedule));
    if (storedTasks) setTasks(JSON.parse(storedTasks));
    if (storedNews) setNews(JSON.parse(storedNews));
    if (storedNotes) setNotes(JSON.parse(storedNotes));
    if (storedUsers) setUsers(JSON.parse(storedUsers));
  }, []);

  // Сохраняем данные в localStorage при их изменении
  useEffect(() => {
    localStorage.setItem('schedule', JSON.stringify(schedule));
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('news', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleLogin = (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  const addPair = (pair) => setSchedule((prev) => [...prev, pair]);
  const addHomework = (homework) => setTasks((prev) => [...prev, homework]);
  const addNewsItem = (newsItem) => setNews((prev) => [...prev, newsItem]);
  const addNote = (note) => setNotes((prev) => [...prev, note]);

  const deleteNote = (index) => setNotes((prev) => prev.filter((_, i) => i !== index));
  const deleteLecture = (index) => setSchedule((prev) => prev.filter((_, i) => i !== index));
  const deleteTask = (index) => setTasks((prev) => prev.filter((_, i) => i !== index));
  const deleteNews = (index) => setNews((prev) => prev.filter((_, i) => i !== index));

  // Функции для управления учениками
  const addStudent = (student) => setUsers((prev) => [...prev, student]);
  const updateStudentGrades = (studentId, grades) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === studentId ? { ...user, grades } : user
      )
    );
  };

  return (
    <Router>
      <nav>
        <Link to="/">Главная</Link>
        {currentUser?.role === 'admin' && <Link to="/admin">Админ панель</Link>}
        {currentUser?.role === 'student' && <Link to="/student-grades">Личный кабинет</Link>}
        <Link to="/notes">Конспекты</Link>
        {currentUser ? (
          <>
            {currentUser.role === 'admin' && (
              <>
                <Link to="/add">Добавить Расписание/Задачу/Новость</Link>
                <Link to="/add-notes">Добавить Конспект</Link>
              </>
            )}
            <button onClick={handleLogout}>Выйти</button>
          </>
        ) : (
          <Link to="/login">Войти</Link>
        )}
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <Home
              currentUser={currentUser}
              schedule={schedule}
              tasks={tasks}
              news={news}
              deleteLecture={deleteLecture}
              deleteTask={deleteTask}
              deleteNews={deleteNews}
            />
          }
        />
        <Route
          path="/add"
          element={
            <PrivateRoute
              currentUser={currentUser}
              requiredRole="admin"
              element={
                <AddSchedule
                  addPair={addPair}
                  addHomework={addHomework}
                  addNews={addNewsItem}
                />
              }
            />
          }
        />
        <Route
          path="/add-notes"
          element={
            <PrivateRoute
              currentUser={currentUser}
              requiredRole="admin"
              element={<AddNotes addNotes={addNote} />}
            />
          }
        />
        <Route
          path="/notes"
          element={
            <NotesPage
              notes={notes}
              deleteNote={deleteNote}
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute
              currentUser={currentUser}
              requiredRole="admin"
              element={
                <AdminPanel
                  users={users.filter((user) => user.role === 'student')}
                  addStudent={addStudent}
                  updateStudentGrades={updateStudentGrades}
                />
              }
            />
          }
        />
        <Route
          path="/student-grades"
          element={
            <PrivateRoute
              currentUser={currentUser}
              requiredRole="student"
              element={
                <StudentGrades
                  grades={currentUser?.grades || {}}
                />
              }
            />
          }
        />
        <Route
          path="/login"
          element={<Login users={users} onLogin={handleLogin} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
