import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Colors from '@/constants/Colors';
import CategoryButtons from '@/components/CategoryButtons';
import Listings from '@/components/Listings';
import listingData from '@/data/destination.json';
import { REQUESTS_ENDPOINT } from '@/constants/Api';

const buyersData = [
  {
    id: '1',
    name: 'John Doe',
    rating: 4.5,
    reviews: 20,
    avatar: 'https://xsgames.co/randomusers/avatar.php?g=male',
  },
  {
    id: '2',
    name: 'Jane Smith',
    rating: 4.8,
    reviews: 45,
    avatar: 'https://xsgames.co/randomusers/avatar.php?g=female',
  },
  {
    id: '3',
    name: 'Alex Johnson',
    rating: 4.2,
    reviews: 15,
    avatar: 'https://xsgames.co/randomusers/avatar.php?g=male',
  },
];

const Page = () => {
  const headerHeight = useHeaderHeight();
  const [notifications, setNotifications] = useState(0);
  const [isNotificationViewed, setIsNotificationViewed] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // State to manage refresh status
  const router = useRouter();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(REQUESTS_ENDPOINT);
      if (!response.ok) {
        throw new Error('Failed to load notifications');
      }
      const requests: { status: string }[] = await response.json();
      const acceptedCount = requests.filter((req) => req.status === 'Accepted').length;
      setNotifications(acceptedCount);
    } catch (error) {
      console.error('Error fetching notifications', error);
    }
  };

  const handleNotificationPress = () => {
    setIsNotificationViewed(true);
    router.push('/notifications');
  };

  // Function to refresh data
  const onRefresh = async () => {
    setRefreshing(true); // Start refreshing
    await fetchNotifications(); // Re-fetch notifications or any data
    setRefreshing(false); // End refreshing
  };

  const renderBuyer = ({ item }: { item: typeof buyersData[0] }) => (
    <View style={styles.buyerCard}>
      <Image source={{ uri: item.avatar }} style={styles.buyerAvatar} />
      <View>
        <Text style={styles.buyerName}>{item.name}</Text>
        <Text style={styles.buyerRating}>
          Rating: {item.rating} ⭐ ({item.reviews} reviews)
        </Text>
      </View>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.push('/profile')}
              style={{ marginLeft: 20 }}
            >
              <Ionicons name="person-circle" size={40} color={Colors.black} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={handleNotificationPress}
              style={{
                marginRight: 20,
                backgroundColor: Colors.primaryColor,
                padding: 10,
                borderRadius: 10,
                shadowColor: '#171717',
                shadowOpacity: 0.2,
                shadowRadius: 3,
              }}
            >
              <Ionicons name="notifications" size={20} color={Colors.black} />
              {notifications > 0 && !isNotificationViewed && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationText}>{notifications}</Text>
                </View>
              )}
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView
        style={[styles.container, { paddingTop: headerHeight }]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        } // Add pull-to-refresh behavior
      >
        <Text style={styles.headingTxt}>Explore The World!</Text>
        <View style={styles.searchSectionWrapper}>
          <View style={styles.SearchBar}>
          <Ionicons
              name="search-outline" // Updated icon name
              size={20}
              style={{ marginRight: 5 }}
              color={Colors.primaryColor}
            />
            <TextInput
              placeholder="Search..."
              style={styles.searchInput}
            />
          </View>
        </View>
        <CategoryButtons />
        <Listings listings={listingData} />
        <Text style={styles.subHeading}>Top Buyers</Text>
        <FlatList
          data={buyersData}
          renderItem={renderBuyer}
          keyExtractor={(item) => item.id}
          style={styles.buyerList}
          scrollEnabled={false} // Prevent scrolling inside FlatList to avoid conflicts with ScrollView
        />
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.bgcolor,
  },
  headingTxt: {
    fontSize: 60,
    fontWeight: '800',
    color: Colors.black,
    marginTop: 10,
  },
  SearchBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.black,
  },
  searchSectionWrapper: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  buyerList: {
    marginTop: 10,
  },
  buyerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 10,
    marginVertical: 5,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  buyerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  buyerName: {
    fontSize: 16,
    fontWeight: '600',
  },
  buyerRating: {
    fontSize: 14,
    color: 'gray',
  },
});
