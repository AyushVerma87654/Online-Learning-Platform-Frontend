// AdminDashboardFull.tsx
import { FC, useEffect, useMemo, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../redux/store";
import { allCoursesMapSelector } from "../redux/selectors/courseSelector";
import {
  allUsersMapSelector,
  allUsersProgressMapSelector,
} from "../redux/selectors/adminSelector";
import { quizResultsMapSelector } from "../redux/selectors/quizResultSelector";
import {
  getAllUsersInitiatedAction,
  getAllUsersProgressInitiatedAction,
} from "../redux/slice/adminSlice";
import { getAllQuizResultsInitiatedAction } from "../redux/slice/quizResultsSlice";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  LineController,
  BarController,
} from "chart.js";
import { Bar, Chart } from "react-chartjs-2";
import { motion } from "framer-motion";
import { UserRole } from "../models/user";
import AdminUsersModal from "./AdminUsersModal";
import { useNavigate } from "react-router";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  LineController,
  BarController
);

const PLAN_PRICE_INR = 50;

const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(
    n
  );

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const AdminDashboardFull: FC<ReduxProps> = ({
  allUsers,
  allCourses,
  allUsersProgress,
  allQuizResults,
  fetchAllQuizResults,
  fetchAllUsers,
  fetchAllUsersProgress,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"students" | "instructors" | null>(
    null
  );

  useEffect(() => {
    fetchAllQuizResults();
    fetchAllUsers();
    fetchAllUsersProgress();
  }, []);

  const navigate = useNavigate();
  const students = useMemo(
    () => allUsers.filter((u) => u.role === UserRole.STUDENT),
    [allUsers]
  );
  const instructors = useMemo(
    () => allUsers.filter((u) => u.role === UserRole.INSTRUCTOR),
    [allUsers]
  );

  const openModal = (type: "students" | "instructors") => {
    setModalType(type);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalType(null);
  };

  const enrollmentChartData = useMemo(() => {
    const enrollmentCounts: Record<string, number> = {};
    allUsersProgress.forEach((progress) => {
      enrollmentCounts[progress.courseId] =
        (enrollmentCounts[progress.courseId] || 0) + 1;
    });

    const labels = allCourses.map((c) => c.title);
    const data = allCourses.map((c) => enrollmentCounts[c.id] || 0);

    return {
      labels,
      datasets: [
        {
          label: "Enrollments per Course",
          data,
          backgroundColor: "rgba(29, 78, 216, 0.9)",
          borderRadius: 6,
        },
      ],
    };
  }, [allCourses, allUsersProgress]);

  const topCoursesChart = useMemo(() => {
    const counts: Record<string, number> = {};
    allUsersProgress.forEach((p) => {
      counts[p.courseId] = (counts[p.courseId] || 0) + 1;
    });
    const sortedCourses = [...allCourses].sort(
      (a, b) => (counts[b.id] || 0) - (counts[a.id] || 0)
    );
    const top = sortedCourses.slice(0, 5);
    return {
      labels: top.map((c) => c.title),
      datasets: [
        {
          label: "Enrollments",
          data: top.map((c) => counts[c.id] || 0),
          backgroundColor: "rgba(29, 78, 216, 0.9)",
          borderRadius: 6,
        },
      ],
    };
  }, [allCourses, allUsersProgress]);

  const revenueChart = useMemo(() => {
    const now = new Date();
    const months: { key: string; label: string }[] = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        key: `${d.getFullYear()}-${d.getMonth()}`,
        label: `${MONTHS[d.getMonth()]} ${d.getFullYear()}`,
      });
    }

    const signupsPerMonth: Record<string, number> = {};
    allUsers.forEach((u) => {
      const paidAt = u.paidAt;
      if (!paidAt) return;
      const d = new Date(paidAt);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      signupsPerMonth[key] = (signupsPerMonth[key] || 0) + 1;
    });

    const revenuePerMonth = months.map(
      (m) => (signupsPerMonth[m.key] || 0) * PLAN_PRICE_INR
    );
    const signups = months.map((m) => signupsPerMonth[m.key] || 0);

    return {
      labels: months.map((m) => m.label),
      datasets: [
        {
          type: "line" as const,
          label: "Revenue (INR)",
          data: revenuePerMonth,
          borderColor: "rgba(29, 78, 216, 0.9)",
          tension: 0.3,
          yAxisID: "y",
        },
        {
          type: "bar" as const,
          label: "Premium Signups",
          data: signups,
          backgroundColor: "rgba(79, 70, 229, 0.85)",
          yAxisID: "y1",
        },
      ],
    };
  }, [allUsers]);

  const revenueOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" as const },
      title: { display: true, text: "Monthly Revenue & Premium Signups" },
    },
    scales: {
      y: {
        type: "linear" as const,
        beginAtZero: true,
        position: "left" as const,
        ticks: { callback: (v: any) => formatINR(Number(v)) },
      },
      y1: {
        type: "linear" as const,
        beginAtZero: true,
        position: "right" as const,
        grid: { drawOnChartArea: false },
      },
    },
  };

  const avgScorePerCourseChart = useMemo(() => {
    const scoreSums: Record<string, number> = {};
    const scoreCounts: Record<string, number> = {};

    allQuizResults.forEach((r) => {
      const courseId = r.quizId ?? "unknown";
      const score = Number(r.score ?? 0);
      scoreSums[courseId] = (scoreSums[courseId] || 0) + score;
      scoreCounts[courseId] = (scoreCounts[courseId] || 0) + 1;
    });

    const labels = allCourses.map((c) => c.title);
    const data = allCourses.map((c) => {
      const sum = scoreSums[c.id] || 0;
      const count = scoreCounts[c.id] || 0;
      return count === 0 ? 0 : +(sum / count).toFixed(2);
    });

    return {
      labels,
      datasets: [
        {
          label: "Average Quiz Score (%)",
          data,
          backgroundColor: "rgba(34, 197, 94, 0.85)",
          borderRadius: 6,
        },
      ],
    };
  }, [allCourses, allQuizResults]);

  const leaderboard = useMemo(() => {
    const perUserSum: Record<string, number> = {};
    const perUserCount: Record<string, number> = {};

    allQuizResults.forEach((r) => {
      const uid = r.userId ?? r.userId;
      if (!uid) return;
      const sc = Number(r.score ?? 0);
      perUserSum[uid] = (perUserSum[uid] || 0) + sc;
      perUserCount[uid] = (perUserCount[uid] || 0) + 1;
    });

    return Object.keys(perUserSum)
      .map((uid) => {
        const avg = perUserCount[uid] ? perUserSum[uid] / perUserCount[uid] : 0;
        const user = allUsers.find((u) => u.id === uid);
        return {
          userId: uid,
          name: user?.name ?? "Unknown",
          email: user?.email ?? "",
          avgScore: +avg.toFixed(2),
          attempts: perUserCount[uid],
        };
      })
      .sort((a, b) => b.avgScore - a.avgScore)
      .slice(0, 10);
  }, [allQuizResults, allUsers]);

  const recentPremiums = useMemo(() => {
    return allUsers
      .map((u) => ({
        ...u,
        paidAt: u.paidAt ? new Date(u.paidAt) : null,
      }))
      .filter((u) => u.paidAt)
      .sort((a, b) => (b.paidAt?.getTime() ?? 0) - (a.paidAt?.getTime() ?? 0))
      .slice(0, 10);
  }, [allUsers]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" as const },
      title: { display: true, text: "Course Enrollments Overview" },
    },
    scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
  };

  if (!allCourses.length && !allUsers.length)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading dashboard...
      </div>
    );

  return (
    <div className="bg-linear-to-br from-purple-400 to-violet-500 p-8 space-y-10">
      <h1 className="text-3xl font-bold text-center">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          className="p-6 border rounded-lg shadow cursor-pointer"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 250 }}
          onClick={() => openModal("students")}
        >
          <p className="text-gray-500">Students</p>
          <p className="text-2xl font-semibold">{students.length}</p>
        </motion.div>
        <motion.div
          className="p-6 border rounded-lg shadow cursor-pointer"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 250 }}
          onClick={() => openModal("instructors")}
        >
          <p className="text-gray-500">Instructors</p>
          <p className="text-2xl font-semibold">{instructors.length}</p>
        </motion.div>
        <motion.div
          className="p-6 border rounded-lg shadow"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 250 }}
          onClick={() => navigate("/courses")}
        >
          <p className="text-gray-500">Courses</p>
          <p className="text-2xl font-semibold">{allCourses.length}</p>
        </motion.div>
        <motion.div
          className="p-6 border rounded-lg shadow"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 250 }}
        >
          <p className="text-gray-500">Total Enrollments</p>
          <p className="text-2xl font-semibold">{allUsersProgress.length}</p>
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 border rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Enrollments per Course</h2>
          <Bar data={enrollmentChartData} options={chartOptions} />
        </div>
        <div className="p-6 border rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Top 5 Enrolled Courses</h2>
          <Bar
            data={topCoursesChart}
            options={{
              ...chartOptions,
              plugins: {
                title: { display: true, text: "Top 5 Enrolled Courses" },
              },
            }}
          />
        </div>
        <div className="p-6 border rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Revenue & Premium Signups (12 months)
          </h2>
          <Chart
            type="bar"
            data={revenueChart}
            options={revenueOptions as any}
          />
        </div>
        <div className="p-6 border rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Average Quiz Score per Course
          </h2>
          <Bar
            data={avgScorePerCourseChart}
            options={{
              ...chartOptions,
              plugins: {
                title: { display: true, text: "Avg Quiz Score (%) per Course" },
              },
              scales: { y: { beginAtZero: true, max: 100 } },
            }}
          />
        </div>
      </div>

      {/* Leaderboard & Recent Purchases */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 p-6 border rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Student Leaderboard (Avg Quiz Score)
          </h2>
          {leaderboard.length === 0 ? (
            <p className="text-gray-500">No quiz results yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-sm text-gray-600">
                    <th className="py-2">Student</th>
                    <th className="py-2">Email</th>
                    <th className="py-2">Avg Score</th>
                    <th className="py-2">Attempts</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((row, idx) => (
                    <tr
                      key={row.userId}
                      className={`border-t ${
                        idx % 2 === 0 ? "" : "bg-gray-50"
                      }`}
                    >
                      <td className="py-2 font-medium">{row.name}</td>
                      <td className="py-2 text-sm text-gray-600">
                        {row.email}
                      </td>
                      <td className="py-2">{row.avgScore}%</td>
                      <td className="py-2">{row.attempts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="p-6 border rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Recent Premium Purchases
          </h2>
          {recentPremiums.length === 0 ? (
            <p className="text-gray-500">No premium purchases yet.</p>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {recentPremiums.map((u) => (
                <div key={u.id} className="p-3 border rounded">
                  <p className="font-medium">{u.name}</p>
                  <p className="text-sm text-gray-600">{u.email}</p>
                  <p className="text-sm text-gray-500">
                    {u.paidAt?.toLocaleString() ?? "-"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && modalType && (
        <AdminUsersModal
          type={modalType}
          closeModal={closeModal}
          students={students}
          studentsProgress={allUsersProgress}
          instructors={instructors}
          allCourses={allCourses}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  allUsers: allUsersMapSelector(state),
  allCourses: allCoursesMapSelector(state),
  allQuizResults: quizResultsMapSelector(state),
  allUsersProgress: allUsersProgressMapSelector(state),
});

const mapDispatchToProps = {
  fetchAllUsers: getAllUsersInitiatedAction,
  fetchAllQuizResults: getAllQuizResultsInitiatedAction,
  fetchAllUsersProgress: getAllUsersProgressInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AdminDashboardFull);
