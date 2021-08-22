import React,{useEffect,useState} from 'react';
import { FlatList, StyleSheet, Text, ActivityIndicator, TouchableOpacity, View, ImageBackground, Animated,Easing } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const Home = ({
    navigation,
}) => {
    const [data,setData]=useState([])
    const [data2,setData2]=useState([])
    const [data3,setData3]=useState([])
    const [error,setError]=useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [control,setControl]=useState(false)
    const [allData,setAllData]=useState([])
    const [defaultSeason,setSeason]=useState("S01")
    const scaleAnimated=new Animated.Value(.7)
    const getEpisodes = () => {
        fetch("https://rickandmortyapi.com/api/episode", {
        method: 'GET',
            }).then((response)=>response.json()).then((json)=>{setData(json.results),setIsLoading(false) ,setControl(true) })
            .catch((err)=> {
                setIsLoading(false), setError(err)} );
            
        };
        const getEpisodes2 = () => {
            fetch("https://rickandmortyapi.com/api/episode?page=2", {
            method: 'GET',
                }).then((response)=>response.json()).then((json)=>{setData2(json.results),setIsLoading(false) ,setControl(true) })
                .catch((err)=> {
                    setIsLoading(false), setError(err)} );
                
            };
        const getEpisodes3 = () => {
                fetch("https://rickandmortyapi.com/api/episode?page=3", {
                method: 'GET',
                    }).then((response)=>response.json()).then((json)=>{setData3(json.results),setIsLoading(false) ,setControl(true) })
                    .catch((err)=> {
                        setIsLoading(false), setError(err)} );
                    
                };
                const startAnimations = () => {
                    Animated.timing(scaleAnimated,{
                      toValue:1,
                      duration:2000,
                      useNativeDriver:false,
                      easing:Easing.elastic(10)
                    }).start()
                };

    useEffect(() => {
        setIsLoading(true);
        getEpisodes()
        getEpisodes2()
        getEpisodes3()
        
    }, [])
    useEffect(() => {
        
      startAnimations()
    })
    
    const renderItem =({item}) => {
        const url=item.url
        if(item.episode.substr(0,3)==defaultSeason)
            return(
                <TouchableOpacity onPress={()=> navigation.navigate('Detail',{url})} style={styles.item}>
                        <View style={styles.itemLeftView}>
                                <Text allowFontScaling style={styles.episodeName}>
                                    {item.name}
                                </Text>
                                <Text style={styles.episodeDate}>
                                    {item.air_date}
                                </Text>
                        </View>
                        
                        <Text style={styles.episode}>
                            {item.episode}
                        </Text>
                    </TouchableOpacity>
            )
    }
    if (isLoading) {
        allData.concat(data,data2,data3)
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
           <ActivityIndicator size="large" color="#5500dc" />
          </View>
        );
     }
    if (error) {
        getEpisodes()
        setControl(true)
        setError(false)
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18}}>
            Error fetching data... Check your network connection!
         </Text>
       </View>
      );
    }
    console.log('****',data)
    return(
        <View style={styles.container}>
            <ImageBackground   style={styles.mainBackImage} source={require('../assets/background.jpg')}></ImageBackground>
            <View style={styles.header} >
                   <Animated.Image
                    resizeMode="stretch"
                    source={require('../assets/head.png')}
                    style={{ width:'100%',
                    height:'100%',transform:[{
                        scale:scaleAnimated
                    }]}}
                   />
            </View>
            <View style={styles.seasonView}>
                <TouchableOpacity style={styles.seasonButtons} onPress={()=> setSeason("S01")}>
                    <Text style={[styles.episodeName,{color:'grey',fontSize:hp('1.7%')}]}>SEASON 1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.seasonButtons} onPress={()=> setSeason("S02")}>
                <Text style={[styles.episodeName,{color:'grey',fontSize:hp('1.7%')}]}>SEASON 2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.seasonButtons} onPress={()=> setSeason("S03")}>
                <Text style={[styles.episodeName,{color:'grey',fontSize:hp('1.7%')}]}>SEASON 3</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.seasonButtons} onPress={()=> setSeason("S04")}>
                <Text style={[styles.episodeName,{color:'grey',fontSize:hp('1.7%')}]}>SEASON 4</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                
                data={data.concat(data2,data3)}
                renderItem={renderItem}
                
            />
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        flex:1,backgroundColor:'black',
        alignItems:'center'
        
    },
    header:{
        height:hp('20%'),
        width:wp('100%')
    },
    itemLeftView:{
        flexDirection:'column',
        padding:wp('1%'),
        width:'70%'
    },
    episodeName:{
        color:'white',
        fontSize:hp('2.2%'),
        fontWeight:'600'
    },
    episodeDate:{
        color:'gold',
        fontSize:hp('1.8%'),
        fontWeight:'500'
    },
    episode:{
        color:'white',
        fontSize:hp('2%'),
        fontWeight:'700'
    },
    item:{
        flex:1,justifyContent:'space-between',alignItems:'center',flexDirection:'row',
        borderBottomWidth:wp('1%'),
        borderBottomColor:'tomato',
        marginHorizontal:5,
        height:hp('10%'),
        
    },
    headImage:{
        width:'100%',
        height:'100%',
        
    },
    mainBackImage:{
        position:'absolute',
                    width:'100%',
                    height: '100%',
                    opacity:.3
    },
    seasonView:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:wp('2%'),
        padding:wp('1%'),
        alignItems:'center',
        width:'80%'
    },
    seasonButtons:{
        backgroundColor:'white',
        padding:wp('1%'),
        borderRadius:wp('1%')
    }
})

export default Home;
