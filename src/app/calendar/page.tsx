import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ResourceCalendar from "@/app/calendar/components/ResourceCalendar";

export const metadata: Metadata = {
  title: "Next.js Calender | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

const CalendarPage = () => {
  return (
    <DefaultLayout>
      {/* <Calendar /> */}
      <ResourceCalendar/>
    </DefaultLayout>
  );
};

export default CalendarPage;
