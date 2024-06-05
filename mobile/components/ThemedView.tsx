import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ScrollView } from "react-native-gesture-handler";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  isBordered?: boolean;
};

export function ThemedView({
  style,
  lightColor,
  isBordered,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  const borderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "borderColor"
  );
  return (
    <View
      style={[
        { backgroundColor },
        isBordered ? { borderColor, borderWidth: 1 } : {},
        style,
      ]}
      {...otherProps}
    />
  );
}
