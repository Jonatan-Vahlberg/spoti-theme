import firebase from "firebase"
import "firebase/firestore"
import Axios from "axios";
import { Actions } from "react-native-router-flux";




export const fetchImage = (image) => (dispatch) =>{
    const UID = firebase.auth().currentUser.uid
    Axios.get('https://api.unsplash.com/search/photos',{
        params : {query: image.name},
        headers:{
            Authorization: "Client-ID f5832dad06740e6edd6b59a652be93225bf8cf2101b5dae6f2d73530009b6733"
        }
    })
    .then(({data}) => {
        if(data.results.length == 0){
            image.uri = "https://images.unsplash.com/photo-1557683304-673a23048d34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=486&q=80" 
        }
        else{
            image.uri = data.results[0].urls.full

        }
        const ref = firebase.firestore().collection(`users`).doc(UID).collection("themes").doc(image.id)
        ref.update(image)
            .then(() => {
            })
            .catch((err) => console.log(err))
            dispatch({type:"fetch_image",payload:{id: image.id,value:image}})
    })
    dispatch({type:"loading"})

}


export const fetchThemes = () => (dispatch) => {
    const UID = firebase.auth().currentUser.uid
    const ref = firebase.firestore().collection(`users`).doc(UID).collection("themes")
    ref.onSnapshot((querySnapshot) => {
            if(!querySnapshot.empty){
                const docs = querySnapshot.docs
                const data = {}
                docs.forEach(doc => {
                    const id = doc.id
                    const newDocument = {...doc.data(),id}
                    data[id] = newDocument
                })
                dispatch({type: "fetchThemes",payload: data})
            }
        },(err) => {
            console.log(err)
        })
    dispatch({type:"loading"})
    
}

export const addTheme = (theme) => (dispatch) => {
    const UID = firebase.auth().currentUser.uid
    const ref = firebase.firestore().collection(`users`).doc(UID).collection("themes")
    ref.add(theme)
        .then((doc) => {
            const docId = doc.id
            dispatch({type:"null",payload:{theme,id:docId}})
            Actions.pop()
        })
        .catch(err => {
            dispatch({type: "addThemeFailed", payload: err})
        })
    dispatch({type:"loading"})
    
}

export const removeTheme = (id) => (dispatch) => {
    const UID = firebase.auth().currentUser.uid
    const ref = firebase.firestore().collection(`users`).doc(UID).collection("themes")
    ref.doc(id).delete()
        .then(() => {
            dispatch({type:"null",payload:id})
        })
    dispatch({type:"loading"})
    
}

export const updateTheme = (id,theme) => (dispatch) => {
    const UID = firebase.auth().currentUser.uid
    const ref = firebase.firestore().collection(`users`).doc(UID).collection("themes")
    ref.doc(id).update(theme)
        .then(() => {
            dispatch({type:"null",payload:{theme,id}})
            Actions.pop()
        })
        .catch(err => {
            dispatch({type: "addThemeFailed", payload: err})
        })
    dispatch({type:"loading"})
    
}

export const addPlaylists =  (playlists,id) => (dispatch) =>{
    const UID = firebase.auth().currentUser.uid
    const ref = firebase.firestore().collection(`users`).doc(UID).collection("themes")

    ref.doc(id).update({updated: false})
        .then(() => {
            dispatch({type: "addPlaylists",payload: {playlists,id}})
        })
        .catch((err) => console.log(err))
        dispatch({type: "loading",payload: {playlists,id}})
        
}

export const removePlaylists = (id) =>{
    return {type: "removePlaylists",payload: {id}}
}

export const spotifyAuthSuccess = (token) => {
    return {type: "SPOTIFY_AUTH_SUCCESS", payload: token}
    Actions.lists()
}