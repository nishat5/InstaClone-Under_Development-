// services/userActions.js
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const getCurrentUserId = () => auth().currentUser.uid;

// FOLLOW
export const followUser = async targetUserId => {
  const uid = getCurrentUserId();

  if (uid === targetUserId) {
    console.warn("You can't follow yourself");
    return;
  }

  try {
    const userRef = firestore().collection('allusers').doc(uid);
    const targetRef = firestore().collection('allusers').doc(targetUserId);

    // Get current user data
    const currentUserSnap = await userRef.get();
    const currentUser = currentUserSnap.data();

    // Get target user data
    const targetUserSnap = await targetRef.get();
    const targetUser = targetUserSnap.data();

    // Add to my following subcollection
    await userRef
      .collection('following')
      .doc(targetUserId)
      .set({
        userId: targetUserId,
        username: targetUser?.username || '',
        photoUrl: targetUser?.photoUrl || '',
        email: targetUser?.email || '',
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

    // Add to target's followers subcollection
    await targetRef
      .collection('followers')
      .doc(uid)
      .set({
        userId: uid,
        username: currentUser?.username || '',
        photoUrl: currentUser?.photoUrl || '',
        email: currentUser?.email || '',
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

    console.log(`${uid} followed ${targetUserId}`);
  } catch (err) {
    console.error('Error following user:', err);
  }
};

// UNFOLLOW
export const unfollowUser = async targetUserId => {
  const uid = getCurrentUserId();

  if (uid === targetUserId) {
    console.warn("You can't unfollow yourself");
    return;
  }

  try {
    const userRef = firestore().collection('allusers').doc(uid);
    const targetRef = firestore().collection('allusers').doc(targetUserId);

    // Remove from my following subcollection
    await userRef.collection('following').doc(targetUserId).delete();

    // Remove me from target's followers subcollection
    await targetRef.collection('followers').doc(uid).delete();

    console.log(`${uid} unfollowed ${targetUserId}`);
  } catch (err) {
    console.error('Error unfollowing user:', err);
  }
};
