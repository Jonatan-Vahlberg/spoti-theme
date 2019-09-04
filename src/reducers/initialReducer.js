
export default initialReducer = (state = true,action) => {
    switch(action.type){
        case "SPOT_AUTH_SUCCESS":
            return false
        default:
            return state
    }
}