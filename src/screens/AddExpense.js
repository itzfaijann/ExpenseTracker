import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fontSize, {moderateScale} from './metrix';
import { useNavigation } from '@react-navigation/native';

const AddExpense = () => {
  const Navigation= useNavigation();
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [amountError, setAmountError] = useState('');
  const [categoryError, setCategoryError] = useState('');

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const validateInputs = () => {
    let isValid = true;

    if (!amount.trim() || isNaN(amount)) {
      setAmountError('Please enter a valid number');
      isValid = false;
    } else {
      setAmountError('');
    }

    if (!category.trim()) {
      setCategoryError('Category is required');
      isValid = false;
    } else {
      setCategoryError('');
    }

    return isValid;
  };

  const saveExpense = async () => {
    if (!validateInputs()) return;

    const formattedDate = date.toISOString().split('T')[0];
    const newExpense = {amount, category, date: formattedDate};

    try {
      const existing = await AsyncStorage.getItem('expenses');
      const expenses = existing ? JSON.parse(existing) : [];
      expenses.push(newExpense);
      await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
     Navigation.goBack();;
    } catch (e) {
      console.log('Saving error:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add The Expense</Text>

      <Text style={[styles.label, amountError && styles.labelError]}>Amount</Text>
      <TextInput
        style={[styles.input, amountError && styles.inputError]}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        placeholder="ex: 99"
      />
      {amountError ? <Text style={styles.error}>{amountError}</Text> : null}

      <Text style={[styles.label, categoryError && styles.labelError]}>Category</Text>
      <TextInput
        style={[styles.input, categoryError && styles.inputError]}
        value={category}
        onChangeText={setCategory}
        placeholder="ex: plastic, feram, etc"
      />
      {categoryError ? <Text style={styles.error}>{categoryError}</Text> : null}

      <Text style={styles.label}>Date</Text>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <TextInput
          style={styles.input}
          value={date.toISOString().split('T')[0]}
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <TouchableOpacity style={styles.btnCtr} onPress={saveExpense}>
        <Text style={styles.btnTxt}>Save Expense</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: fontSize(26),
    fontWeight: '800',
    alignSelf: 'center',
    marginBottom: moderateScale(10),
  },
  label: {
    fontWeight: '600',
    fontSize: fontSize(16),
    marginVertical: moderateScale(2),
    marginLeft: moderateScale(14),
    color: 'black',
  },
  labelError: {
    color: 'red',
  },
  input: {
    width: '94%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: moderateScale(10),
    height: moderateScale(50),
    justifyContent: 'center',
    marginBottom: moderateScale(5),
    fontSize: fontSize(17),
    paddingHorizontal: moderateScale(10),
    alignSelf: 'center',
  },
  inputError: {
    borderColor: 'red',
  },
  btnCtr: {
    width: '94%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: moderateScale(10),
    height: moderateScale(55),
    justifyContent: 'center',
    fontSize: fontSize(17),
    backgroundColor: 'black',
    marginTop: moderateScale(10),
    alignSelf: 'center',
  },
  btnTxt: {
    fontSize: fontSize(17),
    color: 'white',
    alignSelf: 'center',
    fontWeight: '700',
  },
  error: {
    color: 'red',
    fontSize: fontSize(13),
    marginBottom: moderateScale(5),
    marginLeft: moderateScale(14),
  },
});

export default AddExpense;
