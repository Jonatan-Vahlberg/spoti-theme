import {combineReducers} from "redux"
import dataReducer from "./dataReducer";
import initialReducer from "./initialReducer";
import authReducer from "./authReducer";
import playlistsReducer from "./playlistsReducer";

export default combineReducers({
    auth: authReducer,
    data: dataReducer,
    initial: initialReducer,
    playlists: playlistsReducer
})
