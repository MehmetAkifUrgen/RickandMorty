import React from 'react';
import { Text, View,StyleSheet, ImageBackground } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const CharacterDetail = ({
    route,
}) => {
    const {image,name,gender,status,species,origin}=route.params
    return(
            <View style={styles.container}>
                    <View style={styles.header}>
                        <ImageBackground resizeMode="stretch" source={{uri:image}} style={styles.headerImage}></ImageBackground>
                    </View>
                    <View style={styles.detail}> 
                    <ImageBackground resizeMode="stretch" source={require('../assets/bottomImage.jpg')} style={styles.bottomImage}></ImageBackground>
                            <Text style={styles.detailText}>DETAILS</Text>
                            <View>
                            <Text style={styles.text}> Name: {name} </Text>
                            <Text style={styles.text}> Gender: {gender} </Text>
                            <Text style={styles.text}> Status: {status} </Text>
                            <Text style={styles.text}> Species: {species} </Text>
                            <Text style={styles.text}> Origin: {origin} </Text>
                            </View>
                    </View>
            </View>
    )
}
const styles=StyleSheet.create({
    container:{
        flex: 1,
        alignItems:'center',
        backgroundColor:'black'
    },
    header:{
        height:hp('70%'),
        width:wp('100%')
    },
    headerImage:{
        width:'100%',
        height:'100%',
        shadowColor:'white',
        shadowOpacity:.5,
        shadowRadius:12,
        elevation:16,

    },
    detail:{
        shadowColor:'white',
        shadowOpacity:.5,
        shadowRadius:16,
        elevation:4,
        justifyContent:'center',
        backgroundColor:'black',
        width:wp('100%'),
        height:hp('30%'),
        alignItems:'center'
        
    },
    text:{
        textAlign:'left',
        color:'white',
        fontSize:hp('2.1%'),
        fontWeight:'600'
    },
    bottomImage:{
        position:'absolute',
        width:'100%',
        height:'100%',
        opacity:.3,        
    },
    detailText:{
        fontSize:hp('3%'),
        color:'tomato',
        marginBottom:hp('2%'),
        fontWeight:'500'
    }
})
export default CharacterDetail;
