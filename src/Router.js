import React from "react"
import {Text} from "react-native" 
import { Router, Stack, Scene } from "react-native-router-flux";

import AuthPage from "./components/AuthPage";
import MainPage from "./components/MainPage";
import AddThemePage from "./components/AddThemePage";
import SpotifyAuth from "./components/SpotifyAuth";
import OverviewPage from "./components/OverviewPage";

const TabIcon =({selected, title}) => {
    return(
        <Text style={{color: selected ? 'blue':'black', fontSize: 20}}>{title}</Text>
    )
}

class RouterComp extends React.Component {
   render(){
       return(
           <Router>
               <Stack key="root">
                   <Scene key="auth"
                    initial={true}
                    hideNavBar={true}>
                        <Scene key="loginPage"
                        initial={true}
                        component={AuthPage}/>
                        <Scene key="spotifyAuth"
                        component={SpotifyAuth}
                        hideNavBar={true}/>
                   </Scene>
                    <Scene key="tabs"
                    hideNavBar={true}
                    tabs
                    tabBarStyle={{backgroundColor: "#fff", paddingBottom: 10}}>
                            <Scene key="lists"
                                hideNavBar={true}
                                component={MainPage}
                                titleStyle={{opacity: 0}}
                                title="Themes"/>
                            <Scene key="overview"
                                hideNavBar={true}
                                component={OverviewPage}
                                titleStyle={{opacity: 0}}
                                title="Overview"/>
                        </Scene>
                    <Scene key="add"
                        hideNavBar={false}
                        component={AddThemePage}/>
               </Stack>
           </Router>
       )
    }
}

export default RouterComp