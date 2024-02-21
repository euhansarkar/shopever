"use client";

import { CSSProperties, ReactNode, ReactElement, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useFormContext, Controller } from "react-hook-form";
import ReactQuill, { Quill } from "react-quill";
interface IInput {
  name: string;
  readOnly?: boolean;
  placeholder?: string;
  modules?: string[];
  formats?: string[];
  label?: string;
  required?: boolean;
  styles?: CSSProperties;
  children?: ReactNode | ReactElement;
  value?: string | string[] | undefined;
}

const FormInput = ({
  name,
  placeholder,
  modules,
  formats,
  label,
  required,
  styles,
  children,
  value,
}: IInput) => {
  const defaultModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const defaultFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  const { control } = useFormContext();

  return (
    <>
      {required ? (
        <span
          style={{
            color: "red",
          }}
        >
          *
        </span>
      ) : null}
      {label ? label : null}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className="text-editor">
            <ReactQuill
              theme="snow"
              modules={modules ? modules : defaultModules}
              formats={formats ? formats : defaultFormats}
              {...field}
              style={styles}
              value={value ? value : field.value}
            />
          </div>
        )}
      />
    </>
  );
};

export default FormInput;
