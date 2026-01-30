import useAuthUser from "../hooks/useAuthUser";
import PageLoader from "../components/PageLoader";
const ProtectedRoute = ({ children }) => {
  const { authUser, isLoading: authLoading } = useAuthUser();

  if (authLoading) return <PageLoader />;
  if (!authUser) return <Navigate to="/" replace />;

  return children;
};
export default ProtectedRoute;