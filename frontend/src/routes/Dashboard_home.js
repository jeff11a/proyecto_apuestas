import DashboardSidebar from "../components/DashboardSidebar"
import Navbar from "../components/Navbar";
import TablaDePrueba from "../components/TablaDePrueba";

const dashboard_home = props => {
  return (<>
    <Navbar />
    <div className="row">
      <DashboardSidebar />
      <TablaDePrueba />
    </div>

  </>);
};
export default dashboard_home;