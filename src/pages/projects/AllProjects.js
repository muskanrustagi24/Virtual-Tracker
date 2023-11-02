import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from 'react-bootstrap/Card';
import axios from "axios";

const baseURL = `${process.env.REACT_APP_SUPABASE_URL}/projects?`
const config = {
    headers: {
        apikey: process.env.REACT_APP_SUPABASE_KEY,
    }
};

const AllProjects = () => {
    const [isDataLoading, setIsDataLoading] = useState(false)
    const projects = useSelector((state) => state.projects);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsDataLoading(true)
        axios.get(`${baseURL}select=*`, config).then((response) => {
            dispatch({ type: "GET_ALL_PROJECTS", payload: response.data })
            setIsDataLoading(false)
        });
        
    }, [dispatch]);

    const deleteProject = (id) => {
        axios
            .delete(`${baseURL}id=eq.${id}`, config)
            .then(() => {
                dispatch({ type: "DELETE_PROJECT", payload: id })
            })
    }

    return (
        <div>
            <div className="row">
                <div className="col"></div>
                <div className="col mt-5">
                    <h1>All Projects</h1>
                    {isDataLoading ? <h1>Loading ...</h1> : projects?.map((project, id) => (
                        <Card key={id} className="mt-3">
                            <Card.Header as="h5">{project.name}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {project.description}
                                </Card.Text>
                                <Link
                                    to={`/project/${project.id}`}
                                    className="btn btn-sm btn-dark mr-1"
                                >
                                    View
                                </Link>&ensp;
                                <Link
                                    to={`/edit/project/${project.id}`}
                                    className="btn btn-sm btn-primary mr-1"
                                >
                                    Edit
                                </Link>&ensp;
                                <button
                                    type="button"
                                    className="btn btn-sm btn-danger"
                                    onClick={() => { deleteProject(project.id) }}
                                >
                                    Delete
                                </button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
                <div className="col mt-5">
                    <Link to="/new-project" className="btn btn-outline-dark">
                        Add Project
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AllProjects;