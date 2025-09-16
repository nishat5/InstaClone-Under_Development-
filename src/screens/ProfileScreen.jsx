//import liraries
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Button,
  ActivityIndicator,
} from 'react-native';
import Header from '../components/Header';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { launchImageLibrary } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { askPermission } from '../utils/permission';

const CLOUD_NAME = 'dvuwsg3le';
const UPLOAD_PRESET = 'profile_images';

// create a component
const ProfileScreen = ({ navigation, route }) => {
  // const { usermail, username, userPhoto } = route.params;
  const { user } = route.params;
  const [localUri, setLocalUri] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Pick image from gallery
  const pickImage = async () => {
    //ask for gallery permission from user
    const status = await askPermission('gallery');
    if (status !== 'granted') {
      Alert.alert('Gallery Permission', 'Permission Not Granted');
      return;
    }

    //if user grant permission then will fetch img from gallery
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage);
      } else {
        setLocalUri(response.assets[0].uri);
        console.log('URI: ', response.assets[0].uri);
      }
    });
  };

  // Upload to Cloudinary API and also replace photoUrl from allusers collection in firestore
  const uploadImage = async () => {
    if (!localUri) return Alert.alert('Disclaimer: ', 'Select an image first!');

    const data = new FormData(); //used to store any uploading file in it.
    data.append('file', {
      uri: localUri,
      // uri: localUri.startsWith('file://') ? localUri : `file://${localUri}`,
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
        },
      );

      const json = await res.json();
      console.log('Cloudinary response:', json);
      if (json.secure_url) {
        const userId = auth().currentUser.uid; // current logged-in user
        await firestore().collection('allusers').doc(userId).update({
          photoUrl: json.secure_url,
        });

        Alert.alert('Success', 'Image uploaded!');
        setUploading(false);
      } else {
        Alert.alert('Error', 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        heading="Profile"
        sideTitle="Edit"
        onPress={() => navigation.pop()}
      />
      <View style={styles.imgMainWrapper}>
        <TouchableOpacity onPress={pickImage} style={styles.imgContainer}>
          <Image
            style={styles.img}
            source={{
              uri: localUri ? localUri : user.photoUrl,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={uploadImage} style={styles.uploadImgBtn}>
          {uploading ? (
            <ActivityIndicator size="small" color="black" />
          ) : (
            <Text style={styles.uploadImgText}>Update Profile</Text>
          )}
        </TouchableOpacity>
      </View>
      {/* userdetails name mobile location etc */}
      <View style={styles.userDetailContainer}>
        <View style={styles.userDetail}>
          <Text style={[styles.userText, { color: 'gray' }]}>Username</Text>
          <Text style={styles.userText}>{user.username}</Text>
        </View>
        <View style={styles.userDetail}>
          <Text style={[styles.userText, { color: 'gray' }]}>
            Mobile Number
          </Text>
          <Text style={styles.userText}>(917) 875-3889</Text>
        </View>
        <View style={styles.userDetail}>
          <Text style={[styles.userText, { color: 'gray' }]}>Location</Text>
          <Text style={styles.userText}>New York City</Text>
        </View>
        <View style={styles.userDetail}>
          <Text style={[styles.userText, { color: 'gray' }]}>Gender</Text>
          <Text style={styles.userText}>Male</Text>
        </View>
        <View style={styles.userDetail}>
          <Text style={[styles.userText, { color: 'gray' }]}>
            Date of Birth
          </Text>
          <Text style={styles.userText}>24/03/1996</Text>
        </View>
        <View style={[styles.userDetail, { borderBottomWidth: 0 }]}>
          <Text style={[styles.userText, { color: 'gray' }]}>Email</Text>
          <Text style={styles.userText}>{user.email}</Text>
        </View>
      </View>
      {/* delete account container starts */}
      <View style={styles.deleteAccContainer}>
        <Text style={styles.deleteText}>Delete Account</Text>
        <Text style={styles.textDes}>
          You can reactivate your account within 40 days. So, after 40 days your
          account will automatically be deleted, permanently.
        </Text>
        <TouchableOpacity style={styles.btnContainer}>
          <Text style={styles.btnText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  text: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
  },
  imgMainWrapper: {
    backgroundColor: 'white',
    padding: wp('3%'),
    margin: hp('2%'),
    alignItems: 'center',
    borderRadius: hp('2%'),
  },
  imgContainer: {
    marginBottom: hp('1%'),
    width: wp('24%'),
    height: wp('24%'),
    borderRadius: wp('12%'),
    borderWidth: 1.5,
    borderColor: 'red',
    overflow: 'hidden',
  },
  img: {
    width: wp('24%'),
    height: wp('24%'),
  },
  uploadImgBtn: {
    borderWidth: 1,
    paddingVertical: wp('1%'),
    width: wp('30%'),
    borderRadius: wp('4%'),
  },
  uploadImgText: {
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
  },
  userDetailContainer: {
    marginHorizontal: hp('2%'),
    borderRadius: hp('2%'),
    backgroundColor: 'white',
  },
  userDetail: {
    padding: wp('3.8%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: 'silver',
  },
  userText: {
    fontSize: wp('3.8%'),
    fontFamily: 'Roboto-Regular',
  },
  deleteAccContainer: {
    margin: hp('2%'),
    borderRadius: hp('2%'),
    backgroundColor: 'white',
    padding: wp('3.8%'),
  },
  deleteText: {
    fontSize: wp('3.8%'),
    fontFamily: 'Roboto-Bold',
    marginBottom: hp('0.5%'),
  },
  textDes: {
    fontFamily: 'Roboto-Regular',
    fontSize: wp('3.5%'),
  },
  btnContainer: {
    padding: wp('2%'),
    borderWidth: 1,
    marginTop: hp('1.5%'),
    borderRadius: wp('5%'),
  },
  btnText: {
    fontSize: wp('3.8%'),
    fontFamily: 'Roboto-Bold',
    alignSelf: 'center',
  },
});

//make this component available to the app
export default ProfileScreen;
