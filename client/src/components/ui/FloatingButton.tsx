import { CommentOutlined, CustomerServiceOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import React, { useState } from "react";
import SEModal from "./SEModal";
import { useRouter } from "next/navigation";

const FloatingButton = () => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{ right: 94 }}
        icon={<CustomerServiceOutlined />}
      >
        <FloatButton
          onClick={() => {
            setOpen(true);
          }}
        />

        <FloatButton icon={<CommentOutlined />} />
      </FloatButton.Group>

      <SEModal
        title="Do you want login as an Admin and explore the functionality?"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => {
          router.push(`/account/login`);
        }}
      >
        <div>
          <p className="my-5">
            Admin Email: <strong>abcd@gmail.com</strong>
          </p>
          <p className="my-5">
            Admin Password: <strong>123456</strong>
          </p>
        </div>
      </SEModal>
    </>
  );
};

export default FloatingButton;
