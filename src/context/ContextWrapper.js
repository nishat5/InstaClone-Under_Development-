import React from 'react';
import { AuthProvider } from './AuthContext';
import { UserProvider } from './UserContext';
import { PostProvider } from './PostsContext';
const ContextWrapper = ({ children }) => {
  return (
    <AuthProvider>
      <UserProvider>
        <PostProvider>{children}</PostProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default ContextWrapper;
