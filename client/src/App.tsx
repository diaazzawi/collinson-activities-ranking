import {FC} from "react";
import {BrowserRouter, Route, Routes} from "react-router";
import Home from "./home/Home";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
