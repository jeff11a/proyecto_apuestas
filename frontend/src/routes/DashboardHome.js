import DashboardSidebar from "../components/DashboardSidebar";
import Navbar from "../components/Navbar";
import TablaDePrueba from "../components/TablaDePrueba";

const dashboardHome = (props) => {
  return (
    <>
      <Navbar />
      <div className="row">
        <DashboardSidebar />
        <TablaDePrueba />
      </div>
    </>
  );
};
export default dashboardHome;
