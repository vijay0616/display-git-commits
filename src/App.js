import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CommitComponent from "./Components/CommitComponent";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/repositories/:owner/:repository/commit/:commitSHA"
          Component={CommitComponent}
        />
      </Routes>
    </Router>
  );
}

export default App;
