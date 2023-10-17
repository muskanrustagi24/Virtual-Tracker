import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
  width: 1000px;
  max-width: 100%;
  padding: 0 20px;
  margin: 0 auto;
`

const Card = styled.div`
    border: solid 1px black;
    width: 45rem;
    height: 150px;
`

const WorkItemDetail = () => {
    const [fieldType, setFieldType] = useState("Repro Steps");
    const history = useHistory();
    const items = useSelector((state) => state.items);
    const { projectId, itemId } = useParams();

    const typeEnum = {
        UserStory: "Acceptance Criteria",
        Bug: "Repro Steps",
        Improvement: "Discussion",
    };

    const currentItem = items.find(item => item.id === itemId);

    useEffect(() => {
        setFieldType(typeEnum[currentItem.type]);

         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentItem]);

    return (
        <Container className='mt-5'>
            <h3>{currentItem.type} : {currentItem.title}</h3>
            <div className='row'>
                <div className='col'>
                    <div className="form-group mt-3">
                        <h6>State :</h6>
                        <div className="form-control">
                            {currentItem.state}
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className="form-group mt-3">
                    <h6>Assigned To :</h6>
                        <div
                            className="form-control"
                            type="text"
                        >
                            {currentItem.assignedTo}
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className="form-group mt-3">
                    <h6>Story Points :</h6>
                        <div
                            className="form-control"
                            type="text"
                        >
                            {currentItem.storypoints}
                        </div>
                    </div>
                </div>
                <div className='col'></div>
            </div>
            <h6 className='mt-5'>{fieldType} :</h6>
            <Card>
                {currentItem.description}
            </Card>
            <div className="form-group mt-3">
                <button
                    className="btn btn-block btn-dark"
                    onClick={() => { history.push(`/project/${projectId}`) }}
                >
                    Back
                </button>
            </div>
        </Container>
    );
}

export default WorkItemDetail;