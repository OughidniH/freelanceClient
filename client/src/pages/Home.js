import BottomNav from "../components/BottomNav";
import SearchBar from "../components/SearchBar";
import NavBar from "../components/NavBar";
import Login from "../components/user/Login";

const Home = () => {
  return (
    <>
      <div>
        <Login />
        <NavBar />
        <SearchBar />
      </div>
      <BottomNav />
    </>
  );
};

export default Home;
