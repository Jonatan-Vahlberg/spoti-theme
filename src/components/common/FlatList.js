import React from "react"
import {FlatList as List} from "react-native" 

const FlatList = ({data,renderItem,style, keyName}) =>  {
   
        return(
            <List
                style={style}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => item[keyName]}
            />
        )
}

export {FlatList}