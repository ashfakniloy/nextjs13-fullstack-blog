// "use client";

// import useAutosizeTextArea from "@/hooks/useAutoResizeTextarea";
// import { useRouter } from "next/navigation";
// import { useRef, useState } from "react";
// import { toast } from "react-hot-toast";

// function CommentsForm({ postId }: { postId: string }) {
//   const [comment, setComment] = useState("");
//   const router = useRouter();

//   const textAreaRef = useRef<HTMLTextAreaElement>(null);

//   useAutosizeTextArea(textAreaRef.current, comment);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // const res = await fetch(`/api/comment`, {
//     //   method: "POST",
//     //   headers: {
//     //     "Content-Type": "application/json",
//     //   },
//     //   body: JSON.stringify({ comment, postId }),
//     // });

//     // const data = await res.json();

//     // if (res.ok) {
//     //   toast.success("Comment Submitted");
//     //   setComment("");
//     //   router.refresh();
//     //   console.log("success", data);
//     // } else {
//     //   toast.error(`${data.error}`);
//     //   console.log(data);
//     // }
//   };

//   return (
//     <div className="">
//       <form onSubmit={handleSubmit} className="flex flex-col gap-2">
//         <textarea
//           ref={textAreaRef}
//           rows={1}
//           className="input-field overflow-hidden min-h-[48px]"
//           placeholder="Write Comment"
//           name="comment"
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           required
//         />
//         <button className="self-end px-6 py-2 tracking-wider text-gray-50 bg-blue-600  font-medium">
//           Post
//         </button>
//       </form>
//     </div>
//   );
// }

// export default CommentsForm;

"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Form, Formik, FormikHelpers } from "formik";
import { TextAreaField } from "@/components/InputField/TextAreaField";

function CommentForm({ postId }: { postId: string }) {
  const router = useRouter();

  const initialValues = {
    comment: "",
  };

  const handleSubmit = async (
    values: typeof initialValues,

    formik: FormikHelpers<typeof initialValues>
  ) => {
    // console.log("values", values.comment, postId);
    // return;
    const { comment } = values;
    const response = await fetch(`/api/post/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment, postId }),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Comment Submitted");
      // setComment("");
      formik.setFieldValue("comment", "");
      router.refresh();
      console.log("success", data);
    } else {
      toast.error(`${data.error}`);
      console.log(data);
    }
  };

  return (
    <div className="">
      <Formik
        // innerRef={formikRef}
        initialValues={initialValues}
        // validationSchema={validate}
        // enableReinitialize
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <div className="flex flex-col gap-2">
              <TextAreaField
                label="Comment"
                name="comment"
                placeholder="Write Comment"
                value={formik.values.comment}
                required={true}
              />
              <button
                type="submit"
                className="self-end px-6 py-2 tracking-wider text-gray-50 bg-blue-600  font-medium"
              >
                Post
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CommentForm;
