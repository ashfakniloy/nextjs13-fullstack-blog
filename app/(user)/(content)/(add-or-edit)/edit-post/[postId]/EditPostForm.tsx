"use client";

import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import { TextField } from "@/components/InputField/TextField";
import { PersistFormikValues } from "formik-persist-values";
import { RichTextField } from "@/components/InputField/RichTextField";
import { FileField } from "@/components/InputField/FileField";
import { FileField3 } from "@/components/InputField/FileField3";
import { toast } from "react-hot-toast";
import { Post } from "@prisma/client";
import { SelectField } from "@/components/InputField/SelectField";

// type Props = Omit<Post, "createdAt" | "updatedAt"> & {
//   user: {
//     profile: {
//       imageUrl: string | null;
//     } | null;
//     // id: string;
//     username: string;
//   };
// };

type Props = {
  id: string;
  title: string;
  categoryName: string;
  imageUrl: string;
  imageId: string;
  article: string;
};

// type Props2 = {
//   id?: string | undefined;
//     title?: string | undefined;
//     categoryName?: string | undefined;
//     imageUrl?: string | undefined;
//     imageId?: string | undefined;
//     article?: string | undefined;
//     ... 4 more ...;
//     _count?: {
//         ...;
//     } | undefined;
// }

function EditPostForm({
  post,
  categories,
}: {
  post: Props;
  categories: string[];
}) {
  const initialValues = {
    title: post.title,
    categoryName: post.categoryName,
    imageUrl: post.imageUrl,
    imageId: post.imageId,
    article: post.article,
  };

  const router = useRouter();

  const handleSubmit = async (
    values: typeof initialValues
    // formik: FormikHelpers<typeof initialValues>
  ) => {
    const toastEditPost = toast.loading("Loading...");

    const url = `/api/post?postId=${post.id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();
    const postId = data.response.id;

    if (response.ok) {
      console.log("success", data);
      toast.success("Post updated successfully", {
        id: toastEditPost,
      });
      router.refresh();
      router.push(`/post/${postId}`);
    } else {
      console.log("error", data);
      toast.error("Something went wrong", {
        id: toastEditPost,
      });
    }
  };

  return (
    <div>
      <h4 className="mb-5 text-3xl font-extrabold font-montserrat text-gray-700 dark:text-gray-400 ">
        {`Edit post "${post.title}"`}
      </h4>

      <Formik
        // innerRef={formikRef}
        initialValues={initialValues}
        // validationSchema={validate}
        // enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <div className="space-y-5">
              <TextField label="Title" name="title" required />
              {/* <TextField label="Category" name="category" required /> */}
              <SelectField
                label="Category"
                placeholder="Select Category"
                name="categoryName"
                value={post.categoryName}
                required
                // options={["category 1", "category 2"]}
                options={categories}
              />

              <div className="">
                {/* <FileField name="imageUrl" label="Image" /> */}
                <FileField3 name="imageUrl" label="Image" />
              </div>

              <RichTextField label="Post" name="article" required />
              <div className="mt-5 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 text-sm rounded font-bold bg-green-800 text-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={Object.values(values).includes("")}
                >
                  Submit
                </button>
              </div>

              {/* <PersistFormikValues name="draftPost" debounce={500} /> */}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditPostForm;
