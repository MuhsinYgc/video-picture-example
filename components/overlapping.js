import React from "react";
import {
  Text,
  SafeAreaView,
  Button,
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
} from "react-native";

const Overlapping = () => {
  const text = {
    read: `Selamun aleyküm ben Gaziosmanpaşa'dan İsmet
        Mevzu da derin anladın mı dinlemek de size kısmet
        Tevellüt 70, 90'da babamı kestim iyi mi?
        İşimiz tezgah ve dümen kafamız matiz iyi mi?
        Sedat abinin küheylan magnus yolda dikine
        Gece yolda ben ve Sedat abim belde makine
        Abim benim zamanında 15 adama tek dalmış
        Lakin dün zamazingosu Mehtap sepet havası çalmış
        Mehtap ablam eski çaçalardan abimin gülü
        Balat'taki fıçılı meyhanenin mor sümbülü
        Mehtap için o meyhanede çok sabahladık ta ki
        Lavuğun teki yengemize iskele yapıp gözünün astarına 56 yiyeli bir de anzarot pilaki
        Varsa şimdi o biçim abicim haliçte bi sefine
        Kamançoya çekmiş malını, mal dediysem define
        Biraz ot var yirmi kilo da peynir hepsi kaparoz
        Teslimat saat dört buçukta kaptan eski kokoroz
        Malın sahibi eskilerden Kamçatkalı Kemal
        Cantidir lakin pirpiridir top yekün adrenal
        Cibali'de sağda magnus hafifledi biz de döküldük
        Mangizimiz de nanay hani sabah manitaya söküldük
        Dörtte incecik vardık teslimat mahali meskun
        Ben piyaza başladım anladın mı Sedat abim suskun
        Dubaramız abiler erketede beklemek inceden
        Akabinde mala yeşillenmek sonra konuşmak Çince'den
        Neyse abiler biz bi' konteynır arkasında zula
        Siyah bi' kamyonet Kemal 30 tane muşmula
        Kamyonetin yanında çaçoz bi' Mercedes renk sarı
        Mercedes'in arkasında sarışın yelloz bi karı
        Belde dededen kalma çakaralmaz dedim iyi izle
        Sedat abim bi' göz kırptı zulasında piizle
        Hepsi kamyonette birisi kaldı dikizde ve de panik
        Aynen fırladım tabi siperden dikizdekine bi madik
        O biçim şaşkoloz oldular hepsi bi' gözüm şafakta
        Benim çakaralmazın namlu aynen Kemal'in şakakta
        Sedat abim arkamdan atıldı amortiden
        Kemal'in yağcı gebeşler silaha davrandı tabi koftiden
        Uyandım mevzu içinde mevzu kum pistte son etap
        Mercedes'teki afet abimin zamazingosu Mehtap
        Dedim oğlum İsmet istikamet al çek alestanı
        Yoksa sonumuz aynen mabad aile kabristanı`,
  };
  return (
    <View style={style.container}>
      <ScrollView style={style.scroll}>
        <Text style={style.text}>{text.read}</Text>
      </ScrollView>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
  },
  text: {
    fontSize: 32,
    flexWrap: "wrap",
    textAlign: "center",
    paddingRight: 16,
    paddingLeft: 16,
    color: "white",
  },
  scroll: {
    backgroundColor: "transparent",
    marginHorizontal: 20,
  },
});
export default Overlapping;
