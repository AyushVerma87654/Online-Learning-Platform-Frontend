import { useNavigate } from "react-router-dom";
import { IoMdCloseCircleOutline } from "react-icons/io";
import type { FC } from "react";

interface PaymentFailedPageProps {}

const PaymentFailedPage: FC<PaymentFailedPageProps> = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-rose-50">
      <IoMdCloseCircleOutline className="text-rose-600 text-6xl mb-4" />
      <h1 className="text-3xl font-bold text-rose-700 mb-2">
        Payment Cancelled
      </h1>
      <p className="text-gray-700 mb-6">
        It seems you canceled or something went wrong.
      </p>

      <button
        onClick={() => navigate("/pricing")}
        className="bg-rose-600 text-white px-6 py-2 rounded-md hover:bg-rose-700 transition"
      >
        Try Again
      </button>
    </div>
  );
};

export default PaymentFailedPage;
