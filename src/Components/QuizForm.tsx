import { FC, useState, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { withFormik, FormikProps, FieldArray } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import FormikInput from "./FormikInput";
import Button from "./Button";
import { AppState } from "../redux/store";
import { userSelector } from "../redux/selectors/userSelector";
import { selectedCourseSelector } from "../redux/selectors/courseSelector";
import {
  addQuizInitiatedAction,
  editQuizInitiatedAction,
} from "../redux/slice/quizSlice";
import { Quiz } from "../models/quiz";
import { selectedQuizSelector } from "../redux/selectors/quizSelector";

/* ------------------ Validation Schema ------------------ */
const schema = Yup.object().shape({
  title: Yup.string().required("Quiz title is required"),
  description: Yup.string().required("Quiz description is required"),
  courseId: Yup.string().required(),
  moduleId: Yup.string().required(),
  questions: Yup.array()
    .of(
      Yup.object().shape({
        question: Yup.string().required("Question text is required"),
        options: Yup.array()
          .of(Yup.string().required("Option cannot be empty"))
          .min(2, "At least two options required"),
        correctAnswer: Yup.string().required("Correct answer is required"),
      })
    )
    .min(1, "Add at least one question"),
});

/* ------------------ Framer Motion Variants ------------------ */
const cardEnter = { opacity: 0, y: 12 };
const cardAnimate = { opacity: 1, y: 0 };
const cardExit = { opacity: 0, scale: 0.98 };

/* ------------------ Form Component ------------------ */
const QuizForm: FC<QuizFormProps & FormikProps<QuizFormValues>> = ({
  values,
  handleSubmit,
  quiz,
  setFieldValue,
}) => {
  const [openMap, setOpenMap] = useState<Record<number, boolean>>(
    () =>
      values.questions?.reduce(
        (acc: Record<number, boolean>, _q: any, i: number) => {
          acc[i] = true;
          return acc;
        },
        {}
      ) || {}
  );

  useEffect(() => {
    if (!values.questions) return;
    setOpenMap((prev) => {
      const next = { ...prev };
      values.questions.forEach((_q, i) => {
        if (next[i] === undefined) next[i] = true;
      });
      return next;
    });
  }, [values.questions?.length]);

  const toggleQuestion = (index: number) =>
    setOpenMap((prev) => ({ ...prev, [index]: !prev[index] }));

  const questionCount = values.questions?.length || 0;

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8 space-y-6 border border-gray-100"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        {quiz?.id ? "Update Quiz" : "Create a New Quiz"}
      </h2>

      <FormikInput name="title" label="Quiz Title" />
      <FormikInput name="description" label="Quiz Description" />

      {/* Questions */}
      <FieldArray name="questions">
        {({ push, remove }) => (
          <div className="space-y-8">
            <AnimatePresence>
              {values.questions.map((q, qIndex) => (
                <motion.div
                  key={qIndex}
                  initial={cardEnter}
                  animate={cardAnimate}
                  exit={cardExit}
                  layout
                  transition={{ duration: 0.18 }}
                  className="relative p-6 border rounded-lg bg-gray-50 space-y-4"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-gray-700 font-medium">
                        Question {qIndex + 1}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 cursor-pointer select-none">
                      {openMap[qIndex] ? (
                        <FiChevronUp
                          size={24}
                          className="text-gray-600"
                          onClick={() => toggleQuestion(qIndex)}
                        />
                      ) : (
                        <FiChevronDown
                          size={24}
                          className="text-gray-600"
                          onClick={() => toggleQuestion(qIndex)}
                        />
                      )}
                      {qIndex > 0 ? (
                        <IoMdCloseCircleOutline
                          size={24}
                          className="text-red-500 hover:text-red-600"
                          onClick={() => remove(qIndex)}
                        />
                      ) : (
                        <div className="w-[23px]" />
                      )}
                    </div>
                  </div>

                  {/* Collapsible Content */}
                  <AnimatePresence initial={false}>
                    {openMap[qIndex] && (
                      <motion.div
                        key={`content-${qIndex}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.18 }}
                        className="overflow-hidden space-y-4"
                      >
                        <FormikInput
                          name={`questions[${qIndex}].question`}
                          label="Question"
                        />

                        {/* Options */}
                        <FieldArray name={`questions[${qIndex}].options`}>
                          {({ push: pushOption, remove: removeOption }) => (
                            <div className="space-y-2">
                              <div className="grid grid-cols-2 gap-2">
                                {q.options.map((_, optIndex) => (
                                  <div
                                    key={optIndex}
                                    className="flex items-center gap-3"
                                  >
                                    <FormikInput
                                      name={`questions[${qIndex}].options[${optIndex}]`}
                                      label={`Option ${optIndex + 1}`}
                                    />
                                    {optIndex > 1 && (
                                      <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="button"
                                        onClick={() => removeOption(optIndex)}
                                        className="text-red-500 hover:text-red-700 -mb-7"
                                      >
                                        <IoMdCloseCircleOutline size={24} />
                                      </motion.button>
                                    )}
                                  </div>
                                ))}
                              </div>

                              <Button
                                type="button"
                                onClick={() => pushOption("")}
                                className="px-4 py-2 mt-4 rounded hover:bg-orange-600 w-fit!"
                              >
                                Add Option
                              </Button>
                            </div>
                          )}
                        </FieldArray>

                        {/* Correct Answer */}
                        <div>
                          <label className="block text-gray-700 font-medium mb-1">
                            Correct Answer
                          </label>
                          <div className="flex flex-wrap gap-3 mt-2">
                            {q.options.map((option, index) => {
                              const isCorrect = q.correctAnswer === option;
                              return (
                                <motion.button
                                  whileTap={{ scale: 0.96 }}
                                  whileHover={{ scale: 1.02 }}
                                  type="button"
                                  key={index}
                                  onClick={() =>
                                    setFieldValue(
                                      `questions[${qIndex}].correctAnswer`,
                                      option
                                    )
                                  }
                                  className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                                    isCorrect
                                      ? "bg-green-500 text-white border-green-600 scale-105"
                                      : "bg-gray-100 hover:bg-gray-200 border-gray-300"
                                  }`}
                                >
                                  {option || `Option ${index + 1}`}
                                </motion.button>
                              );
                            })}
                          </div>
                          <FormikInput
                            name={`questions[${qIndex}].correctAnswer`}
                            showInput={false}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Add New Question */}
            <Button
              type="button"
              onClick={() => {
                push({
                  question: "",
                  options: ["", ""],
                  correctAnswer: "",
                });
                setOpenMap({ ...openMap, [questionCount]: true });
              }}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-fit! space-x-2 mt-4"
            >
              <FaPlus />
              <span>Add New Question</span>
            </Button>
          </div>
        )}
      </FieldArray>

      {/* Progress Bar */}
      {/* <div className="flex justify-between items-center">
        <p className="text-gray-500">{questionCount} questions added</p>
        <div className="h-2 w-1/3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-orange-500"
            initial={{ width: 0 }}
            animate={{ width: `${(questionCount / 10) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div> */}
      <div className="flex items-center justify-between gap-8 text-sm">
        <span>{questionCount} / 10 Questions</span>
        <div className="flex-1 h-2 mx-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-orange-500"
            initial={{ width: 0 }}
            animate={{ width: `${(questionCount / 10) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full py-3 rounded-md font-semibold text-white transition"
      >
        {quiz?.id ? "Update Quiz" : "Submit Quiz"}
      </Button>
    </motion.form>
  );
};

/* ------------------ Redux + Formik ------------------ */
const mapStateToProps = (state: AppState) => ({
  user: userSelector(state),
  course: selectedCourseSelector(state),
  quiz: selectedQuizSelector(state),
});

const mapDispatchToProps = {
  initiateAddQuiz: addQuizInitiatedAction,
  initiateEditQuiz: editQuizInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

interface QuizFormValues extends Quiz {}
interface QuizFormProps extends ReduxProps {}

const FormikHOC = withFormik<QuizFormProps, QuizFormValues>({
  mapPropsToValues: (props) =>
    props.quiz?.id
      ? props.quiz
      : {
          id: "",
          courseId: props.course?.id,
          moduleId: "",
          title: "",
          description: "",
          questions: [
            { id: "", question: "", options: ["", ""], correctAnswer: "" },
          ],
          createdAt: "",
          updatedAt: "",
        },
  validationSchema: schema,
  handleSubmit: (values, { props }) => {
    props.quiz?.id
      ? props.initiateEditQuiz(values)
      : props.initiateAddQuiz(values);
  },
  validateOnMount: true,
})(QuizForm);

export default connector(FormikHOC);
