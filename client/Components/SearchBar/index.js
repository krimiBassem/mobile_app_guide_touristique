import Animated, {EasingNode} from 'react-native-reanimated';
import {
  View,
  Button,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableHighlight,
  TextInput,
  ScrollView,
  Text,
} from 'react-native';
import React, {Component} from 'react';

const {Value, timing} = Animated;

//Import react-native-vector-icons
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/Entypo';

//Import react-native-popup-menu
import {MenuProvider} from 'react-native-popup-menu';

//Import components
import DropdownMenu from '../DropdownMenu';

import baseUrl from '../../assests/baseUrl';
import axios from 'axios';
import ListCircuitThematiques from './ListCircuitThematiques';

//Calculate window size
const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('window').height;

class index extends Component {
  constructor(props) {
    super(props);

    //state
    this.state = {
      isFocused: false,
      keyword: '',
      circuit: [],

      id: {},
      circuitFiltred: [],
      focus: null,
    };

    this.input = React.createRef();

    //animation values
    this._input_box_translate_x = new Value(WIDTH);
    this._back_button_opacity = new Value(0);
  }

  _onFocus = () => {
    //update state
    this.setState({isFocused: true});

    //animation config
    const  input_box_translate_x_config = {
      duration: 200,
      toValue: 0,
      easing: EasingNode.inOut(EasingNode.ease),
    };

    const bak_button_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: EasingNode.inOut(EasingNode.ease),
    };

    //run animation
    timing(this._input_box_translate_x, input_box_translate_x_config).start();
    timing(this._back_button_opacity, bak_button_opacity_config).start();

    //alter focus
    this.input.current.focus();
  };

  _onBlur = () => {
    //update state
    this.setState({isFocused: false});
    this.setState({focus: false});

    //animation config
    const input_box_translate_x_config = {
      duration: 200,
      toValue: WIDTH,
      easing: EasingNode.inOut(EasingNode.ease),
    };

    const bak_button_opacity_config = {
      duration: 50,
      toValue: 0,
      easing: EasingNode.inOut(EasingNode.ease),
    };

    //run animation
    timing(this._input_box_translate_x, input_box_translate_x_config).start();
    timing(this._back_button_opacity, bak_button_opacity_config).start();

    //alter blur
    this.input.current.blur();
  };

  searchCircuit = text => {
    const result = [];
    // console.log('all circuiiit',this.state.circuit.Monuments);
    this.state.circuit.forEach(element => {
      console.log('elemeeeennt', !!element.Monuments.epoque_dominante);
      if (element.nom_thematique.toLowerCase().includes(text.toLowerCase())) {
        result.push({
          idCircuit: element.id,
          nom_thematique: element.nom_thematique,
          numberOfMonuments: element.Monuments.length,
        });
      }


      element.Monuments.forEach((item) => {
        if(!item.nom_monument){

        }else{if (item.nom_monument.toLowerCase().includes(text.toLowerCase())) {
          console.log('this is elemennnnnnnnntt',element);
          result.push({
            idCircuit: element.id,
            idMonument: item.id,
            nom_monument: item.nom_monument,
            nomCircuit: element.nom_thematique,
            epoque: item.epoque_dominante,
            description_monument: item.description_monument,
          });
        }}
        if(!item.epoque_dominante){}else{ 
        if (item.epoque_dominante.toLowerCase().includes(text.toLowerCase())) {
          result.push({
            idCircuit: element.id,
            idMonument: item.id,
            nom_monument: item.nom_monument,
            thematique: element.nom_thematique,
            epoque: item.epoque_dominante,
          });
        }}

      });
    });
    //  console.log(this.state.circuitFiltred)
    this.setState({
      circuitFiltred: result,
    });
  };

  openList = () => {
    this.setState({focus: true});
  };

  onBlur = () => {
    this.setState({focus: false});
  };

  /***=========== Get data from Thematiques table ============***/
  fetchThematique = async () => {
    try {
      const response = await axios.get(`${baseUrl}/thematiques`);
      // this.setState({circuit: response.data});
      // this.setState({circuitFiltred: th});
      response.data.forEach((item, i) => {
        this.state.circuit.push({
          id: item.id,
          nom_thematique: item.nom_thematique,
          Monuments: item.Monuments.map(element => {
            return {
              id: element.id,
              nom_monument: element.nom_monument,
              epoque_dominante: element.epoque_dominante,
              description_monument: element.description_monument,
            };
          }),
        });
        // if(this.state.id[item.categorie_thematique]===undefined){
        //   this.state.id[item.categorie_thematique]=item.id
        // }
      });
      // console.log(this.state.circuit);
      this.setState({focus: false});
      // console.log(this.state.circuitFiltred[0].nom_thematique);
    } catch (e) {
      console.log(e, 'problem api into searchbar');
    }
  };

  componentDidMount = () => {
    this.fetchThematique();
    // this.fetchMonuments();
  };

  _forNavigation = global.navigationFromComponent;

  render() {
    return (
      <SafeAreaView style={styles.header_safe_area}>
        <View style={styles.header}>
          <View style={styles.header_inner}>
            <TouchableHighlight
              activeOpacity={1}
              underlayColor={'#ccd0d5'}
              onPress={this._onFocus}
              style={styles.search_icon_box}>
              <Icon name="search" size={12} color="#000000" />
            </TouchableHighlight>
            <View style={{marginLeft: 10, marginTop: 20}}>
              <DropdownMenu />
            </View>
            <Animated.View
              style={[
                styles.input_box,
                {transform: [{translateX: this._input_box_translate_x}]},
              ]}>
              <Animated.View style={{opacity: this._back_button_opacity}}>
                <TouchableHighlight
                  activeOpacity={1}
                  underlayColor={'#ccd0d5'}
                  onPress={this._onBlur}
                  style={styles.back_icon_box}>
                  <Icon name="chevron-left" size={22} color="#000000" />
                </TouchableHighlight>
              </Animated.View>
              <TextInput
                placeholderTextColor={'#474747'}
                onFocus={this.openList}
                ref={this.input}
                placeholder="Taper le monument/circuit à chercher"
                clearButtonMode="always"
                // value={this.state.circuitFiltred}
                onChangeText={text => this.searchCircuit(text)}
                style={styles.input}></TextInput>
            </Animated.View>
          </View>
          {this.state.focus == true && (
            <View
              style={{
                position: 'absolute',
                marginTop: 20,
                width: Dimensions.get('window').width - 30,
                alignSelf: 'center',
              }}>
              <ListCircuitThematiques
                circuitDetail={this.props.circuitDetail}
                // monumentDetail={this.props.monumentDetail}
                circuitFiltred={this.state.circuitFiltred}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header_safe_area: {
    zIndex: 1000,
  },
  header: {
    height: 65,
    paddingHorizontal: 16,
  },
  header_inner: {
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
    // marginTop: 20,
  },
  search_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#e4e6eb',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input_box: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#f2f2f2',
    width: WIDTH - 32,
  },
  back_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#e4e6eb',
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  cotent: {
    width: WIDTH,
    height: HEIGHT,
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 999,
  },
  content_safe_area: {
    flex: 1,
    backgroundColor: 'white',
  },
  content_inner: {
    flex: 1,
    paddingTop: 50,
  },
  separator: {
    marginTop: 5,
    height: 1,
    backgroundColor: '#e6e4eb',
  },
  image_placeholder_container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '-50%',
  },
  image_placeholder: {
    width: 150,
    height: 113,
    alignSelf: 'center',
  },
  image_placeholder_text: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 5,
  },
  search_item: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e4eb',
    marginLeft: 16,
  },
  item_icon: {
    marginLeft: 15,
  },
});

export default index;
