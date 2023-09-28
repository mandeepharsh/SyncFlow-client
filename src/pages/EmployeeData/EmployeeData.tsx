import Lottie from "lottie-react";
import { useEffect } from "react";
import commingSoonAnimation from "../../assets/animations/113096-coming-soon.json";
import "./EmployeeData.scss";
import useAuth from "../../hooks/useAuth";
import { getEmployees } from "../../utils/api";
const EmployeeData = () => {
  const { auth } = useAuth();
  useEffect(() => {
    getEmployees(auth.accessToken);
  }, []);

  return (
    <Lottie className="employee-page" animationData={commingSoonAnimation} />
  );
};

export default EmployeeData;
