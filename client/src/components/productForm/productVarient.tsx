import FormSelectField from "@/components/Forms/FormSelectField";
import SEUpload from "@/components/ui/SEUpload";
import { useAttributeGroupsQuery } from "@/redux/api/attributeGroupApi";
import { Col, Row } from "antd";
import { useState } from "react";
import AttSelection from "./attributeSelection/AttSelection";
import UncontrolledAttSelection from "./attributeSelection/UncontrolledAttSelection";

const ProductVarient = () => {
  const [selectedAttributeOption, setSelectedAttributeOption] = useState<
    string | undefined
  >(undefined);
  const { data, isLoading } = useAttributeGroupsQuery({ page: 1, limit: 100 });
  const attributeGroups = data?.attributeGroups;
  const attributeGroupOptions = attributeGroups?.map((group) => ({
    label: group?.group_name,
    value: group?.id,
  }));

  console.log(attributeGroupOptions);

  console.log(`attribute group selected`, selectedAttributeOption);

  return (
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
              Varients
            </p>
            <div>
              <div style={{ margin: "10px 0px", flexBasis: "50%" }}>
                <FormSelectField
                  size="large"
                  options={attributeGroupOptions!}
                  label="Attribute Group"
                  placeholder="Select"
                  onSelectedValueChange={(value) =>
                    setSelectedAttributeOption(value)
                  }
                  selectedValue={selectedAttributeOption}
                  name="attribute_group_id"
                />
              </div>

              {/* you have to modify here */}
              {selectedAttributeOption && (
                <div style={{ margin: "10px 0px", flexBasis: "50%" }}>
                  {/* <AttributeSelection id={selectedAttributeOption} /> */}
                  {/* <AttSelection
                    id={selectedAttributeOption}
                    name="product_attributes"
                    subName="attribute_id"
                    label="Product Attributes"
                    placeholder="product attribute option"
                    size="middle"
                  /> */}
                  <UncontrolledAttSelection id={selectedAttributeOption} />
                </div>
              )}
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
              Media
            </p>
            <div>
              <div style={{ margin: "10px 0px", flexBasis: "50%" }}>
                <SEUpload name="file" />
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ProductVarient;
