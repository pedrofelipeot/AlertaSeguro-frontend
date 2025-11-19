import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'AlertaSeguro',
  webDir: 'www',

  // 🔥 ESSENCIAL PARA FIREBASE AUTH FUNCIONAR NO ANDROID
  server: {
    androidScheme: "https",
    cleartext: true
  },

  plugins: {
    StatusBar: {
      overlaysWebView: false
    }
  }
};

export default config;
