"use client";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
// import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import Toolbar from "./Toolbar";
import "./styles.css";

const Tiptap = ({
  article,
  setArticle,
}: {
  article: string;
  setArticle: React.Dispatch<React.SetStateAction<string>>;

  // setArticle: any;
}) => {
  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] } as any),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
      Underline as any,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      // Image.configure({
      //   // allowBase64: true,
      //   inline: true,
      // }),
    ],
    // editorProps: {
    //   handleDrop: function (view, event, slice, moved) {
    //     if (
    //       !moved &&
    //       event.dataTransfer &&
    //       event.dataTransfer.files &&
    //       event.dataTransfer.files[0]
    //     ) {
    //       // if dropping external files
    //       // handle the image upload
    //       return true; // handled
    //     }
    //     return false; // not handled use default behaviour
    //   },
    // },
    content: ``,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setArticle(html);

      // const json = editor.getJSON();
      // setArticle(JSON.stringify(json));
      // console.log("onUpdated", json);

      // const json = editor.getJSON();
      // setArticle(json);
      // setArticle("article", html);
    },
  });

  useEffect(() => {
    // this is just an example. do whatever you want to do here
    // to retrieve your editors content from somewhere
    editor?.commands.setContent(article);
  }, [editor?.contentComponent]);

  // useEffect(() => {
  //   resetRichText && editor?.chain().clearContent(true).run();
  // }, [resetRichText]);

  return (
    <div className="">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} required={true} />
      {/* <button
        type="button"
        className="bg-red-600 text-white px-4 py-2"
        onClick={() => editor.chain().focus().clearContent(true).run()}
      >
        Reset
      </button> */}

      {/* <button
        type="button"
        className="bg-red-600 text-white px-4 py-2"
        onClick={() => {
          // formik.resetForm();
          editor?.commands.clearContent(true);
        }}
      >
        Reset
      </button> */}
    </div>
  );
};

// export { clearEditor };

export default Tiptap;
