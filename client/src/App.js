import "./components/styles.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/Home";
import Loading from "./components/Loading";
import Notification from "./components/Notification";
import Room from "./components/rooms/Room";
import Works from "./pages/works/Works";
import Marketplace from "./pages/marketplace/Marketplace";
import Profile from "./components/freelance/Profile";
import { useSelector } from "react-redux";
// import AddEditFreelance from "./pages/dashboard/freelances/AddEditFreelance";
// import { useDispatch } from "react-redux";
// import { getFreelance } from "./Redux/actions/freelanceAction";
import ListFreelances from "./pages/dashboard/freelances/ListFreelances";
import { useEffect } from "react";
import { getFreelance } from "./Redux/actions/freelanceAction";
// import addFreelance from "./pages/dashboard/freelances/addFreelance";

const App = () => {
  // const dispatch = useDispatch()
  // const getFreelance = dispatch(getFreelance())
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getFreelance();
    }
  }, []);
  const user = useSelector((state) => state.freelanceReducer.user);
  console.log(user);
  console.log(user.name)
  return (
    <>
      <Loading />
      <Notification />
      <Routes>
        <Route path="dashboard/*" element={<Dashboard />} />

        <Route path="*" element={<Home />} />
        <Route path="marketplace/" element={<Marketplace />} />
        <Route path="/freelances" element={<ListFreelances user={user} />} />
        <Route path="works/*" element={<Works />} />
        <Route path="/freelances/:id" element={<Profile user={user} />} />
      </Routes>

      <Room />
    </>
  );
};

export default App;
