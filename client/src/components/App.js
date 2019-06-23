import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import StudentView from "./StudentView";
import FileUploadView from "./FileUploadView";
import LecturerView from "./LecturerView";
import addmarks from "./addmarks";
import MarksEdit from "./MarksEdit";





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

                        <li>
                            <Link to="/addmarks/">Add Marks(addmarks) </Link>
                        </li>
                        <li>
                            <Link to="/editmarks/:id">edit Marks(editmarks) </Link>
                        </li>

                    </ul>
                </nav>


                <Route path="/Student/" component={StudentView} />
                <Route path="/FileUpload/" component={FileUploadView} />
                <Route path="/LecturerView/" component={LecturerView} />
                <Route path="/addmarks/" component={addmarks} />
                <Route path="/editmarks/:id" component={MarksEdit} />


            </div>
        </Router>
    );
}

export default App;