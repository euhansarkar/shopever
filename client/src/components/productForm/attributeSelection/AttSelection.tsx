import { Button, Empty, Switch } from "antd";
import { useFieldArray, useFormContext } from "react-hook-form";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormInput from "@/components/Forms/FormInput";
import UncontrolledFormInput from "@/components/Forms/UncontrolledFormInput";

type DynamicInputProps = {
  name: string;
  subName: string;
  size: "small" | "middle" | "large";
  placeholder: string;
  label: string;
  id: string;
};

const FormDynamicFields = ({
  name,
  subName,
  size,
  placeholder,
  label,
  id,
}: DynamicInputProps) => {
  const { control, setValue, getValues } = useFormContext();
  let { fields, append, remove } = useFieldArray({
    control,
    name: name,
    keyName: "customId",
  });

  const handleSwitchToggle = (index: number, isChecked: boolean) => {
    const currentOptions = getValues(name);
    currentOptions[index].is_deleted = isChecked;
    setValue(name, currentOptions);
  };

  fields = fields?.filter(
    (field: any) => field?.attribute_group_id === id
  );

  const attributeOptions = fields?.map((group: any) => ({
    label: group?.attribute_name,
    value: group?.id,
  }));

  console.log(`this data is from att selection`, fields);

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
                <FormSelectField
                  name={`${name}.${index}.${subName}`}
                  size={size}
                  placeholder={`${placeholder}: ${index}`}
                  options={attributeOptions!}
                />

                {/* <UncontrolledFormInput
                  type="text"
                  name="attribute_name"
                  size="large"
                  label="Attribute Name"
                  defaultValue={item?.attribute_code}
                /> */}

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
