import { List } from 'antd';
import React, { useEffect, useLayoutEffect } from 'react';

// import { Container } from './styles';

const AddAppointmentService: React.FC = () => {
  const data = [
    { id: '1', name: 'a' },
    { id: '2', name: 'b' },
    { id: '3', name: 'c' },
    { id: '4', name: 'd' },
    { id: '5', name: 'e' },
    { id: '6', name: 'f' },
    { id: '7', name: 'g' },
  ];

  const scrollToItem = (itemId: any) => {
    const element = document.getElementById(itemId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToItem('7');
  }, []);

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 200,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item id={item.id} key={item.id}>
            <List.Item.Meta
              title={<a href="https://ant.design">{item.name}</a>}
            />
            <div>Content</div>
          </List.Item>
        )}
      />
    </div>
  );
}

export default AddAppointmentService;