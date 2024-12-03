import { createSlice } from "@reduxjs/toolkit"

const initialState = {
   tasks : []
}

const taskSlice = createSlice({
    name : "tasks",
    initialState,
    reducers : {
      addtask : (state , action)=>{
        state.tasks.push(action.payload)
      },
      edittask : (state , action)=>{
       const index = state.tasks.findIndex(task => task.id === action.payload.id);
       if(index !== -1){
        state.tasks[index] = action.payload;
       }
      },
      deletetask : (state , action)=>{
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      },
      toggleComplete : (state , action)=>{
        const task = state.tasks.find((task) => task.id === action.payload);
        if (task) {
          task.completed = !task.completed;
        }
      }
    }
})

export const {addtask , edittask , deletetask , toggleComplete} = taskSlice.actions

export default taskSlice.reducer;