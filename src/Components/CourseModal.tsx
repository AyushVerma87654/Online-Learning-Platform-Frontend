import type { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../redux/store";
import { selectedCourseSelector } from "../redux/selectors/courseSelector";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Button from "./Button";
import { useNavigate } from "react-router";

interface CourseModalProps extends ReduxProps {
  isOpen: boolean;
  closeModal: () => void;
}

export const CourseModal: FC<CourseModalProps> = ({
  isOpen,
  closeModal,
  course,
}) => {
  if (!isOpen) return null;

  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center w-full h-full z-50 outline bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-between bg-white rounded-xl max-w-5xl p-12 shadow-lg w-[50%] h-[50%] outline">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 w-full">
          <h2 className="text-2xl font-semibold">{course?.title}</h2>
          <IoMdCloseCircleOutline
            onClick={closeModal}
            size={26}
            className="cursor-pointer text-blue-600 hover:text-rose-600"
          />
        </div>

        {/* Course Info */}
        <div className="space-y-2 mb-6">
          <p className="text-gray-700">
            <span className="font-semibold">Description:</span>
            {course?.description || "-"}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Number of Modules:</span>
            {course?.modules.length}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={() => {
              closeModal();
              navigate(`/course/edit/${course.id}`);
            }}
            className="bg-blue-500! text-white px-4 py-2 w-36! hover:bg-blue-700!"
          >
            Edit Course
          </Button>

          <Button
            onClick={() => {
              navigate(`/quiz/edit/${course.id}`);
            }}
            className="bg-purple-500! text-white px-4 py-2 w-36! hover:bg-purple-700! transition"
          >
            Edit Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  course: selectedCourseSelector(state),
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(CourseModal);
