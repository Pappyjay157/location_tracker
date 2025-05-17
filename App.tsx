import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './src/screens/MapScreen';
import WorkoutComplete from './src/screens/WorkoutComplete';
import { RootStackParamList } from './src/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Map">
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="WorkoutComplete" component={WorkoutComplete} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
