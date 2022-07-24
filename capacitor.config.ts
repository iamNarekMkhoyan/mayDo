import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.testing.myApp',
  appName: 'mayDo',
  webDir: 'dist/may-do',
  bundledWebRuntime: false,
  // server: {
  //   url: 'http://192.168.1.3:4200',
  //   cleartext: true,
  // },
};

export default config;
