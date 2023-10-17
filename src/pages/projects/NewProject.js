import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

const baseURL = `${process.env.REACT_APP_SUPABASE_URL}/projects?`
const config = {
    headers: {
        apikey: process.env.REACT_APP_SUPABASE_KEY,
    }
};

const NewProject = () => {
    const [projectName, setName] = useState("");
    const [description, setDescription] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: projectName,
            description
        }

        axios
            .post(baseURL, data, config)
            .then((res) => {
                dispatch({ type: "ADD_PROJECT", payload: res.data })
                history.push("/projects");
            });
    }

    return (
        <div>
            <div className="row">
                <div className="col"></div>
                <div className="col">
                    <h1>New Project</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mt-3">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Project Name"
                                value={projectName}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <input
                                className="btn btn-block btn-dark"
                                type="submit"
                                value="Add Project"
                            />
                        </div>
                    </form>
                </div>
                <div className="col"></div>
            </div>
        </div>
    );
}

export default NewProject;