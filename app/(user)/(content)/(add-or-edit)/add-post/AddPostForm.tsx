"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import {
  Formik,
  Form,
  FormikHelpers,
  FormikValues,
  FormikState,
  FormikContextType,
} from "formik";
import { TextField } from "@/components/InputField/TextField";
import parser from "html-react-parser";
import Tiptap from "@/components/TextEditor/Tiptap";
import { Persist } from "formik-persist";
import { PersistFormikValues } from "formik-persist-values";
import { RichTextField } from "@/components/InputField/RichTextField";
// const Quill = dynamic(() => import("@/components/TextEditor/Quill"), {
//   ssr: false,
// });
import useLocalStorage from "@/hooks/useLocalStorage";
import { FileField } from "@/components/InputField/FileField";
import { FileField2 } from "@/components/InputField/FileField2";
import Image from "next/image";
import { SelectField } from "@/components/InputField/SelectField";
// import { categories } from "@/data/categories";

function AddPostForm({ categories }: { categories: string[] }) {
  const initialValues = {
    title: "",
    categoryName: "",
    imageUrl: "",
    imageId: "",
    article: "",
  };

  const router = useRouter();

  // const [isDraft, setIsDraft] = useState(false);

  // useEffect(() => {
  //   const draftPost = localStorage.getItem("draftPost");
  //   draftPost && setIsDraft(true);
  //   // draftPost && draftPost.article === "<p></p>" && setIsDraft(false);

  //   // !isDraft && localStorage.removeItem("draftPost");
  // }, []);

  const handleSubmit = (
    values: typeof initialValues
    // formik: FormikHelpers<typeof initialValues>
  ) => {
    console.log(values);
    // setDraftPost(values);
    router.push("/add-post/preview");
  };

  // const handleFormReset = async (
  //   formik: FormikContextType<typeof initialValues>
  // ) => {
  //   formik.values.imageId &&
  //     (await fetch(`/api/image?imageId=${formik.values.imageId}`, {
  //       method: "DELETE",
  //     }));
  //   formik.setFieldValue("article", "");
  //   formik.resetForm();
  //   // clearEditor();
  // };

  // const handleClearDraft = (
  //   formik: FormikContextType<typeof initialValues>
  // ) => {
  //   localStorage.removeItem("draftPost");
  //   setIsDraft(false);

  //   formik.resetForm();
  //   // resetRichText();
  //   setResetRichText(true);
  // };

  return (
    <div className="relative">
      <h4 className="mb-5 text-3xl font-extrabold font-montserrat text-gray-700 dark:text-gray-400 ">
        Add New post
      </h4>

      <Formik
        // innerRef={formikRef}
        initialValues={initialValues}
        // validationSchema={validate}
        // enableReinitialize
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            {/* {isDraft && (
              <div className="absolute right-0 top-0 ">
                <p className="bg-blue-500 text-sm font-bold px-3 py-1.5 rounded">
                  You are seeing previous unpublished post.
                </p>
                <button
                  type="button"
                  onClick={() => handleClearDraft(formik)}
                  className="mt-2 px-2 py-1 text-sm bg-red-600 font-bold rounded"
                >
                  Clear Draft
                </button>
              </div>
            )} */}
            <div className="space-y-5">
              <TextField label="Title" name="title" required />
              {/* <TextField label="Category" name="category" required /> */}
              <SelectField
                label="Category"
                placeholder="Select Category"
                name="categoryName"
                required
                // options={["category 1", "category 2"]}
                options={categories}
              />
              {/* <FileField label="Image" name="imageUrl" required /> */}
              <div className="">
                {/* <p className="mb-2">Image</p> */}
                <FileField name="imageUrl" label="Image" required />
              </div>
              {/* <div className="max-w-[300px]">
                <label htmlFor="image" className="mb-2  inline-block">
                  Image
                </label>
                <input id="image" type="file" className="input-field" />
              </div> */}
              {/* <div className="">
                <label htmlFor="post" className="mb-2  inline-block">
                  Post
                </label>

                <Tiptap
                  article={article}
                  setArticle={setArticle}
                  // setDraftArticle={setDraftArticle}
                />
              </div> */}
              <RichTextField label="Post" name="article" required />
              <div className="mt-5 flex justify-end">
                {/* <button
                  type="button"
                  className="px-4 py-2 font-bold bg-red-800"
                  onClick={() => handleFormReset(formik)}
                >
                  Clear
                </button> */}
                {/* <Link href="/add-post/preview"> */}
                <button
                  type="submit"
                  className="px-4 py-2 text-sm rounded font-bold bg-green-800 text-gray-200"
                >
                  Preview
                </button>
                {/* </Link> */}
              </div>

              <PersistFormikValues name="draftPost" debounce={500} />
              {/* <p className="mt-2">{JSON.stringify(formik.values)}</p> */}
              {/* <Persist name="newPost" debounce={1000} /> */}
            </div>
          </Form>
        )}
      </Formik>

      <div className="space-y-5">
        {/* <div className="">
          <label htmlFor="title" className="mb-2 inline-block">
            Title
          </label>
          <input id="title" type="text" className=" input-field" />
        </div>

        <div className="">
          <label htmlFor="category" className="mb-2  inline-block">
            Category
          </label>
          <input id="category" type="text" className="input-field" />
        </div>

        <div className="max-w-[300px]">
          <label htmlFor="image" className="mb-2  inline-block">
            Image
          </label>
          <input id="image" type="file" className="input-field" />
        </div> */}

        <div className="">
          {/* <label htmlFor="post" className="mb-2  inline-block">
            Post
          </label> */}

          {/* <Tiptap
            article={article}
            setArticle={setArticle}
            // setDraftArticle={setDraftArticle}
          /> */}

          {/* <Quill article={article} setArticle={setArticle} /> */}
        </div>

        {/* <div className=" mt-10">{parser(article || "")}</div> */}
      </div>
    </div>
  );
}

export default AddPostForm;
