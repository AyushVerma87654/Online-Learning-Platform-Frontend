import { memo, FC } from "react";
import { ImSpinner6 } from "react-icons/im";

interface LoadingProps {}

const Loading: FC<LoadingProps> = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <ImSpinner6 className="text-red-500 animate-spin text-7xl grow" />
    </div>
  );
};

export default memo(Loading);
