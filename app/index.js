import React, { useState } from "react";
import { View, Text, Button, ActivityIndicator, StyleSheet } from "react-native";
import { Link } from "expo-router";
import LabeledInput from "../components/LabeledInput";

const API_URL = "https://api.freecurrencyapi.com/v1/latest";
const API_KEY = "fca_live_C8EZ1KLNNCf1LQTu6eGDkkieF83jbdtnCwOrRfEV";

export default function MainScreen() {
  const [baseCurrency, setBaseCurrency] = useState("CAD");
  const [destCurrency, setDestCurrency] = useState("USD");
  const [amount, setAmount] = useState("1");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [result, setResult] = useState(null);

  const validateInputs = () => {
    setErrorMsg("");

    const currencyRegex = /^[A-Z]{3}$/;

    if (!currencyRegex.test(baseCurrency)) {
      setErrorMsg("Base currency must be a 3-letter uppercase code (e.g., CAD).");
      return false;
    }

    if (!currencyRegex.test(destCurrency)) {
      setErrorMsg("Destination currency must be a 3-letter uppercase code (e.g., USD).");
      return false;
    }

    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setErrorMsg("Amount must be a positive number.");
      return false;
    }

    return true;
  };

  const handleConvert = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    setErrorMsg("");
    setResult(null);

    try {
      const base = baseCurrency.toUpperCase();
      const dest = destCurrency.toUpperCase();

      const url = `${API_URL}?apikey=${API_KEY}&base_currency=${base}&currencies=${dest}`;
      const response = await fetch(url);

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data = await response.json();

      if (!data.data || typeof data.data[dest] !== "number") {
        throw new Error("Currency not found in API response.");
      }

      const rate = data.data[dest];
      const converted = Number(amount) * rate;

      setResult({
        rate,
        converted,
        base,
        dest,
      });
    } catch (err) {
      setErrorMsg(err.message || "Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Currency Converter</Text>
        <LabeledInput
        label="Base Currency"
        value={baseCurrency}
        onChangeText={setBaseCurrency}
        autoCapitalize="characters"
      />

      <LabeledInput
        label="Destination Currency"
        value={destCurrency}
        onChangeText={setDestCurrency}
        autoCapitalize="characters"
      />

      <LabeledInput
        label="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

      {loading ? (
        <ActivityIndicator size="large" style={{ marginVertical: 10 }} />
      ) : (
        <Button title="Convert" onPress={handleConvert} disabled={loading} />
      )}

     {result && (
       <View style={styles.resultContainer}>
         <Text style={styles.resultText}>
           Rate ({result.base} → {result.dest}): {result.rate.toFixed(4)}
         </Text>
         <Text style={styles.resultText}>
           Converted: {result.converted.toFixed(2)} {result.dest}
         </Text>
       </View>
     )}

      <View style={{ marginTop: 30 }}>
        <Link href="/about">
          <Text style={styles.link}>Go to About Screen →</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  error: {
    color: "red",
    marginVertical: 12,
    fontSize: 14,
    fontWeight: "500",
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#e8f5e9",
    borderRadius: 8,
  },
  resultText: {
    fontSize: 16,
    marginVertical: 4,
  },
  link: { color: "blue", fontSize: 16 },
});
