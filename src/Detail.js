import React,{useState,useEffect} from 'react';
import { Text, View ,ActivityIndicator, FlatList, StyleSheet, Image,TouchableOpacity,Animated,Easing,ImageBackground} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const Detail = ({
    route,navigation
}) => {
    const {url}=route.params
    const ex=[]
    const [data, setData] = useState([]);
    const [char,setChar]=useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [control, setControl] = useState(null);
    const scaleAnimated=new Animated.Value(0)

    const getDetail = () => {
        fetch(url, {
        method: 'GET',
            }).then((response)=>response.json()).then((json)=>{setData(json), setControl(true),getCharacters() })
            .catch((err)=> {
                setIsLoading(false), setError(err)} );
                
        };
    const getCharacters = ()=>{
        for (let index = 0; index < data.characters.length; index++) {
            
          fetch(data["characters"][index], {
            method: 'GET',
                }).then((response)=>response.json()).then((json)=>{ex.push(json),setControl(true),setChar(ex) })
                .catch((err)=> {
                     setError(err)} );                     
          }
        setIsLoading(false)
      }
      const startAnimations = () => {
        Animated.timing(scaleAnimated,{
          toValue:360,
          duration:1000,
          useNativeDriver:false,
          easing:Easing.elastic(10)
        }).start()
    };
    const startInterpolate = scaleAnimated.interpolate({
      inputRange:[0,360],
      outputRange:['0deg','360deg']
    })
    useEffect(() => {
        setIsLoading(true);
        getDetail()
        
    }, [])
    useEffect(() => {
      startAnimations()
    })
    
   
    if (isLoading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
           <ActivityIndicator size="large" color="#5500dc" />
          </View>
        );
     }
    
      if (error) {
        setControl(true)
        setError(false)
        getCharacters()
       return (
         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
           <Text style={{ fontSize: hp('1.8%')}}>
             Error fetching data... Check your network connection!
          </Text>
        </View>
       );
     }

     const renderItem =({item})=> {
        const image=item.image
        const name=item.name
        const gender=item.gender
        const status=item.status
        const species=item.species
        const origin=item.origin.name
       return(
         
         <TouchableOpacity onPress={()=> navigation.navigate('CharacterDetail',{image,name,gender,status,species,origin}) } style={styles.item}>
           <View style={styles.leftView}>
           <Text style={styles.headText}> {item.name} </Text>
           <Text style={styles.headText}> {item.gender} </Text>
           </View>
           <Animated.Image resizeMode="stretch" style={{ width:wp('15%'),
    height:hp('10%'),
    borderRadius:wp('2.5%'),transform:[{rotate:startInterpolate}]}} source={{uri:item.image}} />
         </TouchableOpacity>
       )
     }

    if(control){
      
      return(
        <View style={styles.container}>
          <ImageBackground   style={styles.mainBackImage} source={require('../assets/detailImage.jpg')}></ImageBackground>
              <Text style={styles.characterText}>EPISODE DETAILS</Text>
                <View style={styles.headView}>
                <Text style={styles.headText}> Episode : {data.episode} </Text>
                <Text style={styles.headText}> Episode Name : {data.name} </Text>
                <Text style={styles.headText}> Release Date : {data.air_date} </Text>
                </View>
                <Text style={styles.characterText}> CHARACTERS</Text>
                <FlatList
                    data={char}      
                    renderItem={renderItem}          
                
                />

        </View>
    )
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
    
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    backgroundColor:'black'
    
  },
  item:{
    flex:1,justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    marginHorizontal:wp('2%'),
    marginVertical:hp('1%'),
    width:wp('80%'),
    backgroundColor:'#F5F5F5',
    padding:wp('2%'),
    borderRadius:wp('2%')
  },
  image:{
    width:wp('15%'),
    height:hp('10%'),
    borderRadius:wp('2.5%'),
  },
  leftView:{
    borderBottomWidth:wp('.3%'),
    borderBottomColor:'tomato',
    width:wp('30%')
  },
  modal:{
    width:wp('60%'),
    justifyContent:'center',
    alignItems:'center'
  },
  bigImage:{
    width:wp('40%'),
    height:hp('30%'),
    borderRadius:wp('5%')
  },
  backImage:{
    width:wp('10%'),
    height:hp('8%')
  },
  headView:{
    marginTop:hp('2%'),
    backgroundColor:'#F5F5F5',
    padding:wp('1%'),
    borderRadius:wp('2%'),
    shadowColor:'#F5F5F5',
    shadowOpacity:.5,
    shadowRadius:4,
    elevation:4,
    marginBottom:hp('5%')
  },
  headText:{
    color:'#414A4C'
  },
  mainBackImage:{
    position:'absolute',
                width:'100%',
                height: '100%',
                opacity:.3
},
characterText:{
  color:'tomato',
  fontSize:hp('3%'),
  fontWeight:'700'
}
})

export default Detail;
