import { Table,  Avatar,Button,Modal } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./DataGrid_2.css";
import User from "./userInfo";
const App = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
 useEffect(() => {
  // setLoading(true);
  Promise.all([
    axios.get('http://localhost:2000/users/'),
    axios.get('http://localhost:2000/teams')
  ])
  .then(([usersResponse, teamsResponse]) => {
    setData(usersResponse.data);
    setTeams(teamsResponse.data);
    setLoading(false);
  })
  .catch(error => {
    console.log(error);
    setLoading(false);
  });
}, [data]);


const handleDelete = (userId) => {
  console.log(userId);
  axios.delete(`http://localhost:2000/users/deleteUser/${userId}`)
    .then(response => {
      const newData = data.filter(user => user._id !== userId);
      setData(newData);
      setSelectedRowKeys(selectedRowKeys.filter(key => key !== userId));
    })
    .catch(error => {
      console.log(error);
    });
};
const handleView = (userId) => {
  const user = data.find(u => u._id === userId);
  setSelectedUser(user);
};
const handleClose = () => {
  setSelectedUser(null);
};
const columns = [
  {
    title: 'Id',
    dataIndex: '_id',
    render: (text) => `${text.slice(0, 4)}...`  
  },
  {
    title: 'User',
    dataIndex: 'name',
    render: (text, record) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={record.profileImage} />
        <span style={{ marginLeft: 8 }}>{text}</span>
      </div>
    ),
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },{
    title: 'Team',
    dataIndex: 'team',
    render: (text) => {
      const team = teams.find(t => t._id === text);
      return team ? team.name : text;
    },
  },
  {title: 'Role',
  dataIndex: 'role',
},
  {title: 'Action',
  dataIndex: '_id',
  render: (text) => (
    <div>
       <Button onClick={() => handleView(text)}>View</Button>
          <Modal
            centered
            visible={selectedUser !== null} 
            onOk={handleClose}
            onCancel={handleClose}
            width={800}
            style={{}}

          >
   <User user={selectedUser} />
      </Modal>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Button onClick={() => handleDelete(text)}>Delete</Button>
    </div>
  ),
},
];

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
      </div>
      {data && teams && (
  <Table 
    rowSelection={rowSelection} 
    columns={columns}
    dataSource={data}
    loading={loading}
  />
)}
    </div>
  );
};

export default App;
