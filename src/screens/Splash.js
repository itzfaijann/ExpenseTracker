import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import fontSize from './metrix'
import { useNavigation } from '@react-navigation/native'

const Splash = () => {
    const Navigation = useNavigation();
    useEffect(()=>{
        setTimeout(()=>{
            Navigation.navigate("ViewExpense")
        },3000)
    },[])
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>ExpenseTracker</Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green'
    },
    txt:{
        fontSize: fontSize(30),
        fontWeight: "800",
        color: 'white',

    }
})