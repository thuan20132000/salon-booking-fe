import { deleteSalonCategoryInputType } from '@/apis/serviceAPI';
import { ServiceStore, useServiceStore } from '@/store/useServiceStore';
import { NailServiceCategoryType, NailServiceType } from '@/types/service';
import { Avatar, Button, Card, Flex, List, Popconfirm, Popover } from 'antd';
import React, { useState } from 'react'
import AddCategoryModal from './AddCategoryModal';
import UpdateCategoryModal from './UpdateCategoryModal';
import { DeleteFilled, EditFilled, HighlightOutlined, QuestionCircleOutlined, SettingOutlined } from '@ant-design/icons';
import AddServiceModal from './AddServiceModal';
import UpdateServiceModal from './UpdateServiceModal';

type Props = {
  salonCategoryService: NailServiceCategoryType[];
  onSelectCategory?: (cat: NailServiceCategoryType | undefined) => void;
  selectedCategory?: NailServiceCategoryType | undefined;
}


const ServiceList = (props: Props) => {
  const [isShowUpdateModal, setIsShowUpdateModal] = useState(false);
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [isShowUpdateServiceModal, setIsShowUpdateServiceModal] = useState(false);
  const [selectedService, setSelectedService] = useState<NailServiceType | undefined>(undefined);

  const {
    deleteSalonCategory,
    deleteSalonService
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
    setIsShowAddModal(false);
  }

  const onCloseUpdateServiceModal = () => {
    setIsShowUpdateServiceModal(false);
  }



  const onCloseUpdateModal = () => {
    setIsShowUpdateModal(false);
    setIsOpenPopover(false)
  }

  const onShowUpdateModal = () => {
    setIsShowUpdateModal(true);
    setIsOpenPopover(false)
  }

  const onShowUpdateServiceModal = (service: NailServiceType) => {
    setSelectedService(service);
    setIsShowUpdateServiceModal(true);
  }

  const onShowAddModal = () => {
    setIsShowAddModal(true);
    setIsOpenPopover(false)
  }


  const renderActionExtra = () => {

    if (!props.selectedCategory) return <></>;

    return (
      <Popover
        trigger="click"
        open={isOpenPopover}
        onOpenChange={handleOpenChange}
        placement='bottomLeft'
        content={
          <Flex vertical>
            <Button className='mb-2' type='default' onClick={onShowAddModal}>Add service</Button>
            <Button className='mb-2' type='default' onClick={onShowUpdateModal}>Update</Button>
            <Popconfirm
              title="Delete category"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              onConfirm={onDeleteSalonCategory}
              okText="Yes"
              okButtonProps={{ danger: true }}
            >
              <Button className='mb-2' type='default' >Delete</Button>
            </Popconfirm>
          </Flex>
        }
      >
        <Button >Action</Button>
      </Popover>
    )
  }

  const onDeleteService = async (service: NailServiceType) => {
    try {
      console.log('delete service', service);

      if (deleteSalonService) {
        await deleteSalonService(Number(service.salon), Number(service.id));
      }
    } catch (error) {
      console.log('error deleting service', error);

    }
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
                  title={<a className='font-bold' >{item.name}</a>}
                />
              </List.Item>
              <List
                itemLayout="horizontal"
                className='ml-8'
                dataSource={item.nail_services}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon={<HighlightOutlined />}/>}
                      title={<a >{item.name}</a>}
                    />
                    <Popconfirm
                      title="Delete service"
                      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                      onConfirm={() => onDeleteService(item)}
                      okText="Yes"
                      okButtonProps={{ danger: true }}
                    >
                      <Button danger><DeleteFilled /></Button>
                    </Popconfirm>
                    <Button className='ml-2'
                      onClick={() => onShowUpdateServiceModal(item)}
                    ><EditFilled /></Button>
                  </List.Item>
                )}

              />

            </>
          )
        }}
      />
      <UpdateCategoryModal
        isShow={isShowUpdateModal}
        onClose={onCloseUpdateModal}
        category={props.selectedCategory}

      />
      <AddServiceModal
        isShow={isShowAddModal}
        onClose={onCloseAddModal}
        category={props.selectedCategory}
      />
      <UpdateServiceModal
        isShow={isShowUpdateServiceModal}
        onClose={onCloseUpdateServiceModal}
        service={selectedService}
      />
    </Card>
  )
}

export default ServiceList