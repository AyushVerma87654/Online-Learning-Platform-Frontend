import { useField } from "formik";

export const useFormikField = (name: string) => {
  const [field, meta] = useField(name);
  const hasError = meta.touched && !!meta.error;
  return { field, touched: meta.touched, error: meta.error, hasError };
};
