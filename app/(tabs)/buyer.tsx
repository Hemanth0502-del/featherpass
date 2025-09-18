import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import { REQUESTS_ENDPOINT } from '@/constants/Api';

interface Request {
  id: string;
  itemName: string;
  country: string;
  websiteOrStore: string;
  moreInfo: string;
  status: string;
}

const Buyer: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(REQUESTS_ENDPOINT);
        if (!response.ok) {
          throw new Error('Failed to load requests');
        }
        const data: Request[] = await response.json();
        setRequests(data);
      } catch (error) {
        console.error('Error fetching requests', error);
        Alert.alert('Unable to load requests. Please try again later.');
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (index: number) => {
    try {
      const request = requests[index];
      const response = await fetch(`${REQUESTS_ENDPOINT}/${request.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Accepted' }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorBody.error || 'Failed to update request.');
      }

      const updatedRequest: Request = await response.json();
      const updatedRequests = [...requests];
      updatedRequests[index] = updatedRequest;
      setRequests(updatedRequests);

      Alert.alert('Request accepted!');
    } catch (error) {
      console.error('Error updating request', error);
      Alert.alert('Unable to accept the request. Please try again later.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Buyer Request List</Text>
      {requests.length === 0 ? (
        <Text>No requests available.</Text>
      ) : (
        requests.map((request, index) => (
          <View key={index} style={styles.requestContainer}>
            <Text>
              <Text style={styles.label}>Item:</Text> {request.itemName}
            </Text>
            <Text>
              <Text style={styles.label}>Country:</Text> {request.country}
            </Text>
            <Text>
              <Text style={styles.label}>Website/Store:</Text> {request.websiteOrStore}
            </Text>
            <Text>
              <Text style={styles.label}>More Info:</Text> {request.moreInfo}
            </Text>
            <Text>
              <Text style={styles.label}>Status:</Text> {request.status}
            </Text>
            {/* Custom Button */}
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={() => handleAccept(index)}
            >
              <Text style={styles.acceptButtonText}>Accept Request</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  requestContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderColor:Colors.primaryColor,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  label: {
    fontWeight: 'bold',
  },
  acceptButton: {
    marginTop: 10,
    backgroundColor:Colors.primaryColor, // Green color
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  acceptButtonText: {
    color:Colors.black, // White text color
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Buyer;
