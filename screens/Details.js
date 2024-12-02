import React, { useState } from 'react'; // Import React and useState for state management
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native'; // Import React Native components
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore functions for document creation/updating
import { auth, db } from '../services/FirebaseConfig'; // Import Firebase authentication and database instances

// DetailsScreen component displays details of a selected book and allows adding it to favorites
const DetailsScreen = ({ route }) => {
  const { book } = route.params; // Extract the 'book' object passed via navigation route
  const [loading, setLoading] = useState(false); // State to handle loading indicator during operations

  // Function to add the selected book to the user's favorites in Firestore
  const addToFavorites = async () => {
    const user = auth.currentUser; // Get the currently authenticated user
    if (user) {
      setLoading(true); // Show loading spinner while processing
      try {
        const userFavoritesRef = doc(db, 'favorites', user.uid); // Reference to the user's favorites document
        await setDoc(userFavoritesRef, { [book.id]: book }, { merge: true }); // Add/merge the book into the favorites document
        setLoading(false); // Hide loading spinner after successful operation
        alert('Book added to favorites!'); // Notify the user
      } catch (error) {
        setLoading(false); // Hide loading spinner on error
        console.error('Error adding to favorites:', error); // Log error for debugging
        alert('Failed to add to favorites.'); // Notify the user of failure
      }
    } else {
      alert('You need to be logged in to add favorites.'); // Notify the user if they're not logged in
    }
  };

  return (
    <View style={styles.container}>
      {/* Display the book's title */}
      <Text style={styles.title}>{book.volumeInfo.title}</Text>
      
      {/* Display the book's authors or a fallback text */}
      <Text style={styles.author}>
        {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}
      </Text>
      
      {/* Display the book's description or a fallback text */}
      <Text style={styles.description}>
        {book.volumeInfo.description || 'No description available.'}
      </Text>
      
      {/* Show loading spinner or 'Add to Favorites' button based on the loading state */}
      {loading ? (
        <ActivityIndicator size="large" color="#6200ee" style={{ marginTop: 20 }} />
      ) : (
        <Button title="Add to Favorites" onPress={addToFavorites} color="#6200ee" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Occupy the full available space
    padding: 20, // Add padding around the content
    backgroundColor: '#f7f7f7', // Light gray background color
  },
  title: {
    fontSize: 24, // Large font size for the book title
    fontWeight: 'bold', // Bold font weight for emphasis
    marginBottom: 10, // Space below the title
  },
  author: {
    fontSize: 16, // Medium font size for the author text
    color: '#666', // Gray color for less emphasis
    marginBottom: 10, // Space below the author
  },
  description: {
    fontSize: 14, // Smaller font size for the description
    color: '#333', // Darker text color for readability
    marginBottom: 20, // Space below the description
  },
});

export default DetailsScreen; // Export the component for use in navigation