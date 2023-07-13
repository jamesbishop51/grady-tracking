import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gradys.tracking',
  appName: 'grady-tracking',
  webDir: 'dist',
  bundledWebRuntime: false,
  cordova: {
    preferences: {
      'NfcPlugin': 'true'
    }
  },
};

export default config;
