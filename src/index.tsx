import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
  Vibration,
  ScrollView,
  findNodeHandle,
  UIManager,
} from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';

// Global timer function for React Native
declare const setTimeout: (handler: () => void, timeout: number) => number;

/* ---------------- Utility ---------------- */
const shuffleArray = <T,>(arr: T[]): T[] => {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = newArr[i];
    newArr[i] = newArr[j] as T;
    newArr[j] = temp as T;
  }
  return newArr;
};

/* ---------------- Types ---------------- */
export interface SecureKeyboardLayoutProps {
  children: React.ReactNode;
  onKeyPress?: (val: string) => void;
  onDelete?: () => void;
  onSubmit?: () => void;
  randomize?: boolean;
  vibration?: boolean;
  keyboardHeight?: number;
  
  // Container styles
  containerStyle?: ViewStyle;
  scrollContentStyle?: ViewStyle;
  keyboardContainerStyle?: ViewStyle;
  
  // Number button styles
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  
  // Delete button customization
  deleteButtonStyle?: ViewStyle;
  deleteButtonTextStyle?: TextStyle;
  deleteButtonText?: string;
  deleteButtonIcon?: React.ReactNode;
  
  // Submit/OK button customization
  submitButtonStyle?: ViewStyle;
  submitButtonTextStyle?: TextStyle;
  submitButtonText?: string;
  submitButtonIcon?: React.ReactNode;
  
  // Grid layout
  gridStyle?: ViewStyle;
  
  // Animation duration
  animationDuration?: number;
  
  // Auto scroll offset
  scrollOffset?: number;
}

export interface SecureKeyboardLayoutRef {
  showKeyboard: (targetRef?: any) => void;
  hideKeyboard: () => void;
}

/* ---------------- Component ---------------- */
const SecureKeyboardLayout = forwardRef<
  SecureKeyboardLayoutRef,
  SecureKeyboardLayoutProps
>(
  (
    {
      children,
      onKeyPress,
      onDelete,
      onSubmit,
      randomize = true,
      vibration = true,
      keyboardHeight = 260,
      containerStyle,
      scrollContentStyle,
      keyboardContainerStyle,
      buttonStyle,
      buttonTextStyle,
      deleteButtonStyle,
      deleteButtonTextStyle,
      deleteButtonText = '⌫',
      deleteButtonIcon,
      submitButtonStyle,
      submitButtonTextStyle,
      submitButtonText = '✓',
      submitButtonIcon,
      gridStyle,
      animationDuration = 200,
      scrollOffset = 150,
    }: SecureKeyboardLayoutProps,
    ref: React.Ref<SecureKeyboardLayoutRef>
  ) => {
    const [visible, setVisible] = useState(false);
    const [keys, setKeys] = useState<string[]>([]);
    const slideAnim = useRef(new Animated.Value(0)).current;
    const scrollRef = useRef<any>(null);

    useEffect(() => {
      const base = [...Array(10).keys()].map(String);
      setKeys(randomize ? shuffleArray(base) : base);
    }, [randomize, visible]);

    /* ---- Show & Hide Keyboard ---- */
    const showKeyboard = (targetRef?: any) => {
      setVisible(true);
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true,
      }).start();

      // Auto scroll into view for bottom items
      if (targetRef && scrollRef.current) {
        setTimeout(() => {
          const handle = findNodeHandle(targetRef);
          if (handle) {
            UIManager.measure(
              handle,
              (
                _x: number,
                _y: number,
                _w: number,
                _h: number,
                _px: number,
                py: number
              ) => {
                scrollRef.current?.scrollTo({
                  y: py - scrollOffset,
                  animated: true,
                });
              }
            );
          }
        }, animationDuration + 50);
      }
    };

    const hideKeyboard = () => {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    };

    useImperativeHandle(ref, () => ({
      showKeyboard,
      hideKeyboard,
    }));

    const handlePress = (num: string) => {
      if (vibration) Vibration.vibrate(10);
      onKeyPress?.(num);
    };

    const slideUp = slideAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [keyboardHeight, 0],
    });

    const allKeys: string[] = [
      ...keys.slice(0, 9),
      'DELETE',
      keys[9] ?? '9',
      'OK',
    ];

    // Default Styles
    const styles = StyleSheet.create({
      flexContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
      },
      scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingTop: 20,
      },
      keyboardContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#F5F5F5',
        paddingTop: 8,
        paddingBottom: Platform.select({
          ios: 10,
          android: 10,
        }),
        borderTopWidth: 1,
        borderColor: '#E0E0E0',
      },
      grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingBottom: 4,
      },
      key: {
        width: '28%',
        height: 50,
        margin: '2%',
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
          android: {
            elevation: 2,
          },
          ios: {
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
          },
        }),
      },
      keyText: {
        fontSize: 22,
        fontWeight: '600',
        color: '#000000',
      },
      keySpecial: {
        backgroundColor: '#E8E8E8',
      },
      keyTextSpecial: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000000',
      },
    });

    return (
      <View style={[styles.flexContainer, containerStyle]}>
        {/* Scrollable Children */}
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={[
            styles.scrollContent,
            scrollContentStyle,
            {
              paddingBottom: visible ? keyboardHeight + 40 : 40,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="none"
        >
          {children}
        </ScrollView>

        {/* Secure Keyboard View */}
        {visible && (
          <Animated.View
            style={[
              styles.keyboardContainer,
              keyboardContainerStyle,
              { transform: [{ translateY: slideUp }] },
            ]}
          >
            <View style={[styles.grid, gridStyle]}>
              {allKeys.map((item, index) => {
                const isDelete = item === 'DELETE';
                const isOK = item === 'OK';

                if (isDelete) {
                  return (
                    <TouchableOpacity
                      key={`${item}-${index}`}
                      style={[
                        styles.key,
                        styles.keySpecial,
                        deleteButtonStyle,
                      ]}
                      onPress={() => onDelete?.()}
                      activeOpacity={0.7}
                      hitSlop={{
                        top: 10,
                        bottom: 10,
                        left: 10,
                        right: 10,
                      }}
                    >
                      {deleteButtonIcon ? (
                        deleteButtonIcon
                      ) : (
                        <Text
                          style={[
                            styles.keyText,
                            styles.keyTextSpecial,
                            deleteButtonTextStyle,
                          ]}
                        >
                          {deleteButtonText}
                        </Text>
                      )}
                    </TouchableOpacity>
                  );
                }

                if (isOK) {
                  return (
                    <TouchableOpacity
                      key={`${item}-${index}`}
                      style={[
                        styles.key,
                        styles.keySpecial,
                        submitButtonStyle,
                      ]}
                      onPress={() => onSubmit?.()}
                      activeOpacity={0.7}
                      hitSlop={{
                        top: 10,
                        bottom: 10,
                        left: 10,
                        right: 10,
                      }}
                    >
                      {submitButtonIcon ? (
                        submitButtonIcon
                      ) : (
                        <Text
                          style={[
                            styles.keyText,
                            styles.keyTextSpecial,
                            submitButtonTextStyle,
                          ]}
                        >
                          {submitButtonText}
                        </Text>
                      )}
                    </TouchableOpacity>
                  );
                }

                return (
                  <TouchableOpacity
                    key={`${item}-${index}`}
                    style={[styles.key, buttonStyle]}
                    onPress={() => handlePress(item)}
                    activeOpacity={0.7}
                    hitSlop={{
                      top: 10,
                      bottom: 10,
                      left: 10,
                      right: 10,
                    }}
                  >
                    <Text style={[styles.keyText, buttonTextStyle]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Animated.View>
        )}
      </View>
    );
  }
);

SecureKeyboardLayout.displayName = 'SecureKeyboardLayout';

export default SecureKeyboardLayout;

