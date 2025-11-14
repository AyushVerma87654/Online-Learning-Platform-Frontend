import { FormikProps, withFormik } from "formik";
import { FC } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { connect, ConnectedProps } from "react-redux";
import FormikInput from "./FormikInput";
import { SignupPayload, UserRole } from "../models/user";
import { AppState } from "../redux/store";
import Button from "./Button";
import { signupInitiatedAction } from "../redux/slice/userSlice";
import FormikSelect from "./FormikSelect";

const schema = Yup.object().shape({
  name: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  role: Yup.mixed<UserRole>()
    .oneOf(
      [UserRole.STUDENT, UserRole.INSTRUCTOR, UserRole.ADMIN],
      "Select a valid role"
    )
    .required("Role is required"),
  password: Yup.string()
    .min(4, "Minimum 4 chars")
    .max(25, "Maximum 25 chars")
    .required("Password required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
});

const initialValues: SignupPayload = {
  name: "",
  email: "",
  role: UserRole.STUDENT,
  password: "",
  confirmPassword: "",
};

interface SignupProps extends ReduxProps {}

const Signup: FC<SignupProps & FormikProps<SignupPayload>> = ({
  handleSubmit,
  resetForm,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-orange-100 via-red-100 to-blue-100">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-4xl p-8">
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">
          Create Your Account
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Sign up to get started with our platform
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: Name + Email */}
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <FormikInput label="Full Name" name="name" />
            </div>
            <div className="flex-1 min-w-[200px]">
              <FormikInput label="Email Address" name="email" />
            </div>
          </div>

          {/* Row 2: Password + Confirm Password */}
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <FormikInput label="Password" name="password" type="password" />
            </div>
            <div className="flex-1 min-w-[200px]">
              <FormikInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
              />
            </div>
          </div>

          {/* Row 3: Role */}
          <FormikSelect name="role" label="Role">
            <option value={UserRole.STUDENT}>Student</option>
            <option value={UserRole.INSTRUCTOR}>Instructor</option>
            <option value={UserRole.ADMIN}>Admin</option>
          </FormikSelect>

          {/* Row 4: Buttons */}
          <div className="flex gap-4 flex-wrap mt-4">
            <div className="flex-1 min-w-[150px]">
              <Button
                type="submit"
                className="w-full bg-linear-to-r from-orange-400 to-red-400 shadow-lg hover:from-orange-500 hover:to-red-500 transition cursor-pointer"
              >
                SIGN UP
              </Button>
            </div>
            <div className="flex-1 min-w-[150px]">
              <Button
                type="button"
                onClick={() => resetForm()}
                className="w-full border border-gray-300 text-gray-700 hover:bg-orange-600 transition cursor-pointer"
              >
                RESET
              </Button>
            </div>
          </div>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-500 font-semibold hover:underline"
          >
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};

const FormikHOC = withFormik<SignupProps, SignupPayload>({
  mapPropsToValues: () => initialValues,
  handleSubmit: (values, { props }) => {
    props.signupUser(values);
  },
  validationSchema: schema,
  validateOnMount: true,
})(Signup);

const mapStateToProps = (_state: AppState) => ({});
const mapDispatchToProps = {
  signupUser: signupInitiatedAction,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(FormikHOC);
