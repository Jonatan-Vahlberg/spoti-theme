import React from "react"
import {YellowBox} from "react-native"
import _ from "lodash"
import {createStore, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {Provider} from "react-redux" 
import firebase from "firebase"

import reducers from "./reducers"
import RouterComp from "./Router";

const STORE = createStore(reducers,{},applyMiddleware(thunk))

class Base extends React.Component {
    constructor(props){
        super(props)
        YellowBox.ignoreWarnings(['Setting a timer'])
        const _console = _.clone(console)
        console.warn = message => {
            if(message.indexOf('Setting a timer') <= -1){
                _console.warn(message)
            }
        }
    }
    componentDidMount(){
        const firebaseConfig = {
            apiKey: "AIzaSyABdsiPFwHFw6kE1mQXTxvXTiuleQzWjdA",
            authDomain: "spoti-theme.firebaseapp.com",
            databaseURL: "https://spoti-theme.firebaseio.com",
            projectId: "spoti-theme",
            storageBucket: "",
            messagingSenderId: "333180033231",
            appId: "1:333180033231:web:986a8525005a43f38e3fba"
        }
        firebase.initializeApp(firebaseConfig)
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