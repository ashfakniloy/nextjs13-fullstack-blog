"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Formik, Form } from "formik";
import { TextField } from "@/components/InputField/TextField";
import { Loader } from "@/components/Loaders/Loader";
import { PasswordField } from "@/components/InputField/PasswordField";

function UserSignUpPage() {
  const router = useRouter();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    if (values.password !== values.confirmPassword) {
      console.log("passwords dont match");
      toast.error("Passwords don't match");
      return;
    }

    // console.table(values);

    const toastSignup = toast.loading("Loading...");

    const signupvalues = {
      username: values.username,
      email: values.email,
      password: values.password,
    };

    const url = "/api/signup";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupvalues),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("succcess", data);
      toast.success("Account Created Successfully", {
        id: toastSignup,
      });
      router.push("/signin");
    } else {
      console.log("error", data);
      toast.error(`${data.error}`, {
        id: toastSignup,
      });
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-custom-gray3/20 shadow-md px-5 sm:px-10 py-10 w-full max-w-[420px]">
      <p className="text-center text-2xl font-bold">Create new Account</p>
      <div className="mt-5">
        <Formik
          initialValues={initialValues}
          // validationSchema={validate}
          // enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="space-y-5">
                <TextField label="Username" name="username" required />
                <TextField label="Email" name="email" type="email" required />
                <PasswordField label="Password" name="password" />
                <PasswordField
                  label="Confirm Password"
                  name="confirmPassword"
                />
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full relative py-3 text-sm text-white font-bold bg-green-700 rounded disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && (
                      <span className="absolute flex left-[105px] items-center inset-y-0">
                        <Loader width="30" strokeColor="white" />
                      </span>
                    )}
                    <span>Sign Up</span>
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Already have have an account?{" "}
          <Link href="/signin" className="text-blue-500 dark:text-blue-400">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default UserSignUpPage;
