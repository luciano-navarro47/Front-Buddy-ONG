import { Box } from "@chakra-ui/react";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type DescriptionEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  modules?: object;
  formats?: string[];
  error?: string | undefined // <-- opcional
};

export default function DescriptionEditor({
  value,
  onChange,
  placeholder = "Escribe aquí...",
  modules,
  formats,
  error,
}: DescriptionEditorProps) {
  const defaultModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "strike"],
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
    <Box>
      <Box
        sx={{
          ".ql-container": {
            borderRadius: "6px",
          },
          ".ql-editor": {
            minHeight: "100px",
            padding: "8px 12px",
          },
        }}
      >
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          modules={modules || defaultModules}
          formats={formats || defaultFormats}
        />
      </Box>

      {error ? (
        <Box mt={2}>
          <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--chakra-colors-red-500)" }}>
            {error}
          </p>
        </Box>
      ) : null}
    </Box>
  );
}
