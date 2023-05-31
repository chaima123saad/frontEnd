import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ApexCharts from 'apexcharts';
import './Dash.css';
import {
  CarryOutOutlined,
  UsergroupDeleteOutlined,
  UserSwitchOutlined,
  FallOutlined,
  HourglassOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

import { Col, Row, Statistic } from 'antd';
import { DesktopAccessDisabled } from '@mui/icons-material';
const { Countdown } = Statistic;

const onFinish = () => {
  console.log('finished!');
};
const onChange = (val) => {
  if (typeof val === 'number' && 4.95 * 1000 < val && val < 5 * 1000) {
    console.log('changed!');
  }
};

const Dashboard = () => {
  const barChartRef = useRef(null);
  const areaChartRef = useRef(null);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [overdueTasksCount, setOverdueTasksCount] = useState(0);
  const [barChartData, setBarChartData] = useState([]);
  const [barChartCategories, setBarChartCategories] = useState([]);
  const [curbData, setCurbData] = useState([]);
  const [overdueData,setOverduCurbData]= useState([]);
  const [teamName,setTeamNames]= useState([]);
  const [projectSta,setProjectSta]=useState([]);
  const [limDate,setLimiteDate]=useState(null);
  

  useEffect(() => {
    axios.get('http://localhost:2000/projects/')
      .then(response => {
        const projects = response.data;
        if(projects){
        const data = projects.map(project => project.progress);
        const categories = projects.map(project => project.name);
        setBarChartData(data);
        setBarChartCategories(categories);
        
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

useEffect(()=>{
  axios.get('http://localhost:2000/statistics/nearestLimitDate')
  .then(response => {
    setProjectSta(response.data.projects);
    const date=new Date(response.data.projects[0].limiteDate);
    const currentTime = new Date();
      const remainingTimeInSeconds = Math.floor((date.getTime() - currentTime.getTime()) / 1000);
      console.log("remainingTimeInSeconds",remainingTimeInSeconds);
      setLimiteDate(remainingTimeInSeconds);

  })
  .catch(error => {
    console.log(error);
  });
  }, []);


 

      

  useEffect(() => {
    axios.get('http://localhost:2000/teams/')
      .then((response) => {
        const teamProgressArray = [];
        const teamOverdueArray = [];
        const teamNamesArray = response.data.map((team) => team.name);
        setTeamNames(teamNamesArray);

  
        Promise.all(
          response.data.map((team) =>
          
            axios.get(`http://localhost:2000/statistics/teamProgress/${team._id}`),
            
          )
        )
          .then((responses) => {
            responses.forEach((response) => {
              teamProgressArray.push(response.data.teamProgress);
              teamOverdueArray.push(100-response.data.teamProgress);

            });
  
            console.log("teamProgressArray:", teamProgressArray);
            console.log("teamNamesArray:", teamNamesArray);
            setCurbData(teamProgressArray);
            setOverduCurbData(teamOverdueArray);

          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  

  useEffect(()=>{
    if(limDate != null){
      console.log("limDate:",limDate); 
    }
      }, [limDate]);



  useEffect(() => {
    
    const barChartOptions = {
      series: [{
        data: barChartData
      }],
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: false
        },
      },
      colors: [
        
       "#744ae2",
       "#fe6f8d",
       "#fa8d52",
       "#feb637"
      ],
      plotOptions: {
        bar: {
          distributed: true,
          borderRadius: 4,
          horizontal: false,
          columnWidth: '40%',
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: barChartCategories,
      },
      yaxis: {
        title: {
          text: "Progress %"
        }
      }
    };
    

    const areaChartOptions = {
      series: [{
        name: 'Team Progress',
        data: curbData
      }, {
        name: 'Team Setback',
        data: overdueData
      }],
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: false,
        },
      },
      colors: ["#744ae2", "#feb637"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth'
      },
      labels: teamName,
      markers: {
        size: 0
      },
      yaxis: [
        {
          title: {
            text: 'Team Progress',
          },
        },
        {
          opposite: true,
          title: {
            text: 'Team Setback',
          },
        },
      ],
      tooltip: {
        shared: true,
        intersect: false,
      }
    };

    const barChart = new ApexCharts(barChartRef.current, barChartOptions);
    const areaChart = new ApexCharts(areaChartRef.current, areaChartOptions);

    barChart.render();
    areaChart.render();

    return () => {
      barChart.destroy();
      areaChart.destroy();
    };
  }, [limDate,barChartData,barChartCategories,curbData,teamName,overdueData,projectSta]);

  useEffect(() => {
    axios.get('http://localhost:2000/statistics/completedTasksCount')
      .then(response => {
        setCompletedTasksCount(response.data.count);
      })
      .catch(error => {
        console.log(error);
      });

    axios.get('http://localhost:2000/statistics/noCompletedTasksCount')
      .then(response => {
        setOverdueTasksCount(response.data.count);
      })
      .catch(error => {
        console.log(error);
      });

  }, []);
     

    return (
    <main className="main-container">
    <div className="main-title">
    <p className="title_dash">Dashboard</p>
    </div>
    <div className="main-cards">
    <div className="card">
      <div className="card-inner">
        <p className="text-primary">Completed Tasks</p>
        <span>
          <CarryOutOutlined />
        </span>
      </div>
      <span className="text-primary font-weight-bold">{completedTasksCount}/{completedTasksCount+overdueTasksCount}</span>
    </div>

    <div className="card">
      <div className="card-inner">
        <p className="text-primary">Overdue Tasks</p>
        <span>
          <FallOutlined />
        </span>
      </div>
      <span className="text-primary font-weight-bold">{overdueTasksCount}/{completedTasksCount+overdueTasksCount}</span>
    </div>

    <div className="card">
 
  <div className="card-inner">
        <p className="text-primary">{projectSta[0] ? projectSta[0].name : "no result"}</p>
        <span>
        <HourglassOutlined />
                </span>
      </div>
  {limDate &&  (
    <Countdown
      value={dayjs().add(limDate, 's')}
      format="D [D] H [H] m [M] s [S]"
      onFinish={onFinish}
      onChange={onChange}
    />
  )}
</div>

  </div>

  <div className="charts">
    <div className="charts-card">
      <p className="chart-title">Project Analytics</p>
      <div ref={barChartRef}></div>
    </div>

    <div className="charts-card">
      <p className="chart-title"> Team Analytics</p>
      <div ref={areaChartRef}></div>
    </div>
  </div>
</main>
);
};

export default Dashboard;    
