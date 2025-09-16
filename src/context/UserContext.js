import { createContext, useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  //fetching data of logged in user from firestore collection
  useEffect(() => {
    //onAuthStateChanged() is firebase auth listener runs when user login, logout or switch accounts
    const unsubscribeAuth = auth().onAuthStateChanged(currentUser => {
      if (!currentUser) {
        setUser(null); //when user logout or switch account, it will set userdata to NULL and return
        return;
      }

      //if there is a login users, it fetches that logged in user's info from firestore collection
      const unsubscribeUser = firestore()
        .collection('allusers')
        .doc(currentUser.uid)
        .onSnapshot(doc => {
          if (doc.exists) {
            setUser(doc.data());
          }
        });

      return () => unsubscribeUser(); //whenever new user logged in, it will unsubs from previous user firestore docs
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
