import { Pressable, PressableProps, View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewPropsPressable = ViewProps &
  PressableProps & {
    lightColor?: string;
    darkColor?: string;
  };

export function ThemedCard({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewPropsPressable) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "shadowBackground");

  return (
    <View
      style={[
        style,
        {backgroundColor: color,borderRadius:7,}
      ]}
      {...otherProps}
    />
  );
}
