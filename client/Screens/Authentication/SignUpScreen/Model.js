import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  Dimensions,
  Button,
  ScrollView,
  Pressable,
  ToastAndroid,
  Modal,
} from 'react-native';
import React, {useState, useEffect, useContext, useRef} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Model = ({navigation, route}) => {
  const {conditionGeneral, setModalVisible, setDoneCondtions} = route.params;
  const accepter = () => {
    setDoneCondtions(true);
    setModalVisible(true);
    navigation.goBack();
  };
  const annuler = () => {
    setDoneCondtions(false);
    setModalVisible(true);
    navigation.goBack();
  };
  return (
    <ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: 10,
        }}>
        <Pressable
          onPress={() => {
            setModalVisible(true);
            navigation.goBack();
          }}>
          {/* <AntDesign
            style={{marginLeft: 15, marginRight: 27}}
            name="arrowleft"
            size={30}
            color="black"
          /> */}
          <Image
            source={require('../../../Components/icons/back.png')}
            style={{width: 24, height: 24, marginStart: 20}}
          />
        </Pressable>
      </View>
      <View style={{marginBottom: 30}}>
        <Text
          numberOfLines={3}
          style={{
            marginTop: 40,
            marginRight: 'auto',
            marginLeft: 'auto',
            color: '#0D315C',
            fontWeight: 'bold',
            fontSize: 18,
            width: Dimensions.get('screen').width * 0.7,
            borderColor: 'red',
            borderWidth: 1,
          }}>
          Conditions Générales d’Utilisation de l'application mobile "DOURBIA"
        </Text>
        <Text style={{marginTop: 20, marginRight: 'auto', marginLeft: 'auto'}}>
          En vigueur au 01/03/2022
        </Text>
        <Text style={Styles.sousArticle}>
          Les présentes conditions générales d'utilisation (dites « CGU ») ont
          pour objet l'encadrement juridique des modalités de mise à disposition
          du site et des services par testapp et de définir les conditions
          d’accès et d’utilisation des services par « l'Utilisateur ». Les
          présentes CGU sont accessibles sur le site à la rubrique «CGU». Toute
          inscription ou utilisation du site implique l'accepteration sans
          aucune réserve ni restriction des présentes CGU par l’utilisateur.
          Lors de l'inscription sur le site via le Formulaire d’inscription,
          chaque utilisateur acceptere expressément les présentes CGU en cochant
          la case précédant le texte suivant : « Je reconnais avoir lu et
          compris les CGU et je les acceptere ». En cas de non-accepteration des
          CGU stipulées dans le présent contrat, l'Utilisateur se doit de
          renoncer à l'accès des services proposés par le site. test.com.tn se
          réserve le droit de modifier unilatéralement et à tout moment le
          contenu des présentes CGU
        </Text>
        {/* <Text style={Styles.article}>
          Article 1 : OBJET DES CONDITIONS GENERALES D’UTILISATION
        </Text>
        <Text style={Styles.sousArticle}>
          Les présentes conditions générales d’utilisation (ci-après « CGU »)
          ont pour objet de définir les règles d’utilisation de l’application
          mobile « DOURBIA » (ci-après « l’Application ») éditée par
          l'association Didon de Carthage', association par action simplifiée au
          capital de 100 000 euros, immatriculée au registre du commerce et des
          sociétés de Lyon sous le numéro 441 620 200, ayant son siège social au
          185 allée des Cyprès 69760 LIMONEST – France, code NAF 4619A -
          centrale d’achat non alimentaire. Le directeur de la publication est
          Gaëtan DE SAINTE MARIE, Président : infos@pmecentrale.fr. En
          installant l’Application sur votre terminal et/ou en accédant à
          l’Application, vous accepterez sans réserve l’intégralité des présentes
          CGU et vous engagez à respecter les obligations à votre charge. Dans
          le cas où vous n’acceptereriez pas les CGU ou auriez des réserves, merci
          de ne pas utiliser l’Application. Les CGU expriment l'intégralité de
          l'accord entre vous et PME CENTRALE applicable à votre utilisation de
          l’Application. PME CENTRALE se réserve le droit de modifier ces CGU en
          les mettant à jour à tout moment. La version des CGU qui est
          applicable entre vous et PME CENTRALE est celle en vigueur au moment
          de votre connexion et de votre utilisation de l’Application. Nous vous
          conseillons donc de consulter cette page régulièrement afin de prendre
          connaissance des CGU en vigueur lorsque vous utilisez l’Application.
        </Text>
        <Text style={Styles.article}>
          ARTICLE 2 : OBJET ET FONCTIONNALITES DE L’APPLICATION
        </Text>
        <Text style={Styles.sousArticle}>
          L’Application vous permet de : Trouver instantanément les monuments
          dans les sites archéologiques autour de vous Choisir vos critères et
          de préparer vos visites de patrimoine ; consulter une fiche historique
          de chaque monument depuis l’application. Ces fonctionnalités peuvent
          être enrichies ou modifiées à tout moment par l'équipe DOURBIA sans
          que sa responsabilité ne puisse être engagée à ce titre.
        </Text>
        <Text style={Styles.article}>ARTICLE 3 : Collecte des données</Text>
        <Text style={Styles.sousArticle}>
          Le site est exempté de déclaration à la Commission Nationale
          Informatique et Libertés (CNIL) dans la mesure où il ne collecte
          aucune donnée concernant les Utilisateurs.
        </Text>
        <Text style={Styles.article}>ARTICLE 4 : Propriété intellectuelle</Text>
        <Text style={Styles.sousArticle}>
          Les marques, logos, signes ainsi que tous les contenus du site
          (textes, images, son…) font l'objet d'une protection par le Code de la
          propriété intellectuelle et plus particulièrement par le droit
          d'auteur. L'Utilisateur doit solliciter l'autorisation préalable du
          site pour toute reproduction, publication, copie des différents
          contenus. Il s'engage à une utilisation des contenus du site dans un
          cadre strictement privé, toute utilisation à des fins commerciales et
          publicitaires est strictement interdite. Toute représentation totale
          ou partielle de ce site par quelque procédé que ce soit, sans
          l’autorisation expresse de l’exploitant du site Internet constituerait
          une contrefaçon sanctionnée par l’article L 335-2 et suivants du Code
          de la propriété intellectuelle. Il est rappelé conformément à
          l’article L122-5 du Code de propriété intellectuelle que l’Utilisateur
          qui reproduit, copie ou publie le contenu protégé doit citer l’auteur
          et sa source.
        </Text>
        <Text style={Styles.article}>ARTICLE 5 : Responsabilité</Text>
        <Text style={Styles.sousArticle}>
          Les sources des informations diffusées sur le site test.com.tn sont
          réputées fiables mais le site ne garantit pas qu’il soit exempt de
          défauts, d’erreurs ou d’omissions. Les informations communiquées sont
          présentées à titre indicatif et général sans valeur contractuelle.
          Malgré des mises à jour régulières, le site test.com.tn ne peut être
          tenu responsable de la modification des dispositions administratives
          et juridiques survenant après la publication. De même, le site ne peut
          être tenue responsable de l’utilisation et de l’interprétation de
          l’information contenue dans ce site. L'Utilisateur s'assure de garder
          son mot de passe secret. Toute divulgation du mot de passe, quelle que
          soit sa forme, est interdite. Il assume les risques liés à
          l'utilisation de son identifiant et mot de passe. Le site décline
          toute responsabilité. Le site test.com.tn ne peut être tenu pour
          responsable d’éventuels virus qui pourraient infecter l’ordinateur ou
          tout matériel informatique de l’Internaute, suite à une utilisation, à
          l’accès, ou au téléchargement provenant de ce site. La responsabilité
          du site ne peut être engagée en cas de force majeure ou du fait
          imprévisible et insurmontable d'un tiers.
        </Text>
        <Text style={Styles.article}>ARTICLE 6 : Liens hypertextes</Text>
        <Text style={Styles.sousArticle}>
          Des liens hypertextes peuvent être présents sur le site. L’Utilisateur
          est informé qu’en cliquant sur ces liens, il sortira du site
          test.com.tn. Ce dernier n’a pas de contrôle sur les pages web sur
          lesquelles aboutissent ces liens et ne saurait, en aucun cas, être
          responsable de leur contenu
        </Text>
        <Text style={Styles.article}>ARTICLE 7 : Cookies</Text>
        <Text style={Styles.sousArticle}>
          L’Utilisateur est informé que lors de ses visites sur le site, un
          cookie peut s’installer automatiquement sur son logiciel de
          navigation. Les cookies sont de petits fichiers stockés temporairement
          sur le disque dur de l’ordinateur de l’Utilisateur par votre
          navigateur et qui sont nécessaires à l’utilisation du site
          test.com.tn. Les cookies ne contiennent pas d’information personnelle
          et ne peuvent pas être utilisés pour identifier quelqu’un. Un cookie
          contient un identifiant unique, généré aléatoirement et donc anonyme.
          Certains cookies expirent à la fin de la visite de l’Utilisateur,
          d’autres restent. L’information contenue dans les cookies est utilisée
          pour améliorer le site test.com.tn. En naviguant sur le site,
          L’Utilisateur les acceptere. L’Utilisateur doit toutefois donner son
          consentement quant à l’utilisation de certains cookies. A défaut
          d’accepteration, l’Utilisateur est informé que certaines fonctionnalités
          ou pages risquent de lui être refusées. L’Utilisateur pourra
          désactiver ces cookies par l’intermédiaire des paramètres figurant au
          sein de son logiciel de navigation.
        </Text>
        <Text style={Styles.article}>
          ARTICLE 8 : Publication par l’Utilisateur
        </Text>
        <Text style={Styles.sousArticle}>
          Le site permet aux membres de publier les contenus suivants :
          commentaires et photos. Dans ses publications, le membre s’engage à
          respecter les règles de la Netiquette (règles de bonne conduite de
          l’internet) et les règles de droit en vigueur. Le site peut exercer
          une modération sur les publications et se réserve le droit de refuser
          leur mise en ligne, sans avoir à s’en justifier auprès du membre. Le
          membre reste titulaire de l’intégralité de ses droits de propriété
          intellectuelle. Mais en publiant une publication sur le site, il cède
          à la société éditrice le droit non exclusif et gratuit de représenter,
          reproduire, adapter, modifier, diffuser et distribuer sa publication,
          directement ou par un tiers autorisé, dans le monde entier, sur tout
          support (numérique ou physique), pour la durée de la propriété
          intellectuelle. Le Membre cède notamment le droit d'utiliser sa
          publication sur internet et sur les réseaux de téléphonie mobile. La
          société éditrice s'engage à faire figurer le nom du membre à proximité
          de chaque utilisation de sa publication. Tout contenu mis en ligne par
          l'Utilisateur est de sa seule responsabilité. L'Utilisateur s'engage à
          ne pas mettre en ligne de contenus pouvant porter atteinte aux
          intérêts de tierces personnes. Tout recours en justice engagé par un
          tiers lésé contre le site sera pris en charge par l'Utilisateur. Le
          contenu de l'Utilisateur peut être à tout moment et pour n'importe
          quelle raison supprimé ou modifié par le site, sans préavis.
        </Text>
        <Text style={Styles.article}>
          ARTICLE 9 : Droit applicable et juridiction compétente
        </Text>
        <Text style={Styles.sousArticle}>
          La législation française s'applique au présent contrat. En cas
          d'absence de résolution amiable d'un litige né entre les parties, les
          tribunaux français seront seuls compétents pour en connaître. Pour
          toute question relative à l’application des présentes CGU, vous pouvez
          joindre l’éditeur aux coordonnées inscrites à l’ARTICLE 1.
        </Text> */}
        <View
          style={{
            width: Dimensions.get('screen').width * 0.5,
            alignSelf: 'center',
            borderRadius: 20,
            marginTop: 30,
            marginBottom: 20,
            flexDirection: 'row',
          }}>
          <View style={{marginRight: 10}}>
            <Button
              onPress={() => accepter()}
              title="Accepter"
              color="#E59138"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
          <View>
            <Button
              onPress={() => annuler()}
              title="Annuler"
              color="#E59138"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const Styles = StyleSheet.create({
  sousArticle: {
    marginTop: 20,
    marginRight: 'auto',
    marginLeft: 20,
    fontSize: 15,
    lineHeight: 23,
    color: 'black',
  },
  article: {
    marginTop: 20,
    marginRight: 'auto',
    marginLeft: 20,
    color: '#0D315C',
    fontWeight: 'bold',
  },
});
export default Model;
