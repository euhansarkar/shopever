import { Button, Empty, Switch } from "antd";
import { useFieldArray, useFormContext } from "react-hook-form";
import FormInput from "../Forms/FormInput";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

type DynamicInputProps = {
  name: string;
  subName: string;
  size: "small" | "middle" | "large";
  placeholder: string;
  label: string;
};

const FormDynamicFields = ({
  name,
  subName,
  size,
  placeholder,
  label,
}: DynamicInputProps) => {
  const { control, setValue, getValues } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
    keyName: "customId",
  });

  const handleSwitchToggle = (index: number, isChecked: boolean) => {
    const currentOptions = getValues(name);
    currentOptions[index].is_deleted = isChecked;
    setValue(name, currentOptions);
  };

  return (
    <>
      <div>
        <p
          style={{
            fontSize: "14px",
            marginBottom: "10px",
          }}
        >
          {label}
        </p>
        {fields.length > 0 ? (
          fields.map((item, index) => {
            return (
              <div
                key={item.customId}
                style={{
                  display: "flex",
                  marginTop: "10px",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <FormInput
                  type="text"
                  name={`${name}.${index}.${subName}`}
                  size={size}
                  placeholder={`${placeholder}: ${index}`}
                  label={""}
                />

                <Button
                  type="primary"
                  onClick={() => remove(index)}
                  danger
                  style={{ margin: "5px 0px" }}
                  size={size}
                >
                  Delete
                </Button>

                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  //@ts-ignore
                  defaultChecked={fields[index].is_deleted === true}
                  onChange={(isChecked) => handleSwitchToggle(index, isChecked)}
                />
              </div>
            );
          })
        ) : (
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{ height: 60 }}
            description={<span>Attribute Options Not Found</span>}
          />
        )}
      </div>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <Button
          style={{ marginTop: "10px" }}
          type="primary"
          onClick={() =>
            append({
              is_deleted: false,
            })
          }
        >
          Add New Option
        </Button>
      </div>
    </>
  );
};

export default FormDynamicFields;
