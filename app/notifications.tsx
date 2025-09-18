import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { REQUESTS_ENDPOINT } from '@/constants/Api';

interface Request {
  itemName: string;
  country: string;
  status: string;
}

const Notifications: React.FC = () => {
  const [acceptedRequests, setAcceptedRequests] = useState<Request[]>([]);

  useEffect(() => {
    const fetchAcceptedRequests = async () => {
      try {
        const response = await fetch(REQUESTS_ENDPOINT);
        if (!response.ok) {
          throw new Error('Failed to load notifications');
        }
        const requests: Request[] = await response.json();
        const accepted = requests.filter((req) => req.status === 'Accepted');
        setAcceptedRequests(accepted);
      } catch (error) {
        console.error('Error fetching notifications', error);
      }
    };

    fetchAcceptedRequests();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Notifications</Text>
      {acceptedRequests.length === 0 ? (
        <Text style={styles.noNotificationText}>No new notifications</Text>
      ) : (
        acceptedRequests.map((request, index) => (
          <View key={index} style={styles.notificationItem}>
            <Text style={styles.text}>
              <Text style={styles.label}>Item:</Text> {request.itemName}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.label}>Country:</Text> {request.country}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.label}>Status:</Text> {request.status}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.bgcolor,
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.black,
  },
  notificationItem: {
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    shadowColor: '#171717',
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  text: {
    fontSize: 16,
    marginVertical: 2,
  },
  label: {
    fontWeight: 'bold',
    color: Colors.primaryColor,
  },
  noNotificationText: {
    fontSize: 18,
    color: Colors.black,
    textAlign: 'center',
    marginTop: 20,
  },
});
