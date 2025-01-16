import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage/SignupFormPage";
import Navigation from "./components/Navigation/Navigation";
import * as sessionActions from "./store/user-session";
import LandingPage from "./components/LandingPage/LandingPage";
import HomePage from "./components/HomePage/HomePage";
import StatsPage from "./components/StatsPage/StatsPage";
import StatsPageTeacher from "./components/StatsPage/StatsPageTeacher";
import SessionPage from "./components/SessionPage/SessionPage";
import AssignmentsPage from "./components/AssignmentsPage/AssignmentsPage";
import ExercisesPage from "./components/ExercisesPage/ExercisesPage";
import DoExercisePage from "./components/ExercisesPage/DoExercisePage";
import EditExercisePage from "./components/ExercisesPage/EditExercisePage";
import StudentsPage from "./components/StudentsPage/StudentsPage";
import AssignmentsPageTeacher from "./components/AssignmentsPage/AssignmentPageTeacher";
import SessionPageTeacher from "./components/SessionPage/SessionPageTeacher";
import AboutPage from "./components/AboutPage/AboutPage";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/stats",
        element: <StatsPage />,
      },
      {
        path: "/stats/sessions/:sessionId",
        element: <SessionPage />,
      },
      {
        path: "/assignments",
        element: <AssignmentsPage />,
      },
      {
        path: "/exercises",
        element: <ExercisesPage />,
      },
      {
        path: "exercises/:exerciseId/start",
        element: <DoExercisePage />,
      },
      {
        path: "exercises/:exerciseId/edit",
        element: <EditExercisePage />,
      },
      {
        path: "students",
        element: <StudentsPage />,
      },
      {
        path: "/students/:studentId/stats",
        element: <StatsPageTeacher />,
      },
      {
        path: "/students/:studentId/assignments",
        element: <AssignmentsPageTeacher />,
      },
      {
        path: "/students/:studentId/sessions/:sessionId",
        element: <SessionPageTeacher />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
