import { FormikHelpers, useFormikContext } from "formik";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Loader3 } from "../Loaders/Loader";

export const FileField3 = ({
  label,
  name,
  required,
}: {
  label?: string;
  name: string;
  required?: boolean;
}) => {
  const formik = useFormikContext<FormProps>();
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const [imageChanging, setImageChanging] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageWillDelete, setImageWillDelete] = useState("");

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

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
      formik.setFieldValue("imageUrl", data.secure_url);

      formik.setFieldValue("imageId", data.public_id);

      const deleteCloudinaryImage = async () => {
        const response = await fetch(`/api/image?imageId=${imageWillDelete}`, {
          method: "DELETE",
        });

        const data = await response.json();
        if (response.ok) {
          console.log("success delete", data);
        } else {
          console.log("error delete", data);
        }
      };

      imageWillDelete && deleteCloudinaryImage();
    } else {
      console.log("error", data);
    }

    setImageChanging(false);
  };

  const handleImageRemove = async (imageId: string) => {
    formik.setFieldValue("imageUrl", "");
    formik.setFieldValue("imageId", "");
    setImageWillDelete(imageId);

    // setImageChanging(true);
    // const response = await fetch(`/api/image?imageId=${imageId}`, {
    //   method: "DELETE",
    // });

    // const data = await response.json();
    // if (response.ok) {
    //   // console.log("success", data);
    //   formik.setFieldValue("imageUrl", "");
    //   formik.setFieldValue("imageId", "");
    // } else {
    //   console.log("error", data);
    // }

    // setImageChanging(false);
  };

  // useEffect(() => {
  //   const deleteCloudinaryImage = async () => {
  //     setImageChanging(true);
  //     const response = await fetch(`/api/image?imageId=${imageWillDelete}`, {
  //       method: "DELETE",
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       // console.log("success", data);
  //       formik.setFieldValue("imageUrl", "");
  //       formik.setFieldValue("imageId", "");
  //     } else {
  //       console.log("error", data);
  //     }

  //     setImageChanging(false);
  //   };

  //   formik.isSubmitting && imageWillDelete && deleteCloudinaryImage();
  // }, [formik.isSubmitting]);

  return (
    <div className="">
      <div className="max-w-[300px] ">
        {label && <label className="mb-2 inline-block">{label}</label>}
        <div className="">
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
          required={required}
        />
      </div>
    </div>
  );
};
