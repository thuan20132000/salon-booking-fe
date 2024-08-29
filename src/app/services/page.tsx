import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ServiceListTable from "./components/ServiceListTable";
import ServiceCategoryListTable from "./components/ServiceCategoryList";
import { Divider } from "antd";

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
      <ServiceListTable />

      <Divider style={{  borderColor: '#7cb305' }}></Divider>

      <Breadcrumb pageName="Service Categories" />
      <ServiceCategoryListTable />
    </DefaultLayout>
  );
};

export default ServicePage;
