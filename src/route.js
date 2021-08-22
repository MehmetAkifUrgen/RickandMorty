import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Home from './Home'
import Detail from './Detail'
import CharacterDetail from './CharacterDetail'

const Stack = createNativeStackNavigator();
const screenOptionStyle = {
    headerShown: false
}

const Router = () => {
    return(
        <Stack.Navigator screenOptions={screenOptionStyle} >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Detail" component={Detail} />
            <Stack.Screen name="CharacterDetail" component={CharacterDetail} />

        </Stack.Navigator>
    )
}

export default Router;