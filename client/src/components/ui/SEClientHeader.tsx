"use client";
import {
  Avatar,
  Button,
  Col,
  Dropdown,
  Layout,
  MenuProps,
  Row,
  Space,
  Grid,
} from "antd";
import {
  MenuOutlined,
  SearchOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { AUTH_KEY } from "@/constants/storageKey";
import Image from "next/image";
import img from "@/assets/logo.png";
import { useCategoriesQuery } from "@/redux/api/categoryApi";
import { useState } from "react";
import Link from "next/link";
import SECart from "../cart/SECart";
const { Header: AntHeader } = Layout;

const SEClientHeader = () => {
  const { useBreakpoint } = Grid;
  const { md, sm } = useBreakpoint();

  // drawer control
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const router = useRouter();
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(3);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const { data, isLoading } = useCategoriesQuery({ ...query });
  const categories = data?.categories;

  const logOut = () => {
    removeUserInfo(AUTH_KEY);
    router.push("/account/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Link href={`/user/profile`}>
          <Button type="text">Profile</Button>
        </Link>
      ),
    },
    {
      key: "1",
      label: (
        <Button onClick={logOut} type="text" danger>
          Logout
        </Button>
      ),
    },
  ];

  const categoryItems: MenuProps["items"] = categories?.map((category, i) => ({
    key: `${i}`,
    label: (
      <Link href={`/categories/${category?.id}`}>
        <Button type="text">{category?.name}</Button>
      </Link>
    ),
  }));

  const { role } = getUserInfo() as any;
  return (
    <AntHeader
      style={{
        background: "#fff",
        borderBottom: "0.1px solid #d4d6d9",
      }}
    >
      <Row
        justify="space-between"
        align="middle"
        style={{
          height: "100%",
        }}
      >
        {/* first part */}
        <Col>
          <Space wrap size={16} style={{ marginTop: "12px" }}>
            <Link href={`/home`}>
              <Image
                src={img}
                height={sm ? 30 : 25}
                width={sm ? 30 : 25}
                alt="logo"
              />
            </Link>
          </Space>
        </Col>

        {/* second part */}
        {md ? (
          <Col style={{ display: "flex", gap: "10px" }}>
            {categories?.map((category) => (
              <Link key={category?.id} href={`/categories/${category?.id}`}>
                <Button type="text">{category?.name}</Button>
              </Link>
            ))}
          </Col>
        ) : null}

        {/* third part */}
        <Col
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: "14px",
          }}
        >
          <Space wrap size={10}>
            <Avatar size={sm ? "default" : "small"} icon={<SearchOutlined />} />
          </Space>

          <Space wrap size={10}>
            <SECart onClose={onClose} showDrawer={showDrawer} open={open} />
          </Space>

          <Dropdown menu={{ items }}>
            <Space wrap size={10}>
              <Avatar size={sm ? "default" : "small"} icon={<UserOutlined />} />
            </Space>
          </Dropdown>

          {md ? null : (
            <Dropdown menu={{ items: categoryItems }} trigger={["click"]}>
              <Space wrap size={10}>
                <Avatar
                  size={sm ? "default" : "small"}
                  icon={<MenuOutlined />}
                />
              </Space>
            </Dropdown>
          )}
        </Col>
      </Row>
    </AntHeader>
  );
};

export default SEClientHeader;
