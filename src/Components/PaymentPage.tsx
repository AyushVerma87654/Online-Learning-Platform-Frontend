import { motion } from "framer-motion";
import type { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../redux/store";
import { paymentInitiatedAction } from "../redux/slice/userSlice";

interface PaymentPageProps extends ReduxProps {}

const PaymentPage: FC<PaymentPageProps> = ({ initiatePayment }) => {
  const handleStripeCheckout = () => {
    initiatePayment();
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" },
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f9fc",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: "2rem", color: "#222" }}
      >
        Choose Your Plan
      </motion.h1>

      <div
        style={{
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* Free Plan */}
        <motion.div
          className="plan-card"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          transition={{ duration: 0.3 }}
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "2rem",
            width: "260px",
            textAlign: "center",
            border: "1px solid #e0e0e0",
          }}
        >
          <h2>Free</h2>
          <p>Access basic features and projects.</p>
          <h3 style={{ fontSize: "2rem", margin: "1rem 0" }}>₹0</h3>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "0.7rem 1.5rem",
              background: "#ccc",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            onClick={() => alert("You chose the free plan!")}
          >
            Get Started
          </motion.button>
        </motion.div>

        {/* Premium Plan */}
        <motion.div
          className="plan-card"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          transition={{ duration: 0.3 }}
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "2rem",
            width: "260px",
            textAlign: "center",
            border: "1px solid #e0e0e0",
          }}
        >
          <h2>Premium</h2>
          <p>Unlock all features and priority support.</p>
          <h3 style={{ fontSize: "2rem", margin: "1rem 0" }}>₹50 / month</h3>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStripeCheckout}
            style={{
              padding: "0.7rem 1.5rem",
              background: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Subscribe
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

const mapStateToProps = (_state: AppState) => ({});

const mapDispatchToProps = {
  initiatePayment: paymentInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(PaymentPage);
