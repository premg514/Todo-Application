import React from 'react';
import TaskItem from './TaskItem';

const TaskList = (props) => {
  const { list, onEdit, onDelete } = props;

  return (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {list.map((each) => (
        <TaskItem 
          key={each._id}
          task={each}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default TaskList;
