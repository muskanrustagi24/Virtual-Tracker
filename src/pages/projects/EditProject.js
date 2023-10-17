import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const baseURL = `${process.env.REACT_APP_SUPABASE_URL}/projects?`
const config = {
    headers: {
        apikey: process.env.REACT_APP_SUPABASE_KEY,
    }
};

const EditProject = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();
    const { projectId } = useParams();
    const projects = useSelector((state) => state.projects);
    const currentProject = projects.find(project => project.id === projectId);

    useEffect(() => {
        setName(currentProject.name)
        setDescription(currentProject.description)
    }, [currentProject])

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: name,
            description
        }

        axios.patch(`${baseURL}id=eq.${projectId}`, data, config).then((response) => {
            dispatch({ type: "UPDATE_PROJECT", payload: response.data })
            history.push("/projects");
        });
    };

    return (
        <div>
            <div className="row">
                <div className="col"></div>
                <div className="col">
                    {currentProject ?
                        (
                            <>
                                <h1>Edit Project</h1>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group mt-3">
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Project Name"
                                            value={name}
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
                                            className="btn btn-block btn-primary"
                                            type="submit"
                                            value="Save"
                                        />&ensp;
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => history.push("/projects")}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </>
                        ) :
                        (
                            <h1 className="text-center">No Project Found</h1>
                        )
                    }
                </div>
                <div className="col"></div>
            </div>
        </div>
    );
}

export default EditProject;