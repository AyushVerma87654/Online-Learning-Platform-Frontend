import { FC, InputHTMLAttributes } from "react";
import Input from "./Input";
import { useFormikField } from "../utils/useFormikField";

type FormikInputProps = {
  labelId?: string;
  label?: string;
  name: string;
  showInput?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const FormikInput: FC<FormikInputProps> = ({
  labelId,
  label,
  name,
  className = "",
  showInput = true,
  ...rest
}) => {
  const { field, error, hasError } = useFormikField(name);
  return (
    <div>
      {showInput && (
        <Input
          {...rest}
          {...field}
          name={name}
          label={label}
          labelId={labelId}
          className={`${
            hasError ? "border-red-500" : "border-gray-300"
          } ${className}`}
        />
      )}
      {hasError && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default FormikInput;
