import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import NumberFormat from 'react-number-format';

const Item = ({ id, symbol, priceUsd, setShow, show }) => {
    return (
        <View>
            <Pressable style={styles.item} onPress={() => setShow(!show)}>
                <Text style={styles.symbol}>{symbol}</Text>
                <NumberFormat 
                    value={priceUsd}
                    displayType='text'
                    thousandSeparator
                    prefix='$'
                    decimalScale={8}
                    renderText={(value) => <Text style={styles.symbol}>{value}</Text>}
                />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#eeeeee',
        shadowColor: '#cccccc',
        shadowOpacity: 9,
        padding:10,
        marginVertical: 8,
        marginHorizontal:16,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    symbol: {
        fontSize: 14,
    }
})

export default Item;