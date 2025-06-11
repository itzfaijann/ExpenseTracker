import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fontSize, {moderateScale} from './metrix';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const ViewExpense = () => {
  const [expenses, setExpenses] = useState([]);
  const Navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const loadExpenses = async () => {
        try {
          const data = await AsyncStorage.getItem('expenses');
          if (data) {
            setExpenses(JSON.parse(data));
          } else {
            setExpenses([]);
          }
        } catch (e) {
          console.log('Failed to load expenses:', e);
        }
      };

      loadExpenses();
    }, [])
  );

  const deleteExpense = async (index) => {
    const updated = [...expenses];
    updated.splice(index, 1);
    setExpenses(updated);
    await AsyncStorage.setItem('expenses', JSON.stringify(updated));
  };

  const confirmDelete = (index) => {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this expense?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Yes', onPress: () => deleteExpense(index)},
      ],
      {cancelable: true}
    );
  };

  const renderItem = ({item, index}) => (
    <View style={styles.item}>
      <View>
        <Text style={styles.itemText}>💰 Amount: ₹{item.amount}</Text>
        <Text style={styles.itemText}>📦 Category: {item.category}</Text>
        <Text style={styles.itemText}>📅 Date: {item.date}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => confirmDelete(index)}>
        <Text style={styles.deleteTxt}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      {/* Add Expense Button */}
      <TouchableOpacity
        onPress={() => {
          Navigation.navigate('AddExpense');
        }}
        style={styles.btnCtr}>
        <Text style={styles.btnTxt}>Add Expenses</Text>
      </TouchableOpacity>

      {/* Heading */}
      <Text style={styles.heading}>Your Expenses</Text>

      {/* Expense List */}
      <View style={styles.container}>
        {expenses.length === 0 ? (
          <Text style={styles.noData}>No expenses added yet.</Text>
        ) : (
          <FlatList
            data={expenses}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
          />
        )}
      </View>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  btnCtr: {
    width: '94%',
    borderRadius: moderateScale(10),
    height: moderateScale(50),
    justifyContent: 'center',
    backgroundColor: 'green',
    marginTop: moderateScale(10),
    alignSelf: 'center',
  },
  btnTxt: {
    fontSize: fontSize(17),
    color: 'white',
    alignSelf: 'center',
    fontWeight: '700',
  },
  heading: {
    fontSize: fontSize(22),
    fontWeight: 'bold',
    marginVertical: moderateScale(12),
    color: 'black',
    marginLeft: moderateScale(12),
    marginTop: moderateScale(20)
  },
  container: {
    flex: 1,
    paddingBottom: moderateScale(7),
    backgroundColor: '#fff',
  },
  noData: {
    textAlign: 'center',
    fontSize: fontSize(16),
    color: 'gray',
  },
  item: {
    backgroundColor: '#f5f5f5',
    marginVertical: moderateScale(6),
    marginHorizontal: moderateScale(14),
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: fontSize(15),
    marginBottom: moderateScale(2),
  },
  deleteBtn: {
    backgroundColor: 'red',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
    borderRadius: moderateScale(8),
  },
  deleteTxt: {
    color: 'white',
    fontWeight: '600',
    fontSize: fontSize(14),
  },
});

export default ViewExpense;
