import * as React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView, useWindowDimensions} from 'react-native';
import {Reader, ReaderProvider} from 'epubjs-react-native';


export default function Player({navigation}) {
    const {width, height} = useWindowDimensions();
    return (        
        <SafeAreaView style={styles.container}>
            <Text>Player</Text>
    
            <Button title='Go to Library'
                onPress={
                    () => navigation.navigate('Library')
                }/>

                
            <ReaderProvider>
                <Reader src={
                        {uri: 'https://s3.amazonaws.com/moby-dick/OPS/package.opf'}
                    }
                    width={width}
                    height={height}/>
            </ReaderProvider>
        </SafeAreaView>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
