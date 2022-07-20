import HomeScreen from './Screens/Home';
import Player from './Screens/Player';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Library" component={HomeScreen} />
      <Stack.Screen name="Player" component={Player} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

