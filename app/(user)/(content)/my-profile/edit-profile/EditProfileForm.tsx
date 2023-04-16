"use client";

import { useEffect, useState } from "react";
import { Formik, Form, FormikContextType, FormikHelpers } from "formik";
import { TextField } from "@/components/InputField/TextField";
import { FileField2 } from "@/components/InputField/FileField2";
import user3 from "@/public/images/user3.jpg";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { TextAreaField } from "@/components/InputField/TextAreaField";
import { IconFacebook } from "@/components/Icons/IconFacebook";
import { IconTwitter } from "@/components/Icons/IconTwitter";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FileField } from "@/components/InputField/FileField";
import { Profile } from "@prisma/client";

function EditProfileForm({
  profile,
}: {
  profile:
    | (Profile & {
        user: {
          username: string;
        };
      })
    | null;
}) {
  const router = useRouter();

  // const [imageFile, setImageFile] = useState<string | Blob>("");
  // const [imagePreview, setImagePreview] = useState("");
  // const [imageUpdated, setImageUpdated] = useState(false);

  const initialValues = {
    imageUrl: profile?.imageUrl ?? "",
    imageId: profile?.imageId ?? "",
    bio: profile?.bio ?? "",
    facebook: profile?.facebook ?? "",
    twitter: profile?.twitter ?? "",
  };

  // const handleSubmit = async (
  //   values: typeof initialValues,
  //   // formik: FormikContextType<typeof initialValues>
  //   formik: FormikHelpers<typeof initialValues>
  // ) => {
  //   // console.log("formValues", values);
  //   // console.log("imagePreview", imagePreview);
  //   // console.log("imageFile", imageFile);

  //   const toastProfileUpdate = toast.loading("Loading...");

  //   const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  //   const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME!;

  //   const formData = new FormData();
  //   formData.append("file", imageFile);
  //   formData.append("upload_preset", preset);
  //   formData.append("cloud_name", cloud_name);
  //   formData.append("folder", "nextjs13-fullstack-blog");

  //   try {
  //     const response = await fetch(
  //       `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );

  //     const data = await response.json();

  //     if (response.ok) {
  //       console.log("success", data);
  //       formik.setFieldValue("imageUrl", data.secure_url);
  //       formik.setFieldValue("imageId", data.public_id);
  //       setImageUpdated(true);

  // const submitProfileChange = async () => {
  //   const url = `/api/profile?profileId=${profile?.id}`;
  //   const response2 = await fetch(url, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(values),
  //   });

  //   const data2 = await response2.json();

  //   // console.log("submit", values);

  //   // return;

  //   if (response2.ok) {
  //     console.log("success2", data2);
  //     toast.success("Profile updated successfully", {
  //       id: toastProfileUpdate,
  //     });

  //     setImageFile("");
  //     setImagePreview("");

  //     router.refresh();
  //   } else {
  //     console.log("error2", data2);
  //     toast.error("Something went wrong", {
  //       id: toastProfileUpdate,
  //     });
  //   }
  // };

  //       submitProfileChange();
  //       router.refresh();
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //     toast.error("Something went wrong", {
  //       id: toastProfileUpdate,
  //     });
  //   }
  // };

  const handleSubmit = async (
    values: typeof initialValues,

    formik: FormikHelpers<typeof initialValues>
  ) => {
    const toastProfileUpdate = toast.loading("Loading...");

    const url = `/api/profile?profileId=${profile?.id}`;
    const response2 = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data2 = await response2.json();

    // console.log("submit", values);

    // return;

    if (response2.ok) {
      console.log("success2", data2);
      toast.success("Profile updated successfully", {
        id: toastProfileUpdate,
      });

      router.refresh();
    } else {
      console.log("error2", data2);
      toast.error("Something went wrong", {
        id: toastProfileUpdate,
      });
    }
  };

  return (
    <div className="">
      <div className="ml-1 mb-5 h-[50px] flex justify-between items-center">
        <h4 className=" text-3xl font-extrabold font-montserrat text-gray-700 dark:text-gray-400 ">
          Edit Your Profile
        </h4>
      </div>

      <div className="">
        <Formik
          // innerRef={formikRef}
          initialValues={initialValues}
          // validationSchema={validate}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              <div className="space-y-5 w-[450px]">
                <div className="">
                  <FileField name="imageUrl" label="Profile Picture" required />
                  {/* <div className="flex items-center gap-5">
                    <div className="w-[200px] h-[200px] relative">
                      {formik.values.imageUrl && (
                        <Image
                          src={formik.values.imageUrl}
                          alt="user image"
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="self-end mb-1 flex items-center gap-5">
                      <FileField2 name="image" profileId={profile?.id} />
                    </div>
                  </div> */}
                </div>

                <TextAreaField
                  label="Bio"
                  name="bio"
                  value={formik.values.bio}
                />
                <div className="">
                  <label className="mb-2 inline-block">Social Accounts</label>
                  <span className="w-5 h-5"></span>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <IconFacebook
                        width={30}
                        height={30}
                        className="fill-[#1877F2]"
                      />
                      <div className="w-[450px]">
                        <TextField
                          name="facebook"
                          placeholder="Enter facebook profile"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconTwitter
                        width={30}
                        height={30}
                        className="fill-[#1DA1F2]"
                      />
                      <div className="w-[450px]">
                        <TextField
                          name="twitter"
                          placeholder="Enter twitter profile"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-green-700 text-white text-sm font-bold"
                  >
                    Save
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default EditProfileForm;
