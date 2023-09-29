import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ScrollView,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';

import React, {useEffect, useState} from 'react';

//Import components
// const sponsorSection = require('../../Components/Images/sponsors/sponsors.png');
const sponsorSection = require('../../Components/Images/sponsors/baniere.jpg');

const AboutDourbia = ({navigation}) => {
  const [lang, setLang] = useState('');
  const [c, setC] = useState(false);
  const {t, i18n} = useTranslation();

  useEffect(() => {
    AsyncStorage.getItem('lang').then(res => {
      setLang(res);
    });
    AsyncStorage.getItem('sound').then(res => {
      if (res === 'false') {
        setC(true);
      } else {
        setC(false);
      }
    });
    console.log(lang);
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#ffffff',
      }}>
      <ScrollView style={styles.scrollView}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: 5,
          }}>
          <Pressable
            android_disableSound={c}
            onPress={() => navigation.goBack()}>
            {/* {!lang === 'AR' ? (
                <AntDesign name="arrowright" size={30} color="black" /> */}
            {/* // ) : ( */}
            {/* <AntDesign name="arrowleft" size={30} color="black" /> */}
            <Image source={require()} />
            {/* // )} */}
          </Pressable>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '600',
              color: '#6E6E6E',
              fontFamily: 'SegoeUI',
              marginLeft: 25,
              paddingTop: 0,
            }}>
            {t('about')}
          </Text>
        </View>
        <View>
          {lang === 'FR' ? (
            <Text
              style={{
                lineHeight: 30,
                left: 5,
                fontFamily: 'SegoeUI',
                fontSize: 16,
                color: '#6E6E6E',
                paddingTop: 20,
                marginLeft: 10,
                paddingRight: 10,
              }}>
              {`    Le projet Dourbia s’inscrit dans le cadre du               
      programme Tounes wijhetouna pour la
      Promotion du Tourisme Durable et plus
      particulièrement pour le développement 
      de la qualité de l’offre touristique au sein
      de la Ville de Carthage.
      Dourbia a pour but de réaliser un 
      générateur intelligent de circuits
      touristiques personnalisés. 
      C’est le premier créateur d’expérience de
      visites inédites, innovantes et sur mesure 
      en Tunisie autrement avec des parcours à 
      thèmes, une géolocalisation, des critères
      de choix bien étudiés, des circuits 
      personnalisés et un accompagnement sur
      mesure riche par son contenu historique
      et pédagogique.`}
            </Text>
          ) : null}

          {lang === 'EN' ? (
            <Text
              style={{
                lineHeight: 30,
                left: 5,
                fontFamily: 'SegoeUI',
                fontSize: 16,
                color: '#6E6E6E',
                paddingTop: 20,
                marginLeft: 10,
                paddingRight: 10,
              }}>
              {`    The Dourbia project is part of the Tounes wijhetouna 
      program for the Promotion of Sustainable Tourism  
      and more especially for the development the quality 
      of the tourist offer within of the City of Carthage.
      Dourbia aims to achieve a smart circuit generator
      personalized tourist attractions.
      It is the first creator of experience of original, 
      innovative and tailor-made tours in Tunisia differently     
      with courses in themes, geolocation, criteria of 
      well-studied choices, circuits personalized and 
      support on measurement rich in historical content
      and educational.`}
            </Text>
          ) : null}
          {/* {lang === 'AR' ? (
              <Text
                style={{
                  lineHeight: 30,
                  left: 5,
                  fontFamily: 'SegoeUI',
                  fontSize: 16,
                  color: '#6E6E6E',
                  paddingTop: 20,
                  marginLeft: 10,
                  paddingRight: 10,
                }}>
                {`مشروع DOURBIA هو جزء من تونس وجهتونة برنامج لتعزيز السياحة المستدامة وخاصة لتطوير الجودة من العرض السياحي داخل مدينة قرطاج.Dourbia يهدف إلى تحقيق مولد دوائر ذكية مناطق الجذب السياحي الشخصية.إنه أول من ابتكر تجربة أصلية ،
  جولات مبتكرة ومصممة خصيصًا في تونس بشكل مختلف
  مع دورات في الموضوعات ، وتحديد الموقع الجغرافي ، ومعايير خيارات مدروسة جيدًا ، ودوائر شخصية و دعم القياس الغني بالمحتوى التاريخي والتعليمية.`}
              </Text>
            ) : null} */}

          <Text
            style={{
              paddingTop: 30,
              fontSize: 16,
              fontFamily: 'SegoeUI',
              fontWeight: 'bold',
              color: '#292828',
            }}>
            {t('team')}
          </Text>
          {lang !== 'AR' ? (
            <Text
              style={{
                lineHeight: 30,
                left: 5,
                fontFamily: 'SegoeUI',
                fontSize: 16,
                color: '#6E6E6E',
                paddingTop: 20,
                marginLeft: 10,
                paddingRight: 10,
              }}>
              {`     Ines Hassoumi
       Alia Belkaid
       Tejeddine Bdira Filali
       Leila Ferchichi
       Abir Azaiez
       Hamdi Sansa
       Khoubaieb Ghaouari
       Malek Habib Hizaoui
       Safa Sassi 
       Noha Jaafar
       Sarra Ben youssef
       Achref Haffar
       Ikram Sahlaoui
       Azzeddine Beshaouesh
       `}
            </Text>
          ) : null}
          {lang === 'AR' ? (
            <Text
              style={{
                lineHeight: 30,
                left: 5,
                fontFamily: 'SegoeUI',
                fontSize: 16,
                color: '#6E6E6E',
                paddingTop: 20,
                marginLeft: 10,
                paddingRight: 10,
              }}>
              {`     إيناس حسومي
       علياء بلقايد
       تاج الدين بديرة الفيلالي
       ليلى الفرشيشي
       عبير عزيز
       حمدي سانسا
       خبيب الغواري
       مالك حبيب الحيزاوي
       صفاء ساسي 
       نهى جعفر
       سارة بن يوسف
       اشرف حفار
       إكرام السهلاوي
       عز الدين بشاويش
       `}
            </Text>
          ) : null}
          <Text
            style={{
              paddingTop: 20,
              fontSize: 16,
              fontFamily: 'SegoeUI',
              fontWeight: 'bold',
              color: '#292828',
            }}>
            {t('photog')}
          </Text>

          {lang === 'AR' ? (
            <Text
              style={{
                lineHeight: 30,
                left: 5,
                fontFamily: 'SegoeUI',
                fontSize: 16,
                color: '#6E6E6E',
                paddingTop: 20,
                marginLeft: 10,
                paddingRight: 10,
              }}>
              {`     عصام برهومي 
        حسن نوسترا لازرك
       `}
            </Text>
          ) : null}
          {lang !== 'AR' ? (
            <Text
              style={{
                lineHeight: 30,
                left: 5,
                fontFamily: 'SegoeUI',
                fontSize: 16,
                color: '#6E6E6E',
                paddingTop: 20,
                marginLeft: 10,
                paddingRight: 10,
              }}>
              {`     Issam barhoumi  
         Hssan nostra lazrak
       `}
            </Text>
          ) : null}
          <Text
            style={{
              paddingTop: 20,
              fontSize: 16,
              fontFamily: 'SegoeUI',
              fontWeight: 'bold',
              color: '#292828',
            }}>
            {t('partenaire')}
          </Text>
        </View>
        <View>
          <Image
            source={sponsorSection}
            style={{
              // paddingTop: 20,
              width: Dimensions.get('screen').width,
              // height: '30%',
              // marginBottom: 50,
              alignSelf: 'center',
              // alignItems: 'flex-start',
              // marginTop: 20,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutDourbia;

const styles = StyleSheet.create({});
