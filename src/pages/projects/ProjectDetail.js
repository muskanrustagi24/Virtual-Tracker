import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import WorkItemFilter from "../workitems/WorkItemFilter";
import axios from "axios";

const baseURL = `${process.env.REACT_APP_SUPABASE_URL}/workitems?`
const config = {
    headers: {
        apikey: process.env.REACT_APP_SUPABASE_KEY,
    }
};

const ProjectDetail = () => {
    const [filteredType, setfilteredType] = useState("All");
    const dispatch = useDispatch();
    const { projectId } = useParams();
    const items = useSelector((state) => state.items);

    useEffect(() => {
        axios.get(`${baseURL}select=*`, config).then((response) => {
            dispatch({ type: "GET_ALL_ITEMS", payload: response.data })
        });

    }, [dispatch]);

    const deleteItem = (id) => {
        axios
            .delete(`${baseURL}id=eq.${id}`, config)
            .then(() => {
                dispatch({ type: "DELETE_ITEM", payload: id })
            })
    }

    const filterChangeHandler = (selectedType) => {
        setfilteredType(selectedType);
    }

    var filteredWorkItems = items.filter(item => {
        return item.type === filteredType;
    })

    if (filteredType === 'All') filteredWorkItems = items;

    return (
        <Container>
            <h1>Project Details</h1>
            <div className="row mt-5">
                <div className="col">
                    <Link
                        to={`/add-workitem/${projectId}`}
                        className="btn btn-sm btn-primary mr-1"
                    >
                        + New Work Item
                    </Link>
                </div>
                <div className="col">
                    <WorkItemFilter
                        selected={filteredType}
                        onChangeFilter={filterChangeHandler}
                    />
                </div>
            </div>
            <table className="table mt-5">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Type</th>
                        <th>Title</th>
                        <th>Assigned To</th>
                        <th>State</th>
                        <th />
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {filteredWorkItems.map((item, id) => {
                        return (item.projectId === projectId &&
                            (<tr key={id}>
                                <td>{id + 1}</td>
                                <td>{item.type}</td>
                                <td><Link to={`/project/${projectId}/item/${item.id}`}>{item.title}</Link></td>
                                <td>{item.assignedTo}</td>
                                <td>{item.state}</td>
                                <td>
                                    <Link to={`/edit/${projectId}/item/${item.id}`} className="btn btn-outline-primary">
                                        Edit
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => deleteItem(item.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>)
                        )
                    })}
                </tbody>
            </table>
        </Container>
    );
}

export default ProjectDetail;