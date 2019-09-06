import React from "react"
import {createStore, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {Provider} from "react-redux" 

import reducers from "./reducers"
import RouterComp from "./Router";

const STORE = createStore(reducers,{},applyMiddleware(thunk))

class Base extends React.Component {

    componentDidMount(){
        const firebaseConfig = {

        }
    }

    render(){
        return(
           <Provider store={STORE}>
               <RouterComp/>
           </Provider>
        )
    }
}

export default Base