import { ServiceStore, useServiceStore } from '@/store/useServiceStore';
import { NailServiceCategoryType } from '@/types/service';
import { Avatar, Card, List } from 'antd';
import React from 'react'

type Props = {
  salonCategories: NailServiceCategoryType[]
}

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];


const CategoryList = (props: Props) => {
  const { handleVisibleCategory } = useServiceStore((state: ServiceStore) => state);

  const onClick = (item?: NailServiceCategoryType) => {
    if (item?.id) {
      handleVisibleCategory(item?.id);
    }else{
      handleVisibleCategory(0);
    }
  }

  return (
    <Card title="Category List">
      <List.Item onClick={() => onClick()}

      >
        <List.Item.Meta
          title={<a >all</a>}
        />
      </List.Item>
      <List
        itemLayout="horizontal"
        dataSource={props.salonCategories}
        renderItem={(item, index) => (
          <List.Item onClick={() => onClick(item)}>
            <List.Item.Meta
              title={<a >{item.name}</a>}
            />
          </List.Item>
        )}
        split={false}
      />

    </Card>
  )
}

export default CategoryList