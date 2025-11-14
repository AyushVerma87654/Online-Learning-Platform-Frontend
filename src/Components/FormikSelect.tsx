import type { FC, ReactNode, SelectHTMLAttributes } from "react";
import { useFormikField } from "../utils/useFormikField";

interface FormikSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  labelId?: string;
  label?: string;
  name: string;
  children?: ReactNode;
}

const FormikSelect: FC<FormikSelectProps> = ({
  labelId,
  label,
  name,
  children,
  className = "",
}) => {
  const { field } = useFormikField(name);
  const inputId = labelId || name;
  return (
    <div className="flex-1 min-w-[200px]">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-gray-700 font-medium mb-2"
        >
          {label}
        </label>
      )}
      <select
        {...field}
        className={`w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      >
        {children}
      </select>
    </div>
  );
};

export default FormikSelect;
