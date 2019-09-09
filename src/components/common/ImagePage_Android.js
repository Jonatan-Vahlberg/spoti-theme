import React from "react"
import {View, Image, ScrollView, Dimensions, StyleSheet} from "react-native" 

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('screen').height
const STOCK_IMAGE = "https://images.unsplash.com/photo-1557683304-673a23048d34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=486&q=80"

class ImagePage_Android extends React.Component {
    
    state = {pageNum: 0}

     render(){
        return(
           <View style={{flex:1, zIndex: 1}}>
                <ScrollView
                    style={{height: "100%", width: "100%"}}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={10}
                    pagingEnabled
                    onScroll={this._onScroll.bind(this)}>
                    {this.renderImages()}
                </ScrollView>
                <View style={styles.dotWrapperStyle}>
                    {this.renderDots()}
                </View>
            </View>
        )
    }

    renderImages(){
        const {images} = this.props
        
        return images.map((image,i) => {
            const uri = image.uri === "" ? STOCK_IMAGE : image.uri 
            return <Image style={styles.imageStyle} source={{uri: uri}} resizeMode="cover"/>
        })
    }

    renderDots(){
        const {images} = this.props

        return images.map((image,index) =>{
            if(index === this.state.pageNum){
                return <View style={[styles.dotStyle,{backgroundColor: "#2589FF", scaleX: 1.3, scaleY: 1.3}]}/>
            }
            return <View style={styles.dotStyle}/>
        })
    }

    _onScroll(e){
        let newPageNum = Math.round(parseFloat(e.nativeEvent.contentOffset.x/SCREEN_WIDTH))

        if(newPageNum !== this.state.pageNum){
            this.setState({pageNum: newPageNum})
            this.props.onPaging(newPageNum)
        }
    }
}

ImagePage_Android.defaultProps = {
    images: [],
    onPaging: () => {}
}

const styles = StyleSheet.create({
    imageStyle: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        margin: 0
        
    },
    dotWrapperStyle:{
        width: "100%",
        position: "absolute",
        bottom: 30,
        height: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2
    },
    dotStyle: {
        height:10,
        width: 10,
        borderRadius: 5,
        margin: 5,
        backgroundColor: "#fff"
    }
})

export {ImagePage_Android}