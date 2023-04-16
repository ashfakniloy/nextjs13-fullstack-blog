"use client";

import { TextField } from "@/components/InputField/TextField";
import { Form, Formik } from "formik";
import { toast } from "react-hot-toast";
import { signOut } from "next-auth/react";
import { PasswordField } from "../InputField/PasswordField";
import CancelButton from "../Buttons/CancelButton";
import SubmitButton from "../Buttons/SubmitButton";

function DeleteAccount({
  setMenu,
}: {
  setMenu: React.Dispatch<React.SetStateAction<string>>;
}) {
  const initialValues = {
    password: "",
    text: "",
  };

  const handleSubmit = async (
    values: typeof initialValues
    // formik: FormikContextType<typeof initialValues>
  ) => {
    const toastDeleteAccount = toast.loading("Loading...");

    if (values.text !== "delete my account") {
      console.log("error: type the text correctly");
      toast.error("Enter the text correctly", {
        id: toastDeleteAccount,
      });
      return;
    }

    const url = "/api/account";
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: values.password }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("success", data);
      signOut({
        callbackUrl: "/signup",
      });
    } else {
      console.log("error", data);
      toast.error(`${data.error}`, {
        id: toastDeleteAccount,
      });
    }

    // setDraftPost(values);
  };

  return (
    <div className="">
      {/* <p className="text-xl font-medium mb-4 text-red-500">Delete Account</p> */}
      <div className="">
        <p className="text-lg">Are you sure you want to do this?</p>
        <p className="mt-5">All your posts and activities will be deleted.</p>
        <p className="">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
      </div>
      <div className="mt-6">
        <Formik
          initialValues={initialValues}
          // validationSchema={validate}
          // enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="space-y-5 w-[360px]">
                <PasswordField label="Enter your password" name="password" />
                <TextField
                  label={
                    <p>
                      To verify, type
                      <span className="mx-1.5 select-none italic opacity-70">
                        delete my account
                      </span>
                      below
                    </p>
                  }
                  name="text"
                  type="text"
                  required
                />

                <div className="flex items-center gap-2">
                  <SubmitButton
                    name="Delete Account"
                    isSubmitting={isSubmitting}
                    color="red"
                  />
                  <CancelButton setMenu={setMenu} isSubmitting={isSubmitting} />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default DeleteAccount;
