import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'AlertaSeguro',
  webDir: 'www',
  plugins: {
    StatusBar: {
      overlaysWebView: false
    }
  }
};

export default config;
