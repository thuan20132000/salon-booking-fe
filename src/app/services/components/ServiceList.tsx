import { NailServiceCategoryType, NailServiceType } from '@/types/service';
import { Avatar, Card, List } from 'antd';
import React from 'react'

type Props = {
  salonCategoryService: NailServiceCategoryType[]
}


const ServiceList = (props: Props) => {



  return (
    <Card title="Services List">
      <List
        itemLayout="horizontal"
        dataSource={props.salonCategoryService}
        split={false}
        renderItem={(item, index) => {
          if (item.is_visible == false) {
            return
          }
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

    </Card>
  )
}

export default ServiceList