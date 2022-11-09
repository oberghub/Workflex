import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Countdown, { CountdownApi } from 'react-countdown';

export default class App extends Component {
    countdownApi: CountdownApi | null = null;
    time = 10000;
    newTime = 30000;
    state = { date: Date.now() + this.time };

    handleStartClick = () => {
        this.countdownApi && this.countdownApi.start();
    };

    handlePauseClick = () => {
        this.countdownApi && this.countdownApi.pause();
    };

    handleResetClick = () => {
        this.setState({ date: Date.now() + this.time });
    };

    handleNewTimeClick = () => {
        this.setState({ date: Date.now() + this.newTime });
    };

    handleUpdate = () => {
        this.forceUpdate();
    };

    setRef = (countdown: Countdown | null) => {
        if (countdown) {
            this.countdownApi = countdown.getApi();
        }
    };

    isPaused() {
        return !!(this.countdownApi && this.countdownApi.isPaused());
    }

    isCompleted() {
        return !!(this.countdownApi && this.countdownApi.isCompleted());
    }

    render() {
        return (
            <View style={styles.container}>
                <Countdown
                    key={this.state.date}
                    ref={this.setRef}
                    date={this.state.date}
                    onMount={this.handleUpdate}
                    onStart={this.handleUpdate}
                    onPause={this.handleUpdate}
                    onComplete={this.handleUpdate}
                    autoStart={true}
                    // styles={}
                    onFinish={this.handleNewTimeClick}
                />
                <div>
                    <button
                        type="button"
                        onClick={this.handleStartClick}
                        disabled={!this.isPaused() || this.isCompleted()}
                    >
                        Start
                    </button>{' '}
                    <button
                        type="button"
                        onClick={this.handlePauseClick}
                        disabled={this.isPaused() || this.isCompleted()}
                    >
                        Pause
                    </button>{' '}
                    <button type="button" onClick={this.handleResetClick}>
                        Reset
                    </button>
                    <button type="button" onClick={this.handleNewTimeClick}>
                        NewTime
                    </button>
                </div>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
// const Stack = createNativeStackNavigator();
//   const [run, setRun] = useState(true);
//   const [count, setCount] = useState(0);
//   const [first, setfirst] = useState(true);
//   const pause = () => {
//     if (run == true) {
//       setRun(false);
//     } else {
//       setRun(true);
//     }
//     console.log(count);
//     console.log(postureData[count].sec);
//   }
//   const goNextPose = () => {
//     if (count >= postureData.length - 1) {
//       console.log(count);
//       console.log("finish")
//     } else {
//       setCount(count + 1);
//     }
//   }
//   const handleResetClick = () => {
//     if (count >= postureData.length - 1) {
//       console.log("finish")
//     } else {
//       setCount(count + 1);
//     }
//     console.log(count);
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={{ fontSize: 40, fontWeight: '700' }}>{postureData[count].name}</Text>
//       <CountDown
//         id={(count).toString()}
//         until={postureData[count+1].sec}
//         size={50}
//         onFinish={goNextPose}
//         digitTxtStyle={{ color: 'black', fontSize: 80, fontWeight: '500' }}
//         digitStyle={{ backgroundColor: '#FFF' }}
//         timeToShow={['M', 'S']}
//         timeLabels={{ m: null, s: null }}
//         separatorStyle={{ color: 'black' }}
//         showSeparator
//         running={run}
//       />
//       {/* <Stack.Navigator initialRouteName="My Courses" screenOptions={{
//         headerShown: false
//       }}>
//         <Stack.Screen name="My Courses" component={clock} />
//       </Stack.Navigator> */}
//       <TouchableOpacity style={{
//         height: 50,
//         width: '70%',
//         backgroundColor: 'lightblue',
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 5,
//         marginTop: 20,
//       }} onPress={pause}>
//         <Text style={{
//           fontSize: 22,
//           fontWeight: '500'
//         }}>Stop</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={{
//         height: 50,
//         width: '70%',
//         backgroundColor: 'lightblue',
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 5,
//         marginTop: 20,
//       }}>
//         <Text style={{
//           fontSize: 22,
//           fontWeight: '500'
//         }} onPress={handleResetClick}>Reset</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }