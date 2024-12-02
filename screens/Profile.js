import React, { useEffect, useState } from 'react'; // Import React and hooks for state and lifecycle management
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native'; // Import necessary React Native components
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Import Firestore functions for document retrieval
import { auth, db } from '../services/FirebaseConfig'; // Import Firebase authentication and database instances

// ProfileScreen component displays a user's favorite books and allows navigation to their details
const ProfileScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]); // State to store the user's favorite books

  // Fetch user's favorites from Firestore when the component mounts
  useEffect(() => {
    const fetchFavorites = async () => {
      const user = auth.currentUser; // Get the currently authenticated user
      if (user) {
        try {
          const docRef = doc(db, 'favorites', user.uid); // Reference to the user's favorites document in Firestore
          const docSnap = await getDoc(docRef); // Fetch the document

          if (docSnap.exists()) {
            setFavorites(Object.values(docSnap.data())); // Store the favorites in state
          } else {
            setFavorites([]); // If no document exists, clear the favorites
          }
        } catch (error) {
          console.error('Error fetching favorites:', error); // Log errors for debugging
        }
      }
    };

    fetchFavorites(); // Call the function to fetch favorites
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <View style={styles.container}>
      {/* Header for the Profile screen */}
      <Text style={styles.header}>Your Favorites</Text>

      {/* Display a message if no favorites are found */}
      {favorites.length === 0 ? (
        <Text style={styles.noFavorites}>You have no favorites yet!</Text>
      ) : (
        // Display the list of favorite books
        <FlatList
          data={favorites} // Provide the favorites as the data source
          keyExtractor={(item) => item.id} // Use the book ID as a unique key
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('DetailsScreen', { book: item })} // Navigate to DetailsScreen with the selected book
            >
              {/* Display the book thumbnail if available */}
              {item.volumeInfo.imageLinks?.thumbnail && (
                <Image
                  source={{ uri: item.volumeInfo.imageLinks.thumbnail }} // Load thumbnail image from the URL
                  style={styles.thumbnail} // Apply thumbnail styles
                />
              )}
              <View style={styles.bookInfo}>
                {/* Display the book's title */}
                <Text style={styles.title}>{item.volumeInfo.title}</Text>
                {/* Display the book's authors or a fallback text */}
                <Text style={styles.author}>
                  {item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author'}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

// Styles for the Profile screen components
const styles = StyleSheet.create({
  container: {
    flex: 1, // Occupy the full available space
    padding: 20, // Add padding around the content
    backgroundColor: '#f7f7f7', // Light gray background color
  },
  header: {
    fontSize: 24, // Large font size for the header
    fontWeight: 'bold', // Bold font weight
    marginBottom: 20, // Space below the header
  },
  noFavorites: {
    fontSize: 16, // Font size for the "no favorites" message
    color: '#666', // Gray color for subtlety
    textAlign: 'center', // Center align the text
    marginTop: 20, // Space above the message
  },
  card: {
    flexDirection: 'row', // Arrange content in a row
    alignItems: 'center', // Vertically center the content
    padding: 15, // Padding inside the card
    borderRadius: 8, // Rounded corners
    backgroundColor: '#fff', // White background color
    marginBottom: 10, // Space below each card
    shadowColor: '#000', // Shadow color for depth
    shadowOffset: { width: 0, height: 1 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow transparency
    shadowRadius: 2, // Shadow blur radius
  },
  thumbnail: {
    width: 50, // Thumbnail width
    height: 75, // Thumbnail height
    marginRight: 10, // Space to the right of the thumbnail
  },
  bookInfo: {
    flex: 1, // Allow the book info to take up remaining space
  },
  title: {
    fontSize: 16, // Font size for the book title
    fontWeight: 'bold', // Bold font for emphasis
  },
  author: {
    fontSize: 14, // Font size for the author text
    color: '#666', // Gray color for subtlety
  },
});

export default ProfileScreen; // Export the component for use in navigation