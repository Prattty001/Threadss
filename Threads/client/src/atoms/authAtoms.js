import { atom } from 'recoil';

const authScreenAtom = atom({
  key: 'authScreenState',
  default: 'login',
});

export default authScreenAtom;
