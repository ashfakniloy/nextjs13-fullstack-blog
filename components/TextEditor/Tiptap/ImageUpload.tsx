import { useEffect, useState } from "react";
import type { Editor } from "@tiptap/react";
import useLocalStorage from "@/hooks/useLocalStorage";

function ImageUpload({ editor }: { editor: Editor | null }) {
  const [showImageModal, setShowImageModal] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imageStorage, setImageStorage] = useLocalStorage<
    string | ArrayBuffer | null
  >("image", null);

  const [preview, setPreview] = useState<string | null>(null);
  // const [preview, setPreview] = useLocalStorage("preview", "");

  // useEffect(() => {
  //   const reader = new FileReader();

  //   // reader.readAsDataURL(image);

  //   // reader.addEventListener("load", () => {
  //   //   localStorage.setItem("thumbnail", reader.result);
  //   // });

  //   reader.addEventListener("load", () => {
  //     // localStorage.setItem("recent-image", reader.result);
  //     // setUrl(localStorage.getItem("recent-image"));
  //     setImageStorage(reader.result);
  //   });
  // }, [image]);

  // useEffect(() => {
  //   if (!image) {
  //     setPreview(null);
  //     return;
  //   }

  //   const objectUrl = URL.createObjectURL(image);
  //   setPreview(objectUrl);

  //   console.log("image", image);

  //   // if (!preview) return;

  //   // editor
  //   //   .chain()
  //   //   .focus()
  //   //   .setImage({
  //   //     src: preview,
  //   //     alt: "image alt",
  //   //     title: "image title",
  //   //   })
  //   //   .run();

  //   // free memory when ever this component is unmounted
  //   return () => URL.revokeObjectURL(objectUrl);
  // }, [image]);

  // console.log("preview", preview);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImage(null);
      return;
    }

    // const selectedFile = e.target.files as FileList;
    // setImage(selectedFile?.[0]);

    // const objectUrl = URL.createObjectURL(selectedFile?.[0]);
    // setPreview(objectUrl);

    // editor
    //   ?.chain()
    //   .focus()
    //   .setImage({
    //     src: objectUrl,
    //     alt: objectUrl,
    //     title: objectUrl,
    //   })
    //   .run();

    // const reader = new FileReader();
    // reader.readAsDataURL(selectedFile?.[0]);
    // reader.addEventListener("load", () => {
    //   // localStorage.setItem("recent-image", reader.result);
    //   // setUrl(localStorage.getItem("recent-image"));
    //   setImageStorage(reader.result);
    // });

    // editor
    //   .chain()
    //   .focus()
    //   .setImage({
    //     src: preview,
    //     alt: "image alt",
    //     title: "image title",
    //   })
    //   .run();
  };

  // useEffect(() => {
  //   if (!preview) return;
  //   editor
  //     ?.chain()
  //     .focus()
  //     .setImage({
  //       src: `${preview}`,
  //       alt: preview,
  //       title: "image title",
  //     })
  //     .run();
  // }, [preview]);

  return (
    <div className="relative">
      <button className="" onClick={() => setShowImageModal(!showImageModal)}>
        Image
      </button>
      {showImageModal && (
        <div className="absolute mt-2 p-2 bg-gray-600 z-10">
          <p className="mb-2">Upload Image</p>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
