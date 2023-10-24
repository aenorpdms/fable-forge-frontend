import { StyleSheet, Text, View, ImageBackground, ScrollView } from "react-native";
import * as Font from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CguvScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.containerInformation} indicatorStyle='white'>
        <View style={styles.containerCgv}>
          <Text style={styles.textCgvTitle}>Conditions Générales de Vente (CGV)</Text>
          <Text style={styles.textCgv}>
            1. Introduction Les présentes Conditions Générales de Vente (CGV) s'appliquent à l'utilisation de l'application mobile de génération
            d'histoire par intelligence artificielle (ci-après dénommée "l'Application") et régissent la relation entre l'utilisateur (ci-après
            dénommé "le Client") et le propriétaire et exploitant de l'Application (ci-après dénommé "le Prestataire").
          </Text>
          <Text style={styles.textCgv}>
            2. Acceptation des CGV En téléchargeant et en utilisant l'Application, le Client reconnaît avoir pris connaissance et accepte les
            présentes CGV dans leur intégralité. Le Client s'engage à respecter les CGV pendant toute la durée de son utilisation de l'Application.
          </Text>
          <Text style={styles.textCgv}>
            3. Utilisation de l'Application L'Application permet au Client de générer des histoires selon différents types (conte pour enfant,
            policier, horreur, romance). Le Client peut accéder à ces fonctionnalités en utilisant les boutons et les options prévus à cet effet dans
            l'Application.
          </Text>
          <Text style={styles.textCgv}>
            4. Propriété intellectuelle Tous les droits de propriété intellectuelle relatifs à l'Application, y compris mais sans s'y limiter, les
            droits d'auteur, les marques de commerce et les droits de propriété industrielle, appartiennent exclusivement au Prestataire. Le Client
            s'engage à ne pas copier, reproduire, distribuer ou exploiter de quelque manière que ce soit le contenu de l'Application sans autorisation
            préalable écrite du Prestataire.
          </Text>
          <Text style={styles.textCgv}>
            5. Confidentialité Le Prestataire s'engage à protéger les données personnelles du Client conformément à sa Politique de Confidentialité.
            Le Client reconnaît et accepte que certaines informations, telles que son nom d'utilisateur, puissent être collectées et utilisées par le
            Prestataire afin de fournir les services de l'Application.
          </Text>
          <Text style={styles.textCgv}>
            6. Limitation de responsabilité Le Prestataire ne pourra être tenu responsable de tout dommage direct ou indirect résultant de
            l'utilisation de l'Application. Le Client utilise l'Application à ses propres risques et le Prestataire ne garantit pas que l'Application
            sera exempte d'erreurs, de virus ou d'autres éléments nuisibles.
          </Text>
          <Text style={styles.textCgv}>
            7. Modification des CGV Le Prestataire se réserve le droit de modifier les présentes CGV à tout moment. Le Client sera informé des
            modifications par le biais d'une notification dans l'Application. Il est de la responsabilité du Client de consulter régulièrement les CGV
            afin de se tenir informé des éventuelles modifications.
          </Text>
          <Text style={styles.textCgv}>
            8. Droit applicable et juridiction compétente Les présentes CGV sont régies par la loi applicable du pays du Prestataire. Tout litige
            découlant des présentes CGV sera soumis à la juridiction compétente du pays du Prestataire.
          </Text>
        </View>
        <View>
          <Text style={styles.textCgvTitle}>Conditions Générales d'Utilisation (CGU)</Text>
          <Text style={styles.textCgv}>
            1. Introduction Les présentes Conditions Générales d'Utilisation (CGU) régissent l'utilisation de l'application mobile de génération
            d'histoire par intelligence artificielle (ci-après dénommée "l'Application") par l'utilisateur (ci-après dénommé "l'Utilisateur").
            L'Utilisateur doit accepter les CGU pour pouvoir utiliser l'Application.
          </Text>
          <Text style={styles.textCgv}>
            2. Acceptation des CGU En utilisant l'Application, l'Utilisateur reconnaît avoir pris connaissance et accepte les présentes CGU dans leur
            intégralité. Si l'Utilisateur n'accepte pas les CGU, il doit cesser immédiatement toute utilisation de l'Application.
          </Text>
          <Text style={styles.textCgv}>
            3. Utilisation de l'Application L'Utilisateur est autorisé à utiliser l'Application pour générer des histoires selon différents types
            (conte pour enfant, policier, horreur, romance). L'Utilisateur doit respecter les règles suivantes lors de l'utilisation de l'Application:
            Ne pas violer les droits de propriété intellectuelle du Prestataire ou de tout tiers. Ne pas utiliser l'Application à des fins illégales,
            frauduleuses ou nuisibles. Ne pas perturber le fonctionnement normal de l'Application.
          </Text>
          <Text style={styles.textCgv}>
            4. Responsabilité de l'Utilisateur L'Utilisateur est responsable de toutes les actions effectuées dans le cadre de son utilisation de
            l'Application. L'Utilisateur s'engage à indemniser et à dégager de toute responsabilité le Prestataire contre toute réclamation ou demande
            découlant de son utilisation de l'Application.
          </Text>
          <Text style={styles.textCgv}>
            5. Suspension ou résiliation de l'accès Le Prestataire se réserve le droit de suspendre ou de résilier l'accès de l'Utilisateur à
            l'Application à tout moment et sans préavis en cas de violation des présentes CGU par l'Utilisateur.
          </Text>
          <Text style={styles.textCgv}>
            6. Modifications de l'Application Le Prestataire se réserve le droit de modifier, de mettre à jour ou de supprimer toute partie de
            l'Application à tout moment et sans préavis.
          </Text>
          <Text style={styles.textCgv}>
            7. Droit applicable et juridiction compétente Les présentes CGU sont régies par la loi applicable du pays du Prestataire. Tout litige
            découlant des présentes CGU sera soumis à la juridiction compétente du pays du Prestataire.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2C1A51",
  },
  imagBgd: {
    flex: 2,
    marginTop: "-12%",
    width: "100%",
    height: "65%",
  },
  containerCgv: {
    marginBottom: 20,
  },
  textCgvTitle: {
    color: "#FFCE4A",
    top: 10,
    marginTop: 20,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    padding: 5,
  },
  textCgv: {
    color: "white",
    top: 10,
    padding: 5,
    marginLeft: 5,
    marginBottom: 10,
  },
});
