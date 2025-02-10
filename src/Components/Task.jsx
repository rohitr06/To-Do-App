import {useState} from 'react';

const Task=({addTask})=>{
    const [text,setText]=useState('');
    const [time,setTime]=useState('');

const handleSubmit=(e)=>{
    e.preventDefault();
    if(!text) {
        if(!text.trim()){
            alert("Task cannot be empty");
            return;
        }
        // if(!time){
        //     alert("Time cannot be empty");}
        return;}
    addTask({text,time});
    setText('');
    setTime('');
}



    return(
    <form onSubmit={handleSubmit} className='flex items-center justify-center gap-28'>
        <input type='text' placeholder='Enter Task' value={text} onChange={(e)=>setText(e.target.value)} className='border p-2 rounded' />
        <input type='datetime-local' value={time} onChange={(e)=>{setTime(e.target.value)}} className='border p-2 rounded'/>
        <button type='submit' className='text-white px-4 py-2 rounded bg-blue-500' >Add Task</button>
    </form>

    )
}

export default Task;