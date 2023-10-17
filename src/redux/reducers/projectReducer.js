const initialState = [
  {
    id: 1,
    name: 'Project-1',
    description: 'This is project-1.'
  }
];

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_PROJECTS":
      return [...action.payload]
    case "GET_PROJECT_BY_ID":
      return [...action.payload]
    case "ADD_PROJECT":
      return [...state, action.payload]
    case "UPDATE_PROJECT":
      const projectUpdate = state.filter((project) =>
        project.id === action.payload.id
          ? Object.assign(project, action.payload)
          : project
      );
      state = projectUpdate;
      return state;
    case "DELETE_PROJECT":
      console.log(action.payload);
      const filterProjects = state.filter(
        (project) => project.id !== action.payload && project
      );
      state = filterProjects;
      return state;
    default:
      return state;
  }
}

export default projectReducer;