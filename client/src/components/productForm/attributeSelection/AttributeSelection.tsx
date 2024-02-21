import FormInputNumber from "@/components/Forms/FormInputNumber";
import { useAttributeGroupQuery } from "@/redux/api/attributeGroupApi";
import { CheckOutlined, CloseOutlined, DownOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { Switch, Table } from "antd";
import React from "react";

interface Attribute {
  id: string;
  attribute_name: string;
  attribute_code: string;
  type: string;
  is_required: boolean;
  display_on_frontend: boolean;
  is_filterable: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  attribute_group_id: string;
  attribute_options: AttributeOption[];
}

interface AttributeOption {
  id: string;
  option_text: string;
  attribute_id: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

const items = [
  { key: "1", label: "Action 1" },
  { key: "2", label: "Action 2" },
];

const AttributeSelection = ({ id }: { id: string }) => {
  const { data: attData, isLoading } = useAttributeGroupQuery(id);
  const attributes = attData?.attributes;

  const columns: TableColumnsType<Attribute> = [
    {
      title: "Attribute Name",
      dataIndex: "attribute_name",
      key: "attribute_name",
    },
    {
      title: "Attribute Code",
      dataIndex: "attribute_code",
      key: "attribute_code",
    },
    { title: "type", dataIndex: "type", key: "type" },
  ];

  const expandedRowRender = (record: Attribute) => {
    const optionColumns: TableColumnsType<AttributeOption> = [
      { title: "Option Text", dataIndex: "option_text", key: "option_text" },
      {
        title: "Action",
        dataIndex: "operation",
        key: "operation",
        render: () => (
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked
          />
        ),
      },
      {
        title: "Extra Price",
        dataIndex: "operation2",
        key: "operation",
        render: () => (
          <FormInputNumber
            name="extra_price"
            max={10}
            min={3}
            styles={{ width: "30%" }}
            size="large"
          />
        ),
      },
    ];

    const optionData: AttributeOption[] = record.attribute_options;

    return (
      <Table
        columns={optionColumns}
        dataSource={optionData}
        pagination={false}
      />
    );
  };

  return (
    <>
      hello
      <Table
        columns={columns}
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: attributes?.map(
            (attribute: Attribute) => attribute.id
          ),
        }}
        dataSource={attributes}
        size="middle"
      />
    </>
  );
};

export default AttributeSelection;
