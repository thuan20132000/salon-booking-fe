import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Button, DrawerProps, Radio, RadioChangeEvent, Space } from "antd";
import { useState } from "react";
import AddService from "@/components/AddService/AddService";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const ServicePage = () => {
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


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Services" />
      <Space> 
        <AddService />
      </Space>
      <div className="flex flex-col gap-10">
        {/* <TableOne />
        <TableTwo /> */}
        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default ServicePage;
