export const initialState = null;
export var loggedinmedical=false;
export const reducer = (state, action) => {
    if(action.type === "USER") {
        return action.payload;
    }
    else if(action.type === "MEDICAL") {
        loggedinmedical=true;
        return action.payload;
    }

    return state;
}