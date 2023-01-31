import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gradys.tracking',
  appName: 'grady-tracking',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: "http://100.92.238.70:5173", //phone
     // url: "http://192.168.1.122:5173/", //emulator
    cleartext: true
  },
};

export default config;
