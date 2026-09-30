export const lightColors = {
  background: '#F7F8FC',
  surface: '#FFFFFF',
  surfaceMuted: '#EEF0F7',
  text: '#1C2335',
  textMuted: '#687187',
  primary: '#5557D9',
  primarySoft: '#EEEEFF',
  border: '#E3E6EF',
  onPrimary: '#FFFFFF',
};

export type Colors = Record<keyof typeof lightColors, string>;

export const darkColors: Colors = {
  background: '#121520',
  surface: '#1D2231',
  surfaceMuted: '#282E40',
  text: '#F1F3FA',
  textMuted: '#A5AEC3',
  primary: '#A4A5FF',
  primarySoft: '#2A2B4A',
  border: '#343B50',
  onPrimary: '#171831',
};
