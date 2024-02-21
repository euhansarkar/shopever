"use client";
import { Button, Col, Input, Row, message } from "antd";
import loginImage from "../../assets/login-image.png";
import Image from "next/image";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/schema/login";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { Country } from "country-state-city";
import FormSelectCountryField from "../csc/FormSelectCountryField";
import { useAddCustomerMutation } from "@/redux/api/customerApi";

type FormValues = {
  email: string;
  password: string;
};

const RegisterPage = () => {
  const [addCustomer] = useAddCustomerMutation();
  const router = useRouter();

  // console.log(isLoggedIn());

  // get countries
  const countries = Country?.getAllCountries();
  const countriesOptions = countries?.map((c) => ({
    label: c?.name,
    value: c?.isoCode,
  }));

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      console.log(`register data`, data);
      const res = await addCustomer({ ...data }).unwrap();
      console.log(`data of user`, res);
      if (res?.id) {
        router.push("/account/login");
        message.success("User Created successfully!");
      }
      console.log(res);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "80vh",
      }}
    >
      <Col sm={12} md={16} lg={10}>
        <Image src={loginImage} width={500} alt="login image" />
      </Col>
      <Col sm={12} md={8} lg={8}>
        <h1
          style={{
            margin: "15px 0px",
          }}
        >
          Create your account
        </h1>
        <div>
          {/* @ts-ignore */}
          <Form submitHandler={onSubmit} yupResolver={yupResolver(loginSchema)}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <div>
                <FormInput
                  name="name.first_name"
                  type="text"
                  size="large"
                  label="First Name"
                  placeholder="Your First Name"
                  required
                />
              </div>
              <div>
                <FormInput
                  name="name.last_name"
                  type="text"
                  size="large"
                  label="Last Name"
                  placeholder="Your Last Name"
                  required
                />
              </div>
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="email"
                type="text"
                size="large"
                label="Email"
                placeholder="Provide Your Email Address"
                required
              />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormSelectCountryField
                size="large"
                name="customer.country"
                options={countriesOptions}
                label="Country"
                placeholder="Select Country"
              />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="password"
                type="password"
                size="large"
                label="Password"
                placeholder="Your Password"
                required
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
              <Link href={`/account/login`}>
                <Button type="default">Login</Button>
              </Link>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default RegisterPage;
