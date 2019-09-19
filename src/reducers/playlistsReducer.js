import _ from "lodash"
const INITIAL_STATE = {}

export default playlistsReducer = (state = INITIAL_STATE,action) => {
    const {type,payload} = action
    switch(type){
        case "addPlaylists":
            return {...state,[payload.id]:payload.playlists}
        case "removePlaylists":
            var newState = _.omit(state,[payload.id])
            return {...newState}
        case "LOG_OUT_IN_PROGRESS":
            return INITIAL_STATE
        default:
            return state
    }
}