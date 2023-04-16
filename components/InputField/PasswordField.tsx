import { useState } from "react";
import { Field } from "formik";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export const PasswordField = ({
  label,
  name,
  placeholder,
  ...props
}: {
  label?: string | JSX.Element;
  placeholder?: string;
  name: string;
  props?: string[];
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="">
      <label htmlFor={name} className="mb-2 inline-block">
        {label}
      </label>

      <div className="relative">
        <Field
          className="input-field"
          placeholder={placeholder}
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          {...props}
          autoComplete="on"
          required
        />
        <div className="absolute inset-y-0 flex items-center right-[1px]">
          <div
            className="bg-gray-200 dark:bg-custom-gray2 py-1 px-2"
            onClick={() => setShowPassword(!showPassword)}
          >
            <button
              type="button"
              className="p-[6px] h-[30px] w-[30px] text-gray-600 dark:text-gray-400 cursor-pointer hover:bg-gray-300 active:bg-gray-300/50 dark:hover:bg-gray-700 dark:active:bg-gray-700/50 rounded-full"
            >
              {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
