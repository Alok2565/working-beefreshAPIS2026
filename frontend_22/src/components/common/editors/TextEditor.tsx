import { CKEditor } from "@ckeditor/ckeditor5-react";

import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading,
  Font,
  Alignment,
  Link,
  List,
  Indent,
  Table,
  TableToolbar,
  Image,
  ImageToolbar,
  ImageCaption,
  ImageStyle,
  ImageResize,
  ImageInsert,
  MediaEmbed,
  BlockQuote,
  CodeBlock,
  SourceEditing,
  HorizontalLine,
  Highlight,
  RemoveFormat,
  Undo,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

interface TextEditorProps {
  value: string;
  onChange: (data: string) => void;
  label?: string;
  placeholder?: string;
  height?: string;
}

function TextEditor({
  value,
  onChange,
  label,
  placeholder = "Write content...",
  height = "300px",
}: TextEditorProps) {
  return (
    <>
      <div className="mb-4">
        {label && (
          <label className="form-label fw-semibold mb-2">{label}</label>
        )}

        <div className="editor-wrapper border rounded-3 overflow-hidden ">
          <CKEditor
            editor={ClassicEditor}
            data={value}
            config={{
              placeholder,

              licenseKey: "GPL",

              plugins: [
                Essentials,
                Paragraph,
                Bold,
                Italic,
                Underline,
                Strikethrough,
                Heading,
                Font,
                Alignment,
                Link,
                List,
                Indent,
                Table,
                TableToolbar,
                Image,
                ImageToolbar,
                ImageCaption,
                ImageStyle,
                ImageResize,
                ImageInsert,
                MediaEmbed,
                BlockQuote,
                CodeBlock,
                SourceEditing,
                HorizontalLine,
                Highlight,
                RemoveFormat,
                Undo,
              ],

              toolbar: [
                "undo",
                "redo",
                "|",
                "heading",
                "|",
                "fontSize",
                "fontFamily",
                "fontColor",
                "fontBackgroundColor",
                "|",
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "highlight",
                "removeFormat",
                "|",
                "alignment",
                "|",
                "bulletedList",
                "numberedList",
                "outdent",
                "indent",
                "|",
                "link",
                "insertTable",
                "blockQuote",
                "horizontalLine",
                "|",
                "insertImage",
                "mediaEmbed",
                "|",
                "codeBlock",
                "sourceEditing",
              ],

              table: {
                contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
              },

              image: {
                toolbar: [
                  "imageTextAlternative",
                  "toggleImageCaption",
                  "imageStyle:inline",
                  "imageStyle:block",
                  "imageStyle:side",
                ],
              },
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              onChange(data);
            }}
          />
        </div>

        <style>
          {`
          .ck-editor__editable_inline {
            min-height: ${height};
            padding: 20px !important;
          }

          .ck.ck-editor {
            width: 100%;
          }

          .ck-toolbar {
            border-bottom: 1px solid #dee2e6 !important;
          }

          .ck-content pre {
            background: #1e1e1e;
            color: #fff;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
          }
        `}
        </style>
      </div>
    </>
  );
}

export default TextEditor;
