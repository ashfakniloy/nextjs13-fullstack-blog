// import useAutosizeTextArea from "@/hooks/useAutoResizeTextarea";
// import { Field, useFormikContext } from "formik";
// import { useRef } from "react";

// type ProfileProps = {
//   imageUrl: string;
//   imageId: string;
//   username: string;
//   bio: string;
//   facebook: string;
//   twitter: string;
// };

// export const TextAreaField = ({
//   label,
//   name,
//   ...props
// }: {
//   label: string;
//   name: string;
//   props?: string[];
// }) => {
//   const {
//     values: { bio },
//     setFieldValue,
//   } = useFormikContext<ProfileProps>();

//   const textAreaRef = useRef<HTMLTextAreaElement>(null);

//   useAutosizeTextArea(textAreaRef.current, bio);

//   const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setFieldValue("bio", e.target.value);
//   };

//   return (
//     <div>
//       <label htmlFor={name} className="mb-2 inline-block">
//         {label}
//       </label>
//       <textarea
//         ref={textAreaRef}
//         // rows={1}
//         className="input-field overflow-hidden min-h-[100px] resize-none"
//         id={name}
//         value={bio}
//         name={name}
//         {...props}
//         onChange={handleChange}
//       />
//     </div>
//   );
// };

import useAutosizeTextArea from "@/hooks/useAutoResizeTextarea";
import { useFormikContext } from "formik";
import { useRef } from "react";

type ProfileProps = {
  imageUrl: string;
  imageId: string;
  username: string;
  bio: string;
  facebook: string;
  twitter: string;
};

export const TextAreaField = ({
  label,
  placeholder,
  name,
  value,
  required,
  ...props
}: {
  label?: string;
  placeholder?: string;
  name: string;
  value: string;
  required?: boolean;
  props?: string[];
}) => {
  const { setFieldValue } = useFormikContext<ProfileProps>();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFieldValue(name, e.target.value);
  };

  const minHeight = `min-h-[80px]`;

  return (
    <div>
      {label && (
        <label htmlFor={name} className="mb-2 inline-block">
          {label}
        </label>
      )}
      <div className="">
        <textarea
          ref={textAreaRef}
          rows={1}
          placeholder={placeholder}
          className={`input-field overflow-hidden resize-none ${minHeight}`}
          id={name}
          value={value}
          name={name}
          onChange={handleChange}
          required={required}
          {...props}
        />
      </div>
    </div>
  );
};
