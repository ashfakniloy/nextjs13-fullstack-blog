import { FormikHelpers, useFormikContext } from "formik";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Loader3 } from "../Loaders/Loader";

export const FileField = ({
  label,
  name,
  required,
}: // setImageFile,
// setImagePreview,
{
  label?: string;
  name: string;
  required?: boolean;
  // setImageFile: React.Dispatch<React.SetStateAction<string | Blob>>;
  // setImagePreview: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const formik = useFormikContext<FormProps>();
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  // const [imageUploaded, setImageUploaded] = useState(false);
  const [imageChanging, setImageChanging] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      // setImageFile(undefined);
      return;
    }

    // if (formik.values.imageId) {
    //   handleImageRemove(formik.values.imageId);
    // }

    const image = e.target.files[0];

    const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME!;

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", preset);
    formData.append("cloud_name", cloud_name);
    formData.append("folder", "nextjs13-fullstack-blog");

    setImageChanging(true);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (response.ok) {
      // setImageUploaded(true);
      // console.log("success", data);
      formik.setFieldValue("imageUrl", data.secure_url);
      // formik.setFieldValue("imageId", data.asset_id);
      formik.setFieldValue("imageId", data.public_id);
    } else {
      console.log("error", data);
    }

    setImageChanging(false);
  };

  const handleImageRemove = async (imageId: string) => {
    setImageChanging(true);

    formik.setFieldValue("imageUrl", "");
    formik.setFieldValue("imageId", "");

    const response = await fetch(`/api/image?imageId=${imageId}`, {
      method: "DELETE",
    });

    const data = await response.json();
    if (response.ok) {
      console.log("success", data);
      // formik.setFieldValue("imageUrl", "");
      // formik.setFieldValue("imageId", "");
    } else {
      console.log("error", data);
    }

    setImageChanging(false);
  };

  // useEffect(() => {
  //   console.log("imageLoaded", imageLoaded);
  // }, [imageLoaded]);

  // useEffect(() => {
  //   // !formik.values.imageId
  //   const deleteCloudinaryImage = async () => {
  //     const imageId = formik.values.imageId;
  //     const response = await fetch(`/api/image?imageId=${imageId}`, {
  //       method: "DELETE",
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       console.log("success deleted cloudinary image", data);
  //     } else {
  //       console.log("error deleted cloudinary image", data);
  //     }
  //   };

  //   formik.values.imageId && imageUploaded && deleteCloudinaryImage();

  //   return () => setImageUploaded(false);
  // }, [imageUploaded]);

  return (
    <div className="">
      <div className="max-w-[300px] ">
        {label && <label className="mb-2 inline-block">{label}</label>}
        <div className="">
          {/* {formik.values.imageUrl ? (
            <button
              type="button"
              className="bg-red-700 text-white text-sm font-bold px-3 py-1.5 rounded"
              onClick={() => handleImageRemove(formik.values.imageId)}
            >
              Delete
            </button>
          ) : (
            <button
              type="button"
              onClick={() => hiddenFileInput.current?.click()}
              className="bg-green-700 text-white text-sm font-bold px-3 py-1.5 rounded"
            >
              {formik.values.imageUrl ? "Change Image" : "Add Image"}
            </button>
          )} */}
          <div className="w-[170px] h-[170px] relative bg-gray-200 dark:bg-custom-gray2 flex justify-center items-center">
            {formik.values.imageUrl ? (
              <div className="">
                <Image
                  src={formik.values.imageUrl}
                  alt="user image"
                  fill
                  className="object-cover"
                  onLoad={() => setImageLoaded(true)}
                />
                <button
                  type="button"
                  className="absolute top-1.5 right-1.5 bg-white rounded-full p-[2px] border-2 border-red-600 hover:scale-110 transition-transform duration-200"
                  onClick={() => {
                    handleImageRemove(formik.values.imageId);
                    setImageLoaded(false);
                  }}
                >
                  <XMarkIcon className="h-5 w-5 text-black" />
                </button>
                {(imageChanging || !imageLoaded) && (
                  <div className="absolute inset-0 flex justify-center items-center">
                    <Loader3 width="60" />
                  </div>
                )}
              </div>
            ) : (
              <div className="">
                {!imageChanging ? (
                  <button
                    type="button"
                    onClick={() => hiddenFileInput.current?.click()}
                    className="bg-gray-300 dark:bg-custom-gray3 text-sm font-bold px-3 py-1.5 rounded flex items-center gap-1"
                  >
                    <span className="w-6 h-6">
                      <PlusIcon />
                    </span>
                    <span className="">Add Image</span>
                  </button>
                ) : (
                  <Loader3 width="60" />
                )}
              </div>
            )}
          </div>
        </div>

        <input
          id={name}
          ref={hiddenFileInput}
          type="file"
          accept="image/*"
          className="input-field hidden"
          onChange={handleImageChange}
          // required={required}
        />
      </div>
    </div>
  );
};

// import { FormikHelpers, useFormikContext } from "formik";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import parser from "html-react-parser";
// import { XMarkIcon } from "@heroicons/react/24/solid";

// export const FileField = ({
//   label,
//   name,
//   required,
// }: // handleImageChange,
// // imagesPreview,
// // deleteImage,
// // formik,
// // selectedFiles,
// // renderImages,
// {
//   label?: string;
//   name: string;
//   required?: boolean;

//   // handleImageChange: any;
//   // formik: FormikHelpers<Values>;
// }) => {
//   // const [imageFile, setImageFile] = useState<
//   //   string | number | readonly string[] | undefined
//   // >(undefined);
//   const [imageUrl, setImageUrl] = useState("");
//   // const [imageUrl, setImageUrl] = useState<File | null>(null)

//   // useEffect(() => {
//   //   const storage = localStorage.getItem("newPost");
//   //   const storageImage = JSON.parse(storage) || "";

//   //   const image = storageImage?.image;

//   //   // console.log("storageImage", storageImage);

//   //   setImageFile(image);
//   //   formik.setFieldValue("image", image);
//   // }, []);

//   const formik = useFormikContext<FormProps>();

//   const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files || e.target.files.length === 0) {
//       // setImageFile(undefined);
//       return;
//     }

//     const image = e.target.files[0];

//     const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
//     const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME!;

//     const formData = new FormData();
//     formData.append("file", image);
//     formData.append("upload_preset", preset);
//     formData.append("cloud_name", cloud_name);
//     formData.append("folder", "nextjs13-fullstack-blog");

//     const response = await fetch(
//       `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
//       {
//         method: "POST",
//         body: formData,
//       }
//     );

//     const data = await response.json();

// if (response.ok) {
//   console.log("success", data);
//   formik.setFieldValue("imageUrl", data.secure_url);
//   // formik.setFieldValue("imageId", data.asset_id);
//   formik.setFieldValue("imageId", data.public_id);
// } else {
//   console.log("error", data);
// }

//     // setimageData({ url: resp.data.url, public_id: resp.data.public_id });

//     // const reader = new FileReader();

//     // reader.onload = function (onLoadEvent) {
//     //   // setImageSrc(onLoadEvent.target.result);
//     //   formik.setFieldValue("image", onLoadEvent.target?.result);
//     //   // setUploadData(undefined);
//     // };

//     // reader.readAsDataURL(e.target.files[0]);

//     // const files = e.target.files as FileList;
//     // const selectedFile = e.target.files[0];

//     // setImageFile(selectedFile);

//     // const localImageUrl = URL.createObjectURL(selectedFile);
//     // formik.setFieldValue("image", localImageUrl);
//     // setPreview(objectUrl);

//     // editor
//     //   ?.chain()
//     //   .focus()
//     //   .setImage({
//     //     src: objectUrl,
//     //     alt: objectUrl,
//     //     title: objectUrl,
//     //   })
//     //   .run();

//     // const reader = new FileReader();
//     // reader.readAsDataURL(selectedFile?.[0]);
//     // reader.addEventListener("load", () => {
//     //   // localStorage.setItem("recent-image", reader.result);
//     //   // setUrl(localStorage.getItem("recent-image"));
//     //   setImageStorage(reader.result);
//     // });

//     // editor
//     //   .chain()
//     //   .focus()
//     //   .setImage({
//     //     src: preview,
//     //     alt: "image alt",
//     //     title: "image title",
//     //   })
//     //   .run();
//   };

//   // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, formik: FormikHelpers<Values>) => {

//   //     const selectedFiles = e.target.files as FileList;

//   //     const selectedImage = e.target.files?.[0]

//   // };

// const handleImageRemove = async (imageId: string) => {
//   const response = await fetch(`/api/image?imageId=${imageId}`, {
//     method: "DELETE",
//   });

//   const data = await response.json();
//   if (response.ok) {
//     console.log("success", data);
//     formik.setFieldValue("imageUrl", "");
//     formik.setFieldValue("imageId", "");
//   } else {
//     console.log("error", data);
//   }
// };

//   return (
//     <div className="">
//       <div className="max-w-[300px] ">
//         <label htmlFor={name} className="mb-2  inline-block">
//           {label}
//         </label>
//         {!formik.values.imageUrl && (
//           <input
//             id={name}
//             // value={imageFile}
//             type="file"
//             accept="image/*"
//             className="input-field"
//             onChange={handleImageChange}
//             required={required}
//           />
//         )}
//       </div>
//       <div className="">
// {formik.values.imageUrl && (
//   <div className="relative w-[200px] h-[100px]">
//     <Image
//       src={formik.values.imageUrl}
//       alt="image"
//       fill
//       quality={30}
//       // width={200}
//       // height={100}
//       className="object-cover"
//     />
// <button
//   type="button"
//   className="absolute top-1 right-1 bg-white rounded-full p-[1px] border-2 border-red-600"
//   onClick={() => handleImageRemove(formik.values.imageId)}
// >
//   <XMarkIcon className="h-5 w-5 text-black" />
// </button>
//   </div>
// )}
//       </div>
//     </div>
//   );
// };
