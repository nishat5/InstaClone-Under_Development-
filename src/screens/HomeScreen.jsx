//import liraries
import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MainHeader from '../components/MainHeader';
import PostCard from '../components/PostCard';
import StoryCard from '../components/StoryCard';

// create a component
const HomeScreen = () => {
  const user = [
    {
      id: '1',
      name: 'Nishat',
      imageUrl: 'https://pbs.twimg.com/media/DDEBiYqXoAAB_zi.jpg',
    },
    {
      id: '2',
      name: 'Hussain',
      imageUrl:
        'https://img.freepik.com/free-photo/riding-public-transport-way-work-shot-positive-friendly-handsome-male-with-moustache-beard-glasses-wearing-earphones-listening-music-getting-satisfaction-from-great-bids_176420-22419.jpg?semt=ais_hybrid&w=740',
    },
    {
      id: '3',
      name: 'Bilal',
      imageUrl:
        'https://img.freepik.com/premium-photo/large-plan-portrait-young-man-with-glasses-with-his-tongue-stuck-out_150254-966.jpg',
    },
    {
      id: '4',
      name: 'Haider',
      imageUrl:
        'https://img.freepik.com/free-photo/portrait-handsome-cheerful-adult-man-smiles-toothily-looks-directly-camera-through-transparent-glasses-being-good-mood-dressed-casually-isolated-yellow-background-human-emotions_273609-60421.jpg?semt=ais_hybrid&w=740',
    },
    {
      id: '5',
      name: 'Hassan',
      imageUrl:
        'https://img.freepik.com/premium-photo/cheerful-young-man-with-glasses-displays-broad-smile-radiating-joy-against-vibrant-yellow-backdrop-capturing-moment-pure-happiness-enthusiasm_86390-47794.jpg',
    },
  ];
  const renderItems = ({ item }) => {
    return <StoryCard item={item} />;
  };
  return (
    <View style={styles.container}>
      <MainHeader />
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={user}
          keyExtractor={item => item.id}
          renderItem={renderItems}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <PostCard
          username="Nishat Haider"
          postImage="https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/image-cropped-8x10.jpg"
          userImage="https://pbs.twimg.com/media/DDEBiYqXoAAB_zi.jpg"
        />
        <PostCard
          username="Hussain Nawaz"
          postImage="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
          userImage="https://img.freepik.com/free-photo/riding-public-transport-way-work-shot-positive-friendly-handsome-male-with-moustache-beard-glasses-wearing-earphones-listening-music-getting-satisfaction-from-great-bids_176420-22419.jpg?semt=ais_hybrid&w=740"
        />
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('3%'),
    backgroundColor: 'white',
  },
});

//make this component available to the app
export default HomeScreen;
