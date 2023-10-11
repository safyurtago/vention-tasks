import "./styles/style.css";

import Header from "./Header";
import Footer from "./Footer";
import Main from "./main";

const Home = () => {
  return (
    <div className="container">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
export default Home;
