'use client';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableSalonCustomer from "@/components/Tables/TableSalonCustomer";

const CustomerPage = () => {


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Salon Customers" />
      <TableSalonCustomer />
    </DefaultLayout>
  );
};

export default CustomerPage;
