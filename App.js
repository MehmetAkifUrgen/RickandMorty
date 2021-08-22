import React from 'react';
import { Text, View } from 'react-native';
import Route from './src/route'
import { NavigationContainer } from '@react-navigation/native'

const App = ({
    
}) => {
  return(
    <NavigationContainer>
      <Route/>
    </NavigationContainer>
  )
}

export default App;
