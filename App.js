import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, FlatList } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Video from 'react-native-video';

const PostFeed = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [posts, setPosts] = useState([]);

  const handleTextChange = (text) => {
    setText(text);
  };

  const handleImageSelect = () => {
    ImagePicker.showImagePicker({}, (response) => {
      if (response.uri) {
        setImage(response.uri);
      }
    });
  };

  const handleVideoSelect = () => {
    ImagePicker.showImagePicker({ mediaType: 'video' }, (response) => {
      if (response.uri) {
        setVideo(response.uri);
      }
    });
  };
  




const handlePostSubmit = () => {
    const newPost = { text, image, video };
    setPosts([...posts, newPost]);
    setText('');
    setImage(null);
    setVideo(null);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.postContainer}>
        {item.text !== '' && (
          <Text style={styles.postText}>{item.text}</Text>
        )}
        {item.image !== null && (
          <Image style={styles.postImage} source={{ uri: item.image }} />
        )}
        {item.video !== null && (
          <Video style={styles.postVideo} source={{ uri: item.video }} />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write your post here"
          value={text}
          onChangeText={handleTextChange}
        />
        <View style={styles.buttonContainer}>
          <Button title="Select Image" onPress={handleImageSelect} />
          <Button title="Select Video" onPress={handleVideoSelect} />
          <Button title="Post" onPress={handlePostSubmit} />
        </View>
        {image !== null && (
          <Image style={styles.previewImage} source={{ uri: image }} />
        )}
        {video !== null && (
          <Video
            style={styles.previewVideo}
            source={{ uri: video }}
            resizeMode="contain"
            repeat={true}
          />
        )}
      </View>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  previewImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  previewVideo: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  postContainer: {
    marginBottom: 20,
},
});
export default PostFeed;