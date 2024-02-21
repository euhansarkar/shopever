"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormInputNumber from "@/components/Forms/FormInputNumber";
import FormRadioField from "@/components/Forms/FormRadioField";
import FormSelectField from "@/components/Forms/FormSelectField";
import ActionBar from "@/components/ui/ActionBar";
import SEBreadCrumb from "@/components/ui/SEBreadCrumb";
import SEUpload from "@/components/ui/SEUpload";
import { filterableOptions, myOptions } from "@/constants/global";
import { useAddCategoryMutation } from "@/redux/api/categoryApi";
import { Button, Col, Row, Space, message } from "antd";
import { useState } from "react";
import FormDynamicInputField from "@/components/ui/FormDynamicInputField";
import dynamic from "next/dynamic";
const RichTextEditor = dynamic(
  () => import("@/components/editor/RichTextEditor"),
  { ssr: false }
);

const CategoryCreationPage = () => {
  const [isRequired, setIsRequired] = useState<string | undefined>(undefined);
  const [isFilterable, setIsFilterable] = useState<string | undefined>(
    undefined
  );
  const [addCategory] = useAddCategoryMutation();

  const handleOnSubmit = async (values: any) => {
    const obj = { ...values };
    const file = obj["file"];
    delete obj["file"];
    const data = JSON.stringify(obj);
    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("data", data);
    message.loading("Creating...");

    try {
      const res = await addCategory(formData).unwrap();
      if (res?.id) {
        message.success(`category created successfully`);
      }
    } catch (error: any) {
      console.error(error.message);
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
            label: "category",
            link: `/admin/catalog/category`,
          },
          {
            label: "create",
            link: `/admin/catalog/category/create`,
          },
        ]}
      />
      <ActionBar title="category creation" />

      <Form submitHandler={handleOnSubmit}>
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
                <div>
                  <div style={{ margin: "10px 0px" }}>
                    <FormInput
                      type="text"
                      name="name"
                      size="large"
                      label="Category Name"
                    />
                  </div>
                  <div style={{ margin: "10px 0px", flexBasis: "50%" }}>
                    <FormSelectField
                      size="large"
                      name="parent_id"
                      options={myOptions}
                      label="Parent Id"
                      placeholder="Select"
                    />
                  </div>
                  <div style={{ margin: "10px 0px", flexBasis: "50%" }}>
                    <RichTextEditor
                      styles={{
                        backgroundColor: "white",
                        borderRadius: "10px",
                      }}
                      label="Description"
                      name="description"
                    />
                  </div>
                </div>
              </div>
            </div>
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
                  Search Engine Optimize
                </p>
                <div>
                  <div style={{ margin: "10px 0px" }}>
                    <FormInput
                      type="text"
                      name="metaSEO.parent_id"
                      size="large"
                      label="Parent ID"
                    />
                  </div>
                  <div style={{ margin: "10px 0px" }}>
                    <FormInput
                      type="text"
                      name="metaSEO.url_key"
                      size="large"
                      label="Url Key"
                    />
                  </div>
                  <div style={{ margin: "10px 0px", flexBasis: "50%" }}>
                    <FormInput
                      type="text"
                      name="metaSEO.meta_title"
                      size="large"
                      label="Meta Title"
                    />
                  </div>
                  <div style={{ margin: "10px 0px", flexBasis: "50%" }}>
                    <FormInput
                      type="text"
                      name="metaSEO.meta_description"
                      size="large"
                      label="Meta Description"
                    />
                  </div>
                  <div style={{ margin: "10px 0px", flexBasis: "50%" }}>
                    <FormDynamicInputField
                      name="keywords"
                      subName="name"
                      label="Category Keywords"
                      placeholder="keyword name"
                      size="middle"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Col>

          {/* second col */}
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
              <p
                style={{
                  fontSize: "18px",
                  marginBottom: "10px",
                }}
              >
                Setting
              </p>
              <div>
                {/* add image component here */}
                <SEUpload name="file" />
              </div>
            </div>
            <div
              style={{
                border: "1px solid #d9d9d9",
                borderRadius: "5px",
                padding: "15px",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              <p
                style={{
                  fontSize: "18px",
                  marginBottom: "10px",
                }}
              >
                Setting
              </p>
              <div>
                <div style={{ margin: "10px 0px" }}>
                  <FormRadioField
                    size="large"
                    name="status"
                    options={filterableOptions}
                    label="Status"
                    onValueChange={(value) => setIsRequired(value)}
                  />
                </div>
                <div style={{ margin: "10px 0px" }}>
                  <FormRadioField
                    size="large"
                    name="include_in_nav"
                    options={filterableOptions}
                    label="Include In Nav?"
                    onValueChange={(value) => setIsFilterable(value)}
                  />
                </div>
                <div style={{ margin: "10px 0px" }}>
                  <FormInputNumber
                    max={10}
                    min={3}
                    styles={{ width: "100%" }}
                    name="position"
                    size="large"
                    label="Position"
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          submit
        </Button>
      </Form>
    </>
  );
};

export default CategoryCreationPage;
