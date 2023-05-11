import "./App.css";
import Header from "./components/Header/Header";
import Navigation from "./components/Header/Navigation";
import Routers from "./routes/Routers";

function App() {
  return (
    <>
      <Header />
      <Navigation />
      <Routers></Routers>
    </>
  );
}

export default App;
