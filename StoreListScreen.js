import React, { useEffect , useState, useCallback} from 'react';
import { StyleSheet, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import Store from './Stores';
import {getApi} from './util/Api';
import {createTable,saveStoreItems,deleteTable ,getStoreItems,getDBConnection } from './util/Db';



// Store Liste
function StoreListScreen ({ navigation }) {
  const [data, setData] = useState([]);

  const loadDataCallback = useCallback(async () => {
    try {
      // const initTodos = [{ id: 0, value: 'go to shop' }, { id: 1, value: 'eat at least a one healthy foods' }, { id: 2, value: 'Do some exercises' }];
      const initTodos = await getApi();
      const db = await getDBConnection();
      await createTable(db);
      const storedTodoItems = await getStoreItems(db);
      if (storedTodoItems.length) {
        setData(storedTodoItems);
      } else {
        await saveStoreItems(db, initTodos);
        setData(initTodos);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);


  // useEffect(() => {
  //   const getData = async () => {
  //   setData(await getApi());
  //   // console.log(data);
  //   }
  //   getData();
  // },[]);

  const Item = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress}>
      <Text>{item.banner}</Text>
      <Text>{item.lastVisit}</Text>
      <Text>{item.address}</Text>
    </TouchableOpacity>
  );

    const renderItem = ({ item }) => {
  
      return (
        <Item
          item={item}
          onPress={() => navigation.navigate('Tab', {name: (item.banner+ " " + item.address)})}
        />
      );
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
    containerCenter: {
      flex: 1,
      alignItems: 'center',
    },
    containerCenterMargin: {
      flex: 1,
      alignItems: 'center',
      marginTop: 30,
    },
    tinyLogo: {
      width: 80,
      height: 80,
      marginBottom: 30,
      marginTop: 25,
    },
    textInput: {
      borderColor: "black",
      borderWidth: 1,
      padding: 5,
      paddingLeft: 15,
      width: 300,
      marginBottom: 5,
      borderRadius: 10,
    },
    buttonLogin: {
      padding: 15,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      width: 300,
      backgroundColor: 'rgb(123, 129, 156)',
      color: 'black',
    },
    buttonAddUser: {
      padding: 15,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      width: 300,
      backgroundColor: 'rgb(123, 129, 156)',
      color: 'black',
      marginTop: 20,
    },
    textLogin: {
      fontSize: 15,
    },
    textNewUser: {
      marginBottom: 10,
      marginTop: 10,
    },
  });

  export default StoreListScreen;