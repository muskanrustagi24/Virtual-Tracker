import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from "react-router-dom";
import CustomNav from './components/Common/CustomNav';
import AllProjects from "./pages/projects/AllProjects";
import NewProject from "./pages/projects/NewProject";
import EditProject from "./pages/projects/EditProject";
import ProjectDetail from "./pages/projects/ProjectDetail";
import NewWorkItemForm from "./pages/workitems/NewWorkItemForm";
import EditWorkItem from "./pages/workitems/EditWorkItem";
import WorkItemDetail from "./pages/workitems/WorkItemDetail";
import HomePage from "./components/Homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/register";
import { AuthProvider } from "./context/authContext";
import { AuthRoute } from "./utils/AuthRoute";


function App() {
  return (
    <div className="container-fluid">
      <Switch>
        <AuthProvider>
          <CustomNav />
          <AuthRoute exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <AuthRoute exact path="/home" component={HomePage} />
          <AuthRoute exact path="/projects" component={AllProjects} />
          <AuthRoute
            exact
            path="/project/:projectId"
            component={ProjectDetail}
          />
          <AuthRoute exact path="/new-project" component={NewProject} />
          <AuthRoute
            exact
            path="/edit/project/:projectId"
            component={EditProject}
          />
          <AuthRoute
            exact
            path="/add-workitem/:projectId"
            component={NewWorkItemForm}
          />
          <AuthRoute
            exact
            path="/edit/:projectId/item/:itemId"
            component={EditWorkItem}
          />
          <AuthRoute exact path="/project/:projectId/item/:itemId" component={WorkItemDetail} />
        </AuthProvider>
      </Switch>
    </div>
  );
}

export default App;
