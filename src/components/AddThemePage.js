import React from "react" 
import {connect} from "react-redux"
import { Card, CardSection, Input, Button } from "./common";

import {addTheme, updateTheme} from "../actions"

class AddThemePage extends React.Component {
    constructor(props){
        super(props)

        if(props.theme !== null && props.theme !== undefined){
            const {name,query,id} = props.theme
            this.state= {
                name,
                query,
                uri: "",
                updated: true
            }
        }
        else{
            this.state = {
                name: "",
                query: "",
                uri: "",
                updated: false
            }
            
        }
    }

    render(){
        const {name,query} = this.state
        return(
           
            <Card>
                <CardSection>
                    <Input
                        label="Name"
                        value={name}
                        onChangeText={(name) => this.setState({name})}/>
                </CardSection>
                <CardSection>
                    <Input
                        label="Spotify Query"
                        value={query}
                        onChangeText={(query) => this.setState({query})}/>
                </CardSection>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
       )
    }
    renderButton(){
        if(this.props.theme !== null && this.props.theme !== undefined){
            return <Button title="update"
                        onPress={this.updateTheme}/>
        }
        else{
            return <Button title="Add"
                        onPress={this.addTheme}/>
        }
    }
    updateTheme = () => {
        this.props.updateTheme(this.props.theme.id,this.state)
    }

    addTheme = () => {
        this.props.addTheme(this.state)
    }
}

export default connect(null,{addTheme, updateTheme}) (AddThemePage)