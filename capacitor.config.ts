import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'AlertaSeguro',
  webDir: 'www',

  server: {
    androidScheme: "https",
    cleartext: true
  },

  plugins: {
    StatusBar: {
      overlaysWebView: false
    },

    // 🔥 Google Login
    GoogleAuth: {
      scopes: ["profile", "email"],
      serverClientId: "706008625809-gaelv7rqb03avsfpnh55pn61o9k4gfkp.apps.googleusercontent.com",
      forceCodeForRefreshToken: true
    },

    // 🟦 Splash Screen automático
    SplashScreen: {
      launchShowDuration: 2500,   // tempo da splash (2.5s)
      launchAutoHide: true,       // splash gerenciada automaticamente
      backgroundColor: '#1c1c1c', // sua cor de fundo
      showSpinner: true,
      spinnerColor: '#00ff88',    // opcional
      androidScaleType: 'CENTER_CROP',
      splashFullScreen: false,
      splashImmersive: false
    }
  }
};

export default config;
