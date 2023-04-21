import { Button, Table,Modal } from 'antd';
import { useState,useEffect } from 'react';
import axios from "axios";


const App = () => {

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

 useEffect(() => {
  Promise.all([
    axios.get('http://localhost:2000/projects/'),
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
const handleDelete = (projectId) => {
  console.log(projectId);
  axios.delete(`http://localhost:2000/projects/deleteProject/${projectId}`)
    .then(response => {
      const newData = data.filter(project => project._id !== projectId);
      setData(newData);
      setSelectedRowKeys(selectedRowKeys.filter(key => key !== projectId));
    })
    .catch(error => {
      console.log(error);
    });
};
const handleView = (projectId) => {
  const project = data.find(p => p._id === projectId);
  setSelectedProject(project);
};
const handleClose = () => {
  setSelectedProject(null);
};
const columns = [
  {
    title: 'Id',
    dataIndex: '_id',
    render: (text) => `${text.slice(0, 4)}...`  
  },
  {
    title: 'Project Name',
    dataIndex: 'name',
  },
  {
    title: 'Client Name',
    dataIndex: 'clientName',
  },{
    title: 'Team',
    dataIndex: 'team',
    render: (text) => {
      const team = teams.find(t => t._id === text);
      return team ? team.name : text;
    },
  },
  {title: 'Status',
  dataIndex: 'status',
},
  {title: 'Budget',
  dataIndex: 'budge',
},
{title: 'Action',
  dataIndex: '_id',
  render: (text) => (
    <div>
       <Button onClick={() => handleView(text)}>View</Button>
          <Modal
            centered
            visible={selectedProject !== null} 
            onOk={handleClose}
            onCancel={handleClose}
            width={800}
            style={{}}

          >
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
          marginBottom: 16
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