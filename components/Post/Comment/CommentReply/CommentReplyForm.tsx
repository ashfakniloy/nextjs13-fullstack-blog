"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Form, Formik, FormikHelpers } from "formik";
import { TextAreaField } from "@/components/InputField/TextAreaField";

function CommentsReplyForm({
  postId,
  commentId,
  setOpenReply,
  setShowReplies,
}: {
  postId: string;
  commentId: string;
  setOpenReply: React.Dispatch<React.SetStateAction<boolean>>;
  setShowReplies: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();

  const initialValues = {
    commentReply: "",
  };

  const handleSubmit = async (
    values: typeof initialValues,

    formik: FormikHelpers<typeof initialValues>
  ) => {
    // console.log("values", values.commentReply, postId);
    // return;
    const { commentReply } = values;
    const response = await fetch(`/api/post/comment/commentReply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentReply, postId, commentId }),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("CommentReply Submitted");
      formik.setFieldValue("commentReply", "");
      setShowReplies(true);
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
            <div className="flex flex-col gap-1">
              <TextAreaField
                name="commentReply"
                placeholder="Write a reply"
                value={formik.values.commentReply}
                required={true}
              />
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="self-end px-3 py-1 tracking-wider text-gray-50 bg-red-700 font-medium text-sm rounded"
                  onClick={() => setOpenReply(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="self-end px-3 py-1 tracking-wider text-gray-50 bg-cyan-600 font-medium text-sm rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CommentsReplyForm;
