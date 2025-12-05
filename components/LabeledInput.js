import { View, Text, TextInput, StyleSheet } from "react-native";

export default function LabeledInput({
  label,
  value,
  onChangeText,
  keyboardType = "default",
  autoCapitalize = "none",
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  label: { fontSize: 14, marginBottom: 4 },
 input: {
   borderWidth: 1,
   borderColor: "#ccc",
   borderRadius: 8,
   padding: 12,
   fontSize: 16,
   backgroundColor: "#fafafa",
 },
});
