import { AsyncTrunk } from 'mobx-sync';
import app from './app';
import { observable } from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';

export class RootStore {
  @observable
  app = app;
}

export const store = new RootStore();

const trunk = new AsyncTrunk(store, {
  storage: AsyncStorage,
  storageKey: 'Store',
  delay: 1e3,
});

trunk.init().then(() => {
  store.storeLoaded = true;
});
