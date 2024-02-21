/* eslint-disable jsx-a11y/alt-text */
import { IVariant } from "@/types";
import { Col, Image } from "antd";
import { useEffect, useState } from "react";

type IGallary = {
  varients: IVariant[];
};

const ProductImage = ({ varients }: IGallary) => {
  const allImages = varients?.map((item: { images: any }) => item.images);
  const flattenedImages = allImages?.flat();

  const [selectedImage, setSelectedImage] = useState(
    flattenedImages?.length > 0 ? flattenedImages[0] : null
  );

  useEffect(() => {
    if (flattenedImages?.length > 0 && selectedImage === null) {
      setSelectedImage(flattenedImages[0]);
    } else if (flattenedImages?.length > 0 && selectedImage !== null) {
      setSelectedImage(selectedImage);
    }
  }, [flattenedImages, selectedImage]);

  const handleImageChange = (img: any) => {
    setSelectedImage(img);
  };

  return (
    <Col span={12} style={{ margin: "10px 0" }}>
      <Image width="100%" src={selectedImage?.image_url} />

      <div style={{ margin: "10px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {flattenedImages?.length > 0 &&
            flattenedImages?.map((img, index) => (
              <Image
                preview={false}
                key={img.id}
                width={50}
                src={img?.image_url}
                onClick={() => handleImageChange(img)}
              />
            ))}
        </div>
      </div>
    </Col>
  );
};

export default ProductImage;
