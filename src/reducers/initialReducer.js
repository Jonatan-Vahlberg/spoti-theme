
export default initialReducer = (state = true,action) => {
    switch(action.type){
        case "SPOT_AUTH_SUCCESS":
            return false
        case "LOG_OUT_IN_PROGRESS":
            return true
        default:
            return state
    }
}