"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormInputNumber from "@/components/Forms/FormInputNumber";
import FormRadioField from "@/components/Forms/FormRadioField";
import FormSelectField from "@/components/Forms/FormSelectField";
import ActionBar from "@/components/ui/ActionBar";
import SEBreadCrumb from "@/components/ui/SEBreadCrumb";
import SEUpload from "@/components/ui/SEUpload";
import { filterableOptions } from "@/constants/global";
import { useAddAttributeMutation } from "@/redux/api/attributeApi";
import { useAttributeGroupsQuery } from "@/redux/api/attributeGroupApi";
import { Button, Col, Row, Space, message } from "antd";
import dynamic from "next/dynamic";
const RichTextEditor = dynamic(
  () => import("@/components/editor/RichTextEditor"),
  { ssr: false }
);

const AttributeCreationPage = () => {
  const [addAttribute] = useAddAttributeMutation();
  const { data, isLoading } = useAttributeGroupsQuery({ page: 1, limit: 100 });
  const attributeGroups = data?.attributeGroups;
  const attributeGroupOptions = attributeGroups?.map((group) => ({
    label: group?.group_name,
    value: group?.id,
  }));

  const handleOnSubmit = async (data: any) => {
    try {
      console.log(data);
      const res = await addAttribute(data).unwrap();
      console.log(res);

      if (res?.id) {
        message.success(`attribute created successfully`);
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
            label: "collection",
            link: `/admin/catalog/collection`,
          },
          {
            label: "create",
            link: `/admin/catalog/collection/create`,
          },
        ]}
      />
      <ActionBar title="attribute creation" />

      <Form submitHandler={handleOnSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={24} style={{ margin: "10px 0" }}>
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
                      name="collection_name"
                      size="large"
                      label="Collection Name"
                    />
                  </div>
                  <div style={{ margin: "10px 0px", flexBasis: "50%" }}>
                    <div style={{ margin: "10px 0px" }}>
                      <FormInput
                        type="text"
                        name="collection_code"
                        size="large"
                        label="Collection Code"
                      />
                    </div>
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
          </Col>

          {/* second col */}
        </Row>
        <Button type="primary" htmlType="submit">
          submit
        </Button>
      </Form>
    </>
  );
};

export default AttributeCreationPage;
