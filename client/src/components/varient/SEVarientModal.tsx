import { Modal } from "antd";
import { ReactElement, ReactNode } from "react";

interface IModal {
  isOpen: boolean;
  closeModal: () => void;
  title: string | ReactNode;
  children: ReactElement;
  handleOk?: () => void;
  showCancelButton?: boolean;
  showOkButton?: boolean;
}

const SEVarientModal = ({
  isOpen,
  closeModal,
  title,
  children,
  handleOk,
  showCancelButton = true,
  showOkButton = true,
}: IModal) => {
  return (
    <Modal
      footer={null}
      title={title}
      open={isOpen}
      onOk={handleOk}
      width={800}
      onCancel={closeModal}
      cancelButtonProps={{
        style: { display: showCancelButton ? "inline" : "none" },
      }}
      okButtonProps={{ style: { display: showOkButton ? "inline" : "none" } }}
    >
      {children}
    </Modal>
  );
};

export default SEVarientModal;
