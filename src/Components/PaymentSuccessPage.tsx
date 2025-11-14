import { type FC } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

interface PaymentSuccessPageProps {}

const PaymentSuccessPage: FC<PaymentSuccessPageProps> = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <IoMdCheckmarkCircleOutline className="text-green-600 text-6xl mb-4" />
      <h1 className="text-3xl font-bold text-green-700 mb-2">
        Payment Successful!
      </h1>
      <p className="text-gray-700 mb-6">Thank you for your purchase.</p>

      <button
        onClick={() => navigate("/dashboard")}
        className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default PaymentSuccessPage;
