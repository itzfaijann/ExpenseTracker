import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import fontSize from './metrix';

const CustomTextInput = ({placeholder, onChangeText, value,keyboardType,Title,bad}) => {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.inputContainer,{borderColor:bad==true?"red":"black"}]}>
        <Text style={[styles.title,{color: bad==true?"red":"black"}]}>{Title}</Text>
        <TextInput
          placeholder={placeholder}
          onChangeText={onChangeText}
          keyboardType={keyboardType ? keyboardType : 'default'}
          value={value}
          style={styles.input}
        />
      </View>
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center'
  },
  inputContainer: {
    width: '90%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: moderateScale(10),
    height: moderateScale(50),
    position: 'relative',
    justifyContent: 'center',
    marginTop: moderateScale(14)
  },
  title: {
    position: 'absolute',
    top: -moderateScale(10),
    left: moderateScale(15),
    backgroundColor: 'white',
    paddingHorizontal: moderateScale(5),
    fontSize: fontSize(16),
  },
  input: {
    height: moderateScale(40),
    paddingHorizontal: moderateScale(10),
    fontSize: fontSize(15),
  },
});
