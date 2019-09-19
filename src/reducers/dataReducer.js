

const INTIAL_STATE = {}

export default dataReducer = (state = INTIAL_STATE, action) => {
    
    const {type,payload} = action
    switch(type){
        case "fetchThemes":
            return payload
        case "addTheme":
            return {...state,[payload.id]:payload.theme}
        case "updateTheme":
            return {...state,[payload.id]:payload.theme}
        case "removeTheme":
            var newState = _.omit(state,[payload])
            return {...newState}
        case "image_fetch":
            return {...state,[payload.id]: payload.value}
        case "LOG_OUT_IN_PROGRESS":
            return INTIAL_STATE
        default:
            return state
    }
}