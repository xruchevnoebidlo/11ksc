import React from 'react';

const Home = ({
  currentUser,
  schedule = [],
  tasks = [],
  news = [],
  deleteLecture,
  deleteTask,
  deleteNews,
}) => {
  return (
    <div className="container">
      <h1>Добро пожаловать, {currentUser ? currentUser.username : 'Гость'}!</h1>

      <div className="content-sections">
        {/* Домашние задания */}
        <div className="tasks-section">
          <h2>Домашние задания</h2>
          <ul>
            {tasks.length === 0 ? (
              <p>Домашние задания отсутствуют.</p>
            ) : (
              tasks.map((task, index) => (
                <li key={index}>
                  {task.homework} - {task.description}
                  {currentUser?.role === 'admin' && (
                    <button
                      onClick={() => deleteTask(index)}
                      className="delete-button"
                    >
                      Удалить
                    </button>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Новости */}
        <div className="news-section">
          <h2>Новости</h2>
          <ul>
            {news.length === 0 ? (
              <p>Новостей пока нет.</p>
            ) : (
              news.map((item, index) => (
                <li key={index}>
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                  <p>
                    <em>Дата: {new Date(item.date).toLocaleDateString()}</em>
                  </p>
                  {currentUser?.role === 'admin' && (
                    <button
                      onClick={() => deleteNews(index)}
                      className="delete-button"
                    >
                      Удалить
                    </button>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Расписание */}
        <div className="schedule-section">
          <h2>Расписание</h2>
          <ul>
            {schedule.length === 0 ? (
              <p>Расписание отсутствует.</p>
            ) : (
              schedule.map((item, index) => (
                <li key={index}>
                  {item.title} - Время: {item.pairTime} - Аудитория: {item.classroomNumber}
                  {currentUser?.role === 'admin' && (
                    <button
                      onClick={() => deleteLecture(index)}
                      className="delete-button"
                    >
                      Удалить
                    </button>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
