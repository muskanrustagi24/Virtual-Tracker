import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const baseURL = `${process.env.REACT_APP_SUPABASE_URL}/workitems`
const config = {
  headers: {
    apikey: process.env.REACT_APP_SUPABASE_KEY,
  }
};

const NewWorkItemForm = () => {
  const [type, setType] = useState("Bug");
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [description, setDescription] = useState("");
  const [storypoints, setStorypoints] = useState("");
  const [fieldType, setFieldType] = useState("Repro Steps");
  const [state, setState] = useState("New");
  const dispatch = useDispatch();
  const history = useHistory();
  const items = useSelector((state) => state.items);
  const { projectId } = useParams();


  const typeEnum = {
    UserStory: "Acceptance Criteria",
    Bug: "Repro Steps",
    Improvement: "Discussion",
  };

  const onSelectHandler = (value) => {
    setType(value);
    setFieldType(typeEnum[value]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      id: items[items.length - 1].id + 1,
      projectId: projectId,
      type,
      title,
      assignedTo,
      description,
      storypoints,
      state
    }

    const dataDb = {
      projectId: projectId,
      title,
      description,
      type,
      assignedTo,
      storypoints,
      state
    }

    axios
      .post(baseURL, dataDb, config)
      .then((response) => {
        console.log(response.data);
        dispatch({ type: "ADD_ITEM", payload: data })
      });

    history.push(`/project/${projectId}`);
  }

  return (
    <div className="jumbotron">
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <h1>Add new work item</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group mt-3">
              <select
                className="form-control"
                value={type}
                onChange={(e) => onSelectHandler(e.target.value)}
              >
                <option value="UserStory">User Story</option>
                <option value="Bug">Bug</option>
                <option value="Improvement">Improvement</option>
              </select>
            </div>
            <div className="form-group mt-3">
              <input
                className="form-control"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <input
                className="form-control"
                type="text"
                placeholder="Assigned To"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <textarea
                className="form-control"
                type="text"
                placeholder={fieldType}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                row="8"
              />
            </div>
            <div className="form-group mt-3">
              <input
                className="form-control"
                type="text"
                placeholder="Story Points"
                value={storypoints}
                onChange={(e) => setStorypoints(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <select
                className="form-control"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="New">New</option>
              </select>
            </div>
            <div className="form-group mt-3">
              <input
                className="btn btn-block btn-dark"
                type="submit"
                value="Add"
              />
            </div>
          </form>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default NewWorkItemForm;