import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type DescriptionEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  modules?: object;
  formats?: string[];
};

export default function DescriptionEditor({
  value,
  onChange,
  placeholder = "Escribe aquí...",
  modules,
  formats,
}: DescriptionEditorProps) {
  const defaultModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underlines", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
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
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      modules={modules || defaultModules}
      formats={formats || defaultFormats}
    />
  );
}
