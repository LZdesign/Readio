import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';


export default function Player({navigation, route}) {
    return (
      <View style={styles.container}>
        <Text>Player</Text>

        <Button
        title='Go to Library'
        onPress={() => navigation.navigate('Library')}
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
  