"use client";

import { useState } from "react";
import { TextField } from "@/components/InputField/TextField";
import { Form, Formik } from "formik";
import { toast } from "react-hot-toast";
import { signOut, useSession } from "next-auth/react";
import { PasswordField } from "../InputField/PasswordField";
import SubmitButton from "../Buttons/SubmitButton";
import CancelButton from "../Buttons/CancelButton";

function EmailChange({
  currentEmail,
  setMenu,
}: {
  currentEmail?: string;
  setMenu: React.Dispatch<React.SetStateAction<string>>;
}) {
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    if (values.email === currentEmail) {
      console.log("Old and new email are same!");
      toast.error("Old and new email are same!");
      return;
    }

    const toastEmailChange = toast.loading("Loading...");

    const url = "/api/account?changeType=email";
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
      toast.success("Email changed succesfully", {
        id: toastEmailChange,
      });

      signOut({
        callbackUrl: "/signin",
      });
    } else {
      console.log("error", data);
      toast.error(`${data.error}`, {
        id: toastEmailChange,
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
              <TextField label="New Email" name="email" type="email" required />
              <PasswordField label="Enter your password" name="password" />
              <div className="flex items-center gap-2">
                <SubmitButton name="Change Email" isSubmitting={isSubmitting} />
                <CancelButton setMenu={setMenu} isSubmitting={isSubmitting} />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EmailChange;
