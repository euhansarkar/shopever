"use client";
import Form from "@/components/Forms/Form";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Col, Row, message } from "antd";
import FormHybridInput from "../Forms/FormHybridInput";
import { useAddAttributeGroupMutation } from "@/redux/api/attributeGroupApi";

type FormValues = {
  group_name: string;
};

const AttributeGroupPage = () => {
  const [addAttributeGroup] = useAddAttributeGroupMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await addAttributeGroup(data).unwrap();

      if(res?.id){
        message.success("attribute group created!");
      }
      
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
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
        Attribute Group Creation
      </p>
      <Form submitHandler={onSubmit}>
        <Row style={{ margin: "10px 0px" }}>
          <Col span={24}>
            <FormHybridInput
              type="text"
              name="group_name"
              size="large"
              label="Attribute Group Name"
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AttributeGroupPage;
