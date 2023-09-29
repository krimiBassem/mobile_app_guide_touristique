import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AboutDourbia = ({navigation}) => {
  const [list, setList] = useState([
    'Ines Hassoumi',
    'Alia Belkaid',
    'Tejeddine Bdira Filali',
    'Leila Ferchichi',
    'Abir Azaiez',
    'Hamdi Sansa',
    'Khoubaieb Ghaouari',
    'Malek Hizaoui',
    'Safa Sassi',
    'Noha Jaafar',
    'Sarra Ben Youssef',
    'Achref Haffar',
    'Ikram Sahlaoui',
    'Azzeddine Beshaouesh',
  ]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <ScrollView style={{marginBottom: 20}}>
        <View
          style={{
            marginStart: 20,
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Pressable onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={30} color="black" />
          </Pressable>
          <Text
            style={{
              fontSize: 24,
              fontFamily: 'SegoeUI',
              color: '#474747',
              marginLeft: 10,
            }}>
            A propos de DOURBIA
          </Text>
        </View>
        <View style={styles.introduction}>
          <Text style={styles.introductionText}>
            Le projet Dourbia s’inscrit dans le cadre du programme Tounes
            wijhetouna pour la Promotion du Tourisme Durable et plus
            particulièrement pour le développement de la qualité de l’offre
            touristique au sein de la Ville de Carthage. Dourbia a pour but de
            réaliser un générateur intelligent de circuits touristiques
            personnalisés. C’est le premier créateur d’expérience de visites
            inédites, innovantes et sur mesure en Tunisie autrement avec des
            parcours à thèmes, une géolocalisation, des critères de choix bien
            étudiés, des circuits personnalisés et un accompagnement sur mesure
            riche par son contenu historique et pédagogique.
          </Text>
        </View>
        <View style={{marginTop: 20, marginStart: 20}}>
          <Text style={styles.title}>Equipe</Text>
          {list.map((el, index) => (
            <Text key={index} style={styles.listEquipe}>
              {el}
            </Text>
          ))}
        </View>
        <View style={{marginTop: 20, marginStart: 20}}>
          <Text style={styles.title}>Photographes</Text>
          <Text style={styles.listEquipe}>Issam Barhoumi</Text>
          <Text style={styles.listEquipe}>Hassene Nostra Lazrek</Text>
        </View>
        <View style={{marginTop: 20, marginStart: 20}}>
          <Text style={styles.title}>Partenaires</Text>
        </View>
        <Image
          source={require('../../Components/Images/sponsors/baniere.jpg')}
          style={{
            alignSelf: 'center',
            width: Dimensions.get('screen').width,
            height: 500,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutDourbia;

const styles = StyleSheet.create({
  introduction: {
    marginStart: 20,
    marginTop: 30,
  },
  introductionText: {
    fontSize: 16,
    fontFamily: 'SegoeUI',
    textAlign: 'justify',
    lineHeight: 30,
    width: Dimensions.get('screen').width * 0.8,
    // alignSelf: 'center',
    color: '#000000',
    marginStart: 20,
  },
  title: {
    fontSize: 16,
    fontFamily: 'SegoeUI',
    fontWeight: 'bold',
    color: '#000000',
    marginStart: 20,
    marginTop: 25,
  },
  listEquipe: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'SegoeUI',
    marginStart: 20,
    marginTop: 10,
    textAlign: 'justify',
    lineHeight: 30,
  },
});
