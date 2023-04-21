import React from 'react';
import { RightCircleOutlined,EllipsisOutlined } from "@ant-design/icons"; 
import { Progress,Avatar, Tooltip, Dropdown } from 'antd';
import { useState } from 'react';
import Modal from "./Modal_task";

import './DataGrid_task.css'; 
const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item
        </a>
      ),
    },
  ];
const Card = () => {
const [modalOpen, setModalOpen] = useState(false);

  return (
<div className='Content_task'>

<div className='col1'>
<h1 className='circle_1'> To Do</h1>
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">title</h2>
        <Dropdown
      menu={{
        items,
      }}
      placement="topRight"
      arrow
    >
      <EllipsisOutlined className="modify-icon" />

    </Dropdown>
      </div>
      <div className="card-subheader">
        <p className="card-date">date</p>
      </div>
      <div className="card-content">
        <p className="card-description">This is the description of the task "task Name"</p>
        <div className="card-footer">
        <Avatar.Group
      maxCount={2}
      maxStyle={{
        color: '#f56a00',
        backgroundColor: '#fde3cf',
      }}
    >
      <Avatar src="" />
      <Avatar src=""/>
      <Tooltip title="Ant User" placement="top">
        <Avatar/>
      </Tooltip>
      <Avatar />
    </Avatar.Group>
    <RightCircleOutlined className='iconTask'  onClick={() => {
          setModalOpen(true);
        }} />
 <Modal 
      open={modalOpen} 
      onClose={() => setModalOpen(false)} />
      </div>
      </div>
    </div>






    <div className="card">
      <div className="card-header">
        <h2 className="card-title">title</h2>
        <Dropdown
      menu={{
        items,
      }}
      placement="topRight"
      arrow
    >
      <EllipsisOutlined className="modify-icon" />

    </Dropdown>      </div>
      <div className="card-subheader">
        <p className="card-date">date</p>
      </div>
      <div className="card-content">
        <p className="card-description">This is the description of the task "task Name"</p>
        <div className="card-footer">
        <Avatar.Group
      maxCount={2}
      maxStyle={{
        color: '#f56a00',
        backgroundColor: '#fde3cf',
      }}
    >
      <Avatar src="" />
      <Avatar src=""/>
      <Tooltip title="Ant User" placement="top">
        <Avatar/>
      </Tooltip>
      <Avatar />
    </Avatar.Group>
    <RightCircleOutlined className='iconTask' />
        
       
      </div>
      </div>
    </div>
    </div>

<div className='col2'>
<span className='button_color2'></span>
<h1 className='circle_2'> In Progress</h1>
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">title</h2>
        <Dropdown
      menu={{
        items,
      }}
      placement="topRight"
      arrow
    >
      <EllipsisOutlined className="modify-icon" />

    </Dropdown>      </div>
      <div className="card-subheader">
        <p className="card-date">date</p>
      </div>
      <div className="card-content">
        <p className="card-description">This is the description of the task "task Name" </p>
        <Progress className='progress' percent={50} status="active" strokeColor="#FFB800" size={[290, 15]}/>
        <div className="card-footer">
        <Avatar.Group
      maxCount={2}
      maxStyle={{
        color: '#f56a00',
        backgroundColor: '#fde3cf',
      }}
    >
      <Avatar src="" />
      <Avatar src=""/>
      <Tooltip title="Ant User" placement="top">
        <Avatar/>
      </Tooltip>
      <Avatar />
    </Avatar.Group>
    <RightCircleOutlined className='iconTask'/>
      
      </div>

      </div>
    </div>
    </div>

<div className='col3'>
<span className='button_color3'></span>
<h1 className='circle_3'> Done</h1>
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">title</h2>
        <Dropdown
      menu={{
        items,
      }}
      placement="topRight"
      arrow
    >
      <EllipsisOutlined className="modify-icon" />

    </Dropdown>      </div>
      <div className="card-subheader">
        <p className="card-date">date</p>
      </div>
      <div className="card-content">
        <p className="card-description">This is the description of the task "task Name"</p>
        <div className="card-footer">
        <Avatar.Group
      maxCount={2}
      maxStyle={{
        color: '#f56a00',
        backgroundColor: '#fde3cf',
      }}
    >
      <Avatar src="" />
      <Avatar src=""/>
      <Tooltip title="Ant User" placement="top">
        <Avatar/>
      </Tooltip>
      <Avatar />
    </Avatar.Group>
    <RightCircleOutlined className='iconTask' />                 

      </div>

      </div>
    </div>
    </div>
    </div> 
  );
};

export default Card;
