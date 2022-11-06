import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function HealthCalculatorScreen({ route, navigation }) {
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [Bmi, setBmi] = useState("")
  const [BmiResult, setBmiResult] = useState("")

  const calculate = (height, weight) => {
    var result = (parseFloat(weight) * 10000) / (parseFloat(height) * parseFloat(height));
    result = result.toFixed(2);
    setBmi(result);
    if (result < 18.5) {
      setBmiResult('Underweight')
    }
    else if (result >= 18.5 && result < 25) {
      setBmiResult('Normal weight')
    }
    else if (result >= 25 && result < 30) {
      setBmiResult('Overweight')
    }
    else if (result >= 30) {
      setBmiResult('Obese')
    }
    else {
      alert('Incorrect Input!');
      this.setState({ BmiResult: '' })
    }
  }
  return (
    <View style={styles.container}>
      <View style={{
        width: '100%',
        padding: 10,
      }}>
        <Text>Height(cm.)</Text>
        <TextInput
          style={styles.heightAndWeight}
          onChangeText={setHeight}
          value={height}
        />
        <Text>Weight(kg.)</Text>
        <TextInput
          style={styles.heightAndWeight}
          onChangeText={setWeight}
          value={weight}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={
            () => calculate(height, weight)
          }>
          <Text style={styles.submitButtonText}> Calculate </Text>
        </TouchableOpacity>
        <Text style={styles.output}>{Bmi}</Text>
        <Text style={styles.resultText}>{BmiResult}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
    padding: 30,
    width: '100%'
  },
  heightAndWeight: {
    height: 40,
    width: "100%",
    borderWidth: 0.5,
    borderColor: "lightgray",
    borderRadius: 3,
    padding: 10,
    marginTop: 10
  },
  submitButton: {
    backgroundColor: '#ff6666',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    textAlign: "center",
    color: 'white',
    fontWeight: "bold",
    fontSize: 18,
  },
  output: {
    textAlign: "center",
    fontSize: 30,
  }, 
  resultText: {
    paddingTop: 20,
    paddingBottom: 10,
    textAlign: "center",
    fontSize: 30,
    color: 'blue',
    fontWeight:"bold"
  },
});