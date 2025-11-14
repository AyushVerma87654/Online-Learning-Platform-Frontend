import { FC, InputHTMLAttributes } from "react";

type InputProps = {
  labelId?: string;
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input: FC<InputProps> = ({
  label,
  labelId,
  className,
  name,
  value = "",
  ...rest
}) => {
  const inputId = labelId || name;
  return (
    <div>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-gray-700 font-medium mb-2"
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        value={value}
        {...rest}
        className={
          "focus:outline-none rounded-md border-2 w-full px-3 h-12 focus:border-blue-500 cursor-pointer " +
          className
        }
      />
    </div>
  );
};

export default Input;
