import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, ScrollView,Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Courses data - moved inside the file since we don't have separate data file
const courses = [
  { id: '1', name: 'Starters' },
  { id: '2', name: 'Mains' },
  { id: '3', name: 'Desserts' },
  { id: '4', name: 'Drinks' },
  { id: '5', name: 'Specials' },
];

// CourseSelector component - moved inside since we don't have components folder
const CourseSelector = ({ courses, selectedCourse, onSelectCourse }) => {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', paddingVertical: 8 }}>
          {courses.map((course, idx) => (
            <Pressable
              key={course.id}
              style={[
                {
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: '#28a745',
                  backgroundColor: selectedCourse === course.name ? '#28a745' : 'transparent',
                  marginRight: idx === courses.length - 1 ? 0 : 8,
                },
              ]}
              onPress={() => onSelectCourse(course.name)}
            >
              <Text
                style={{
                  color: selectedCourse === course.name ? 'white' : '#28a745',
                  fontWeight: '600',
                  fontSize: 14,
                }}
              >
                {course.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

// MenuItem component - moved inside since we don't have components folder
const MenuItem = ({ item }) => {
  const getCourseColor = (course) => {
    switch (course.toLowerCase()) {
      case 'starters':
        return '#ff6b6b';
      case 'mains':
        return '#4ecdc4';
      case 'desserts':
        return '#ffd166';
      case 'drinks':
        return '#6a0572';
      default:
        return '#495057';
    }
  };

  return (
    <View style={styles.menuItemContainer}>
      <View style={styles.menuItemHeader}>
        <Text style={styles.menuItemName}>{item.name}</Text>
        <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <Text style={styles.menuItemDescription}>{item.description}</Text>
      <View style={[styles.courseBadge, { backgroundColor: getCourseColor(item.course) }]}>
        <Text style={styles.courseText}>{item.course}</Text>
      </View>
    </View>
  );
};

// Main App Component
export default function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [price, setPrice] = useState('');

  const handleAddMenuItem = () => {
    if (!dishName || !description || !selectedCourse || !price) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newMenuItem = {
      id: Date.now().toString(),
      name: dishName,
      description: description,
      course: selectedCourse,
      price: parseFloat(price)
    };

    setMenuItems([...menuItems, newMenuItem]);
    
    // Reset form
    setDishName('');
    setDescription('');
    setSelectedCourse('');
    setPrice('');
    
    Alert.alert('Success', 'Menu item added successfully!');
  };

  const getTotalItems = () => {
    return menuItems.length;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chef Menu App 👨‍🍳</Text>
        <Text style={styles.subtitle}>
          Create your perfect menu experience
        </Text>
      </View>

      {/* Input Form */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Dish Name:</Text>
        <TextInput
          style={styles.input}
          value={dishName}
          onChangeText={setDishName}
          placeholder="Enter dish name"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
          placeholderTextColor="#999"
          multiline
          numberOfLines={3}
        />

        <Text style={styles.label}>Select Course:</Text>
        <CourseSelector
          courses={courses}
          selectedCourse={selectedCourse}
          onSelectCourse={setSelectedCourse}
        />

        <Text style={styles.label}>Price:</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="Enter price"
          placeholderTextColor="#999"
          keyboardType="decimal-pad"
        />

        <Pressable 
          style={styles.addButton}
          onPress={handleAddMenuItem}
        >
          <Text style={styles.addButtonText}>Add Menu Item</Text>
        </Pressable>
      </View>

      {/* Menu Summary */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          Total Menu Items: {getTotalItems()}
        </Text>
      </View>

      {/* Menu Items List */}
      <View style={styles.menuListContainer}>
        <Text style={styles.menuListTitle}>Menu Items:</Text>
        <ScrollView style={styles.menuList}>
          {menuItems.length === 0 ? (
            <Text style={styles.emptyText}>
              No menu items added yet. Start by adding some delicious dishes!
            </Text>
          ) : (
            menuItems.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c5530',
    marginBottom: 5,
  },
  subtitle: {
    color: '#6c757d',
    fontSize: 14,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    color: '#2c5530',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#28a745',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  summaryContainer: {
    backgroundColor: '#e9ecef',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  summaryText: {
    color: '#495057',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  menuListContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c5530',
    marginBottom: 12,
  },
  menuList: {
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6c757d',
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 20,
  },
  // Styles for MenuItem component
  menuItemContainer: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#28a745',
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c5530',
    flex: 1,
    marginRight: 8,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 8,
    lineHeight: 20,
  },
  courseBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  courseText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});