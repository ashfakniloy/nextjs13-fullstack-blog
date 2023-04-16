"use client";

import { useState } from "react";
import { TextField } from "@/components/InputField/TextField";
import { Form, Formik } from "formik";
import { toast } from "react-hot-toast";
import { signOut } from "next-auth/react";
import { PasswordField } from "../InputField/PasswordField";
import SubmitButton from "../Buttons/SubmitButton";
import CancelButton from "../Buttons/CancelButton";

function PasswordChange({
  setMenu,
}: {
  setMenu: React.Dispatch<React.SetStateAction<string>>;
}) {
  const initialValues = {
    currentPassword: "",
    newPassword: "",
    retypePassword: "",
  };

  const handleSubmit = async (
    values: typeof initialValues
    // formik: FormikContextType<typeof initialValues>
  ) => {
    if (values.currentPassword === values.newPassword) {
      console.log("Old and new password are same!");
      toast.error("Old and new password are same!");
      return;
    }

    if (values.newPassword !== values.retypePassword) {
      console.log("passwords dont match");
      toast.error("Passwords don't match");
      return;
    }

    const toastChangePassword = toast.loading("Loading...");

    const url = "/api/account?changeType=password";
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
      toast.success("Password changed succesfully", {
        id: toastChangePassword,
      });

      signOut({
        callbackUrl: "/signin",
      });
    } else {
      console.log("error", data);
      toast.error(`${data.error}`, {
        id: toastChangePassword,
      });
    }
  };

  return (
    <div className="">
      <Formik
        initialValues={initialValues}
        // validationSchema={validate}
        // enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="space-y-5 w-[360px]">
              <PasswordField label="Current Password" name="currentPassword" />
              <PasswordField label="New Password" name="newPassword" />
              <PasswordField
                label="Retype New Password"
                name="retypePassword"
              />
              <div className="flex items-center gap-2">
                <SubmitButton
                  name="Change Password"
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

export default PasswordChange;
