import React from 'react';
import { TextInput, StyleSheet } from 'react-native';


const Buscador = ({ setSearch, search}) => {
    return (
        <TextInput 
        onChangeText={setSearch}
        value={search} 
        placeholder={'Search...'}
        style={styles.input}
     />
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 10,
        borderWidth:0,
        borderBottomWidth: 1,
      }
})

export default Buscador;