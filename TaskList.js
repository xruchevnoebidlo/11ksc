// TaskList.js
import React from 'react';

const TaskList = ({ tasks }) => (
  <ul>
    {tasks.map((item, index) => (
      <li key={index}>
        {item.task} - Дедлайн: {item.deadline}
      </li>
    ))}
  </ul>
);

export default TaskList;
