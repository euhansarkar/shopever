import { useAttributeGroupQuery } from "@/redux/api/attributeGroupApi";
import { useProductQuery } from "@/redux/api/productApi";
import {
  useUpdateVarientMutation,
  useVarientQuery,
  useVarientsQuery,
} from "@/redux/api/varientApi";
import { useDebounced } from "@/redux/hook";
import { IAttribute } from "@/types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, Row, message } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import Form from "../Forms/Form";
import FormInput from "../Forms/FormInput";
import FormInputNumber from "../Forms/FormInputNumber";
import FormSelectField from "../Forms/FormSelectField";
import SESwitch from "../ui/SESwitch";
import SETable from "../ui/SETable";
import SEUpload from "../ui/SEUpload";
import SEVarientModal from "./SEVarientModal";

const VarientView = ({ id }: { id: string }) => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [productId, setProductId] = useState<string>("");
  const [varientId, setVarientId] = useState<string>("");

  useEffect(() => {
    setProductId(id);
  }, [id]);

  query["page"] = page;
  query["limit"] = size;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["product_id"] = productId;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  // update api
  const [updateVarient] = useUpdateVarientMutation();

  // get single product
  const { data: productData, isLoading: productLoading } = useProductQuery(id);

  // get all varients
  const { data, isLoading } = useVarientsQuery({
    ...query,
  });
  const varients = data?.varients;
  const meta = data?.meta;

  // get all attribute groups
  const { data: attData, isLoading: loading } = useAttributeGroupQuery(
    productData?.attribute_group_id
  );
  const attributes = attData?.attributes;

  // get one varient
  const { data: varientData, isLoading: varientLoading } =
    useVarientQuery(varientId);

  const defaultValues = {
    sku: varientData?.sku || "",
    qty: varientData?.qty || "",
    price: varientData?.price || "",
    weight: varientData?.weight || "",
    status: varientData?.status || false,
    visibility: varientData?.visibility || false,
    images: varientData?.images || "",
  };

  const defaultImages = varientData?.images?.map((img: any) => {
    const { id, image_url } = img;
    const newImg = {
      uid: id,
      url: image_url,
      name: "image.png",
      status: "done",
    };
    return newImg;
  });

  // const dynamicColumns = varients?.varient_options?.map((varient: IVarientOption) => {
  //   if (varient && varient.attribute_name && varient.option_id) {
  //     return { title: varient.attribute_name, dataIndex: varient.option_id };
  //   } else {
  //     return null;
  //   }
  // });

  const columns = [
    {
      title: "SKU",
      dataIndex: "sku",
    },
    {
      title: "Quantity",
      dataIndex: "qty",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Weight",
      dataIndex: "weight",
    },
    {
      title: "Action",
      dataIndex: "id",
      render: function (data: any) {
        return (
          <>
            <Link href={`/admin/catalog/product/edit/${data}`}>
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
                setVarientId(data);
                console.log(data);
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

  const handleOnSubmit = async (values: any) => {
    const obj = { ...values };
    const files = obj["file"];
    delete obj["file"];

    // data modification
    const {
      price,
      qty,
      sku,
      status,
      visibility,
      weight,
      images,
      file,
      ...attributeData
    } = obj;
    const attArr = [];
    for (const att in attributeData) {
      const newData = { attribute_name: att, option_id: attributeData[att] };
      attArr.push(newData);
    }

    const newData = {
      price,
      qty,
      sku,
      status,
      visibility,
      weight,
      varient_options: attArr,
    };

    console.log(`varient data`, newData);

    const data = JSON.stringify(newData);
    const formData = new FormData();
    formData.append("file", files as Blob);
    formData.append("data", data);
    message.loading("Creating...");

    try {
      const res = await updateVarient({
        id: varientId,
        body: formData,
      }).unwrap();
      if (res?.id) {
        message.success(`varient updated successfully`);
        setOpen(false);
      }
    } catch (error: any) {
      console.error(error.message);
      setOpen(false);
    }
  };

  return (
    <>
      <SETable
        loading={isLoading}
        columns={columns}
        dataSource={varients}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />

      <SEVarientModal
        title="Add Varient"
        isOpen={open}
        closeModal={() => setOpen(false)}
      >
        <div style={{ width: "100%" }}>
          <Form submitHandler={handleOnSubmit} defaultValues={defaultValues}>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col span={16} style={{ margin: "10px 0" }}>
                <div
                  style={{
                    border: "1px solid #d9d9d9",
                    borderRadius: "5px",
                    padding: "15px",
                    marginBottom: "10px",
                    marginTop: "10px",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: "18px",
                        marginBottom: "10px",
                      }}
                    >
                      General
                    </p>
                    {attributes && (
                      <div>
                        {attributes?.map((attribute: IAttribute) => {
                          const attributeGroups = attribute?.attribute_options;
                          const attributeGroupOptions = attributeGroups?.map(
                            (group) => ({
                              label: group?.option_text,
                              value: group?.id,
                            })
                          );

                          return (
                            <div
                              key={attribute?.id}
                              style={{ margin: "10px 0px", flexBasis: "33%" }}
                            >
                              <FormSelectField
                                size="large"
                                name={attribute?.attribute_name}
                                options={attributeGroupOptions!}
                                label={attribute?.attribute_name}
                                placeholder="Select"
                              />
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <div style={{ margin: "10px 0px", flexBasis: "33%" }}>
                      <FormInput
                        type="text"
                        styles={{ width: "100%" }}
                        name="sku"
                        size="large"
                        label="SKU"
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ margin: "10px 0px", flexBasis: "33%" }}>
                        <FormInputNumber
                          styles={{ width: "100%" }}
                          name="qty"
                          size="large"
                          label="Quantity"
                        />
                      </div>
                      <div style={{ margin: "10px 0px", flexBasis: "33%" }}>
                        <FormInputNumber
                          styles={{ width: "100%" }}
                          name="price"
                          size="large"
                          label="Price"
                        />
                      </div>
                      <div style={{ margin: "10px 0px", flexBasis: "33%" }}>
                        <FormInputNumber
                          styles={{ width: "100%" }}
                          name="weight"
                          size="large"
                          label="Weight"
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ margin: "10px 0px", flexBasis: "33%" }}>
                        <SESwitch
                          name="status"
                          size="small"
                          label="Status"
                          defaultChecked={true}
                        />
                      </div>
                      <div style={{ margin: "10px 0px", flexBasis: "33%" }}>
                        <SESwitch
                          name="visibility"
                          size="small"
                          label="Visibility"
                          defaultChecked={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col span={8} style={{ margin: "10px 0" }}>
                <div
                  style={{
                    border: "1px solid #d9d9d9",
                    borderRadius: "5px",
                    padding: "15px",
                    marginBottom: "10px",
                    marginTop: "10px",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: "18px",
                        marginBottom: "10px",
                      }}
                    >
                      Images
                    </p>
                    <div>
                      {/* if multiple image upload completed without error then add here instead of single upload */}
                      {/* <SEMultipleUpload name="files" images={defaultImages} /> */}
                      <SEUpload name="file" />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Button type="primary" htmlType="submit">
              submit
            </Button>
          </Form>
        </div>
      </SEVarientModal>
    </>
  );
};

export default VarientView;
