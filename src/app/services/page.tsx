'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableSalonServices from "@/components/Tables/TableSalonServices";

const ServicePage = () => {
 
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Services" />
      <TableSalonServices />
    </DefaultLayout>
  );
};

export default ServicePage;
