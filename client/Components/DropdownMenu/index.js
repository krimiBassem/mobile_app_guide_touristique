import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useLayoutEffect} from 'react';

//Import react-native-vector-icons
import IconDropdown from 'react-native-vector-icons/Entypo';

//Import react-native-popup-menu
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';

import baseUrl from '../../assests/baseUrl';
import axios from 'axios';

const index = () => {
  const [circuit, setCircuit] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/thematiques`);
      // setCirctuit(response.data);
      setCircuit(response.data);
    } catch (err) {
      console.error(err, 'API Problem');
    }
  };
  useLayoutEffect(() => {
    fetchData();
  }, []);

  const forNavigation = global.navigationFromComponent;

  return (
    <Menu>
      <MenuTrigger>
        <IconDropdown name="dots-three-vertical" size={16} />
      </MenuTrigger>

      <MenuOptions>
        {circuit.map((item, index) => (
          <MenuOption onSelect={() => forNavigation(item.nom_thematique)}>
            {(item.nom_thematique === 'Circuit Cyclable' ||
              item.nom_thematique === 'Circuit Pedestre') && (
              <Text key={index}>{item.nom_thematique}</Text>
            )}
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );
};

export default index;

const styles = StyleSheet.create({});
