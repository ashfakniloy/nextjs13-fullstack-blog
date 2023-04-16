"use client";

import { TextField } from "@/components/InputField/TextField";
import { Form, Formik } from "formik";
import { toast } from "react-hot-toast";
import { signOut } from "next-auth/react";
import { PasswordField } from "@/components/InputField/PasswordField";
import SubmitButton from "../Buttons/SubmitButton";
import CancelButton from "../Buttons/CancelButton";

function UsernameChange({
  currentUsername,
  setMenu,
}: {
  currentUsername?: string;
  setMenu: React.Dispatch<React.SetStateAction<string>>;
}) {
  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    if (values.username === currentUsername) {
      console.log("Old and new username are same!");
      toast.error("Old and new username are same!");
      return;
    }

    const toastUsernameChange = toast.loading("Loading...");

    const url = "/api/account?changeType=username";
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("succecss", data);
      toast.success("Username changed succesfully", {
        id: toastUsernameChange,
      });

      signOut({
        callbackUrl: "/signin",
      });
    } else {
      console.log("error", data);
      toast.error(`${data.error}`, {
        id: toastUsernameChange,
      });
    }
  };

  return (
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
              <TextField
                label="New Username"
                name="username"
                type="text"
                required
              />
              <PasswordField label="Enter your password" name="password" />

              <div className="flex items-center gap-2">
                <SubmitButton
                  name="Change Username"
                  isSubmitting={isSubmitting}
                />
                <CancelButton setMenu={setMenu} isSubmitting={isSubmitting} />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default UsernameChange;
