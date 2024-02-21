"use client";
import ActionBar from "@/components/ui/ActionBar";
import SEBreadCrumb from "@/components/ui/SEBreadCrumb";
import SEModal from "@/components/ui/SEModal";
import SETable from "@/components/ui/SETable";
import {
  useAttributesQuery,
  useDeleteAttributeMutation,
} from "@/redux/api/attributeApi";
import { useDebounced } from "@/redux/hook";
import { IAttributeGroup } from "@/types";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, message } from "antd";
import Link from "next/link";
import { useState } from "react";

const AttributePage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [attributeId, setAttributeId] = useState<string>("");

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

  const { data, isLoading } = useAttributesQuery({ ...query });
  const [deleteAttribute] = useDeleteAttributeMutation();
  const attributes = data?.attributes;
  const meta = data?.meta;

  const columns = [
    {
      title: "Attribute Name",
      dataIndex: "attribute_name",
      sorter: true,
    },
    {
      title: "Attribute Code",
      dataIndex: "attribute_code",
      sorter: true,
    },
    {
      title: "Attribute Group Name",
      dataIndex: "attribute_group",
      sorter: true,
      render: function (data: IAttributeGroup) {
        const attName = `${data?.group_name}`;
        return <>{attName}</>;
      },
    },
    {
      title: "Attribute Type",
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
            <Link href={`/admin/catalog/attribute/details/${data}`}>
              <Button onClick={() => console.log(data)} type="primary">
                <EyeOutlined />
              </Button>
            </Link>
            <Link href={`/admin/catalog/attribute/edit/${data}`}>
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
                setAttributeId(data);
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
      const res = await deleteAttribute(id);
      if (res) {
        message.success("Attribute Successfully Deleted!");
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
            label: "attribute",
            link: `/admin/catalog/attribute`,
          },
        ]}
      />
      <ActionBar title="attribute list">
        <Link href="/admin/catalog/attribute/create">
          <Button type="primary">create attribute</Button>
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
        dataSource={attributes}
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
        handleOk={() => deleteOne(attributeId)}
      >
        <p className="my-5">Do you want to remove this admin?</p>
      </SEModal>
    </>
  );
};

export default AttributePage;
