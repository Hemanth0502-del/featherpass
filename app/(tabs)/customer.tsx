import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import { REQUESTS_ENDPOINT } from '@/constants/Api';

const Customer: React.FC = () => {
  const [itemName, setItemName] = useState('');
  const [country, setCountry] = useState('');
 // const [costInIndia, setCostInIndia] = useState(0);
 // const [costInOtherCountry, setCostInOtherCountry] = useState(0);
  const [websiteOrStore, setWebsiteOrStore] = useState('');
  const [moreInfo, setMoreInfo] = useState('');

  const handleSubmit = async () => {
    try {
      if (!itemName.trim() || !country.trim()) {
        Alert.alert('Please enter both the item name and country.');
        return;
      }

      const response = await fetch(REQUESTS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemName: itemName.trim(),
          country: country.trim(),
          websiteOrStore: websiteOrStore.trim(),
          moreInfo: moreInfo.trim(),
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorBody.error || 'Failed to submit request.');
      }

      // Clear form
      setItemName('');
      setCountry('');
      //setCostInIndia(0);
     // setCostInOtherCountry(0);
      setWebsiteOrStore('');
      setMoreInfo('');

      Alert.alert('Request submitted successfully!');
    } catch (error) {
      console.error('Error saving request:', error);
      const message =
        error instanceof Error ? error.message : 'Please try again later.';
      Alert.alert('Unable to submit request', message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Submit a Request</Text>

      <Text>Item Name:</Text>
      <TextInput
        style={styles.input}
        value={itemName}
        onChangeText={setItemName}
        placeholder="Enter item name"
      />

      <Text>Country:</Text>
      <TextInput
        style={styles.input}
        value={country}
        onChangeText={setCountry}
        placeholder="Enter country"
      />

      <Text>Website Link / Store Name:</Text>
      <TextInput
        style={styles.input}
        value={websiteOrStore}
        onChangeText={setWebsiteOrStore}
        placeholder="Enter website link or store name"
      />

      <Text>More Info:</Text>
      <TextInput
        style={styles.textArea}
        value={moreInfo}
        onChangeText={setMoreInfo}
        placeholder="Enter additional details (optional)"
        multiline
      />

      {/* Custom Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Request</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 4,
  },
  textArea: {
    height: 80,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 4,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor:Colors.primaryColor,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color:Colors.black,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Customer;
