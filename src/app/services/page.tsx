'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ServiceListTable from "./components/ServiceListTable";
import ServiceCategoryListTable from "./components/ServiceCategoryList";
import { Col, Divider, Flex, Row, Spin } from "antd";
import { Typography } from "antd";
import CategoryList from "./components/CategoryList";
import ServiceList from "./components/ServiceList";
import { ServiceStore, useServiceStore } from "@/store/useServiceStore";
import { useEffect, useState } from "react";
import useAuthenticationStore, { AuthenticationState } from "@/store/useAuthenticationStore";
import { NailServiceCategoryType } from "@/types/service";
const { Title, Text, Link } = Typography;

const ServicePage = () => {
  const { user } = useAuthenticationStore((state: AuthenticationState) => state);
  const [selectedCategory, setSelectedCategory] = useState<NailServiceCategoryType>();

  const {
    getSalonCategoryServices,
    salonCategories,
    isLoading
  } = useServiceStore((state: ServiceStore) => state);

  useEffect(() => {
    getSalonCategoryServices(Number(user?.id));
  }, [])

  const onSelectCategory = (cat: NailServiceCategoryType | undefined) => {
    setSelectedCategory(cat);
  }

  const salonCategoryServices = () => {
    if (selectedCategory) {
      return salonCategories.filter((item) => item.id === selectedCategory.id);
    }
    console.log(' salonCategories:: ', salonCategories);
    
    return salonCategories
  }

  return (
    <DefaultLayout>
      <Spin spinning={isLoading} fullscreen/>
      <Breadcrumb pageName="Services" />
      <Row>
        <Col span={6} >
          <div>
            {/* <ServiceCategoryListTable /> */}
            <CategoryList
              salonCategories={salonCategories}
              onSelectCategory={onSelectCategory}
            />
          </div>
        </Col>
        <Col span={16} push={1}>
          <ServiceList
            salonCategoryService={salonCategoryServices()}
            onSelectCategory={onSelectCategory}
            selectedCategory={selectedCategory}
          />
        </Col>
      </Row>
    </DefaultLayout>
  );
};

export default ServicePage;
