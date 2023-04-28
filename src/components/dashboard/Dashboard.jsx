import React from 'react';
import ApexCharts from 'apexcharts';
import "./Dash.css";
import {CarryOutOutlined,UsergroupDeleteOutlined,UserSwitchOutlined,FallOutlined} from "@ant-design/icons";
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.barChartRef = React.createRef();
    this.areaChartRef = React.createRef();
  }

  componentDidMount() {
    const barChartOptions = {
      series: [{
        data: [10, 8, 6, 4, 2]
      }],
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: false
        },
      },
      colors: [
        "#0085ff",
        "#ef4444",
        "#2B9D2F",
        "#FFB800",
        "#4f35a1"
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
        categories: ["Projet 1", "Projet 2", "Projet 3", "Projet 4", "Projet 5"],
      },
      yaxis: {
        title: {
          text: "Count"
        }
      }
    };
    const barChart = new ApexCharts(this.barChartRef.current, barChartOptions);
    barChart.render();

    const areaChartOptions = {
      series: [{
        name: 'Task Completion Rate',
        data: [31, 40, 28, 51, 42, 109, 100]
      }, {
        name: 'Time-to-Completion',
        data: [11, 32, 45, 32, 34, 52, 41]
      }],
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: false,
        },
      },
      colors: ["#4f35a1", "#0085ff"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth'
      },
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      markers: {
        size: 0
      },
      yaxis: [
        {
          title: {
            text: 'Task Completion Rate',
          },
        },
        {
          opposite: true,
          title: {
            text: 'Time-to-Completion',
          },
        },
      ],
      tooltip: {
        shared: true,
        intersect: false,
      }
    };
    const areaChart = new ApexCharts(this.areaChartRef.current, areaChartOptions);
    areaChart.render();
  }

  render() {
    return (
      <main className="main-container">
        <div className="main-title">
          <p className="title_dash">Dashboard</p>
        </div>

        <div className="main-cards">
          <div className="card">
            <div className="card-inner">
              <p className="text-primary">Completed Tasks</p>
              <span><CarryOutOutlined /></span>
            </div>
            <span className="text-primary font-weight-bold">249</span>
          </div>

          <div className="card">
            <div className="card-inner">
              <p className="text-primary">Overdue Tasks</p>
              <span><FallOutlined /></span>
            </div>
            <span className="text-primary font-weight-bold">83</span></div>

      <div className="card">
        <div className="card-inner">
          <p className="text-primary">Active Users</p>
          <span className=""><UserSwitchOutlined /></span>
        </div>
        <span className="text-primary font-weight-bold">79</span>
      </div>

      <div className="card">
        <div className="card-inner">
          <p className="text-primary">Inactive Users</p>
          <span className=""><UsergroupDeleteOutlined /></span>
        </div>
        <span className="text-primary font-weight-bold">56</span>
      </div>
    </div>

    <div className="charts">
      <div className="charts-card">
        <p className="chart-title">Project Analytics</p>
        <div ref={this.barChartRef}></div>
      </div>

      <div className="charts-card">
        <p className="chart-title"> Progress Overview</p>
        <div ref={this.areaChartRef}></div>
      </div>
    </div>
  </main>
);
}
}

export default Dashboard;