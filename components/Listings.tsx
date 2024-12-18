import{StyleSheet,Text,View}from 'react-native'
import react from 'react'
import { FlatList } from 'react-native-gesture-handler'

type Props ={
    listings: any[]
};

const Listings = ({listings}:Props) => {
    const renderItems=({ item }) => {
        return
        <View>
            <Text>(item.name)</Text>
        </View>
    }
    return (
        <View>
           <FlatList data={listings} renderItem={renderItems} />
        </View>
    )
}

export default Listings

const styles =StyleSheet.create({})
