// src/components/TaskDetails/TaskDetails.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Typography, Card, CardContent } from '@mui/material';

function TaskDetails() {
  const { id } = useParams();
  const task = useSelector((state) => state.tasks.tasks.find((task) => task.id === parseInt(id)));

  if (!task) {
    return (
      <Box>
        <Typography variant="h5">Task not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: '16px', maxWidth: '600px', margin: 'auto' }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>Task Details</Typography>
          <Typography variant="h6">Title: {task.title}</Typography>
          <Typography variant="body1" sx={{ marginBottom: '8px' }}>Description: {task.description}</Typography>
          <Typography variant="body1" sx={{ marginBottom: '8px' }}>Due Date: {task.dueDate}</Typography>
          <Typography variant="body1" color={task.completed ? 'green' : 'orange'}>
            Status: {task.completed ? 'Completed' : 'Pending'}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default TaskDetails;
