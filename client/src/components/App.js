import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import StudentView from "./StudentView";
import FileUploadView from "./FileUploadView";
import LecturerView from "./LecturerView";



function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/student/">Student View(assigment)</Link>
                        </li>

                        <li>
                            <Link to="/FileUpload/">FileUpload View(assigment)</Link>
                        </li>

                        <li>
                            <Link to="/LecturerView/">Lecturer View(assigment) </Link>
                        </li>

                    </ul>
                </nav>


                <Route path="/Student/" component={StudentView} />
                <Route path="/FileUpload/" component={FileUploadView} />
                <Route path="/LecturerView/" component={LecturerView} />

            </div>
        </Router>
    );
}

export default App;