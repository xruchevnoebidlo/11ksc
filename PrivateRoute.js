import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, currentUser, requiredRole }) => {
  if (!currentUser || currentUser.role !== requiredRole) {
    return <Navigate to="/" />;
  }
  return element; // Рендерим переданный элемент, если роль совпадает
};

export default PrivateRoute;
