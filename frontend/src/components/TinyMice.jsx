import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { Editor } from "@tinymce/tinymce-react";

const TinyMice = () => {
  //   const handleEditorChange = (content, editor) => {
  //     console.log("Content was updated:", content);
  //   };
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    console.log("Content was updated:", data);
  };

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data="<p>Initial content</p>"
        onChange={handleEditorChange}
        config={{
          toolbar: ["undo", "redo"],
          fontFamily: {
            options: [
              "default",
              "Arial, Helvetica, sans-serif",
              "Courier New, Courier, monospace",
              "Georgia, serif",
              "Tahoma, Geneva, sans-serif",
              "Times New Roman, Times, serif",
              "Verdana, Geneva, sans-serif",
            ],
          },
        }}
      />
    </div>
  );
};

export default TinyMice;
