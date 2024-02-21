/* eslint-disable @next/next/no-img-element */
"use client";
import { useCategoriesQuery } from "@/redux/api/categoryApi";
import { Button, Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import FloatingButton from "../ui/FloatingButton";

const CategoryPage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(3);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const { data, isLoading } = useCategoriesQuery({ ...query });
  const categories = data?.categories;

  return (
    <div style={{ margin: "14px 0" }}>
      <Row justify="center" align="middle">
        {categories?.map((category) => (
          <Col
            style={{ margin: "12px" }}
            key={category.id}
            xs={24}
            sm={12}
            md={8}
            lg={6}
          >
            <Card
              hoverable
              style={{ width: "100%", padding: "20px" }}
              cover={
                category.images[0] &&
                typeof category.images[0].image_url === "string" ? (
                  <img
                    alt="example"
                    src={category.images[0].image_url}
                    height={340}
                  />
                ) : (
                  <div>No Image</div>
                )
              }
            >
              <Meta
                title={category.name}
                description={
                  category?.description?.length > 50
                    ? category?.description.slice(0, 50)
                    : category?.description
                }
              />
              <Link href={`/categories/${category.name}`}>
                <Button style={{ margin: "10px 0" }} type="primary">
                  Shop {category?.name}
                </Button>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
      <FloatingButton />
    </div>
  );
};

export default CategoryPage;
