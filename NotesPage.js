import React, { useState } from 'react';

const NotesPage = ({ notes = [], deleteNote, currentUser }) => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const uniqueSubjects = [...new Set(notes.map(note => note.subject).filter(subject => subject && subject.trim() !== ''))];
  const filteredNotesBySubject = selectedSubject ? notes.filter(note => note.subject === selectedSubject) : notes;
  const uniqueDates = [...new Set(filteredNotesBySubject.map(note => note.date))].sort((a, b) => new Date(b) - new Date(a));
  const filteredNotesByDate = selectedDate ? filteredNotesBySubject.filter(note => note.date === selectedDate) : filteredNotesBySubject;

  return (
    <div className="container">
      <h1>Фотографии Конспектов</h1>

      {/* Фильтрация по предметам */}
      <div className="subject-buttons">
        {uniqueSubjects.length > 0 && uniqueSubjects.map((subject, index) => (
          <button
            key={index}
            onClick={() => { setSelectedSubject(subject); setSelectedDate(''); }}
            className={selectedSubject === subject ? 'active-filter' : ''}
          >
            {subject}
          </button>
        ))}
      </div>

      {/* Фильтрация по датам */}
      {selectedSubject && (
        <div className="date-buttons">
          {uniqueDates.length > 0 && uniqueDates.map((date, index) => (
            <button
              key={index}
              onClick={() => setSelectedDate(date)}
              className={selectedDate === date ? 'active-filter' : ''}
            >
              {new Date(date).toLocaleDateString()}
            </button>
          ))}
        </div>
      )}

      {/* Отображение конспектов */}
      <div className="notes-container">
        {filteredNotesByDate.length === 0 ? (
          <p>Конспекты для выбранной даты не найдены.</p>
        ) : (
          filteredNotesByDate.map((note, index) => (
            <div key={index} className="note">
              <h3>{note.subject}</h3>
              <p><strong>Дата:</strong> {new Date(note.date).toLocaleDateString()}</p>
              {note.photos && note.photos.length > 0 && (
                <div className="photos-preview">
                  {note.photos.map((photo, idx) => (
                    <div key={idx} style={{ marginBottom: '10px' }}>
                      <img
                        src={photo instanceof File ? URL.createObjectURL(photo) : photo}
                        alt={`Конспект ${idx + 1}`}
                        style={{ width: '150px', height: 'auto', marginRight: '10px' }}
                      />
                      <br />
                      <a
                        href={photo instanceof File ? URL.createObjectURL(photo) : photo}
                        download={`Конспект-${idx + 1}.jpg`}
                      >
                        <button className="download-button">Скачать</button>
                      </a>
                    </div>
                  ))}
                </div>
              )}
              {/* Кнопка "Удалить" */}
              {currentUser?.role === 'admin' && (
                <button onClick={() => deleteNote(index)} className="delete-button">
                  Удалить
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesPage;
