import { Field } from "formik";

export const TextField = ({
  label,
  name,
  placeholder,
  type = "text",
  required,
  ...props
}: {
  label?: string | JSX.Element;
  placeholder?: string;
  name: string;
  props?: string[];
  type?: string;
  required?: boolean;
}) => {
  return (
    <div className="">
      <label htmlFor={name} className="mb-2 inline-block">
        {label}
      </label>

      <Field
        className="input-field"
        placeholder={placeholder}
        id={name}
        name={name}
        type={type}
        {...props}
        required={required}
      />
    </div>
  );
};
