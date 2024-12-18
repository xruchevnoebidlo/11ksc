import React, { useState } from 'react';

const AddSchedule = ({ addPair, addHomework, addNews }) => {
  const [title, setTitle] = useState('');
  const [pairTime, setPairTime] = useState('');
  const [classroomNumber, setClassroomNumber] = useState('');
  const [homework, setHomework] = useState('');
  const [description, setDescription] = useState('');
  const [newsTitle, setNewsTitle] = useState('');
  const [newsContent, setNewsContent] = useState('');

  const handleAddPair = (e) => {
    e.preventDefault();
    if (!title || !pairTime || !classroomNumber) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    const newPair = {
      title,
      pairTime,
      classroomNumber,
      date: new Date().toISOString().split('T')[0],
    };
    addPair(newPair);
    setTitle('');
    setPairTime('');
    setClassroomNumber('');
  };

  const handleAddHomework = (e) => {
    e.preventDefault();
    if (!homework || !description) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    const newHomework = {
      homework,
      description,
    };
    addHomework(newHomework);
    setHomework('');
    setDescription('');
  };

  const handleAddNews = (e) => {
    e.preventDefault();
    if (!newsTitle || !newsContent) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    const newNewsItem = {
      title: newsTitle,
      content: newsContent,
      date: new Date().toISOString().split('T')[0],
    };
    addNews(newNewsItem);
    setNewsTitle('');
    setNewsContent('');
  };

  return (
    <div className="container">
      <h2>Добавить Пару</h2>
      <form onSubmit={handleAddPair}>
        <div>
          <label>Название предмета:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Время пары:</label>
          <input
            type="time"
            value={pairTime}
            onChange={(e) => setPairTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Аудитория:</label>
          <input
            type="text"
            value={classroomNumber}
            onChange={(e) => setClassroomNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit">Добавить Пару</button>
      </form>

      <h2>Добавить Домашнее задание</h2>
      <form onSubmit={handleAddHomework}>
        <div>
          <label>Домашнее задание:</label>
          <input
            type="text"
            value={homework}
            onChange={(e) => setHomework(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Описание:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Добавить Домашнее задание</button>
      </form>

      <h2>Добавить Новость</h2>
      <form onSubmit={handleAddNews}>
        <div>
          <label>Заголовок новости:</label>
          <input
            type="text"
            value={newsTitle}
            onChange={(e) => setNewsTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Содержание новости:</label>
          <textarea
            value={newsContent}
            onChange={(e) => setNewsContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Добавить Новость</button>
      </form>
    </div>
  );
};

export default AddSchedule;
