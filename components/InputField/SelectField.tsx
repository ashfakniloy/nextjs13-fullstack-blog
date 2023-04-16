import { Field } from "formik";

export const SelectField = ({
  label,
  placeholder,
  name,
  options,
  value,
  required,
}: {
  label?: string | JSX.Element;
  placeholder?: string;
  name: string;
  value?: string;
  options: string[];
  required?: boolean;
}) => {
  return (
    <div className="w-[300px]">
      <label htmlFor={name} className="mb-2 inline-block">
        {label}
      </label>

      <Field
        type="text"
        as="select"
        placeholder={placeholder}
        id={name}
        name={name}
        required={required}
        className="input-field capitalize"
      >
        <option value="" className="text-slate-400" defaultValue="true" hidden>
          {value ? value : placeholder}
        </option>

        {options ? (
          options.map((option, i) => (
            <option key={i} value={option} className="">
              {option}
            </option>
          ))
        ) : (
          <option value="" className=""></option>
        )}
      </Field>
    </div>
  );
};
