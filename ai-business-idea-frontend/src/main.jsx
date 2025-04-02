import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';
import './index.css';

// Retrieve the publishable key from your environment variables
const clerkPublishableKey = 'pk_test_bW9kZXJuLXN0dXJnZW9uLTYyLmNsZXJrLmFjY291bnRzLmRldiQ';
console.log(clerkPublishableKey)
console.log('Environment Variables:', import.meta.env);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <App />
    </ClerkProvider>
  // </React.StrictMode>
);
