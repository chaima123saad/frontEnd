import {FilterFilled } from '@ant-design/icons';
import "./Filter.css";
import { Dropdown, message, Space } from 'antd';
const onClick = ({ key }) => {
  message.info(`Click on item ${key}`);
};
const items = [
  {
    label: 'Statue',
    key: '1',
  },
  {
    label: 'Date',
    key: '2',
  },
  {
    label: 'Alphabet',
    key: '3',
  },
];
const App = () => (
  <Dropdown
    menu={{
      items,
      onClick,
    }}
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space style={{fontSize:17}}>
      <FilterFilled />
        Filter
      </Space>
    </a>
  </Dropdown>
);
export default App;