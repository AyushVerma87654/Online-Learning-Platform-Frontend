import { FC, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../redux/store";
import Button from "./Button";
import { useParams } from "react-router-dom";
import { TbTargetArrow } from "react-icons/tb";
import { userSelector } from "../redux/selectors/userSelector";
import {
  getQuizByIdInitiatedAction,
  submitQuizInitiatedAction,
} from "../redux/slice/quizSlice";
import { getQuizResultsByQuizIdInitiatedAction } from "../redux/slice/quizResultsSlice";
import { selectedQuizSelector } from "../redux/selectors/quizSelector";
import { selectedQuizScoreSelector } from "../redux/selectors/quizResultSelector";

interface QuizPageProps extends ReduxProps {}

const QuizPage: FC<QuizPageProps> = ({
  quiz,
  score,
  fetchQuizById,
  submitQuiz,
  user,
  getQuizResults,
}) => {
  const { courseId } = useParams();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    if (courseId && !quiz) fetchQuizById(courseId);
    if (quiz?.id && !score)
      getQuizResults({ userId: user.id, quizId: quiz.id });
  }, []);

  const handleAnswerSelect = (questionId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = () => {
    if (!quiz) return;
    submitQuiz({ answers, quizId: quiz.id, userId: user.id });
    setQuizSubmitted(true);
    setAnswers({});
  };

  if (!quiz)
    return (
      <div className="py-12 text-center text-gray-500 text-lg">
        Loading Quiz...
      </div>
    );

  return (
    <div className="bg-linear-to-br from-yellow-400 via-orange-400 to-red-400 py-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* Title */}
        <h1 className="text-5xl font-bold text-center text-white mb-12 tracking-tight drop-shadow-lg">
          {quiz.title}
        </h1>

        {/* Description */}
        {quiz.description && (
          <p className="text-center text-white text-lg mb-10 opacity-90 max-w-2xl mx-auto">
            {quiz.description}
          </p>
        )}

        {/* Quiz Questions */}
        <div className="space-y-10">
          {quiz.questions.map((question, index) => (
            <div
              key={index}
              className="bg-yellow-100/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-orange-300"
            >
              {/* Question Text */}
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {index + 1}. {question.question}
              </h2>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {question.options.map((opt) => (
                  <label
                    key={opt}
                    className={`p-3 rounded-lg border cursor-pointer text-center transition-all ${
                      answers[question.id] === opt
                        ? "bg-orange-500 text-white border-orange-600"
                        : "bg-white hover:bg-orange-50 border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={opt}
                      checked={answers[question.id] === opt}
                      onChange={() => handleAnswerSelect(question.id, opt)}
                      className="hidden"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="text-center mt-12">
          <Button
            className="bg-red-500 text-white px-8 py-3 text-lg font-semibold rounded-lg hover:bg-red-600 transition-all"
            onClick={handleSubmit}
          >
            Submit Quiz
          </Button>
        </div>

        {/* Score Result */}
        {score && (
          <div className="mt-10 text-center text-3xl font-bold text-green-700 flex items-center justify-center gap-2">
            <TbTargetArrow />
            <span>
              {quizSubmitted ? "Your Score: " : "Your Last Attempted Score: "}{" "}
              {score}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  quiz: selectedQuizSelector(state),
  user: userSelector(state),
  score: selectedQuizScoreSelector(state),
});

const mapDispatchToProps = {
  fetchQuizById: getQuizByIdInitiatedAction,
  submitQuiz: submitQuizInitiatedAction,
  getQuizResults: getQuizResultsByQuizIdInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(QuizPage);
