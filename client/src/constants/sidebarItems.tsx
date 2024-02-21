import type { MenuProps } from "antd";
import {
  ProfileOutlined,
  TableOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";
export const sidebarItems = (role: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/${role}/profile`}>Account Profile</Link>,
          key: `/${role}/profile`,
        },
        {
          label: <Link href={`/${role}/change-password`}>Change Password</Link>,
          key: `/${role}/change-password`,
        },
      ],
    },
    {
      label: "Consume",
      key: "consume",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/${role}/consume/orders`}>Orders</Link>,
          key: `/${role}/consume/orders`,
        },
        {
          label: (
            <Link href={`/${role}/consume/order-tracking`}>Order Tracking</Link>
          ),
          key: `/${role}/consume/order-tracking`,
        },
      ],
    },
    {
      label: "Favourites",
      key: "favourite",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/${role}/favourite/wishlists`}>Wishlists</Link>,
          key: `/${role}/favourite/wishlists`,
        },
        {
          label: <Link href={`/${role}/favourite/lists`}>Lists</Link>,
          key: `/${role}/favourite/lists`,
        },
      ],
    },
    {
      label: "Rating & Review",
      key: "review",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/${role}/review/reviewed`}>Reviewed</Link>,
          key: `/${role}/reviews`,
        },
        {
          label: (
            <Link href={`/${role}/review/not-reviewed`}>Not Reviewed</Link>
          ),
          key: `/${role}/reviews`,
        },
      ],
    },
  ];

  const commonAdminSidebarItems: MenuProps["items"] = [];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label: "Catalog",
      key: "catalog",
      icon: <TableOutlined />,
      children: [
        {
          label: <Link href={`/${role}/catalog/product`}>Products</Link>,
          key: `/${role}/catalog/product`,
        },
        {
          label: <Link href={`/${role}/catalog/category`}>Categories</Link>,
          key: `/${role}/catalog/category`,
        },
        {
          label: <Link href={`/${role}/catalog/collection`}>Collections</Link>,
          key: `/${role}/catalog/collection`,
        },
        {
          label: <Link href={`/${role}/catalog/attribute`}>Attributes</Link>,
          key: `/${role}/catalog/attribute`,
        },
      ],
    },
    {
      label: "Sale",
      key: "sale",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/sale/order`}>Orders</Link>,
          key: `/${role}/sale/order`,
        },
      ],
    },
    {
      label: "Customer",
      key: "customer",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/customer`}>Customers</Link>,
          key: `/${role}/customer`,
        },
      ],
    },
    {
      label: "Promotion",
      key: "promotion",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/promotion/coupon`}>Coupons</Link>,
          key: `/${role}/promotion/coupon`,
        },
      ],
    },
    {
      label: "CMS",
      key: "cms",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/cms/page`}>Pages</Link>,
          key: `/${role}/cms/page`,
        },
      ],
    },
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label: "Control",
      key: "control",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/control/admin`}>Manage Admin</Link>,
          icon: <TableOutlined />,
          key: `/${role}/control/admin`,
        },
        {
          label: (
            <Link href={`/${role}/control/customer`}>Manage Customer</Link>
          ),
          icon: <TableOutlined />,
          key: `/${role}/control/customer`,
        },
      ],
    },
    {
      label: "Manage permission",
      key: "manage-permission",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/permission`}>View permissions</Link>,
          key: `/${role}/permission`,
        },
      ],
    },
    {
      label: "Management",
      key: "management",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: (
            <Link href={`/${role}/management/department`}>Department</Link>
          ),
          key: `/${role}/management/department`,
        },
      ],
    },
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
