import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { Animated, Easing, Platform, StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'styled-components/native';

type ToastType = 'success' | 'error' | 'info';

type ToastMessage = {
  id: number;
  type: ToastType;
  text: string;
};

type ToastContextValue = {
  showToast: (type: ToastType, text: string) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const [message, setMessage] = useState<ToastMessage | null>(null);
  const translateY = useRef(new Animated.Value(-80)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const showToast = useCallback((type: ToastType, text: string) => {
    const id = Date.now();
    setMessage({ id, type, text });

    Animated.parallel([
      Animated.timing(translateY, { toValue: 0, duration: 180, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 180, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start(() => {
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(translateY, { toValue: -80, duration: 180, easing: Easing.in(Easing.cubic), useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0, duration: 180, easing: Easing.in(Easing.cubic), useNativeDriver: true }),
        ]).start(() => setMessage(null));
      }, 2000);
    });
  }, [opacity, translateY]);

  const bgColor = message?.type === 'success'
    ? theme.colors.primary
    : message?.type === 'error'
      ? theme.colors.error
      : theme.colors.icon;

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.container,
          {
            transform: [{ translateY }],
            opacity,
            top: Platform.select({ ios: 100, android: 60, default: 60 }),
          },
        ]}
      >
        {message && (
          <View style={[styles.toast, { backgroundColor: bgColor }]}> 
            <Text style={styles.text}>{message.text}</Text>
          </View>
        )}
      </Animated.View>
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 9999,
  },
  toast: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    minHeight: 56,
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default ToastProvider;
