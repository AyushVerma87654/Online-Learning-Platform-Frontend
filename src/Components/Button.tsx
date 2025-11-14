import { FC, ButtonHTMLAttributes, memo } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({
  children,
  type,
  disabled,
  onClick,
  className,
}) => {
  return (
    <button
      className={
        "bg-orange-500 text-white rounded-md flex items-center justify-center w-full min-h-10 font-semibold disabled:bg-orange-300 cursor-pointer " +
        className
      }
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default memo(Button);
