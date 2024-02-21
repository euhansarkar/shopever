"use client";
import Contents from "@/components/ui/Contents";
import SideBar from "@/components/ui/Sidebar";
import { isLoggedIn } from "@/services/auth.service";
import { Layout } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const userLoggedIn = isLoggedIn();

  useEffect(() => {
    if (!userLoggedIn) {
      router.push(`/account/login`);
    }
    setLoading(true);
  }, [router, userLoggedIn]);

  if (!loading) {
    return <p>loading</p>;
  }

  return (
    <Layout hasSider>
      <SideBar />
      <Contents>{children}</Contents>
    </Layout>
  );
};

export default DashboardLayout;
