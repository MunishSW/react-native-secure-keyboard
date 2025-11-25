# React Native Secure Keyboard - Example App

This example app demonstrates all the features and capabilities of the `react-native-secure-keyboard` library.

## 🎯 What's Included

The example app showcases:

- ✅ **PIN Input** - 6-digit numeric PIN entry with secure masking
- ✅ **Password Input** - Numeric password entry with variable length
- ✅ **Auto-Scroll** - Automatic scrolling to focused input fields
- ✅ **Randomized Keyboard** - Number layout randomizes on each keyboard open
- ✅ **Haptic Feedback** - Vibration on key press
- ✅ **Custom Styling** - Fully styled keyboard with custom colors
- ✅ **Visual Feedback** - Active input highlighting
- ✅ **Secure Display** - Input values shown as dots (•)
- ✅ **Clear & Submit** - Full keyboard control

## 🚀 Quick Start

### Prerequisites

Before running the example app, make sure you have:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Yarn](https://yarnpkg.com/) (v4.11.0 or higher) or [npm](https://www.npmjs.com/) (v8 or higher)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

For iOS:
- macOS with Xcode installed
- CocoaPods (`sudo gem install cocoapods`)

For Android:
- Android Studio with Android SDK
- Java Development Kit (JDK)

### Installation

1. **Clone the repository** (if you haven't already):
   ```sh
   git clone https://github.com/MunishSW/react-native-secure-keyboard.git
   cd react-native-secure-keyboard
   ```

2. **Install dependencies** from the root:
   
   Using Yarn:
   ```sh
   yarn install
   ```
   
   Using npm:
   ```sh
   npm install
   ```

3. **Build the library**:
   
   Using Yarn:
   ```sh
   yarn prepare
   ```
   
   Using npm:
   ```sh
   npm run prepare
   ```

### Running the Example App

#### Option 1: Using Expo (Recommended)

Navigate to the example directory and start Expo:

Using Yarn:
```sh
cd example
yarn start
```

Using npm:
```sh
cd example
npm start
```

Then:
- Press **`i`** to run on iOS Simulator
- Press **`a`** to run on Android Emulator
- Press **`w`** to run on Web Browser
- Scan the QR code with Expo Go app on your physical device

#### Option 2: Using Direct Commands

**For iOS:**

Using Yarn:
```sh
cd example
yarn ios
```

Using npm:
```sh
cd example
npm run ios
```

**For Android:**

Using Yarn:
```sh
cd example
yarn android
```

Using npm:
```sh
cd example
npm run android
```

**For Web:**

Using Yarn:
```sh
cd example
yarn web
```

Using npm:
```sh
cd example
npm run web
```

## 🎨 Features Demonstrated

### 1. Multiple Input Fields
The app demonstrates using the same secure keyboard for multiple input fields (PIN and Password).

### 2. Auto-Scroll Behavior
When you tap an input field, the keyboard appears and automatically scrolls the content so the focused input is visible above the keyboard.

### 3. Randomized Number Layout
Each time the keyboard appears, the numbers are shuffled in a random order for enhanced security.

### 4. Haptic Feedback
Every key press triggers a subtle vibration (can be customized or disabled).

### 5. Custom Styling
- Custom keyboard background color
- Styled number buttons with shadows
- Red delete button with custom icon
- Green submit button with custom text
- Active input field highlighting

### 6. Visual Masking
Input values are displayed as dots (•) for security, while the actual values are shown in the "Current Values" section for demonstration purposes.

## 📂 Project Structure

```
example/
├── src/
│   └── App.tsx           # Main example app code
├── assets/               # App assets
├── app.json              # Expo configuration
├── package.json          # Dependencies
├── metro.config.js       # Metro bundler configuration
└── README.md            # This file
```

## 🛠️ Customization

### Modify the Example

The main example code is in `src/App.tsx`. You can:

1. **Change keyboard height:**
   ```tsx
   keyboardHeight={300}
   ```

2. **Disable randomization:**
   ```tsx
   randomize={false}
   ```

3. **Disable vibration:**
   ```tsx
   vibration={false}
   ```

4. **Customize colors:**
   ```tsx
   buttonStyle={{ backgroundColor: '#your-color' }}
   ```

5. **Add custom icons:**
   ```tsx
   deleteButtonIcon={<YourCustomIcon />}
   ```

### Testing on Physical Devices

#### iOS (Physical Device)

Using Yarn:
```sh
cd example
yarn ios --device
```

Using npm:
```sh
cd example
npm run ios -- --device
```

#### Android (Physical Device)
1. Enable USB debugging on your Android device
2. Connect via USB
3. Run:
   
   Using Yarn:
   ```sh
   cd example
   yarn android
   ```
   
   Using npm:
   ```sh
   cd example
   npm run android
   ```

Or use Expo Go:
1. Install [Expo Go](https://expo.dev/client) on your device
2. Run `yarn start` or `npm start` in the example directory
3. Scan the QR code with your device

## 🐛 Troubleshooting

### "Invalid hook call" Error

If you see this error, clear the cache:

Using Yarn:
```sh
cd example
rm -rf node_modules .expo
yarn install
yarn start --clear
```

Using npm:
```sh
cd example
rm -rf node_modules .expo
npm install
npm start -- --clear
```

### Metro Bundler Issues

Clear Metro cache:

Using Yarn:
```sh
cd example
yarn start --clear
```

Using npm:
```sh
cd example
npm start -- --clear
```

### iOS Build Issues

Reset iOS build:

Using Yarn:
```sh
cd example/ios
pod deintegrate
pod install
cd ..
yarn ios
```

Using npm:
```sh
cd example/ios
pod deintegrate
pod install
cd ..
npm run ios
```

### Android Build Issues

Clean Android build:

Using Yarn:
```sh
cd example/android
./gradlew clean
cd ..
yarn android
```

Using npm:
```sh
cd example/android
./gradlew clean
cd ..
npm run android
```

## 📱 Supported Platforms

- ✅ iOS (11.0+)
- ✅ Android (API 21+)
- ✅ Web (limited - for demo purposes)

## 💡 Tips

1. **Test on Real Devices** - Haptic feedback and performance are best tested on physical devices
2. **Try Different Input Scenarios** - Test with various PIN lengths and patterns
3. **Observe Auto-Scroll** - Scroll down and tap inputs to see auto-scroll behavior
4. **Check Randomization** - Close and reopen the keyboard to see number shuffling

## 🔗 Resources

- [Main Library Documentation](../README.md)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)

## 📄 License

MIT © [Munish Vira](https://github.com/MunishSW)
