import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';


export default function HomeScreen({navigation}) {
    return (
      <View style={styles.container} >
        <Text>This is your Library</Text>
        
        <Button
        title='Go to Player'
        onPress={() => navigation.navigate('Player')}
        />
      </View>
    );
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  