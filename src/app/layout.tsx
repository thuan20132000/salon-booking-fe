"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { ConfigProvider } from 'antd';
import theme from '../theme/themeConfig';
import Signin from "./auth/signin/page";
import useAuthenticationStore from "@/store/useAuthenticationStore";
import { AuthenticationState } from '../store/useAuthenticationStore';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = useAuthenticationStore((AuthenticationState) => AuthenticationState);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);



  if (!isAuthenticated) {
    return (
      <ConfigProvider theme={theme}>
        <html lang="en">
          <body suppressHydrationWarning={true}>
            <div className="dark:bg-boxdark-2 dark:text-bodydark">
              {loading && <Loader />}
              <Signin />
            </div>
          </body>
        </html>
      </ConfigProvider>

    );
  }

  return (
    <ConfigProvider theme={theme}>
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {loading ? <Loader /> : children}
          </div>
        </body>
      </html>
    </ConfigProvider>

  );
}
