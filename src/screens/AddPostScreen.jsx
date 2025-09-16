//import liraries
import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Image,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';
import { askPermission } from '../utils/permission';
import { launchImageLibrary } from 'react-native-image-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Header from '../components/Header';
import { UserContext } from '../context/UserContext';

const CLOUD_NAME = 'dvuwsg3le';
const UPLOAD_PRESET = 'profile_images';

// create a component
const AddPostScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [localUri, setLocalUri] = useState(null);
  const [value, setValue] = useState('');
  const [uploading, setUploading] = useState(false);

  const pickImageForPost = async () => {
    const status = await askPermission('gallery');
    if (status != 'granted') {
      Alert.alert('Gallery Permission', 'Permission not granted.');
      return;
    }

    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage);
      } else {
        setLocalUri(response.assets[0].uri);
      }
    });
  };

  useEffect(() => {
    pickImageForPost();
  }, []);

  const addPostHanlder = async () => {
    if (!localUri) return Alert.alert('Disclaimer: ', 'Select an image first!');

    const data = new FormData(); //used to store any uploading file in it.
    data.append('file', {
      uri: localUri,
      type: 'image/jpeg',
      name: 'upload.jpg',
    });
    data.append('upload_preset', UPLOAD_PRESET);
    data.append('folder', 'ProfilePictures');

    try {
      //request to Cloudinary’s upload API
      setUploading(true);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      const json = await res.json();
      if (json.secure_url) {
        const userId = auth().currentUser.uid;
        //CREATING NEW COLLECTION NAMED POST IN FIRESTORE,
        await firestore().collection('Posts').add({
          userImage: user.photoUrl,
          postImage: json.secure_url, //online url of posted img
          description: value,
          likes: 0,
          comments: 0,
          shares: 0,
          userId,
          username: user.username,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

        Alert.alert('Success', 'Post uploaded!');
        setValue('');
        setLocalUri(null);
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Post failed');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error in Posting', 'Something went wrong');
    } finally {
      setUploading(false);
    }
  };

  // const addPostHanlder000 = async () => {
  //   if (!localUri) return Alert.alert('Disclaimer: ', 'Select an image first!');

  //   const data = new FormData(); //used to store any uploading file in it.
  //   data.append('file', {
  //     uri: localUri,
  //     type: 'image/jpeg',
  //     name: 'upload.jpg',
  //   });
  //   data.append('upload_preset', UPLOAD_PRESET);
  //   data.append('folder', 'Posts');

  //   try {
  //     //request to Cloudinary’s upload API
  //     setUploading(true);
  //     const res = await fetch(
  //       `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
  //       {
  //         method: 'POST',
  //         body: data,
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       },
  //     );

  //     const json = await res.json();

  //     if (json.secure_url) {
  //       const userId = auth().currentUser.uid; // current logged-in user
  //       await firestore().collection('Posts').add({
  //         userImage: user.photoUrl,
  //         postImage: json.secure_url, //online url of posted img
  //         description: value,
  //         likes: 0,
  //         comments: 0,
  //         shares: 0,
  //         userId,
  //         createdAt: firestore.FieldValue.serverTimestamp(),
  //       });

  //       Alert.alert('Success', 'Post uploaded!');
  //       navigation.navigate('Home');
  //     } else {
  //       Alert.alert('Error', 'Post failed');
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     Alert.alert('Error in Posting', 'Something went wrong');
  //   } finally {
  //     setUploading(false);
  //   }
  // };

  return (
    <View style={styles.container}>
      <Header
        heading="New Post"
        sideTitle="Share"
        onPress={() => navigation.navigate('Home')}
      />

      {uploading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.postContainer}>
          <Image style={styles.profileImg} source={{ uri: user.photoUrl }} />
          <TextInput
            value={value}
            onChangeText={setValue}
            placeholder="Write a caption..."
            style={styles.input}
          />
          <Image style={styles.postImg} source={{ uri: localUri }} />
        </View>
      )}

      <Button color="black" title="Share Post" onPress={addPostHanlder} />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  postContainer: {
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('3%'),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileImg: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('6%'),
    borderWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: wp('2%'),
    paddingHorizontal: wp('2%'),
    borderRadius: wp('1%'),
    height: 40,
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
  },
  postImg: {
    width: wp('14%'),
    height: wp('14%'),
    borderRadius: wp('1%'),
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

//make this component available to the app
export default AddPostScreen;
