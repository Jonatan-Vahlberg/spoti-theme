import React from "react"
import {View} from "react-native" 
import {connect} from "react-redux"
import _ from "lodash"
import Axios from "axios";

import {ImagePage_Android, Spinner} from "./common";
import {fetchImage} from "../actions"
import SpotyfiList from "./SpotifyList";

class MainPage extends React.Component {
    constructor(props){
        super(props)
        
    }

    state = {loaded: false, page: 0,playlists: {}}

   render(){ 
        this.fetchImages()
        this.props.images.forEach(image => {
            if((this.state.playlists[image.id] === null) || this.state.playlists[image.id] === undefined){
                this.fetchPlaylists(image.name,image.id)
            }
        })
        return(
            
            <React.Fragment>
                {this.renderImagePage()}
                {this.renderList()}
            </React.Fragment>

        )
    }

    onPaging(newPageNum){
        this.setState({page: newPageNum})
    }
    renderImagePage(){
        const {images} = this.props
        return (
            <ImagePage_Android
                images={images}
                onPaging={this.onPaging.bind(this)}/>
        )
    }

    renderList(){
        const {page, playlists,loaded} = this.state
        const {images, token} = this.props
        const playlistsLength = this.getObjectLength(playlists)
        
        if((loaded && token && (playlists !== {}))&& (playlistsLength === images.length)){
            return (
                <SpotyfiList
                    data={playlists[images[page].id].data}/>
            )
        }
        else{
            return( 
                <View style={{position: "absolute",top: 0,bottom: 0, left: 0, right: 0}}>   
                    <Spinner/> 
                </View>
            )
        }
    }

    fetchImages(){
        this.props.images.forEach(image => {
            if(image.uri === ""){
                this.props.fetchImage(image)
            }
        });
    }

    

    async fetchPlaylists(query, imageId){
        const {token} = this.props
        const results = await Axios.get(`https://api.spotify.com/v1/search?q=${query}&type=playlist&limit=10`,{
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        if(results.status === 200){
            const items = results.data.playlists.items
            let data = []
            _.forEach(items,(item => {
                const dataItem = {
                    url: item.external_urls.spotify,
                    image: item.images[0].url,
                    name: item.name,
                    id: item.id
                }
                data.push(dataItem)
            }))
            this.setState({playlists: {...this.state.playlists,[imageId]: {data: data}}, loaded: true})
        }
        else{
            this.setState({playlists: [], loaded: false})
        }
        
    }

    getObjectLength(object){
       const array =  _.map(object,(val,id) => {return {...val,id}})
       return array.length
    }

    
}

const mapStateToProps = (state,ownProps) => {
    const images = _.map(state.data,(val,id) => {return {...val,id}})
    return {
        images: images,
        token: state.auth.token
    }
}

export default connect(mapStateToProps,{fetchImage}) (MainPage)