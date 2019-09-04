
const initial_state = {
    token: "",
    user: {}
}

export default authReducer = (state = initial_state,action) =>{

    switch(action.type){

        case "SPOTIFY_AUTH_SUCCESS":
            return {...state, token: action.payload}
        default: 
            return state
    }
}