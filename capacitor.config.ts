import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gradys.tracking',
  appName: 'grady-tracking',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: "http://100.112.186.249:5173",
    cleartext: true
  },
  cordova: {
    preferences: {
      'NfcPlugin': 'true'
    }
  },
};

export default config;
