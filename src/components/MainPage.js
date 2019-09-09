import React from "react"
import {View} from "react-native" 
import {connect} from "react-redux"
import _ from "lodash"
import Axios from "axios";

import {ImagePage_Android, Spinner} from "./common";
import {fetchImage, addPlaylists, fetchThemes} from "../actions"
import SpotyfiList from "./SpotifyList";

class MainPage extends React.Component {
    constructor(props){
        super(props)
       
    }

    componentDidMount(){
        this.props.fetchThemes()       
    }

    state = {loaded: false, page: 0}

   render(){ 
       console.log("test")
        this.fetchImages()
        this.props.images.forEach(image => {
            if((this.props.playlists[image.id] === null) || this.props.playlists[image.id] === undefined || image.updated){
                console.log('image fetch', image)
                this.fetchPlaylists(image.query,image.id)
            }
        })
        return(
            
            <React.Fragment>
                {this.renderImagePage()}
                {this.props.images.length !== 0 && this.renderList()}
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
        const {page} = this.state
        const {images, token, playlists} = this.props
        const playlistsLength = this.getObjectLength(playlists)
        
        
        if((token && (playlists !== {}))&& (playlistsLength === images.length)){
            return (
                <SpotyfiList
                    data={playlists[images[page].id]}/>
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
                console.log('image fetch', image)
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
            this.props.addPlaylists(data,imageId)
        }
        else{
            this.setState({loaded: false})
        }
        
    }

    getObjectLength(object){
       const array =  _.map(object,(val,id) => {return {...val,id}})
       return array.length
    }

    
}

const mapStateToProps = (state,ownProps) => {
    const images = _.map(state.data,(val,id) => {return {...val}})
    return {
        images: images,
        token: state.auth.token,
        playlists: state.playlists
    }
}

export default connect(mapStateToProps,{fetchImage, addPlaylists, fetchThemes}) (MainPage)