import { useState, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import SecureKeyboardLayout, {
  type SecureKeyboardLayoutRef,
} from 'react-native-secure-keyboard';

export default function App() {
  const [pin, setPin] = useState('');
  const [password, setPassword] = useState('');
  const [activeInput, setActiveInput] = useState<'pin' | 'password' | null>(
    null
  );
  const keyboardRef = useRef<SecureKeyboardLayoutRef>(null);
  const pinInputRef = useRef<any>(null);
  const passwordInputRef = useRef<any>(null);

  const handleKeyPress = (value: string) => {
    if (activeInput === 'pin' && pin.length < 6) {
      setPin((prev) => prev + value);
    } else if (activeInput === 'password' && password.length < 20) {
      setPassword((prev) => prev + value);
    }
  };

  const handleDelete = () => {
    if (activeInput === 'pin') {
      setPin((prev) => prev.slice(0, -1));
    } else if (activeInput === 'password') {
      setPassword((prev) => prev.slice(0, -1));
    }
  };

  const handleSubmit = () => {
    keyboardRef.current?.hideKeyboard();
    setActiveInput(null);
    Alert.alert(
      'Submitted!',
      `PIN: ${pin || '(empty)'}\nPassword: ${password || '(empty)'}`
    );
  };

  const handlePinFocus = () => {
    setActiveInput('pin');
    keyboardRef.current?.showKeyboard(pinInputRef.current);
  };

  const handlePasswordFocus = () => {
    setActiveInput('password');
    keyboardRef.current?.showKeyboard(passwordInputRef.current);
  };

  const handleClear = () => {
    setPin('');
    setPassword('');
    setActiveInput(null);
    keyboardRef.current?.hideKeyboard();
  };

  return (
    <SecureKeyboardLayout
      ref={keyboardRef}
      onKeyPress={handleKeyPress}
      onDelete={handleDelete}
      onSubmit={handleSubmit}
      randomize={true}
      vibration={true}
      keyboardHeight={280}
      containerStyle={styles.container}
      keyboardContainerStyle={styles.keyboard}
      buttonStyle={styles.button}
      buttonTextStyle={styles.buttonText}
      deleteButtonStyle={styles.deleteButton}
      deleteButtonTextStyle={styles.deleteButtonText}
      submitButtonStyle={styles.submitButton}
      submitButtonTextStyle={styles.submitButtonText}
      submitButtonText="OK"
    >
      <View style={styles.content}>
        <Text style={styles.title}>Secure Keyboard Demo</Text>
        <Text style={styles.subtitle}>
          Tap on an input field to show the secure keyboard
        </Text>

        {/* PIN Input */}
        <View ref={pinInputRef} style={styles.inputContainer}>
          <Text style={styles.label}>PIN (6 digits)</Text>
          <TouchableOpacity
            style={[
              styles.input,
              activeInput === 'pin' && styles.inputActive,
            ]}
            onPress={handlePinFocus}
          >
            <Text style={styles.inputText}>
              {pin ? '•'.repeat(pin.length) : 'Tap to enter PIN'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Password Input */}
        <View ref={passwordInputRef} style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TouchableOpacity
            style={[
              styles.input,
              activeInput === 'password' && styles.inputActive,
            ]}
            onPress={handlePasswordFocus}
          >
            <Text style={styles.inputText}>
              {password ? '•'.repeat(password.length) : 'Tap to enter password'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Display Values */}
        <View style={styles.displayContainer}>
          <Text style={styles.displayLabel}>Current Values:</Text>
          <Text style={styles.displayText}>PIN: {pin || '(empty)'}</Text>
          <Text style={styles.displayText}>
            Password: {password || '(empty)'}
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitBtnText}>Submit</Text>
          </TouchableOpacity>
        </View>

        {/* Info */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Features:</Text>
          <Text style={styles.infoText}>✓ Randomized number layout</Text>
          <Text style={styles.infoText}>✓ Haptic feedback</Text>
          <Text style={styles.infoText}>✓ Auto-scroll to focused input</Text>
          <Text style={styles.infoText}>✓ Custom styling support</Text>
          <Text style={styles.infoText}>✓ Secure input masking</Text>
        </View>
      </View>
    </SecureKeyboardLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    minHeight: 56,
    justifyContent: 'center',
  },
  inputActive: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F8FF',
  },
  inputText: {
    fontSize: 18,
    color: '#333',
    letterSpacing: 2,
  },
  displayContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  displayLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  displayText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
    fontFamily: 'monospace',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  submitBtn: {
    flex: 1,
    backgroundColor: '#34C759',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#2E7D32',
    marginBottom: 4,
  },
  keyboard: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  deleteButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: '#34C759',
  },
  submitButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
