const initialState = [
    {
        id: 1,
        projectId: 1,
        type: "Bug",
        title: "Bug_1",
        assignedTo: "Emp_1",
        description: "This is Bug",
        storyPoints: 3,
        itemState: "New"
    },
    {
        id: 2,
        projectId: 2,
        type: "UserStory",
        title: "US_1",
        assignedTo: "Emp_2",
        description: "This is US",
        storyPoints: 4,
        itemState: "New"
    },
    {
        id: 3,
        projectId: 2,
        type: "UserStory",
        title: "US_2",
        assignedTo: "Emp_3",
        description: "This is US",
        storyPoints: 1,
        itemState: "New"
    },
    {
        id: 4,
        projectId: 1,
        type: "UserStory",
        title: "US_3",
        assignedTo: "Emp_3",
        description: "This is US",
        storyPoints: 3,
        itemState: "New"
    }
];

const workItemReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ALL_ITEMS":
            return [...action.payload]
        case "GET_ITEM_BY_ID":
            //console.log(...action.payload)
            return [...action.payload]
        case "ADD_ITEM":
            console.log(state)
            state = [...state, action.payload]
            return state;
        case "UPDATE_ITEM":
            const itemUpdate = state.filter((item) =>
                item.id === action.payload.id
                    ? Object.assign(item, action.payload)
                    : item
            );
            state = itemUpdate;
            return state;
        case "DELETE_ITEM":
            const filterItems = state.filter(
                (item) => item.id !== action.payload && item
            );
            state = filterItems;
            return state;
        default:
            return state;
    }
}

export default workItemReducer;