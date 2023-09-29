import React, {useState} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  TourGuideProvider, // Main provider
  TourGuideZone, // Main wrapper of highlight component
  TourGuideZoneByPosition, // Component to use mask on overlay (ie, position absolute)
  useTourGuideController, // hook to start, etc.
} from 'rn-tourguide';

const uri =
  'https://pbs.twimg.com/profile_images/1223192265969016833/U8AX9Lfn_400x400.jpg';

// Add <TourGuideProvider/> at the root of you app!
function index() {
  return (
    <TourGuideProvider {...{borderRadius: 16, androidStatusBarVisible: true}}>
      <AppContent />
    </TourGuideProvider>
  );
}

const AppContent = () => {
  const [finalEvent, setfinalEvent] = useState(false);
  const iconProps = {size: 40, color: '#888'};

  // Use Hooks to control!
  const {start, canStart, stop, eventEmitter} = useTourGuideController();

  console.log(canStart);
  // React.useEffect(() => {
  //   // start at mount
  //   if (canStart) {
  //     start();
  //   }
  //   const test = start(2);
  //   console.log();
  // }, [canStart]); // wait until everything is registered

  const handleOnStart = () => console.log('start');
  const handleOnStop = () => console.log('stop');
  const handleOnStepChange = () => console.log(`stepChange`);

  // React.useEffect(() => {
  //   eventEmitter.on('start', handleOnStart);
  //   eventEmitter.on('stop', handleOnStop);
  //   eventEmitter.on('stepChange', handleOnStepChange);

  //   return () => {
  //     eventEmitter.off('start', handleOnStart);
  //     eventEmitter.off('stop', handleOnStop);
  //     eventEmitter.off('stepChange', handleOnStepChange);
  //   };
  // }, []);
  return (
    <View style={styles.container}>
      {/* Use TourGuideZone only to wrap */}
      <TourGuideZone keepTooltipPosition zone={2} text={'🎉'} borderRadius={16}>
        <Text style={styles.title}>
          {'Welcome to the demo of\n"rn-tourguide"'}
        </Text>
      </TourGuideZone>
      <View style={styles.middleView}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            finalEvent == false ? start() : console.log('evennement fini');
          }}>
          <Text style={styles.buttonText}>START THE TUTORIAL!</Text>
        </TouchableOpacity>

        <TourGuideZone
          zone={3}
          shape={'rectangle_and_keep'}
          text="hello from zone 3">
          <TouchableOpacity style={styles.button} onPress={() => start(3)}>
            <Text style={styles.buttonText}>Step 4</Text>
          </TouchableOpacity>
        </TourGuideZone>
        <TouchableOpacity style={styles.button} onPress={() => start(2)}>
          <Text style={styles.buttonText}>Step 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            stop();
            setfinalEvent(!finalEvent);
          }}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
        <TourGuideZone
          zone={7}
          shape="circle"
          text={'With animated SVG morphing with awesome flubber 🍮💯'}>
          <Image source={{uri}} style={styles.profilePhoto} />
        </TourGuideZone>
      </View>
      {/* <View style={styles.row}>
        <TourGuideZone zone={4} shape={'circle'} tooltipBottomOffset={200}>
          <Ionicons name='ios-add-circle' {...iconProps} />
        </TourGuideZone>
        <Ionicons name='ios-chatbubbles' {...iconProps} />
        <Ionicons name='ios-globe' {...iconProps} />
        <TourGuideZone zone={5}>
          <Ionicons name='ios-navigate' {...iconProps} />
        </TourGuideZone>
        <TourGuideZone zone={6} shape={'circle'}>
          <Ionicons name='ios-rainy' {...iconProps} />
        </TourGuideZone>
      </View> */}
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {
            top: 250,
            left: 50,
            width: 64,
            height: 64,
            backgroundColor: 'red',
          },
        ]}
      />
      {Platform.OS !== 'web' ? (
        <TourGuideZoneByPosition
          text="hello"
          zone={1}
          shape={'circle'}
          isTourGuide
          top={250}
          left={50}
          width={64}
          height={64}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  profilePhoto: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginVertical: 20,
  },
  middleView: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2980b9',
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  row: {
    width: '100%',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activeSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
});

export default index;
// import {
//   Text,
//   View,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Platform,
//   StatusBar,
// } from 'react-native';
// import React, {useState, useEffect} from 'react';
// import Tooltip from 'react-native-walkthrough-tooltip';

// const App = () => {
//   const [showTip, setTip] = useState(false);
//   clg
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={[{backgroundColor: 'cyan'}, styles.button]}
//         onPress={() => navigation.navigate('SecondScreen')}>
//         <Text>Go to Second Screen</Text>
//       </TouchableOpacity>

//       <Tooltip
//         isVisible={showTip}
//         content={
//           <View>
//             <Text> I am a tooltip </Text>
//           </View>
//         }
//         onClose={() => setTip(null)}
//         placement="bottom"
//         // below is for the status bar of react navigation bar
//         topAdjustment={
//           Platform.OS === 'android' ? -StatusBar.currentHeight : 0
//         }>
//         <TouchableOpacity
//           style={[
//             {backgroundColor: 'yellow', width: '100%', marginTop: 20},
//             styles.button,
//           ]}
//           onPress={() => setTip(true)}>
//           <Text>Show ToolTip</Text>
//         </TouchableOpacity>
//       </Tooltip>
//     </View>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#ecf0f1',
//     padding: 40,
//   },
//   button: {
//     padding: 10,
//     borderRadius: 4,
//   },
// });
