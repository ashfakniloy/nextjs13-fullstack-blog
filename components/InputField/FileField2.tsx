import { FormikHelpers, useFormikContext } from "formik";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export const FileField2 = ({
  label,
  name,
  profileId,
  required,
}: // setImageFile,
// setImagePreview,
{
  label?: string;
  name: string;
  profileId: string;
  required?: boolean;
  // setImageFile: React.Dispatch<React.SetStateAction<string | Blob>>;
  // setImagePreview: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const formik = useFormikContext<FormProps>();
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      // setImageFile(undefined);
      return;
    }

    const toastProfileImageUpdate = toast.loading("Loading...");

    const image = e.target.files[0];

    const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME!;

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", preset);
    formData.append("cloud_name", cloud_name);
    formData.append("folder", "nextjs13-fullstack-blog");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    const imageValues = {
      imageUrl: data.secure_url,
      imageId: data.public_id,
    };

    if (response.ok) {
      console.log("success", data);
      setImageUploaded(true);

      const submitProfileChange = async () => {
        const url = `/api/profile?profileId=${profileId}`;
        const response2 = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(imageValues),
        });

        const data2 = await response2.json();

        // console.log("submit", values);

        // return;

        if (response2.ok) {
          console.log("success2", data2);
          toast.success("Changed Image successfully", {
            id: toastProfileImageUpdate,
          });

          router.refresh();
        } else {
          console.log("error2", data2);
          toast.error("Something went wrong", {
            id: toastProfileImageUpdate,
          });
        }
      };
      submitProfileChange();
      router.refresh();
    } else {
      console.log("error", data);
    }
  };

  const handleImageRemove = async () => {
    const toastProfileImageDelete = toast.loading("Loading...");
    const imageId = formik.values.imageId;

    const response = await fetch(`/api/image?imageId=${imageId}`, {
      method: "DELETE",
    });

    const data = await response.json();

    const emptyImageValues = {
      imageUrl: "",
      imageId: "",
    };

    if (response.ok) {
      const imageDelete = async () => {
        const url = `/api/profile?profileId=${profileId}`;
        const response2 = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emptyImageValues),
        });

        const data2 = await response2.json();

        // console.log("submit", values);

        // return;

        if (response2.ok) {
          console.log("delete success", data2);
          toast.success("Changed Image successfully", {
            id: toastProfileImageDelete,
          });

          router.refresh();
        } else {
          console.log("delete error", data2);
          toast.error("Something went wrong", {
            id: toastProfileImageDelete,
          });
        }
      };
      imageDelete();
      router.refresh();
      console.log("success", data);
      toast.success("Imaged deleted successfully", {
        id: toastProfileImageDelete,
      });
      // formik.setFieldValue("imageUrl", "");
      // formik.setFieldValue("imageId", "");
    } else {
      console.log("error", data);
      toast.error("Something went wrong", {
        id: toastProfileImageDelete,
      });
    }
  };

  useEffect(() => {
    // !formik.values.imageId
    const deleteCloudinaryImage = async () => {
      const imageId = formik.values.imageId;
      const response = await fetch(`/api/image?imageId=${imageId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        console.log("success deleted cloudinary image", data);
      } else {
        console.log("error deleted cloudinary image", data);
      }
    };

    formik.values.imageId && imageUploaded && deleteCloudinaryImage();

    return () => setImageUploaded(false);
  }, [imageUploaded]);

  return (
    <div className="">
      <div className="max-w-[300px] ">
        <label htmlFor={name} className="mb-2  inline-block">
          {label}
        </label>
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => hiddenFileInput.current?.click()}
            className="bg-green-700 text-white text-sm font-bold px-3 py-1.5 rounded"
          >
            {formik.values.imageUrl ? "Change" : "Add Profile Picture"}
          </button>
          {formik.values.imageUrl && (
            <button
              type="button"
              className="bg-red-700 text-white text-sm font-bold px-3 py-1.5 rounded"
              onClick={handleImageRemove}
            >
              Delete
            </button>
          )}
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
      {/* <div className="">
        {formik.values.imageUrl && (
          <div className="relative w-[200px] h-[100px]">
            <Image
              src={formik.values.imageUrl}
              alt="image"
              fill
              quality={30}
              // width={200}
              // height={100}
              className="object-cover"
            />
            <button
              type="button"
              className="absolute top-1 right-1 bg-white rounded-full p-[1px] border-2 border-red-600"
              onClick={() => handleImageRemove(formik.values.imageId)}
            >
              <XMarkIcon className="h-5 w-5 text-black" />
            </button>
          </div>
        )}
      </div> */}
    </div>
  );
};
