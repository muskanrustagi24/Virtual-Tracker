import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const baseURL = `${process.env.REACT_APP_SUPABASE_URL}/workitems?`
const config = {
  headers: {
    apikey: process.env.REACT_APP_SUPABASE_KEY,
  }
};

const EditWorkItem = () => {
  const [type, setType] = useState("Bug");
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("New");
  const [storypoints, setStorypoints] = useState("");
  const [fieldType, setFieldType] = useState("Repro Steps");
  const dispatch = useDispatch();
  const history = useHistory();
  const { projectId, itemId } = useParams();
  const items = useSelector((state) => state.items);
  const currentItem = items.find(item => item.id === itemId);

  useEffect(() => {
    setType(currentItem.type);
    setTitle(currentItem.title);
    setAssignedTo(currentItem.assignedTo);
    setDescription(currentItem.description);
    setStorypoints(currentItem.storypoints);
    setState(currentItem.state);
  }, [currentItem]);

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
      projectId: projectId,
      type,
      title,
      assignedTo,
      description,
      storypoints,
      state
    }

    axios.patch(`${baseURL}id=eq.${itemId}`, data, config).then((response) => {
      dispatch({ type: "UPDATE_ITEM", payload: response.data })
      history.push(`/project/${projectId}`);
    });
  }

  return (
    <div className="jumbotron">
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <h1>Edit work item</h1>
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
              <input
                className="form-control"
                type="text"
                placeholder={fieldType}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                <option value="In Progress">In Progress</option>
                <option value="Under Review">Under Review</option>
                <option value="Ready For Test">Ready For Test</option>
              </select>
            </div>
            <div className="form-group mt-3">
              <input
                className="btn btn-block btn-dark"
                type="submit"
                value="Save"
              />
            </div>
          </form>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );

};

export default EditWorkItem;