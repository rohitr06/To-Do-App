import { useState , useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Task from './Components/Task'

export default function App(){
  const [tasks,setTasks]=useState(
    ()=>{
      const savedTasks=localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks):[];
    }
  )

  useEffect(()=>{
    localStorage.setItem("tasks",JSON.stringify(tasks));
    // console.log("saved to local storage",JSON.parse(localStorage.getItem('tasks')));

  },[tasks])

  const addTask=(task)=>{
    const newTask=[...tasks,{id:Date.now(),...task}];
    setTasks(newTask);
    // console.log(newTask);
  }

  const updateTask=(TaskId,updatedTask)=>{
    if(!updatedTask || updatedTask.trim()==="") return;
    const newTask=tasks.map((task)=>task.id===TaskId? {...task,text:updatedTask}:Task)
    setTasks(newTask);
  }

  const deleteTask =(TaskId)=>{
    const newTask=tasks.filter((task)=>task.id!==TaskId);
    setTasks(newTask);
  }
  
  return (
    <div className="p-4 bg-red-400 rounded-xl min-h-screen  w-full flex flex-col items center sm:p-6 md:p-8 lg:p-12">
      
        <h1 className='text-2xl font-bold text-center text-gray-800 mb-4'>To-Do App</h1>
     <Task addTask={addTask}/>
     <ul className='rounded-lg bg-gray-300 px-4 py-2 mt-4'>
      {tasks.length>0?(
      tasks.map((task)=>(
        <li key={task.id} className='border-b py-2 flex flex-col gap-3 justify-between items-center sm:flex-row '>
          <span className='ml-4 font-serif font-semibold text-violet-800 text-xl'>{task.text} - {task.time}</span>
          <div className='flex gap-2 '>
            <button onClick={()=>{
            const updatedtask=prompt("Edit the task",task.text);
            if(updatedtask!==null && updatedtask.trim()!=="")
              {updateTask(task.id,updatedtask);}
            }}
            className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm">
              Edit
              </button>
          <button onClick={()=> deleteTask(task.id)} className='bg-red-500 rounded-lg  p-2 text-white text-sm '>
            Delete
            </button>
        </div></li>
      ))

      ):<p className='text-gray-500 text-center py-4'> No tasks added yet</p>}
      </ul> 

      
     
</div>
 

  
  );
}