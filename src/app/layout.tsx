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
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, checkAuth } = useAuthenticationStore((state: AuthenticationState) => state);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);

  }, []);

  useEffect(() => {
    const isAuth = checkAuth()
    if (!isAuth) {
      router.replace('/auth/signin');
    } else {
      router.replace('/');
    }

  }, [isAuthenticated])


  return (
    <ConfigProvider theme={theme}>
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {
              !isAuthenticated && (
                <div className="flex flex-col h-screen">
                  <Signin />
                </div>
              )
            }

            {isAuthenticated && (
              <div className="flex flex-col h-screen">
                {children}
              </div>
            )}
          </div>
        </body>
      </html>
    </ConfigProvider>

  );
}
