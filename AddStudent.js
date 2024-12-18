import React, { useState } from 'react';

const AddStudent = ({ addStudent }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      addStudent(name);
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Добавить ученика</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Имя ученика"
        required
      />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default AddStudent;
