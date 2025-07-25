import React, { useRef, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import Colors from '@/constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import destinationCategories from '@/data/categories';
import { AntDesign } from '@expo/vector-icons';

const CategoryButtons = () => {
  const scrollRef = useRef<ScrollView>(null);
  const itemRef = useRef<typeof TouchableOpacity[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSelectCategory = (index: number) => {
    setActiveIndex(index);
    setSelectedCategory(destinationCategories[index]);
    setModalVisible(true); // Open modal
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <Text style={styles.title}>Categories</Text>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 20,
          paddingVertical: 10,
          marginBottom: 10,
        }}
      >
        {destinationCategories.map((item, index) => (
          <TouchableOpacity
            key={index}
            ref={(el) => (itemRef.current[index] = el)}
            onPress={() => handleSelectCategory(index)}
            style={
              activeIndex === index
                ? styles.categoryBtnActive
                : styles.categoryBtn
            }
          >
            <AntDesign
              name={item.iconName as any}
              size={20}
              color={Colors.black}
            />
            <Text key={index} style={styles.categoryBtnTxt}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal to show category details */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedCategory?.title}</Text>
            <Text style={styles.modalInfo}>{selectedCategory?.info}</Text>
            <Text style={styles.modalDetails}>
              {selectedCategory?.details}
            </Text>
            <TouchableOpacity style={styles.buyButton} onPress={() => alert('Buy option clicked')}>
              <Text style={styles.buyButtonText}>Buy Now</Text>
            </TouchableOpacity>
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CategoryButtons;

const styles = StyleSheet.create({
  title: {
    fontSize: 23,
    fontWeight: '700',
    color: Colors.black,
  },
  categoryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: '#333333',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  categoryBtnActive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: '#333333',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  categoryBtnTxt: {
    marginLeft: 5,
    color: Colors.black,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInfo: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  modalDetails: {
    fontSize: 14,
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 20,
  },
  buyButton: {
    backgroundColor: Colors.primaryColor,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buyButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
