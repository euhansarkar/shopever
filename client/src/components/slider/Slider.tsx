import React from "react";
import { Carousel } from "antd";
import img1 from "@/assets/images/image_1.jpg";
import img2 from "@/assets/images/image_2.jpg";
import img3 from "@/assets/images/image_3.jpg";
import img4 from "@/assets/images/image_4.jpg";
import img5 from "@/assets/images/image_5.jpg";
import Image from "next/image";

const contentStyle: React.CSSProperties = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const images = [
  {
    img: img1,
    content: `this is first image`,
  },
  {
    img: img2,
    content: `this is second image`,
  },
  {
    img: img3,
    content: `this is third image`,
  },
  {
    img: img4,
    content: `this is forth image`,
  },
  {
    img: img5,
    content: `this is fifth image`,
  },
];

const Slider: React.FC = () => (
  <Carousel autoplay>
    {images.map((img, i) => (
      <div key={i}>
        {/* <h3 style={contentStyle}>1</h3> */}
        <Image src={img.img} alt={img.content} height={450} width={1400} />
      </div>
    ))}
  </Carousel>
);

export default Slider;
