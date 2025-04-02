import React from 'react';
import { SignedIn, SignedOut, SignIn, RedirectToSignIn, UserButton } from '@clerk/clerk-react';
import UserForm from './components/UserForm';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className="content">
        <h1 className="title">🚀 AI Business Idea Generator</h1>
        <div className="user-button-container">
          <SignedIn>
            <UserButton />
            <UserForm />
          </SignedIn>

          <SignedOut>
            <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
            <RedirectToSignIn />
          </SignedOut>
        </div>
      </div>
    </div>
  );
}

export default App;
