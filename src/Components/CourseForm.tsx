import { FC, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { withFormik, FormikProps, FieldArray } from "formik";
import * as Yup from "yup";
import FormikInput from "./FormikInput";
import Button from "./Button";
import { AppState } from "../redux/store";
import {
  addCourseInitiatedAction,
  editCourseInitiatedAction,
  removeUploadedVideoUrlAction,
  uploadVideoInitiatedAction,
} from "../redux/slice/courseSlice";
import { RiVideoUploadLine } from "react-icons/ri";
import { FiCheckCircle } from "react-icons/fi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import {
  moduleVideoUrlEntitySelector,
  selectedCourseIdSelector,
  selectedCourseSelector,
} from "../redux/selectors/courseSelector";
import { Course } from "../models/course";
import { userSelector } from "../redux/selectors/userSelector";

interface CourseFormValues extends Course {}

interface CourseFormProps extends ReduxProps {}

const schema = Yup.object().shape({
  title: Yup.string().required("Course title is required"),
  description: Yup.string().required("Course description is required"),
  instructorId: Yup.string().required(),
  isPremiumCourse: Yup.boolean().required(),
  modules: Yup.array().of(
    Yup.object().shape({
      id: Yup.string(),
      title: Yup.string().required("Module title is required"),
      description: Yup.string().required("Module description is required"),
      videoUrl: Yup.string().required("Module video is required"),
    })
  ),
});

const CourseForm: FC<CourseFormProps & FormikProps<CourseFormValues>> = ({
  values,
  handleSubmit,
  setFieldValue,
  uploadVideo,
  uploadedVideoUrl,
  removeUploadedVideoUrl,
  editingCourseId,
  user,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<Record<string, File>>({});
  useEffect(() => {
    if (!uploadedVideoUrl) return;
    values.modules.forEach((module, index) => {
      const url = uploadedVideoUrl[module.id];
      if (url && module.videoUrl !== url) {
        setFieldValue(`modules[${index}].videoUrl`, url);
      }
    });
    setFieldValue("instructorId", user.id);
  }, [uploadedVideoUrl]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFiles((prev) => ({ ...prev, [id]: file }));
    uploadVideo({ id, file });
  };

  const removeFile = (index: number, id: string) => {
    setSelectedFiles((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
    setFieldValue(`modules[${index - 1}].videoUrl`, "");
    removeUploadedVideoUrl(id);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8 space-y-6 border border-gray-100"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        {editingCourseId ? "Update Course" : "Create a New Course"}
      </h2>
      <FormikInput name="title" label="Course Title" />
      <FormikInput name="description" label="Course Description" />

      <FieldArray name="modules">
        {({ push, remove }) => (
          <div className="space-y-6">
            {values.modules.map((module, index) => (
              <div
                key={module.id}
                className="relative p-4 border rounded-lg bg-gray-50 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <div className="block text-gray-700 font-medium">
                    Module {index + 1}
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-600 cursor-pointer"
                      onClick={() => {
                        remove(index);
                        removeFile(index, module.id);
                      }}
                    >
                      <IoMdCloseCircleOutline size={24} />
                    </button>
                  )}
                </div>

                <FormikInput name={`modules[${index}].title`} label="Title" />
                <FormikInput
                  name={`modules[${index}].description`}
                  label="Description"
                />

                <div className="flex items-center gap-4 flex-wrap">
                  <label className="flex flex-col items-center justify-center px-4 py-4 bg-orange-50 text-orange-600 rounded-lg border-2 border-dashed border-orange-300 cursor-pointer hover:bg-orange-100 w-40 text-center">
                    <RiVideoUploadLine className="w-6 h-6 mb-1" />
                    <span className="text-sm font-medium">Choose File</span>
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, module.id)}
                    />
                  </label>

                  {selectedFiles[module.id] || module.videoUrl ? (
                    <div className="relative flex flex-col items-center justify-center p-2 bg-green-50 text-green-700 rounded-lg border-2 border-dashed border-green-300 w-40 text-center transition">
                      <button
                        type="button"
                        onClick={() => removeFile(index, module.id)}
                        className="absolute top-0 right-0 text-red-500 hover:text-red-700 transition cursor-pointer"
                      >
                        <IoMdCloseCircleOutline className="w-5 h-5" />
                      </button>
                      <FiCheckCircle className="w-6 h-6 mb-1 text-green-500" />
                      <span className="text-xs font-medium truncate max-w-[120px]">
                        {selectedFiles[module.id]?.name || "Existing Video"}
                      </span>
                      <span className="text-[10px] mt-1 font-semibold text-green-500">
                        {module.videoUrl ? "Uploaded" : "Uploading..."}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center px-4 py-4 bg-gray-50 text-gray-500 rounded-lg border-2 border-dashed border-gray-300 w-40 text-center transition">
                      <RiVideoUploadLine className="w-6 h-6 mb-1 text-gray-400" />
                      <span className="text-sm font-medium">
                        No file selected
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => {
                const lastModule = values.modules[values.modules.length - 1];
                const nextId = lastModule ? lastModule.id + 1 : 1;
                push({ id: nextId, title: "", description: "", videoUrl: "" });
              }}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Add Module
            </button>
          </div>
        )}
      </FieldArray>

      <Button
        type="submit"
        className="w-full py-3 rounded-md font-semibold text-white transition"
      >
        {editingCourseId ? "Update Course" : "Submit Course"}
      </Button>
    </form>
  );
};

const mapStateToProps = (state: AppState) => ({
  uploadedVideoUrl: moduleVideoUrlEntitySelector(state),
  editingCourseId: selectedCourseIdSelector(state),
  editingCourse: selectedCourseSelector(state),
  user: userSelector(state),
});

const mapDispatchToProps = {
  uploadVideo: uploadVideoInitiatedAction,
  removeUploadedVideoUrl: removeUploadedVideoUrlAction,
  initiateAddCourse: addCourseInitiatedAction,
  initiateEditCourse: editCourseInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

const FormikHOC = withFormik<CourseFormProps, CourseFormValues>({
  mapPropsToValues: (props) =>
    props.editingCourse || {
      id: "",
      title: "",
      description: "",
      instructorId: props.user.id,
      isPremiumCourse: false,
      modules: [{ id: 1, title: "", description: "", videoUrl: "" }],
    },
  validationSchema: schema,
  handleSubmit: (values, { props }) =>
    props.editingCourseId
      ? props.initiateEditCourse(values)
      : props.initiateAddCourse(values),
  validateOnMount: true,
})(CourseForm);

export default connector(FormikHOC);
