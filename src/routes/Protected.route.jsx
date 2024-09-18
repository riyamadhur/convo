import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useAuthContext } from "../config/AuthContext";
import Layout from "../components/Layout";

const ProtectedRoute = ({ children }) => {
  const user = useAuthContext();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!user) {
      toast.error("You must be logged in before accessing");
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [user]);

  if (loading) {
    return (
      <Layout title={"Convo - loading..."}>
        <div className="spin">
          <span className="loader"></span>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
