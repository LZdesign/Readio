import * as React from 'react';
import {Button, StyleSheet, Text, View, SafeAreaView, useWindowDimensions } from 'react-native';
import {Reader, ReaderProvider, useReader} from 'epubjs-react-native';
import {ScrollView} from 'react-native-gesture-handler';


export default function Player({navigation}) {
    const {width, height} = useWindowDimensions();
    const { changeFontSize, goToLocation } = useReader();
    return (
        <ScrollView>
            <View style={styles.container}>

                <Button title='Go to Library'
                    onPress={
                        () => navigation.navigate('Library')
                    }/>

            </View>

            <SafeAreaView style={
                styles.container
            }>

                <ReaderProvider>
                    <Reader src={{uri: 'https://s3.amazonaws.com/moby-dick/OPS/package.opf'}}
                        width={width}
                        height={height}
                        changeFontSize = '44px'
                        initialLocation={'epubcfi(/6/2[cover]!/6)'}
                        />
                </ReaderProvider>
            </SafeAreaView>
        </ScrollView>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    }
});
