import { createContext, useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const PostsContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState(null);

  //fetching data of logged in user from firestore collection
  useEffect(() => {
    // setLoading(true);
    const unsubscribe = firestore()
      .collection('Posts')
      .onSnapshot(snapshot => {
        const allPosts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(allPosts);
        // setLoading(false);
      });
    return () => unsubscribe();
  }, []);

  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostsContext.Provider>
  );
};
