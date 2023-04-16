import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getProfile } from "@/prisma/find/getProfile";
import { getServerSession } from "next-auth";
// import EditProfileFormOld from "./EditProfileFormOld";
import EditProfileForm from "./EditProfileForm";

async function EditProfilePage() {
  const session = await getServerSession(authOptions);

  const userId = session?.user.id;

  // const data = session && (await getProfile(userId));

  // const profile: ProfileProps = data?.profile || "";

  if (!session) return;

  const { profile } = await getProfile(userId);
  const profileParsed = JSON.parse(JSON.stringify(profile));

  return <EditProfileForm profile={profileParsed} />;
}

export default EditProfilePage;

// "use client";

// import { useState } from "react";
// import { Formik, Form, FormikContextType } from "formik";
// import { TextField } from "@/components/InputField/TextField";
// import { FileField2 } from "@/components/InputField/FileField2";
// import user3 from "@/public/images/user3.jpg";
// import Image from "next/image";
// import { XMarkIcon } from "@heroicons/react/24/solid";
// import { TextAreaField } from "@/components/InputField/TextAreaField";
// import { IconFacebook } from "@/components/Icons/IconFacebook";
// import { IconTwitter } from "@/components/Icons/IconTwitter";

// function EditProfilePage() {
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState("");

//   const initialValues = {
//     imageUrl: "",
//     imageId: "",
//     username: "",
//     bio: "",
//     facebook: "",
//     twitter: "",
//   };

//   const handleSubmit = (
//     values: typeof initialValues
//     // formik: FormikContextType<typeof initialValues>
//   ) => {
//     console.log("formValues", values);
//     console.log("imagePreview", imagePreview);
//     console.log("imageFile", imageFile);
//     // setDraftPost(values);
//   };

//   return (
//     <div className="">
//       <div className="ml-1 mb-5 h-[50px] flex justify-between items-center">
//         <h4 className=" text-3xl font-extrabold font-montserrat text-gray-700 dark:text-gray-400 ">
//           Edit Your Profile
//         </h4>
//       </div>

//       <div className="">
//         <Formik
//           // innerRef={formikRef}
//           initialValues={initialValues}
//           // validationSchema={validate}
//           // enableReinitialize
//           onSubmit={handleSubmit}
//         >
//           {(formik) => (
//             <Form>
//               <div className="space-y-5 w-[450px]">
//                 <div className="">
//                   <p className="mb-2">Profile Picture</p>
//                   <div className="flex items-center gap-5">
//                     <div className="w-[200px] h-[200px] relative">
//                       <Image
//                         src={imagePreview ? imagePreview : user3}
//                         alt="user image"
//                         fill
//                         className="object-cover"
//                       />
//                       {imagePreview && (
//                         <button
//                           type="button"
//                           className="absolute top-1 right-1 bg-white rounded-full p-[1px] border-2 border-red-600"
//                           onClick={() => {
//                             setImagePreview("");
//                             setImageFile(null);
//                           }}
//                         >
//                           <XMarkIcon className="h-5 w-5 text-black" />
//                         </button>
//                       )}
//                     </div>
//                     <div className="self-end mb-1 flex items-center gap-5">
//                       <FileField2
//                         name="image"
//                         setImageFile={setImageFile}
//                         setImagePreview={setImagePreview}
//                       />
//                       {!imagePreview && (
//                         <button
//                           type="button"
//                           className="bg-red-700 text-white text-sm font-bold px-3 py-1.5 rounded"
//                         >
//                           Delete
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <TextField label="Username" name="username" required />
//                 <TextAreaField label="Bio" name="bio" />
//                 <div className="">
//                   <label className="mb-2 inline-block">Social Accounts</label>
//                   <span className="w-5 h-5"></span>
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-2">
//                       <IconFacebook
//                         width={30}
//                         height={30}
//                         className="fill-[#1877F2]"
//                       />
//                       <div className="w-[450px]">
//                         <TextField
//                           name="facebook"
//                           placeholder="Enter facebook profile"
//                         />
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <IconTwitter
//                         width={30}
//                         height={30}
//                         className="fill-[#1DA1F2]"
//                       />
//                       <div className="w-[450px]">
//                         <TextField
//                           name="twitter"
//                           placeholder="Enter twitter profile"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex justify-end">
//                   <button
//                     type="submit"
//                     className="px-4 py-2 rounded bg-green-700 text-white text-sm font-bold"
//                   >
//                     Save
//                   </button>
//                 </div>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// }

// export default EditProfilePage;
