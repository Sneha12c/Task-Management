import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Typography, Stack, TextField, Select, MenuItem, Card, CardContent, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Delete, Edit, CheckCircle, FilterList } from '@mui/icons-material';
import { addtask , edittask , deletetask , toggleComplete } from '../../Features/taskSlice.js';

function TaskDashboard() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [filter, setFilter] = useState('all');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [editingTask, setEditingTask] = useState(null); 
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleAddTask = () => {
    if (taskTitle && taskDueDate) {
      dispatch(addtask({id: Date.now(), title: taskTitle, description: taskDescription, dueDate: taskDueDate , completed: false}));
      setTaskTitle('');
      setTaskDescription('');
      setTaskDueDate('');
    }
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);
  };

  const openEditDialog = (task) => {
    setEditingTask(task);
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    setTaskDueDate(task.dueDate);
    setIsEditDialogOpen(true);
  };

  const handleEditTask = () => {
    if (editingTask) {
      dispatch(
        edittask({
          id: editingTask.id,
          title: taskTitle,
          description: taskDescription,
          dueDate: taskDueDate,
        })
      );
      setIsEditDialogOpen(false);
      setEditingTask(null);
      setTaskTitle('');
      setTaskDescription('');
      setTaskDueDate('');
    }
  };

  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditingTask(null);
    setTaskTitle('');
    setTaskDescription('');
    setTaskDueDate('');
  }

  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case 'completed':
        return task.completed; // Show completed tasks
      case 'pending':
        return !task.completed; // Show pending tasks
      case 'overdue':
        return new Date(task.dueDate) < new Date(); // Show overdue tasks
      default:
        return true; // Show all tasks
    }
  });
  

  return (
    <Box
      sx={{
        padding: '16px',
        maxWidth: '1200px',
        margin: 'auto',
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: '16px' }}>
        Task Management Dashboard
      </Typography>

      {/* Task Form */}
      <Stack spacing={2} direction="row" sx={{ marginBottom: '24px' }}>
        <TextField
          label="Task Title"
          variant="outlined"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <TextField
          label="Task Description"
          variant="outlined"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <TextField
          label="Due Date"
          type="date"
          value={taskDueDate}
          onChange={(e) => setTaskDueDate(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddTask}>
          Add Task
        </Button>
      </Stack>

      {/* Task Filter */}
      <Stack spacing={2} direction="row" sx={{ alignItems: 'center', marginBottom: '16px' }}>
        <FilterList />
        <Select
          value={filter}
          onChange={handleFilterChange}
          displayEmpty
          sx={{ minWidth: '200px' }}
        >
          <MenuItem value="all">All Tasks</MenuItem>
          <MenuItem value="completed">Completed Tasks</MenuItem>
          <MenuItem value="pending">Pending Tasks</MenuItem>
          <MenuItem value="overdue">Overdue Tasks</MenuItem>
        </Select>
      </Stack>

      {/* Task List */}
      {filteredTasks.length > 0 ? (
  filteredTasks.map((task) => (
    <Card
      key={task.id}
      sx={{
        marginBottom: '16px',
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {task.description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Due: {task.dueDate}
        </Typography>
        <Typography variant="body2" color={task.completed ? 'green' : 'orange'}>
          {task.completed ? 'Completed' : 'Pending'}
        </Typography>
      </CardContent>
      <Stack direction="row" spacing={1}>
      <Link to={`/tasks/${task.id}`} style={{ textDecoration: 'none' }}>
       <Button variant="outlined" color="primary">View Details</Button>
      </Link>
        <IconButton
          color="primary"
          onClick={() => dispatch(toggleComplete(task.id))}
        >
          <CheckCircle />
        </IconButton>
        <IconButton color="secondary" onClick={() => openEditDialog(task)}>
          <Edit />
        </IconButton>
        <IconButton color="error" onClick={() => dispatch(deletetask(task.id))}>
          <Delete />
        </IconButton>
      </Stack>
    </Card>
     ))
  ) : (
    <Typography>No tasks found.</Typography>
   )}

    <Dialog open={isEditDialogOpen} onClose={closeEditDialog}>
    <DialogTitle>Edit Task</DialogTitle>
    <DialogContent>
      <Stack spacing={2}>
        <TextField
          label="Task Title"
          variant="outlined"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <TextField
          label="Task Description"
          variant="outlined"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <TextField
          label="Due Date"
          type="date"
          value={taskDueDate}
          onChange={(e) => setTaskDueDate(e.target.value)}
        />
      </Stack>
    </DialogContent>
    <DialogActions>
      <Button onClick={closeEditDialog} color="secondary">
        Cancel
      </Button>
      <Button onClick={handleEditTask} color="primary">
        Save
      </Button>
    </DialogActions>
  </Dialog>
</Box>

  );
}

export default TaskDashboard;
