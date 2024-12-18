import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import Colors from '@/constants/Colors';

const Profile: React.FC = () => {
  const [name, setName] = useState<string>('John Doe');
  const [phone, setPhone] = useState<string>('123-456-7890');
  const [email, setEmail] = useState<string>('johndoe@example.com');
  const [address, setAddress] = useState<string>('123 Main St, City, Country');

  const handleUpdate = () => {
    Alert.alert('Profile Updated', `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nAddress: ${address}`);
  };

  const handleEditPhoto = () => {
    Alert.alert('Edit Profile Picture', 'Feature to update profile picture coming soon!');
  };

  return (
    <View style={styles.container}>
      {/* Profile Picture Section */}
      <View style={styles.profilePictureContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }}
          style={styles.profilePicture}
        />
        <TouchableOpacity style={styles.editIcon} onPress={handleEditPhoto}>
          <Text style={styles.editIconText}>✏️</Text>
        </TouchableOpacity>
      </View>

      {/* Editable Profile Fields */}
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Phone Number:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your address"
        value={address}
        onChangeText={setAddress}
      />

      {/* Update Profile Button */}
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.updateButtonText}>Update Profile</Text>
      </TouchableOpacity>

      {/* Navigation Links */}
      <TouchableOpacity style={styles.link}>
        <Text style={styles.linkText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link}>
        <Text style={styles.linkText}>Customer Care</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link}>
        <Text style={styles.linkText}>About Us</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: '#000', // Black background for the edit icon
    padding: 5,
    borderRadius: 15,
  },
  editIconText: {
    color: '#fff', // White text for contrast
    fontSize: 12,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  updateButton: {
    backgroundColor:Colors.primaryColor, // Change this to your desired color (e.g., tomato red)
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  updateButtonText: {
    color:Colors.black, // Text color for "Update Profile" button
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingsLink: {
    color: '#1e90ff', // Change this to the color for the "Settings" button (e.g., Dodger Blue)
  },
  customerCareLink: {
    color: '#32cd32', // Change this to the color for "Customer Care" (e.g., Lime Green)
  },
  aboutUsLink: {
    color: '#ff1493', // Change this to the color for "About Us" (e.g., Deep Pink)
  },
});

export default Profile;
