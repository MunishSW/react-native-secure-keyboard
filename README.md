# react-native-secure-keyboard

A security-focused, fully customizable numeric keyboard component for React Native applications. Protect sensitive user data (PIN, password, MPIN, card details, OTP) from keylogging, clipboard attacks, predictive text leaks, and untrusted third-party keyboards.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React Native](https://img.shields.io/badge/react--native-%3E%3D0.70-brightgreen.svg)

## ✨ Features

- 🔐 **Security First** - In-app keyboard prevents keylogging and clipboard attacks
- 🎲 **Randomized Layout** - Optional number randomization for enhanced security
- 📳 **Haptic Feedback** - Customizable vibration on key press
- 🎨 **Fully Customizable** - Style every aspect of the keyboard
- 📱 **Auto-Scroll** - Automatically scrolls to focused input
- 🎯 **TypeScript** - Full TypeScript support with type definitions
- ⚡ **Zero Dependencies** - No external dependencies except React Native
- 🌐 **Cross-Platform** - Works on iOS and Android

## 📦 Installation

### Install from npm (when published)
```sh
npm install react-native-secure-keyboard
```

or

### Install from GitHub
```sh
npm install https://github.com/MunishSW/react-native-secure-keyboard.git
```

## 🚀 Quick Start

```tsx
import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import SecureKeyboardLayout, {
  type SecureKeyboardLayoutRef,
} from 'react-native-secure-keyboard';

export default function App() {
  const [pin, setPin] = useState('');
  const keyboardRef = useRef<SecureKeyboardLayoutRef>(null);

  return (
    <SecureKeyboardLayout
      ref={keyboardRef}
      onKeyPress={(value) => setPin((prev) => prev + value)}
      onDelete={() => setPin((prev) => prev.slice(0, -1))}
      onSubmit={() => console.log('PIN:', pin)}
    >
      <View>
        <TouchableOpacity onPress={() => keyboardRef.current?.showKeyboard()}>
          <Text>PIN: {pin ? '•'.repeat(pin.length) : 'Tap to enter'}</Text>
        </TouchableOpacity>
      </View>
    </SecureKeyboardLayout>
  );
}
```

## 📖 API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | **required** | Your app content that will be rendered above the keyboard |
| `onKeyPress` | `(value: string) => void` | - | Callback when a number key is pressed |
| `onDelete` | `() => void` | - | Callback when delete button is pressed |
| `onSubmit` | `() => void` | - | Callback when submit/OK button is pressed |
| `randomize` | `boolean` | `true` | Enable/disable number randomization |
| `vibration` | `boolean` | `true` | Enable/disable haptic feedback |
| `keyboardHeight` | `number` | `260` | Height of the keyboard in pixels |
| `animationDuration` | `number` | `200` | Animation duration in milliseconds |
| `scrollOffset` | `number` | `150` | Auto-scroll offset from top |

#### Style Props

| Prop | Type | Description |
|------|------|-------------|
| `containerStyle` | `ViewStyle` | Main container style |
| `scrollContentStyle` | `ViewStyle` | Scroll view content style |
| `keyboardContainerStyle` | `ViewStyle` | Keyboard container style |
| `gridStyle` | `ViewStyle` | Keyboard grid layout style |
| `buttonStyle` | `ViewStyle` | Number button style |
| `buttonTextStyle` | `TextStyle` | Number button text style |
| `deleteButtonStyle` | `ViewStyle` | Delete button style |
| `deleteButtonTextStyle` | `TextStyle` | Delete button text style |
| `deleteButtonText` | `string` | Delete button text (default: '⌫') |
| `deleteButtonIcon` | `React.ReactNode` | Custom delete button icon |
| `submitButtonStyle` | `ViewStyle` | Submit/OK button style |
| `submitButtonTextStyle` | `TextStyle` | Submit/OK button text style |
| `submitButtonText` | `string` | Submit button text (default: '✓') |
| `submitButtonIcon` | `React.ReactNode` | Custom submit button icon |

### Ref Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `showKeyboard` | `targetRef?: any` | Show the keyboard (optionally scroll to target) |
| `hideKeyboard` | - | Hide the keyboard |

## 🎨 Examples

### Custom Styling

```tsx
<SecureKeyboardLayout
  ref={keyboardRef}
  onKeyPress={handleKeyPress}
  onDelete={handleDelete}
  onSubmit={handleSubmit}
  keyboardContainerStyle={{
    backgroundColor: '#1E1E1E',
    borderTopColor: '#333',
  }}
  buttonStyle={{
    backgroundColor: '#2C2C2C',
    borderRadius: 12,
  }}
  buttonTextStyle={{
    color: '#FFFFFF',
    fontSize: 24,
  }}
  deleteButtonStyle={{
    backgroundColor: '#FF3B30',
  }}
  submitButtonStyle={{
    backgroundColor: '#34C759',
  }}
>
  {/* Your content */}
</SecureKeyboardLayout>
```

### Custom Icons

```tsx
import { Ionicons } from '@expo/vector-icons';

<SecureKeyboardLayout
  ref={keyboardRef}
  deleteButtonIcon={<Ionicons name="backspace" size={24} color="white" />}
  submitButtonIcon={<Ionicons name="checkmark" size={24} color="white" />}
>
  {/* Your content */}
</SecureKeyboardLayout>
```

### Auto-Scroll to Input

```tsx
const inputRef = useRef(null);

<SecureKeyboardLayout ref={keyboardRef}>
  <View ref={inputRef}>
    <TouchableOpacity
      onPress={() => keyboardRef.current?.showKeyboard(inputRef.current)}
    >
      <Text>Tap to enter PIN</Text>
    </TouchableOpacity>
  </View>
</SecureKeyboardLayout>
```

### Without Randomization

```tsx
<SecureKeyboardLayout
  ref={keyboardRef}
  randomize={false} // Fixed number layout
  vibration={false} // No haptic feedback
>
  {/* Your content */}
</SecureKeyboardLayout>
```

## 🔒 Security Features

1. **In-App Keyboard** - All input happens within your app, preventing system keyloggers
2. **Randomized Layout** - Numbers shuffle on each keyboard open, preventing pattern detection
3. **No Clipboard** - Sensitive data never touches the clipboard
4. **Visual Masking** - Implement your own masking (dots, asterisks) for displayed values
5. **Haptic Feedback** - Optional vibration confirms key presses without visual feedback

## 🛠️ Development

See the [example app](./example) for a complete implementation.

### Running the Example

```sh
# Install dependencies
yarn install

# Run the example app
cd example
yarn ios     # for iOS
yarn android # for Android
yarn web     # for Web
```

## 🤝 Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## 📄 License

MIT © [Munish Vira](https://github.com/MunishSW)

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
