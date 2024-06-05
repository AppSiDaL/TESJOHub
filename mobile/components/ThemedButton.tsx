import {
  Text,
  StyleSheet,
  ButtonProps,
  Pressable,
  PressableProps,
  TextProps,
} from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedButtonProps = PressableProps &
  TextProps & {
    lightColor?: string;
    darkColor?: string;
    lightBorderColor?: string;
    darkBorderColor?: string;
    type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
    placeholder?: string;
  };

export function ThemedButton({
  style,
  lightColor,
  darkColor,
  lightBorderColor,
  darkBorderColor,
  type = "default",
  ...rest
}: ThemedButtonProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const borderColor = useThemeColor(
    { light: lightBorderColor, dark: darkBorderColor },
    "borderColor"
  );
  return (
    <Pressable
      style={[
        { borderWidth: 1, borderRadius: 5, padding: 10, marginBottom: 10 },
        { borderColor },
        style,
      ]}
      {...rest}
    >
      <Text
        style={[
          { color },
          type === "default" ? styles.default : undefined,
          type === "title" ? styles.title : undefined,
          type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
          type === "subtitle" ? styles.subtitle : undefined,
          type === "link" ? styles.link : undefined,
          style,
        ]}
        {...rest}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
