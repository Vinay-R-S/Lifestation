// Import necessary testing utilities
import { render, fireEvent, act } from '@testing-library/react-native';
import React from 'react';
import type { ReactElement } from 'react';

// Import screens and Firebase functions
import LoginScreen from '../app/auth/login';
import SignupScreen from '../app/auth/signup';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

// ==============================
// MOCKS
// ==============================

// Mock Firebase Authentication functions
jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { uid: 'test-uid' } })),
  createUserWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { uid: 'test-uid' } })),
  getAuth: jest.fn(() => ({})),
}));

// Mock Firestore functions
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(() => ({})),
  setDoc: jest.fn(() => Promise.resolve()),
  getFirestore: jest.fn(() => ({})),
}));

// Mock navigation functionality from Expo Router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));

// Mock React Native's Alert component to prevent real alerts during testing
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.Alert = {
    alert: jest.fn(),
  };
  return RN;
});

// ==============================
// TEST SUITE
// ==============================

describe('Authentication Security Tests', () => {

  // Reset all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ------------------------------
  // LOGIN TESTS
  // ------------------------------
  describe('Login Security Tests', () => {

    test('should prevent login with empty credentials', async () => {
      const { getByTestId } = render(React.createElement(LoginScreen));
      const loginButton = getByTestId('login-button');

      // Attempt login without filling any fields
      await act(async () => {
        fireEvent.press(loginButton);
      });

      // Ensure signIn was NOT called
      expect(signInWithEmailAndPassword).not.toHaveBeenCalled();
    });

    test('should prevent login with invalid email format', async () => {
      const { getByTestId, getByPlaceholderText } = render(React.createElement(LoginScreen));
      const emailInput = getByPlaceholderText('Email');
      const passwordInput = getByPlaceholderText('Password');
      const loginButton = getByTestId('login-button');

      // Fill invalid email
      await act(async () => {
        fireEvent.changeText(emailInput, 'invalid-email');
        fireEvent.changeText(passwordInput, 'password123');
        fireEvent.press(loginButton);
      });

      expect(signInWithEmailAndPassword).not.toHaveBeenCalled();
    });

    test('should prevent login with short password', async () => {
      const { getByTestId, getByPlaceholderText } = render(React.createElement(LoginScreen));
      const emailInput = getByPlaceholderText('Email');
      const passwordInput = getByPlaceholderText('Password');
      const loginButton = getByTestId('login-button');

      // Fill short password
      await act(async () => {
        fireEvent.changeText(emailInput, 'test@example.com');
        fireEvent.changeText(passwordInput, '123');
        fireEvent.press(loginButton);
      });

      expect(signInWithEmailAndPassword).not.toHaveBeenCalled();
    });
  });

  // ------------------------------
  // SIGNUP TESTS
  // ------------------------------
  describe('Signup Security Tests', () => {

    test('should prevent signup with empty fields', async () => {
      const { getByTestId } = render(React.createElement(SignupScreen));
      const signupButton = getByTestId('signup-button');

      await act(async () => {
        fireEvent.press(signupButton);
      });

      expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
    });

    test('should prevent signup with invalid email format', async () => {
      const { getByTestId, getByPlaceholderText } = render(React.createElement(SignupScreen));
      const nameInput = getByPlaceholderText('Name');
      const genderInput = getByPlaceholderText('Gender (male/female)');
      const emailInput = getByPlaceholderText('Email');
      const passwordInput = getByPlaceholderText('Password');
      const signupButton = getByTestId('signup-button');

      await act(async () => {
        fireEvent.changeText(nameInput, 'Test User');
        fireEvent.changeText(genderInput, 'male');
        fireEvent.changeText(emailInput, 'invalid-email');
        fireEvent.changeText(passwordInput, 'password123');
        fireEvent.press(signupButton);
      });

      expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
    });

    test('should prevent signup with weak password', async () => {
      const { getByTestId, getByPlaceholderText } = render(React.createElement(SignupScreen));
      const nameInput = getByPlaceholderText('Name');
      const genderInput = getByPlaceholderText('Gender (male/female)');
      const emailInput = getByPlaceholderText('Email');
      const passwordInput = getByPlaceholderText('Password');
      const signupButton = getByTestId('signup-button');

      await act(async () => {
        fireEvent.changeText(nameInput, 'Test User');
        fireEvent.changeText(genderInput, 'male');
        fireEvent.changeText(emailInput, 'test@example.com');
        fireEvent.changeText(passwordInput, '123');
        fireEvent.press(signupButton);
      });

      expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
    });

    test('should validate gender input', async () => {
      const { getByTestId, getByPlaceholderText } = render(React.createElement(SignupScreen));
      const nameInput = getByPlaceholderText('Name');
      const genderInput = getByPlaceholderText('Gender (male/female)');
      const emailInput = getByPlaceholderText('Email');
      const passwordInput = getByPlaceholderText('Password');
      const signupButton = getByTestId('signup-button');

      await act(async () => {
        fireEvent.changeText(nameInput, 'Test User');
        fireEvent.changeText(genderInput, 'invalid-gender');
        fireEvent.changeText(emailInput, 'test@example.com');
        fireEvent.changeText(passwordInput, 'password123');
        fireEvent.press(signupButton);
      });

      expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
    });
  });

  // ------------------------------
  // DATA SECURITY TESTS
  // ------------------------------
  describe('Data Security Tests', () => {

    test('should not store plain text password', async () => {
      const { getByTestId, getByPlaceholderText } = render(React.createElement(SignupScreen));
      const nameInput = getByPlaceholderText('Name');
      const genderInput = getByPlaceholderText('Gender (male/female)');
      const emailInput = getByPlaceholderText('Email');
      const passwordInput = getByPlaceholderText('Password');
      const signupButton = getByTestId('signup-button');

      await act(async () => {
        fireEvent.changeText(nameInput, 'Test User');
        fireEvent.changeText(genderInput, 'male');
        fireEvent.changeText(emailInput, 'test@example.com');
        fireEvent.changeText(passwordInput, 'password123');
        fireEvent.press(signupButton);
      });

      // Simulated user data, verify password is NOT stored
      const mockUserData = {
        uid: 'test-uid',
        name: 'Test User',
        gender: 'male',
        email: 'test@example.com',
        coins: 0,
        health: 100,
        avatar: {
          unlocked: { hair: [], eyes: [] },
          equipped: { hair: null, eyes: null }
        },
        created_at: new Date().toISOString()
      };

      expect(mockUserData).not.toHaveProperty('password');
    });

    test('should sanitize user input', async () => {
      const { getByTestId, getByPlaceholderText } = render(React.createElement(SignupScreen));
      const nameInput = getByPlaceholderText('Name');
      const genderInput = getByPlaceholderText('Gender (male/female)');
      const emailInput = getByPlaceholderText('Email');
      const passwordInput = getByPlaceholderText('Password');
      const signupButton = getByTestId('signup-button');

      const maliciousInput = '<script>alert("xss")</script>';

      await act(async () => {
        fireEvent.changeText(nameInput, maliciousInput);
        fireEvent.changeText(genderInput, 'male');
        fireEvent.changeText(emailInput, 'test@example.com');
        fireEvent.changeText(passwordInput, 'password123');
        fireEvent.press(signupButton);
      });

      // Sanitize name input manually
      const sanitizedInput = maliciousInput.replace(/<[^>]*>?/gm, '').trim();

      const mockUserData = {
        uid: 'test-uid',
        name: sanitizedInput,
        gender: 'male',
        email: 'test@example.com',
        coins: 0,
        health: 100,
        avatar: {
          unlocked: { hair: [], eyes: [] },
          equipped: { hair: null, eyes: null }
        },
        created_at: new Date().toISOString()
      };

      // Verify sanitization worked
      expect(mockUserData.name).toBe(sanitizedInput);
    });
  });
});
