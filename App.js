import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, FlatList, Modal, View, Text, Pressable, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import Item from './Item';
import Buscador from './Buscador';

import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from 'react-native-chart-kit';

export default function App() {
  const [search, setSearch] = useState('');
  const [coins, setCoins] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getApiData();
  }, [])

  const getApiData = async () => {
    try {
      const resp = await fetch('https://api.coincap.io/v2/assets');
      const { data } = await resp.json();
      setCoins(data);
    } catch (error) {
      console.log(error)
    }
  }

  const renderItem = ({ item }) => <Item {...item} setShow={setShow} show={show} />

  const filterCoins = (coin) => {
    return coin.symbol.toLowerCase().includes(search.toLocaleLowerCase())
  }
  return (
    <SafeAreaView>
      <Buscador setSearch={setSearch} search={search} />
      <FlatList
        data={coins.filter(filterCoins)}
        renderItem={renderItem}
        keyExtractor={(coin) => coin.id}
      />

      <Modal
        animationType='slide'
        transparent={true}
        visible={show}
        onRequestClose={() => {
          setShow(!show);
        }}
      >
        <View style={styles.modal}>
          <Text>History</Text>
          <LineChart
            data={{
              labels: ["January", "February", "March", "April", "May", "June"],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100
                  ]
                }
              ]
            }}
            width={Dimensions.get("window").width - 30} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />

          <Pressable style={[styles.button, styles.buttonClose]}
            onPress={() => setShow(!show)}
          >
            <Text style={{ color: 'white' }}>Cerrar Modal</Text>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: '20%',
  },
  button: {
    borderRadius: 10,
    padding: 5,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: '#3425AA',
  },
  modal: {
    height: '97%',
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
});
