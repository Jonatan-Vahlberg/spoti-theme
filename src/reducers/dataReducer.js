
const INTIAL_STATE = {
    gh4567: {
        name:'metal',
        uri: "",
        id:"gh4567"
    },
    gh4568: {
        name:'space',
        uri: "",
        id:"gh4568"
    },
    gh4566: {
        name:'lofi',
        uri: "",
        id:"gh4566"
    },
    gh4565: {
        name:'rainy day',
        uri: "",
        id:"gh4566"
    }

}

export default dataReducer = (state = INTIAL_STATE, action) => {
    //console.log(action, action.type)
    switch(action.type){
        case "image_fetch":
            return {...state,[action.payload.id]: action.payload.value}
        case "ADD_THEME":
            return {...state,[action.payload.id]:action.payload}
        default:
            return state
    }
}