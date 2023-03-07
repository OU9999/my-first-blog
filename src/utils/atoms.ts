import { atom } from "recoil";

export const startAnimationAtom = atom<boolean>({
  key: "modaledit",
  default: false,
});

export const writeAtom = atom<boolean>({
  key: "write",
  default: false,
});
