import { atom } from "recoil";

export const startAnimationAtom = atom<boolean>({
  key: "modaledit",
  default: false,
});

export const writeAtom = atom<boolean>({
  key: "write",
  default: false,
});

export const isLoginAtom = atom<boolean>({
  key: "isLogin",
  default: false,
});

export const isNotesAtom = atom<boolean>({
  key: "isNotes",
  default: false,
});

export const selectedCategoryAtom = atom<string>({
  key: "selectedCategory",
  default: "ALL",
});
