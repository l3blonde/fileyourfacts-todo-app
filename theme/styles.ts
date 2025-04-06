import { TextStyle, ViewStyle } from 'react-native';

export const colors = {
  paper: "#F8F6F1",
  cream: "#F2EFE6",
  taupe: "#E6E2D6",
  gray: "#9A9689",
  darkGray: "#5D5C56",
  accent: "#B7C0C9",
  red: "#C9A9A6",
  green: "#A6C9B7",
  white: "#FFFFFF",
}

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
}

export const typography: Record<string, TextStyle> = {
  title: {
    fontSize: 22,
    fontWeight: "500" as const,
    color: colors.darkGray,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500" as const,
    color: colors.darkGray,
    letterSpacing: 0.3,
  },
  body: {
    fontSize: 16,
    fontWeight: "400" as const,
    color: colors.darkGray,
    lineHeight: 22,
  },
  caption: {
    fontSize: 14,
    fontWeight: "400" as const,
    color: colors.gray,
    letterSpacing: 0.2,
  },
  small: {
    fontSize: 12,
    fontWeight: "400" as const,
    color: colors.gray,
    letterSpacing: 0.1,
  },
}

export const borders = {
  dashed: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.taupe,
    borderRadius: 0,
  },
  solid: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.taupe,
    borderRadius: 0,
  },
  bottom: {
    borderBottomWidth: 1,
    borderBottomColor: colors.taupe,
    borderStyle: "solid",
  },
  dashedBottom: {
    borderBottomWidth: 1,
    borderBottomColor: colors.taupe,
    borderStyle: "dashed",
  },
}

export const shadows = {
  subtle: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  strong: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  }
}
