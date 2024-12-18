import React,{useRef,useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import  Colors  from '@/constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import destinationCategories from '@/data/categories';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

const CategoryButtons = () => {
  const scrollRef =useRef<ScrollView>(null);
  const itemRef = useRef <typeof TouchableOpacity[] >([]);
  const[activeIndex,setActiveIndex]=useState(0);

  const handleSelectCategory =(index: number) => {
    setActiveIndex(index);

  }
  return (
    <View>
      <Text style={styles.title}>Categories</Text>
      <ScrollView 
       ref={scrollRef}
       horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
        gap:20,paddingVertical:10,marginBottom:10,
      }}>
      {destinationCategories.map((item,index) => (
        <TouchableOpacity key={index} ref={(el) =>(itemRef.current[index] = el )} onPress={() => handleSelectCategory(index)} style={activeIndex==index? styles.categoryBtnActive:styles.categoryBtn}>
          <AntDesign name={item.iconName as any} size={20} color={Colors.black} />
         <Text key={index}>{item.title}</Text>
        </TouchableOpacity>
      ))}
      </ScrollView>
    </View>
  );
};

export default CategoryButtons

const styles=StyleSheet.create({
    title:{
        fontSize:23,fontWeight:'700',color: Colors.black,
    },
    categoryBtn:{
      flexDirection:"row",alignItems:"center",backgroundColor:Colors.white,paddingHorizontal:16,paddingVertical:10,borderRadius:10,shadowColor:"#333333",shadowOffset:{width:1,height:2},shadowOpacity:0.1,shadowRadius:3,
    },
    categoryBtnActive:{
      flexDirection:"row",alignItems:"center",backgroundColor:Colors.primaryColor,paddingHorizontal:16,paddingVertical:10,borderRadius:10,shadowColor:"#333333",shadowOffset:{width:1,height:2},shadowOpacity:0.1,shadowRadius:3,
    },
    categoryBtnTxt:{
      marginLeft:5,color:Colors.black,
    },
    categoryBtnTxtActive:{
      marginLeft:5,color:Colors.white,
    },
})