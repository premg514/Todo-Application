import React, { useState } from 'react';

const TaskItem = ({ task, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState(task.task);

  const handleEdit = () => {
    if (onEdit) {
      onEdit(task._id, newTask);
      setIsEditing(false);
    }
  };

  return (
    <li style={{ margin: '10px 0', backgroundColor: '#fff', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
      {isEditing ? (
        <>
          <input
            style={{ padding: '5px', width: '200px' }}
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={handleEdit} style={{ marginLeft: '10px', backgroundColor: '#007bff', color: 'white' }}>Save</button>
        </>
      ) : (
        <>
          <span>{task.task}</span>
          <button onClick={() => setIsEditing(true)} style={{ marginLeft: '10px', backgroundColor: '#ffc107', color: 'black' }}>Edit</button>
          <button onClick={() => onDelete(task._id)} style={{ marginLeft: '10px', backgroundColor: '#dc3545', color: 'white' }}>Delete</button>
        </>
      )}
    </li>
  );
};

export default TaskItem;
