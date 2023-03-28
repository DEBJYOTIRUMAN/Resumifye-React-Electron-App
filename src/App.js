import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { ResumifyeContext } from "./ResumifyeContext";
import { useEffect, useState } from "react";
import Home from "./screens/Home";
import Resume from "./screens/Resume";
import Registration from "./screens/Registration";
import Login from "./screens/Login";
import { getUser, storeUser } from "./storage";
import Projects from "./screens/Projects";
import Template1 from "./screens/Template1";
import Template2 from "./screens/Template2";
import Template3 from "./screens/Template3";
import Template4 from "./screens/Template4";
import Template5 from "./screens/Template5";
import Resizer from "./screens/Resizer";
import Notifications from "./screens/Notifications";

function App() {
  const [user, setUser] = useState({});
  // Fetch User From Local Storage
  useEffect(() => {
    getUser().then((user) => {
      if(!user){
        return;
      }
      setUser(JSON.parse(user));
    });
  }, []);
  // Store User Local Storage
  useEffect(() => {
    if (!user._id) return;
    storeUser(user);
  }, [user]);

  return (
    <>
      <Router>
        <ResumifyeContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route path="/" element={<Login />} exact />
            <Route path="/registration" element={<Registration />} exact />
            <Route path="/home" element={<Home />} exact />
            <Route path="/projects" element={<Projects />} exact />
            <Route path="/resume" element={<Resume />} exact />
            <Route path="/template1" element={<Template1 />} exact />
            <Route path="/template2" element={<Template2 />} exact />
            <Route path="/template3" element={<Template3 />} exact />
            <Route path="/template4" element={<Template4 />} exact />
            <Route path="/template5" element={<Template5 />} exact />
            <Route path="/resizer" element={<Resizer />} exact />
            <Route path="/notifications" element={<Notifications />} exact />
          </Routes>
        </ResumifyeContext.Provider>
      </Router>
    </>
  );
}

export default App;
