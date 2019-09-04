import Axios from "axios";
import { Actions } from "react-native-router-flux";


export const fetchImage = (image) => (dispatch) =>{
    Axios.get('https://api.unsplash.com/search/photos',{
        params : {query: image.name},
        headers:{
            Authorization: "Client-ID f5832dad06740e6edd6b59a652be93225bf8cf2101b5dae6f2d73530009b6733"
        }
    })
    .then(({data}) => {
        image.uri = data.results[0].urls.full
        dispatch({type:"fetch_image",payload:{id: image.id,value:image}})
    })
    dispatch({type:"loading"})

}

export const addTheme = (image) => (dispatch) => {
    dispatch({type: "ADD_THEME",payload: image})
}

export const spotifyAuthSuccess = (token) => {
    return {type: "SPOTIFY_AUTH_SUCCESS", payload: token}
    Actions.lists()
}