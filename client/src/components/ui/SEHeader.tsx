import { Avatar, Button, Dropdown, Layout, MenuProps, Row, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { AUTH_KEY } from "@/constants/storageKey";
const { Header: AntHeader } = Layout;

const SEHeader = () => {
  const router = useRouter();

  const logOut = () => {
    removeUserInfo(AUTH_KEY);
    router.push("/account/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Button onClick={logOut} type="text" danger>
          Logout
        </Button>
      ),
    },
  ];
  const { role } = getUserInfo() as any;
  return (
    <AntHeader
      style={{
        background: "#fff",
      }}
    >
      <Row
        justify="end"
        align="middle"
        style={{
          height: "100%",
        }}
      >
        <p
          style={{
            margin: "0px 5px",
          }}
        >
          {role}
        </p>
        <Dropdown menu={{ items }}>
          <Space wrap size={16}>
            <Avatar size="large" icon={<UserOutlined />} />
          </Space>
        </Dropdown>
      </Row>
    </AntHeader>
  );
};

export default SEHeader;
