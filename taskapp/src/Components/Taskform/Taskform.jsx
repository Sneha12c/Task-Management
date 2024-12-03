import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

function TaskForm({ onSave }) {
  const [task, setTask] = useState({ title: '', description: '', dueDate: '' });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(task);
    setTask({ title: '', description: '', dueDate: '' });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '500px',
        margin: 'auto',
        padding: '16px',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '8px',
      }}
    >
      <TextField
        label="Title"
        name="title"
        value={task.title}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Description"
        name="description"
        value={task.description}
        onChange={handleChange}
        multiline
        rows={3}
        fullWidth
      />
      <TextField
        label="Due Date"
        name="dueDate"
        type="date"
        value={task.dueDate}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Save Task
      </Button>
    </Box>
  );
}

export default TaskForm;
