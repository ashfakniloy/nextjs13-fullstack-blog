"use client";

import { useState } from "react";
import { TextField } from "@/components/InputField/TextField";
import { Form, Formik } from "formik";
import { toast } from "react-hot-toast";
import { signOut } from "next-auth/react";

function DeleteAccount() {
  const [showDeleetAccountForm, setShowDeleetAccountForm] = useState(false);

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
      <p className="text-xl font-medium mb-4 text-red-500">Delete Account</p>
      {!showDeleetAccountForm ? (
        <div className="space-y-3">
          <button
            className="px-4 py-1 bg-red-700 rounded text-sm text-white"
            onClick={() => setShowDeleetAccountForm(true)}
          >
            Delete My Account
          </button>
        </div>
      ) : (
        <div className="">
          <p className="mb-3 text-lg text-red-500">
            Are you sure you want to do this?
          </p>
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
                    label="Enter your password"
                    name="password"
                    type="password"
                    required
                  />
                  <TextField
                    // label="To verify, type delete my account below:"
                    label={
                      <p>
                        To verify, type{" "}
                        <span className="select-none italic opacity-70">
                          delete my account
                        </span>{" "}
                        below
                      </p>
                    }
                    name="text"
                    type="text"
                    required
                  />

                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setShowDeleetAccountForm(false)}
                      className="px-4 py-2 text-sm text-white font-bold bg-blue-700 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm text-white font-bold bg-red-700 rounded"
                    >
                      Delete account
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

export default DeleteAccount;
