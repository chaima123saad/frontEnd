import React, {useState} from 'react';
import {CheckCircleOutlined,EditOutlined,DeleteOutlined} from "@ant-design/icons";
import './SubTask.css';

function SubTask() {

  // Tasks (ToDo List) State
  const [toDo, setToDo] = useState([]);

  // Temp State
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  // Add task 
  const addTask = () => {
    if(newTask) {
      let num = toDo.length + 1; 
      let newEntry = {id: num, title: newTask, status: false}
      setToDo([...toDo, newEntry]);
      setNewTask('');
    }
  }

  // Delete task 
  const deleteTask = (id) => {
    let newTasks = toDo.filter((task) => task.id !== id);
    setToDo(newTasks);
  }

  // mark task as done or completed
  const markDone = (id) => {
    const newTasks = toDo.map((task) => {
      if (task.id === id){
        return ({ ...task, status: !task.status })
      }
      return task;
    });
    setToDo(newTasks);
  }

  // cancel update
  const cancelUpdate = () => {
    setUpdateData('');
  }

  // Change task for update 
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }
    setUpdateData(newEntry);
  }

  // update task 
  const updateTask = () => {
    let filterRecords = [...toDo].filter( task=>task.id !== updateData.id);
    let updatedObject = [...filterRecords, updateData];
    setToDo(updatedObject);
    setUpdateData('');
  }

  
  return (
    <div className="container SubTask">
      

      <p className='title_subtask'>Sub Task Liste</p>
      

      {updateData && updateData ? (
        <>
          <div className="row flex_">
            <div className="col">
              <input className="inputTask2" 

                value={updateData && updateData.title} 
                onChange={ (e) => changeTask(e) } 
              />
            </div>
            
              <button 
                className="btn_update" 
                onClick={updateTask}
              >Update</button>
              <button 
                className="btn_cancel" 
                onClick={cancelUpdate}
              >Cancel</button>
            
          </div>
          <br />
        </>
      ) : (
        <>
          <div className="row flex_">
            <div className="col">
              <input 
                value={newTask} 
                onChange={e => setNewTask(e.target.value)} 
                className="inputTask1" 
              />
            </div>
            <div className="col-auto">
              <button 
                className="btn_add" 
                onClick={addTask}
              >Add Task</button>
            </div>
          </div>
          <br />
        </>
      )}


      {/* If there are no to dos in state, display a message   */}
      {toDo && toDo.length ? '' : 'No tasks...'}
      
      {/* Show to dos   */}
      {toDo && toDo
        .sort((a, b) => a.id > b.id ? 1 : -1)
        .map( (task, index) => {
        return(
          <React.Fragment key={task.id}>
          
            <div className="col taskBg">
              
              <div 
                // if task status is true, add class to this div named as done
                className={ task.status ? 'done' : '' }
              >
                {/* Show number of task */}
                <span className="taskNumber">{index + 1}</span> 
                <span className="taskText">{task.title}</span>
              </div>

              <div className="iconsWrap">
                <span 
                  onClick={(e) => markDone(task.id)}
                  title="Completed / Not Completed"
                >
                  <CheckCircleOutlined />
                </span>
                
                {task.status ? null : (
                  <span 
                    title="Edit"
                    onClick={ () => setUpdateData({ id: task.id, title: task.title, satus: task.status ? true : false }) }
                  >
                    <EditOutlined />
                  </span>
                )}

                <span 
                  onClick={() => deleteTask(task.id)}
                  title="Delete"
                >
                  <DeleteOutlined />
                </span>
              </div>

            </div>
                     
        </React.Fragment>
        );
      })}
    </div>
  );
}

export default SubTask;