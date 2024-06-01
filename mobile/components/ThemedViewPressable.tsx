import { Pressable, PressableProps, View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewPropsPressable = ViewProps &
  PressableProps & {
    lightColor?: string;
    darkColor?: string;
  };

export function ThemedViewPressable({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewPropsPressable) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <Pressable style={[{ backgroundColor }, style]} {...otherProps} />;
}
