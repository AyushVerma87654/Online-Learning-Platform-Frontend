import type { FC } from "react";

interface UnauthorizedPageProps {}

const UnauthorizedPage: FC<UnauthorizedPageProps> = () => {
  return (
    <div className="flex justify-center items-center h-screen text-xl">
      🚫 You don’t have permission to view this page.
    </div>
  );
};

export default UnauthorizedPage;
