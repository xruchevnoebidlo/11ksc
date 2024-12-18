import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const AddNotes = ({ addNotes }) => {
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');
  const [photos, setPhotos] = useState([]);

  // Обработка перетаскивания файлов
  const onDrop = (acceptedFiles) => {
    const updatedPhotos = acceptedFiles.map((file) => ({
      file, // Реальный файл
      preview: URL.createObjectURL(file), // URL для предварительного просмотра
    }));
    setPhotos((prevPhotos) => [...prevPhotos, ...updatedPhotos]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop,
    multiple: true,
  });

  // Обработка отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!subject || !date || photos.length === 0) {
      alert('Пожалуйста, заполните все поля и добавьте хотя бы одну фотографию.');
      return;
    }

    const newNote = {
      subject,
      date,
      photos: photos.map((photo) => photo.file), // Отправляем только файлы
    };

    addNotes(newNote); // Вызов функции добавления заметок
    setSubject('');
    setDate('');
    setPhotos([]); // Очистка состояния после отправки
  };

  return (
    <div className="container">
      <h2>Добавить Конспект</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Предмет:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Дата:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Фотографии:</label>
          <div {...getRootProps({ className: 'dropzone' })} style={dropzoneStyle}>
            <input {...getInputProps()} />
            <p>Перетащите файлы сюда или нажмите для выбора файлов</p>
          </div>
        </div>
        <button type="submit">Добавить Конспект</button>
      </form>

      {/* Предварительный просмотр фотографий */}
      {photos.length > 0 && (
        <div>
          <h3>Предварительный просмотр:</h3>
          <div className="photos-preview">
            {photos.map((photo, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <img
                  src={photo.preview}
                  alt={`Фото ${index + 1}`}
                  style={{ width: '150px', marginRight: '10px', marginBottom: '10px', borderRadius: '5px' }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const dropzoneStyle = {
  border: '2px dashed #007bff',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default AddNotes;
