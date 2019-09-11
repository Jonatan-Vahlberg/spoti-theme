import React from "react" 
import {connect} from "react-redux"
import { Card, CardSection, Input, Button, Spinner } from "./common";
import _ from "lodash"
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
                updated: true,
                loading: false
            }
        }
        else{
            this.state = {
                name: "",
                query: "",
                uri: "",
                updated: false,
                loading: false
            }
            
        }
    }
    componentDidMount(){
        
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
        if(this.state.loading){
            return (
                <Spinner/>
            )
        }
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
        this.setState({loading: true})
        const theme = _.omit(this.state,["loading"])

        this.props.updateTheme(this.props.theme.id,theme)
    }

    addTheme = () => {
        this.setState({loading: true})
        const theme = _.omit(this.state,["loading"])
        this.props.addTheme(theme)
    }
}

export default connect(null,{addTheme, updateTheme}) (AddThemePage)