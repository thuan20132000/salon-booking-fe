import { ServiceStore, useServiceStore } from '@/store/useServiceStore';
import { NailServiceCategoryType } from '@/types/service';
import { Avatar, Card, List } from 'antd';
import React, { useState } from 'react'
import AddCategoryModal from './AddCategoryModal';

type Props = {
  salonCategories: NailServiceCategoryType[];
  onSelectCategory?: (cat: NailServiceCategoryType | undefined) => void;
}



const CategoryList = (props: Props) => {
  const {
    handleVisibleCategory,
  } = useServiceStore((state: ServiceStore) => state);
  const [isShowAddModal, setIsShowAddModal] = useState(false);

  const onAddCategory = () => {
    handleVisibleCategory(0);
  }

  const onCloseAddModal = () => {
    setIsShowAddModal(false);
  }

  const onShowAddModal = () => {
    setIsShowAddModal(true);
  }

  return (
    <Card title="Category List">
      <List
        itemLayout="horizontal"
        dataSource={props.salonCategories}
        renderItem={(item, index) => (
          <List.Item
            onClick={() => {
              if (props.onSelectCategory) {
                props.onSelectCategory(item);
              }
            }}
          >
            <List.Item.Meta
              title={<a >{item.name}</a>}
            />
          </List.Item>
        )}
        split={false}
        header={
          <List.Item onClick={() => {
            if (props.onSelectCategory) {
              props.onSelectCategory(undefined);
            }
          }}>
            <List.Item.Meta
              title={<a >All</a>}
            />
          </List.Item>
        }
        footer={
          <List.Item onClick={() => onAddCategory()}>
            <List.Item.Meta
              title={<a className='text-blue-600' style={{ color: 'blue' }} onClick={onShowAddModal} >Add caregory</a>}
              className='text-blue-600'
              style={{ cursor: 'pointer', color: 'blue' }}
            />
          </List.Item>
        }
      />
      <AddCategoryModal isShow={isShowAddModal} onClose={onCloseAddModal} />
    </Card>
  )
}

export default CategoryList