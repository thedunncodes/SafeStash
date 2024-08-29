import { Stack, useNavigation } from "expo-router";
import { Text, View, StyleSheet, ScrollView, StatusBar, Platform } from "react-native";
import { useEffect } from 'react';
import HorizontalCarousel from "@/components/HorizontalCarousel";
import Carousel from "@/components/carousel";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  type CarouselItem = {
    id: string;
    image: string;
  }; 

  const carouselData: CarouselItem[] = [
    { id: '1', image: 'https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg' },
    { id: '2', image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg' },
    { id: '3', image: 'https://img.freepik.com/free-photo/photorealistic-view-tree-nature-with-branches-trunk_23-2151478039.jpg' },
    // Add more items as needed
  ];

  return (
    <ScrollView style={ styles.body }>
      <SafeAreaView style={ styles.Carouselcontainer }>
        <Carousel data={carouselData} />
      </SafeAreaView>
      <View style={ styles.authContainer }>
        <Text>SafeStash Finace Digital Wallet.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'red',
  }, 
  Carouselcontainer: {
    flex: 5,
    marginBottom: 20,
    marginLeft: 5,
    marginRight: 5,
  },
  authContainer: {
    flex: 1,
  }

})
