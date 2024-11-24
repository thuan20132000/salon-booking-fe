import { deleteSalonCategoryInputType } from '@/apis/serviceAPI';
import { ServiceStore, useServiceStore } from '@/store/useServiceStore';
import { NailServiceCategoryType, NailServiceType } from '@/types/service';
import { Avatar, Button, Card, Flex, List, Popover } from 'antd';
import React, { useState } from 'react'
import AddCategoryModal from './AddCategoryModal';
import UpdateCategoryModal from './UpdateCategoryModal';

type Props = {
  salonCategoryService: NailServiceCategoryType[];
  onSelectCategory?: (cat: NailServiceCategoryType | undefined) => void;
  selectedCategory?: NailServiceCategoryType | undefined;
}


const ServiceList = (props: Props) => {
  const [isShowUpdateModal, setIsShowUpdateModal] = useState(false);

  const {
    deleteSalonCategory
  } = useServiceStore((state: ServiceStore) => state);

  const [isOpenPopover, setIsOpenPopover] = useState(false);


  const handleOpenChange = (newOpen: boolean) => {
    setIsOpenPopover(newOpen);
  };

  const onDeleteSalonCategory = async () => {

    if (deleteSalonCategory) {
      let category = props.salonCategoryService[0];
      let deleteInput: deleteSalonCategoryInputType = {
        id: Number(category.id),
        salon_id: Number(category.salon)
      }
      await deleteSalonCategory(deleteInput);
      props.onSelectCategory?.(undefined);
      setIsOpenPopover(false);
    }
  }
  const onAddCategory = () => {
    // handleVisibleCategory(0);
  }

  const onCloseAddModal = () => {
    setIsShowUpdateModal(false);
  }

  const onShowUpdateModal = () => {
    setIsShowUpdateModal(true);
    setIsOpenPopover(false)
  }


  const renderActionExtra = () => {

    if (!props.selectedCategory) return null;

    return (
      <Popover
        trigger="click"
        open={isOpenPopover}
        onOpenChange={handleOpenChange}
        placement='bottomLeft'
        content={
          <Flex vertical>
            <Button className='mb-2' type='default' onClick={onDeleteSalonCategory}>Delete</Button>
            <Button className='mb-2' type='default' onClick={onShowUpdateModal}>Update</Button>
          </Flex>
        }
      >
        <Button >Action</Button>
      </Popover>
    )
  }

  return (
    <Card title="Services List"
      extra={renderActionExtra()}
    >
      {/* header bar */}

      <List
        itemLayout="horizontal"
        dataSource={props.salonCategoryService}
        split={false}
        renderItem={(item, index) => {

          return (
            <>
              <List.Item>
                <List.Item.Meta
                  title={<a className='font-bold' href="https://ant.design">{item.name}</a>}
                />
              </List.Item>
              <List
                itemLayout="horizontal"
                className='ml-8'
                dataSource={item.nail_services}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                      title={<a href="https://ant.design">{item.name}</a>}
                    />
                  </List.Item>
                )}
              />

            </>
          )
        }}
      />
      <UpdateCategoryModal
        isShow={isShowUpdateModal}
        onClose={onCloseAddModal}
        category={props.selectedCategory}
        
      />

    </Card>
  )
}

export default ServiceList