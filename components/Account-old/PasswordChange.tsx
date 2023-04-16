"use client";

import { useState } from "react";
import { TextField } from "@/components/InputField/TextField";
import { Form, Formik } from "formik";
import { toast } from "react-hot-toast";
import { signOut } from "next-auth/react";

function PasswordChange() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
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

    if (values.newPassword !== values.confirmPassword) {
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
      <p className="text-xl font-medium mb-4">Password Setting</p>
      {!showPasswordForm ? (
        <div className="space-y-3">
          <button
            className="px-4 py-1 bg-green-700 text-white rounded text-sm"
            onClick={() => setShowPasswordForm(true)}
          >
            Change Password
          </button>
        </div>
      ) : (
        <div className="">
          <Formik
            initialValues={initialValues}
            // validationSchema={validate}
            // enableReinitialize
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form>
                <div className="space-y-5 w-[360px]">
                  <TextField
                    label="Current Password"
                    name="currentPassword"
                    type="password"
                    required
                  />
                  <TextField
                    label="New Password"
                    name="newPassword"
                    type="password"
                    required
                  />
                  <TextField
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    required
                  />
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setShowPasswordForm(false)}
                      className="px-4 py-2 text-sm text-white font-bold bg-blue-700 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm text-white font-bold bg-green-700 rounded"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}

export default PasswordChange;
