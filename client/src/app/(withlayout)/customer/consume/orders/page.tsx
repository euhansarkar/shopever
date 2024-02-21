"use client";
import ActionBar from "@/components/ui/ActionBar";
import SEBreadCrumb from "@/components/ui/SEBreadCrumb";
import SEModal from "@/components/ui/SEModal";
import SETable from "@/components/ui/SETable";
import { useDeleteOrderMutation, useOrdersQuery } from "@/redux/api/orderApi";
import { useDebounced } from "@/redux/hook";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, message } from "antd";
import Link from "next/link";
import { useState } from "react";

const OrderPage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [ordersId, setordersId] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  const { data, isLoading } = useOrdersQuery({ ...query });
  const [deleteorders] = useDeleteOrderMutation();
  const orderss = data?.orders;
  const meta = data?.meta;

  const columns = [
    {
      title: "orders Name",
      dataIndex: "orders_name",
      sorter: true,
    },
    {
      title: "orders Code",
      dataIndex: "orders_code",
      sorter: true,
    },
    {
      title: "orders Group Name",
      dataIndex: "orders_group",
      sorter: true,
      render: function (data: any) {
        const attName = `${data?.group_name}`;
        return <>{attName}</>;
      },
    },
    {
      title: "orders Type",
      dataIndex: "type",
      sorter: true,
    },
    {
      title: "Is Required?",
      dataIndex: "is_required",
      render: function (data: boolean) {
        const requiredType = data ? "Yes" : "No";
        return <>{requiredType}</>;
      },
      sorter: true,
    },
    {
      title: "Is Filterable?",
      dataIndex: "is_filterable",
      render: function (data: boolean) {
        const filterAbleType = data ? "Yes" : "No";
        return <>{filterAbleType}</>;
      },
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "id",
      render: function (data: any) {
        return (
          <>
            <Link href={`/customer/catalog/orders/details/${data}`}>
              <Button onClick={() => console.log(data)} type="primary">
                <EyeOutlined />
              </Button>
            </Link>
            <Link href={`/customer/catalog/orders/edit/${data}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                onClick={() => console.log(data)}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>
            <Button
              type="primary"
              onClick={() => {
                setOpen(true);
                setordersId(data);
              }}
              danger
              style={{ marginLeft: "3px" }}
            >
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  const deleteOne = async (id: string) => {
    try {
      console.log(id);
      const res = await deleteorders(id);
      if (res) {
        message.success("orders Successfully Deleted!");
        setOpen(false);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <>
      <SEBreadCrumb
        items={[
          {
            label: `customer`,
            link: `/customer`,
          },
          {
            label: "orders",
            link: `/customer/catalog/orders`,
          },
        ]}
      />
      <ActionBar title="orders list">
        <Link href="/customer/catalog/orders/create">
          <Button type="primary">create orders</Button>
        </Link>
        {(!!sortBy || !!sortOrder || !!searchTerm) && (
          <Button
            onClick={resetFilters}
            type="primary"
            style={{ margin: "0px 5px" }}
          >
            <ReloadOutlined />
          </Button>
        )}
      </ActionBar>

      <SETable
        loading={isLoading}
        columns={columns}
        dataSource={orderss}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />

      <SEModal
        title="Remove customer"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteOne(ordersId)}
      >
        <p className="my-5">Do you want to remove this customer?</p>
      </SEModal>
    </>
  );
};

export default OrderPage;
