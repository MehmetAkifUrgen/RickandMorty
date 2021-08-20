import React,{useEffect,useState} from 'react';
import { FlatList, ImageBackground, Text, ActivityIndicator, TouchableOpacity, View } from 'react-native';

const Home = ({
    params,
}) => {
    const [data,setData]=useState([])
    const [data2,setData2]=useState([])
    const [data3,setData3]=useState([])
    const [error,setError]=useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [control,setControl]=useState(false)
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

    useEffect(() => {
        setIsLoading(true);
        getEpisodes()
        getEpisodes2()
        getEpisodes3()
        data.concat(data2,data3)
    }, [])
    
    const renderItem =({item}) => {
            return(
                <TouchableOpacity style={{justifyContent:'space-between',alignItems:'center',flexDirection:'row'}}>
                        <Text style={{color:"white",fontWeight:'bold',fontSize:18}}>
                            {item.name}
                        </Text>
                        <Text style={{color:"white"}}>
                            {item.episode}
                        </Text>
                    </TouchableOpacity>
            )
    }
    if (isLoading) {
      
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
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'black'}}>
            {/* <ImageBackground   style={{
                    flex:1,
                    width:'100%',
                    height: '100%',
                   }} source={require('../assets/background.jpg')}></ImageBackground> */}
            <FlatList
                style={{position:'absolute'}}
                data={data}
                renderItem={renderItem}
            />
        </View>
    )
}

export default Home;
