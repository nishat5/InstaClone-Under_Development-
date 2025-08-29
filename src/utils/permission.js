import { Platform, Linking } from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';

// Open app settings if permission is blocked
export const openSettings = async () => {
  await Linking.openSettings();
};

// Centralized permission handler
export const askPermission = async type => {
  let permission;

  switch (type) {
    case 'camera':
      permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA;
      break;

    case 'location':
      permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
      break;

    case 'microphone':
      permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.MICROPHONE
          : PERMISSIONS.ANDROID.RECORD_AUDIO;
      break;

    case 'contacts':
      permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.CONTACTS
          : PERMISSIONS.ANDROID.READ_CONTACTS;
      break;

    // case 'gallery': // Photos / Media Library
    //   permission =
    //     Platform.OS === 'ios'
    //       ? PERMISSIONS.IOS.PHOTO_LIBRARY
    //       : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    //   break;
    case 'gallery': // Photos / Media Library
      if (Platform.OS === 'ios') {
        permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
      } else {
        // Fix: Android 13+ uses READ_MEDIA_* instead of READ_EXTERNAL_STORAGE
        if (Platform.Version >= 33) {
          permission = PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
        } else {
          permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
        }
      }
      break;

    default:
      throw new Error(`Unknown permission type: ${type}`);
  }

  const result = await request(permission);

  //  If blocked, guide user to Settings
  if (result === 'blocked') {
    await openSettings();
  }

  return result; // "granted" | "denied" | "blocked" | "unavailable"
};
