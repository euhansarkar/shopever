import FormInput from "@/components/Forms/FormInput";
import UncontrolledFormInput from "@/components/Forms/UncontrolledFormInput";
import { useAttributeGroupQuery } from "@/redux/api/attributeGroupApi";
import React from "react";

const UncontrolledAttSelection = ({ id }: { id: string }) => {
  const { data, isLoading } = useAttributeGroupQuery(id);
  const attributes = data?.attributes;
  console.log(attributes);

  return (
    <div>
      {attributes?.map((attribute: any) => (
        <>
          <UncontrolledFormInput
            type="text"
            name="attribute_code"
            size="large"
            label="Attribute Code"
            defaultValue={attribute?.attribute_code}
          />
        </>
      ))}
    </div>
  );
};

export default UncontrolledAttSelection;
