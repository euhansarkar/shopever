"use client";
import ActionBar from "@/components/ui/ActionBar";
import SEBreadCrumb from "@/components/ui/SEBreadCrumb";
import SEModal from "@/components/ui/SEModal";
import SETable from "@/components/ui/SETable";
import {
  useCategoriesQuery,
  useDeleteCategoryMutation,
} from "@/redux/api/categoryApi";
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

const CategoryPage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [CategoryId, setCategoryId] = useState<string>("");

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

  const { data, isLoading } = useCategoriesQuery({ page: 1, limit: 10 });
  const [deleteCategory] = useDeleteCategoryMutation();
  const categories = data?.categories;
  const meta = data?.meta;

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: true,
      render: function (data: boolean) {
        const status = data ? "Live" : "Not-Live";
        return <>{status}</>;
      },
    },
    {
      title: "Include In Menu",
      dataIndex: "include_in_nav",
      sorter: true,
      render: function (data: boolean) {
        const isAddedInNav = data ? "Yes" : "No";
        return <>{isAddedInNav}</>;
      },
    },
    {
      title: "Action",
      dataIndex: "id",
      render: function (data: any) {
        return (
          <>
            <Link href={`/admin/catalog/collection/details/${data}`}>
              <Button onClick={() => console.log(data)} type="primary">
                <EyeOutlined />
              </Button>
            </Link>
            <Link href={`/admin/catalog/collection/edit/${data}`}>
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
                setCategoryId(data);
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
      const res = await deleteCategory(id);
      if (res) {
        message.success("Category Successfully Deleted!");
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
            label: `admin`,
            link: `/admin`,
          },
          {
            label: "collection",
            link: `/admin/catalog/collection`,
          },
        ]}
      />
      <ActionBar title="category list">
        <Link href="/admin/catalog/collection/create">
          <Button type="primary">create Category</Button>
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
        dataSource={categories}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />

      <SEModal
        title="Remove admin"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteOne(CategoryId)}
      >
        <p className="my-5">Do you want to remove this admin?</p>
      </SEModal>
    </>
  );
};

export default CategoryPage;
