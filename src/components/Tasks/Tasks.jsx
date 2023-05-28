import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RightCircleOutlined, ClockCircleOutlined, BarsOutlined } from "@ant-design/icons";
import "./Tasks.css";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, message, Space,Empty, Modal,Progress } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import img from "./checklist.png";
import { Todo } from "./subtasks/ToDo";
import { TodoForm } from "./subtasks/ToDoForm";
import { EditTodo } from "./subtasks/EditToDo";

const Card = () => {
  const [open, setOpen] = useState(false);
  const [tasksToDo, setTasksToDo] = useState([]);
  const [tasksInProgress, setTasksInProgress] = useState([]);
  const [tasksDone, setTasksDone] = useState([]);
  const [todos, setTodos] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:2000/projects');
      setProjects(response.data);
      console.log(response.data);
      const inProgressProject = response.data.find(project => project.status === 'inProgress');
      setSelectedProject(inProgressProject);
      if(inProgressProject){
        axios.get(`http://localhost:2000/tasks/user/${id}/project/${inProgressProject._id}`)
          .then(response => {
            const inProgressTasks = response.data.filter(task => task.status === 'inProgress');
            setTasksInProgress(inProgressTasks);
            const toDoTasks = response.data.filter(task => task.status === 'toDo');
            setTasksToDo(toDoTasks);
            const doneTasks = response.data.filter(task => task.status === 'completed');
            setTasksDone(doneTasks);
          })
          .catch(error => {
            console.log(error);
          });}
    } catch (error) {
      console.log(error);
    }
  };
    
  

  const fetchTodos = async () => {
    try {
      const taskId = localStorage.getItem('taskId'); 
      console.log("@@@@@@@@@",taskId);
      const response = await axios.get(`http://localhost:2000/subtasks/${taskId}`);
      setTodos(response.data.subTask);
      
    } catch (error) {
      console.log(error);
    }
  };
  
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:2000/subtasks/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const updatedTodos = todos.map((todo) =>
        todo._id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos);
      await axios.put(`http://localhost:2000/subtasks/${id}`, {
        completed: updatedTodos.find((todo) => todo._id === id).completed,
      });
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const editTodo = (id) => {
  setTodos(
    todos.map((todo) =>
      todo._id === id ? { ...todo, isEditing: !todo.isEditing } : { ...todo, isEditing: false }
    )
  );
};


  const editTask = async (task, id) => {
    try {
      const updatedTodos = todos.map((todo) =>
        todo._id === id ? { ...todo, task, isEditing: false } : todo
      );
      setTodos(updatedTodos);
      await axios.put(`http://localhost:2000/subtasks/${id}`, { task });
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };
const {id} =useParams();

  const onClick = (project) => {
    setSelectedProject(project);
    message.info(`${project.name}`);

    if(project){
      axios.get(`http://localhost:2000/tasks/user/${id}/project/${project._id}`)
        .then(response => {
          const inProgressTasks = response.data.filter(task => task.status === 'inProgress');
          setTasksInProgress(inProgressTasks);
          const toDoTasks = response.data.filter(task => task.status === 'toDo');
          setTasksToDo(toDoTasks);
          const doneTasks = response.data.filter(task => task.status === 'completed');
          setTasksDone(doneTasks);
        })
        .catch(error => {
          console.log(error);
        });}
  };
  
  const updateTaskStatus = (taskId, newStatus) => {
    axios
      .put(`http://localhost:2000/tasks/${taskId}`, { status: newStatus })
      .then(response => {
        const updatedTask = response.data;
        if (newStatus === 'toDo') {
          setTasksToDo(tasks => tasks.map(task => (task._id === updatedTask._id ? updatedTask : task)));
        } else if (newStatus === 'inProgress') {
          setTasksInProgress(tasks => tasks.map(task => (task._id === updatedTask._id ? updatedTask : task)));
        } else if (newStatus === 'completed') {
          setTasksDone(tasks => tasks.map(task => (task._id === updatedTask._id ? updatedTask : task)));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      const columnTasks =
        source.droppableId === 'col-task'
          ? tasksToDo
          : source.droppableId === 'tasksInProgress'
          ? tasksInProgress
          : tasksDone;

      const updatedTasks = Array.from(columnTasks);
      const movedTask = updatedTasks[source.index];
      updatedTasks.splice(source.index, 1);
      updatedTasks.splice(destination.index, 0, movedTask);

      if (source.droppableId === 'col-task') {
        setTasksToDo(updatedTasks);
      } else if (source.droppableId === 'tasksInProgress') {
        setTasksInProgress(updatedTasks);
      } else if (source.droppableId === 'tasksDone') {
        setTasksDone(updatedTasks);
      }
    } else {
      const sourceTasks =
        source.droppableId === 'col-task'
          ? tasksToDo
          : source.droppableId === 'tasksInProgress'
          ? tasksInProgress
          : tasksDone;

      const destTasks =
        destination.droppableId === 'col-task'
          ? tasksToDo
          : destination.droppableId === 'tasksInProgress'
          ? tasksInProgress
          : tasksDone;

      const movedTask = sourceTasks[source.index];
      sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, movedTask);

      if (source.droppableId === 'col-task') {
        setTasksToDo(sourceTasks);
        updateTaskStatus(movedTask._id, 'toDo');
      } else if (source.droppableId === 'tasksInProgress') {
        setTasksInProgress(sourceTasks);
        updateTaskStatus(movedTask._id, 'inProgress');
      } else if (source.droppableId === 'tasksDone') {
        setTasksDone(sourceTasks);
        updateTaskStatus(movedTask._id, 'completed');
      }

      if (destination.droppableId === 'col-task') {
        setTasksToDo(destTasks);
        updateTaskStatus(movedTask._id, 'toDo');
      } else if (destination.droppableId === 'tasksInProgress') {
        setTasksInProgress(destTasks);
        updateTaskStatus(movedTask._id, 'inProgress');
      } else if (destination.droppableId === 'tasksDone') {
        setTasksDone(destTasks);
        updateTaskStatus(movedTask._id, 'completed');
      }
    }
  };
  const handleOpenModal = (taskId) => {
    localStorage.setItem('taskId', taskId);
    setOpen(true);
    console.log("####",taskId);
  };
  
  const handleCloseModal = () => {
    localStorage.removeItem('taskId');
    setOpen(false);
    console.log("####_viiiide");

  }; 

  useEffect(() => {
    if(open){
      fetchTodos();
    }
  }, [open]);

  return (
    <div>
      <div className='header_task'>
        <div className='titleTaskInterface'>Tasks</div>
        <Dropdown
  menu={{
    items: projects.map((project) => ({
      label: project.name,
      key: project._id,
      onClick: () => onClick(project),
    })),
  }}
  className='dropDown'
>
  <a onClick={(e) => e.preventDefault()}>
    <Space style={{ width: 150 }}>
      Choose a project
      <DownOutlined />
    </Space>
  </a>
</Dropdown>
      </div>
      <div className='content'>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className='Content_task'>

            <Droppable droppableId='col-task'>
              {(provided) => (
                <div
                  className='tasktaskContainer'
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className='col-task'>
                  <span className='task_list'>To do</span>
                <span className='row-number'>{tasksToDo.length}</span>
                {tasksToDo.length > 0 ? (
                    tasksToDo.map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided) => (
                          <div
                            className='taskcard'
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="card-content-task">
                            <div className={`priority_${task.priority}`}>{task.priority}</div>
                                <p className="card-description-task">{task.name}</p>
                                <p className="card-desc">{task.description}</p>
                                <Progress className='progress' percent={task.progress} strokeColor="#744ae2" status="active" size={[290, 15]}/>
                                <div className="card-footer-task">
                                <div className='buttons' onClick={() => handleOpenModal(task._id)}>
                                <img src={img} style={{height:25,cursor:"pointer"}}/>
                                </div>
                                <div style={{marginTop:7}}>
                                    <ClockCircleOutlined className='icontask'/>
                                    &nbsp;
                                    <span>6d</span>
                                </div>
                                </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))
                    ) : (
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    )}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>

            <Droppable droppableId='tasksInProgress'>
              {(provided) => (
                <div
                  className='taskContainer'
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className='col-task'>
                  <span className='task_list'>In Progress</span>
                  <span className='row-number-2'>{tasksInProgress.length}</span>
                  {tasksInProgress.length > 0 ? (
                    tasksInProgress.map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided) => (
                          <div
                            className='taskcard'
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="card-content-task">
                        <div className={`priority_${task.priority}`}>{task.priority}</div>
                        <p className="card-description-task">{task.name}</p>
                        <p className="card-desc">{task.description}</p>
                        <Progress className='progress' percent={task.progress} strokeColor="#744ae2" status="active" size={[290, 15]}/>
                        <div className="card-footer-task">
                        <div className='buttons' onClick={() => handleOpenModal(task._id)}>
                                <img src={img} style={{height:25,cursor:"pointer"}}/>
                                </div>
                            <div style={{marginTop:7}}>
                            <ClockCircleOutlined className='icontask'/>
                            &nbsp;
                            <span>6d</span>
                            </div>
                        </div>
                        </div>
                          </div>
                        )}
                      </Draggable>
                    ))
                    ) : (
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    )}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>

            <Droppable droppableId='tasksDone'>
              {(provided) => (
                <div
                  className='taskContainer'
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className='col-task'>
                  <span className='task_list'>Done</span>
                  <span className='row-number-3'>{tasksDone.length}</span>
                  {tasksDone.length > 0 ? (
                    tasksDone.map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided) => (
                          <div
                            className='taskcard'
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="card-content-task">
                            <div className={`priority_${task.priority}`}>{task.priority}</div>
                                <p className="card-description-task">{task.name}</p>
                                <p className="card-desc">{task.description}</p>
                                <Progress className='progress' percent={task.progress} strokeColor="#744ae2" status="active" size={[290, 15]}/>
                                <div className="card-footer-task">
                                <div className='buttons' onClick={() => handleOpenModal(task._id)}>
                                <img src={img} style={{height:25,cursor:"pointer"}}/>
                                </div>
                                <div style={{marginTop:7}}>
                                    <ClockCircleOutlined className='icontask'/>
                                    &nbsp;
                                    <span>6d</span>
                                </div>
                                </div>
                            </div>    
                          </div>
                        )}
                      </Draggable>
                     ))
                     ) : (
                       <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                     )}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </div>
      <Modal
        title=""
        centered
        open={open}
        onCancel={handleCloseModal}
        width={800}
        footer={null}
      >
        <div className="TodoWrapper">
      <h1 className="h1">Get Things Done!</h1>
      <TodoForm fetchTodos={fetchTodos}/>
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodo editTodo={editTask} task={todo} key={todo._id} />
        ) : (
          <Todo
            key={todo._id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
      </Modal>
    </div>
  );
};

export default Card;