"use client";

import _ from "lodash";
import { addCheckoutData, resetCheckoutData } from "@/redux/features/checkout/checkoutSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/localStorage";
import { Button, message, Steps } from "antd";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface ISteps {
  title?: string;
  content?: React.ReactElement | React.ReactNode;
}

interface IStepsProps {
  steps: ISteps[];
  persistKey: string;
  submitHandler: (el: any) => void;
  navigateLink?: string;
}

const StepperForm = ({
  steps,
  submitHandler,
  navigateLink,
  persistKey,
}: IStepsProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // let's get checkout data
  const stepData = useAppSelector((state) => state.checkout);


  const [current, setCurrent] = useState<number>(
    !!getFromLocalStorage("step")
      ? Number(JSON.parse(getFromLocalStorage("step") as string).step)
      : 0
  );
  const [savedValues, setSavedValues] = useState(
    !!getFromLocalStorage(persistKey)
      ? JSON.parse(getFromLocalStorage(persistKey) as string)
      : ""
  );

  useEffect(() => {
    setToLocalStorage("step", JSON.stringify({ step: current }));
  }, [current]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  // creating a deep copy of the savedValues
  const deepCopy = JSON.parse(JSON.stringify(savedValues));
  const methods = useForm({ defaultValues: deepCopy });

  const { handleSubmit, reset } = methods;

  const watch = methods.watch();

  useEffect(() => {
    if (!_.isEqual(stepData, watch)) {
      const copyWatch = watch ;
      console.log(`this is from stepper watching data`, copyWatch);
      console.log(`this is redux stepper data`, stepData);
      dispatch(addCheckoutData(copyWatch));
    }
  }, [persistKey, methods, watch, stepData, dispatch]);

  useEffect(() => {
    setToLocalStorage(persistKey, JSON.stringify(watch));
  }, [persistKey, methods, watch]);

  const handleOrderOnSubmit = (data: any) => {
    submitHandler(data);
    setToLocalStorage("step", JSON.stringify({ step: 0 }));
    setToLocalStorage(persistKey, JSON.stringify({}));
    dispatch(resetCheckoutData());
    reset();
    navigateLink && router.push(navigateLink);
  };

  return (
    <>
      <Steps current={current} items={items} />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleOrderOnSubmit)}>
          <div>{steps[current].content}</div>
          <div style={{ marginTop: 24 }}>
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => message.success("Processing complete!")}
              >
                Done
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                Previous
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default StepperForm;
