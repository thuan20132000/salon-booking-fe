'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ServiceListTable from "./components/ServiceListTable";
import ServiceCategoryListTable from "./components/ServiceCategoryList";
import { Col, Divider, Flex, Row } from "antd";
import { Typography } from "antd";
import CategoryList from "./components/CategoryList";
import ServiceList from "./components/ServiceList";
import { ServiceStore, useServiceStore } from "@/store/useServiceStore";
import { useEffect } from "react";
import useAuthenticationStore, { AuthenticationState } from "@/store/useAuthenticationStore";
const { Title, Text, Link } = Typography;

const ServicePage = () => {
  const { user } = useAuthenticationStore((state: AuthenticationState) => state);
  // const [open, setOpen] = useState(false);
  // const [placement, setPlacement] = useState<DrawerProps['placement']>('right');

  // const showDrawer = () => {
  //   setOpen(true);
  // };

  // const onChange = (e: RadioChangeEvent) => {
  //   setPlacement(e.target.value);
  // };

  // const onClose = () => {
  //   setOpen(false);
  // };

  const {
    getSalonCategoryServices,
    salonCategories
  } = useServiceStore((state: ServiceStore) => state);

  useEffect(() => {
    getSalonCategoryServices(Number(user?.id));
  }, [])

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Services" />
      {/* <ServiceListTable /> */}
      {/* 
      <Divider style={{ borderColor: '#7cb305' }}></Divider>

      <Breadcrumb pageName="Service Categories" /> */}

      <Row>
        <Col span={6} >
          <div>
            {/* <ServiceCategoryListTable /> */}
            <CategoryList salonCategories={salonCategories} />
          </div>
        </Col>
        <Col span={16} push={1}>
          <ServiceList salonCategoryService={salonCategories} />
        </Col>
      </Row>
    </DefaultLayout>
  );
};

export default ServicePage;
