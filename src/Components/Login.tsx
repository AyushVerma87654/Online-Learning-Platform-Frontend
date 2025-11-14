import { FormikProps, withFormik } from "formik";
import { FC } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { connect, ConnectedProps } from "react-redux";
import { LoginPayload } from "../models/user";
import { AppState } from "../redux/store";
import Button from "./Button";
import { loginInitiatedAction } from "../redux/slice/userSlice";
import FormikInput from "./FormikInput";

const initialValues: LoginPayload = { email: "", password: "" };

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(4).max(25).required(),
});

interface LoginProps extends ReduxProps {}

const Login: FC<LoginProps & FormikProps<LoginPayload>> = ({
  handleSubmit,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-orange-300 via-red-300 to-yellow-300">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Login to access your account
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormikInput name="email" label="Email Address" />
          <FormikInput name="password" type="password" label="Enter Password" />
          <Button
            type="submit"
            className="w-full mt-4 hover:bg-orange-600 transition cursor-pointer"
          >
            LOG IN
          </Button>
        </form>
        <p className="text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-orange-500 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

const FormikHOC = withFormik<LoginProps, LoginPayload>({
  mapPropsToValues: () => initialValues,
  validationSchema: schema,
  handleSubmit: (values, { props }) => {
    props.loginUser(values);
  },
  validateOnMount: true,
})(Login);

const mapStateToProps = (_state: AppState) => ({});
const mapDispatchToProps = {
  loginUser: loginInitiatedAction,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(FormikHOC);
