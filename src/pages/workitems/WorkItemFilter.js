import React from 'react';

const WorkItemFilter = (props) => {
  const dropdownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };

  return (
    <div>
      <div className='filter__control'>
        <label>Filter by Type : &ensp;</label>
        <select value={props.selected} onChange={dropdownChangeHandler}>
          <option value='All'>All</option>
          <option value='Bug'>Bug</option>
          <option value='UserStory'>User Story</option>
          <option value='Improvement'>Improvement</option>
        </select>
      </div>
    </div>
  );
};

export default WorkItemFilter;