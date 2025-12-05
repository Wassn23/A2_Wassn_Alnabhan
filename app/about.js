import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About This App</Text>

      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>Wassn Al Nabhan</Text>

      <Text style={styles.label}>Student ID:</Text>
      <Text style={styles.value}>101468092</Text>

      <Text style={[styles.label, { marginTop: 20 }]}>Description:</Text>
      <Text style={styles.value}>
        This app converts an amount from one currency to another using live
        exchange rates from FreeCurrencyAPI.
      </Text>

      <View style={{ marginTop: 24 }}>
        <Link href="/">
          <Text style={styles.link}>← Back to Main Screen</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
    backgroundColor: "#fff",
  },
title: {
  fontSize: 28,
  fontWeight: "bold",
  marginBottom: 24,
  textAlign: "center",
  color: "#1976d2",
},
 label: {
   fontSize: 16,
   fontWeight: "600",
   marginTop: 16,
   color: "#424242",
 },
value: {
  fontSize: 16,
  marginBottom: 8,
  color: "#616161",
  lineHeight: 24,
},
  link: {
    color: "blue",
    fontSize: 16,
    marginTop: 12,
  },
});
