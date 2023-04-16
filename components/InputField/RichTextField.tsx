import { Field, FormikValues, useFormikContext } from "formik";
import { useEffect } from "react";
import Tiptap from "../TextEditor/Tiptap";

export const RichTextField = ({
  label,
  name,
  required,
  ...props
}: {
  label: string;
  name: string;
  required?: boolean;
  props?: string[];
}) => {
  const formik = useFormikContext<FormProps>();

  return (
    <div className="">
      <label htmlFor={name} className="mb-2 inline-block">
        {label}
      </label>

      <Field
        className="input-field"
        id={name}
        name={name}
        // required={required}
        {...props}
      >
        {({ field }: { field: any }) => (
          <Tiptap
            article={field.value}
            setArticle={field.onChange(field.name)}
          />
        )}
      </Field>

      {/* <Tiptap
        article={formik.values.article}
        setArticle={formik.setFieldValue}
      /> */}
    </div>
  );
};
