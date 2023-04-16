"use client";

import { useState } from "react";
import { TextField } from "@/components/InputField/TextField";
import { Form, Formik } from "formik";
import { toast } from "react-hot-toast";
import { signOut, useSession } from "next-auth/react";

function EmailChange({ currentEmail }: { currentEmail?: string }) {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const { data: session } = useSession();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    // console.log("formValues", values);
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
    <div className="">
      <p className="text-xl font-medium mb-4">Email Setting</p>
      {!showEmailForm ? (
        <div className="space-y-3">
          <p className="">
            Current Email: <span className="ml-5">{session?.user.email}</span>
          </p>
          <button
            className="px-4 py-1 bg-green-700 text-white rounded text-sm"
            onClick={() => setShowEmailForm(true)}
          >
            Change Email
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
                    label="New Email"
                    name="email"
                    type="email"
                    required
                  />
                  <TextField
                    label="Confirm Password"
                    name="password"
                    type="password"
                    required
                  />
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setShowEmailForm(false)}
                      className="px-4 py-2 text-sm text-white font-bold bg-blue-700 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm text-white font-bold bg-green-700 rounded"
                    >
                      Change Email
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

export default EmailChange;
