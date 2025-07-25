import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '@/constants/Colors';

interface Request {
  itemName: string;
  country: string;
  websiteOrStore: string;
  moreInfo: string;
  status: string;
}

const Customer: React.FC = () => {
  const [itemName, setItemName] = useState('');
  const [country, setCountry] = useState('');
 // const [costInIndia, setCostInIndia] = useState(0);
 // const [costInOtherCountry, setCostInOtherCountry] = useState(0);
  const [websiteOrStore, setWebsiteOrStore] = useState('');
  const [moreInfo, setMoreInfo] = useState('');

  useEffect(() => {
    const checkNotifications = async () => {
      const storedNotifications = await AsyncStorage.getItem('notifications');
      if (storedNotifications) {
        const notifications = JSON.parse(storedNotifications);
        notifications.forEach((notification: { message: string }) => {
          Alert.alert('Notification', notification.message);
        });

        // Clear notifications after displaying
        await AsyncStorage.removeItem('notifications');
      }
    };

    checkNotifications();
  }, []);

  const handleSubmit = async () => {
    try {
      const newRequest: Request = {
        itemName,
        country,
        websiteOrStore,
        moreInfo,
        status: 'Pending',
      };

      // Retrieve existing requests
      const storedRequests = await AsyncStorage.getItem('requests');
      const requests = storedRequests ? JSON.parse(storedRequests) : [];

      // Add new request
      requests.push(newRequest);

      // Save updated requests back to AsyncStorage
      await AsyncStorage.setItem('requests', JSON.stringify(requests));

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
      Alert.alert('An error occurred while saving your request.');
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
