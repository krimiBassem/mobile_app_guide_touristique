import React, {useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {Modalize} from 'react-native-modalize';

const TestModal = () => {
  const modalizeRef = useRef(null);
  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <Text
          style={{
            fontWeight: 'bold',
            marginLeft: 15,
            fontFamily: 'SegoeUI',
          }}>
          Fiche Monument
        </Text>
        <TouchableOpacity onPress={onClose}>
          <Text
            style={{
              fontWeight: 'bold',
              marginRight: 15,
              textDecorationLine: 'underline',
              fontFamily: 'SegoeUI',
            }}>
            Fermer
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <>
      <TouchableOpacity onPress={onOpen}>
        <Text>Open the modal</Text>
      </TouchableOpacity>

      <Modalize
        HeaderComponent={renderHeader}
        snapPoint={Dimensions.get('window').height * 0.75}
        ref={modalizeRef}>
        <SafeAreaView style={{paddingLeft: 10, paddingRight: 10}}>
          <ScrollView>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              accumsan lectus vel ex vestibulum ullamcorper. Fusce massa diam,
              pretium sit amet turpis vel, suscipit luctus nisl. Quisque eu
              luctus risus, id tempus ex. Vivamus rutrum posuere urna vitae
              semper. Mauris malesuada lectus erat, vitae lacinia mi gravida ac.
              Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Praesent pellentesque arcu ac
              ipsum convallis cursus. Maecenas ultrices ultrices nisl, non
              ultricies metus efficitur quis. In mollis euismod ex a dapibus.
              Proin ex dui, rutrum non orci ut, auctor volutpat arcu. Morbi sit
              amet quam nunc. Sed accumsan velit ex, porttitor tempor quam
              cursus a. Proin quis massa id augue malesuada dapibus. Duis magna
              est, dictum id pretium sed, eleifend a metus. Vestibulum quis
              justo in metus imperdiet mattis sed sed ipsum. Maecenas lacinia
              ultrices tempor. Mauris elementum facilisis ex at venenatis. In
              hac habitasse platea dictumst. Donec iaculis fringilla interdum.
              Nunc sed ipsum ut massa cursus pharetra. Nunc sem tortor, ultrices
              vel varius vel, tempor a libero. Proin ac neque sodales, hendrerit
              libero sit amet, commodo libero. Praesent vitae elementum ipsum.
              Mauris efficitur, mauris a tempus congue, lectus felis ultricies
              mauris, at pretium sapien dolor et risus. Mauris a dapibus libero,
              eu posuere sem. Aliquam erat volutpat. In non diam in neque
              tincidunt viverra. Nam at maximus odio, at mattis arcu. Cras
              tincidunt risus varius pharetra viverra. Pellentesque sit amet
              sollicitudin nisi. Nam ac dui augue. Donec dictum quam sed ligula
              venenatis tincidunt. Nam ultricies lorem et erat aliquet viverra.
              Aenean varius eget metus ultricies luctus. In viverra erat id eros
              faucibus volutpat. Pellentesque aliquet sapien tellus, pretium
              condimentum turpis pretium id. Nunc sit amet lacinia lacus, at
              maximus sapien. Phasellus viverra maximus felis a varius.
              Phasellus ultrices vehicula gravida. In sit amet egestas nunc, id
              aliquam enim. Nulla feugiat tincidunt accumsan. Vestibulum nibh
              mauris, sagittis mattis hendrerit vel, rhoncus id tortor. Ut lorem
              tellus, tincidunt scelerisque justo eu, interdum ultricies lorem.
              Sed pharetra suscipit felis, vel rutrum mi interdum molestie.
              Nulla ante arcu, finibus nec risus consequat, posuere cursus
              tellus. Maecenas urna sapien, consectetur fermentum consectetur
              ut, posuere sit amet augue. Ut sed varius enim. Maecenas blandit
              nunc id tortor facilisis, vel pretium ipsum iaculis. Aliquam
              ullamcorper, libero eu facilisis tristique, dui nunc auctor risus,
              vel efficitur eros sapien et mauris. Cras at mattis tellus.
              Quisque interdum risus augue, in eleifend metus aliquet eu.
              Praesent eu nibh a nulla pellentesque tincidunt quis et metus.
              Suspendisse interdum efficitur eleifend. Praesent aliquam neque eu
              magna lobortis, vitae molestie ante vehicula. Proin aliquet
              viverra purus et mattis. Suspendisse sit amet interdum nunc.
              Quisque convallis, massa id varius hendrerit, mauris nulla
              vulputate massa, convallis faucibus augue urna pretium lectus.
              Nulla in enim eu neque lacinia vestibulum in vitae nulla. Nunc
              consequat, nunc sed blandit fermentum, metus mi efficitur augue,
              id porta lectus ex ut massa. Aenean hendrerit erat at quam
              elementum aliquam. Donec eget magna hendrerit, fringilla odio ut,
              tincidunt sapien. Donec nec fringilla erat, non consectetur velit.
              Fusce justo elit, fermentum in nulla sit amet, iaculis
              pellentesque diam. Curabitur ac lectus non dui pharetra varius sit
              amet ut arcu. Sed tempus libero eu magna egestas, eu congue diam
              lobortis. In hac habitasse platea dictumst. Nam hendrerit
              fringilla pretium. Nunc metus eros, pellentesque tincidunt dolor
              id, consequat porttitor risus.
            </Text>
          </ScrollView>
        </SafeAreaView>
      </Modalize>
    </>
  );
};

export default TestModal;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {
      width: -1,
      height: -3,
    },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});
