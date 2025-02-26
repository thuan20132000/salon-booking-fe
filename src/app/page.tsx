'use client';
import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect, useState } from "react";
import useNotification from "@/hooks/useNotification";
import SignIn from "./auth/signin/page";
import EmployeePage from "./employees/page";
import ResourceCalendar from "./calendar/components/ResourceCalendar";
import { useSalonStore, SalonState } from "@/store/useSalonStore";

// export const metadata: Metadata = {
//   title:
//     "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
//   description: "This is Next.js Home for TailAdmin Dashboard Template",
// };

export default function Home() {

  const { initSalonData } = useSalonStore((state:SalonState) => state);

  useEffect(() => {
    initSalonData();
  }, []);

 
  return (
    <>
      <DefaultLayout>
        <ResourceCalendar />
      </DefaultLayout>
    </>
  );
}
