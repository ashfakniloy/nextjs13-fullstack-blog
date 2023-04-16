"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { Formik, Form } from "formik";
import { TextField } from "@/components/InputField/TextField";
import { Loader } from "@/components/Loaders/Loader";
import { PasswordField } from "@/components/InputField/PasswordField";

function UserSignInPage() {
  const router = useRouter();

  // const { status } = useSession();

  // if (status === "authenticated") {
  //   return router.push("/");
  // }

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    console.log("login", values);

    // return;

    const toastSignin = toast.loading("Loading...");

    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      // callbackUrl: `${window.location.origin}`,
      redirect: false,
    });

    if (response?.ok) {
      console.log("succcess", response);
      toast.success("Login Successfull", {
        id: toastSignin,
      });

      router.push("/");
      router.refresh();
    } else {
      console.log("error", response);
      toast.error(`${response?.error}`, {
        id: toastSignin,
      });
    }
    // console.log(user);
    // const loginToast = toast.loading("Loading...");

    // const res = await signIn("credentials", {
    //   email: user.email,
    //   password: user.password,
    //   // callbackUrl: `${window.location.origin}`,
    //   redirect: false,
    // });

    // if (res?.ok) {
    //   toast.dismiss(loginToast);
    //   toast.success("Login Successfull");
    //   console.log("success", res);
    //   router.push("/");
    //   router.refresh();
    // } else {
    //   toast.dismiss(loginToast);
    //   toast.error(`${res?.error}`);
    //   console.log("error", res);
    // }
  };

  return (
    // <div className="min-h-screen flex justify-center items-center">
    <div className="bg-gray-100 dark:bg-custom-gray3/20 shadow-md px-5 sm:px-10 py-10 w-full max-w-[420px]">
      <p className="text-center text-2xl font-bold">Sign In</p>

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
                <TextField label="Email" name="email" type="email" required />
                <PasswordField label="Password" name="password" />
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full relative py-3 text-sm text-white font-bold bg-green-700 rounded disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && (
                      <span className="absolute flex left-[110px] items-center inset-y-0">
                        <Loader width="30" strokeColor="white" />
                      </span>
                    )}
                    <span>Sign In</span>
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-500 dark:text-blue-400">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
    // </div>
  );
}

export default UserSignInPage;
