const defaultState = {
    msg:{},
};

const userReducer = ( state=defaultState, action ) => {
    if(action.type === "SET_MSG") {
        let newState = {...state, msg:action.payload};
        return newState;
    }
    return state;
};

export default userReducer;