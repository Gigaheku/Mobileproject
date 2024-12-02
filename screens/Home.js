import React, { useState } from 'react'; // Import React and useState for managing component state
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  Image,
} from 'react-native'; // Import necessary React Native components
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import { auth } from '../services/FirebaseConfig'; // Import Firebase authentication instance

// HomeScreen component displays the search functionality and results
const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState(''); // State to track the user's search query
  const [results, setResults] = useState([]); // State to store the search results
  const [loading, setLoading] = useState(false); // State to handle loading indicator during API call
  const navigation = useNavigation(); // Hook for navigating between screens

  // Function to fetch books from Google Books API
  const fetchBooks = async () => {
    if (!searchQuery.trim()) return; // Prevent making a request with an empty query

    setLoading(true); // Show loading spinner while fetching data
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}` // API endpoint with query
      );
      const data = await response.json(); // Parse the API response to JSON
      if (data.items) {
        setResults(data.items); // Update results if books are found
      } else {
        setResults([]); // Clear results if no books are found
      }
    } catch (error) {
      console.error('Error fetching books:', error); // Log any errors to the console
      setResults([]); // Clear results in case of error
    } finally {
      setLoading(false); // Hide loading spinner after completion
    }
  };

  // Function to navigate to the details screen with the selected book
  const handleBookPress = (book) => {
    navigation.navigate('DetailsScreen', { book }); // Pass the selected book as a parameter
  };

  // Logout function to sign out the user and navigate back to the Auth screen
  const handleLogout = () => {
    auth.signOut()
      .then(() => navigation.replace('Auth')) // Navigate to Auth screen on successful logout
      .catch((error) => console.error('Error logging out:', error)); // Log errors during logout
  };

  return (
    <View style={styles.container}>
      {/* Header and subheader for the search feature */}
      <Text style={styles.header}>Search for Your Favorite Books</Text>
      <Text style={styles.subHeader}>Enter a book title or author to find new favorites</Text>
      
      {/* Input field for the search query */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search for books..."
        value={searchQuery} // Bind the input value to state
        onChangeText={setSearchQuery} // Update the state on input change
      />
      
      {/* Button to initiate the search */}
      <TouchableOpacity style={styles.searchButton} onPress={fetchBooks}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      {/* Logout button */}
      <Button title="Logout" onPress={handleLogout} color="#FF5733" />

      {/* Display loading spinner or results based on the current state */}
      {loading ? (
        <ActivityIndicator size="large" color="#6200ee" style={{ marginTop: 20 }} />
      ) : results.length > 0 ? (
        <FlatList
          data={results} // List of books fetched from the API
          keyExtractor={(item) => item.id} // Unique key for each book
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleBookPress(item)}>
              <View style={styles.card}>
                {/* Display book thumbnail if available */}
                {item.volumeInfo.imageLinks?.thumbnail && (
                  <Image
                    source={{ uri: item.volumeInfo.imageLinks.thumbnail }}
                    style={styles.thumbnail}
                  />
                )}
                {/* Display book title and author */}
                <View>
                  <Text style={styles.bookTitle}>{item.volumeInfo.title}</Text>
                  <Text style={styles.bookAuthor}>
                    {item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noResults}>No results found. Try another search.</Text>
      )}
    </View>
  );
};

// Styles for the Home screen components
const styles = StyleSheet.create({
  container: {
    flex: 1, // Occupy the full available space
    padding: 20, // Add padding around the content
    backgroundColor: '#f7f7f7', // Light gray background color
  },
  header: {
    fontSize: 24, // Large font size for the header
    fontWeight: 'bold', // Bold font weight
    marginBottom: 10, // Space below the header
  },
  subHeader: {
    fontSize: 16, // Smaller font size for the subheader
    color: '#666', // Gray color for subtlety
    marginBottom: 20, // Space below the subheader
  },
  searchInput: {
    borderWidth: 1, // Border around the input field
    borderColor: '#ddd', // Light gray border color
    borderRadius: 8, // Rounded corners
    padding: 10, // Internal padding
    marginBottom: 10, // Space below the input field
    backgroundColor: '#fff', // White background
  },
  searchButton: {
    backgroundColor: '#6200ee', // Purple background color
    padding: 10, // Padding inside the button
    borderRadius: 8, // Rounded corners
    alignItems: 'center', // Center align text inside the button
    marginBottom: 20, // Space below the button
  },
  searchButtonText: {
    color: '#fff', // White text color
    fontWeight: 'bold', // Bold text
  },
  thumbnail: {
    width: 50, // Thumbnail width
    height: 75, // Thumbnail height
    marginRight: 10, // Space to the right of the thumbnail
  },
  card: {
    flexDirection: 'row', // Arrange content in a row
    padding: 15, // Padding inside the card
    borderRadius: 8, // Rounded corners
    backgroundColor: '#fff', // White background color
    marginBottom: 10, // Space below each card
    shadowColor: '#000', // Shadow color for depth
    shadowOffset: { width: 0, height: 1 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow transparency
    shadowRadius: 2, // Shadow blur radius
  },
  bookTitle: {
    fontSize: 16, // Font size for the book title
    fontWeight: 'bold', // Bold font for emphasis
  },
  bookAuthor: {
    fontSize: 14, // Font size for the author text
    color: '#666', // Gray color for subtlety
  },
  noResults: {
    fontSize: 16, // Font size for the "no results" text
    color: '#666', // Gray color for subtlety
    textAlign: 'center', // Center align the text
    marginTop: 20, // Space above the text
  },
});

export default HomeScreen; // Export the component for use in navigation