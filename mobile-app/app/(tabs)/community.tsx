import { View, Text, ScrollView, TextInput, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Plus, Heart, MessageCircle, Users, Send, X } from 'lucide-react-native';
import { useState } from 'react';
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/community";

interface Comment {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  timestamp: string;
}

interface Post {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  image: string;
  likes: number;
  comments: Comment[];
}

const initialPosts: Post[] = [
  {
    id: '1',
    user: {
      id: 'user123',
      name: 'User123',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&auto=format',
    },
    content: 'Just planted a new batch of corn! The weather has been perfect for growing.',
    image: 'https://images.unsplash.com/photo-1601472676902-3c555bff7b62?auto=format&w=800',
    likes: 26,
    comments: [
      {
        id: 'c1',
        userId: 'user456',
        username: 'FarmerJane',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&auto=format',
        content: 'Looking great! What variety of corn are you growing?',
        timestamp: '2h ago'
      }
    ],
  },
  {
    id: '2',
    user: {
      id: 'user456',
      name: 'FarmerJane',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&auto=format',
    },
    content: 'Our organic tomatoes are growing beautifully this season! Can\'t wait for harvest.',
    image: 'https://images.unsplash.com/photo-1592921870789-04563d55041c?auto=format&w=800',
    likes: 42,
    comments: [],
  },
  {
    id: '3',
    user: {
      id: 'user789',
      name: 'AgriTech',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&auto=format',
    },
    content: 'Implementing new irrigation systems has improved our crop yield significantly.',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&w=800',
    likes: 31,
    comments: [],
  },
];

export default function CommunityScreen() {
  const [posts, setPosts] = useState(initialPosts);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isCommenting, setIsCommenting] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleLike = (postId: string) => {
    setPosts(currentPosts => 
      currentPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            likes: likedPosts[postId] ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      })
    );
    
    setLikedPosts(current => ({
      ...current,
      [postId]: !current[postId],
    }));
  };

  const handleAddComment = () => {
    if (!selectedPost || !newComment.trim()) return;

    const comment: Comment = {
      id: `c${Date.now()}`,
      userId: 'currentUser',
      username: 'You',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&auto=format',
      content: newComment.trim(),
      timestamp: 'Just now'
    };

    setPosts(currentPosts =>
      currentPosts.map(post =>
        post.id === selectedPost.id
          ? { ...post, comments: [comment, ...post.comments] }
          : post
      )
    );

    setNewComment('');
    setIsCommenting(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.communityIcon}>
            <Users size={24} color="#000" />
          </View>
          <Text style={styles.headerTitle}>Community</Text>
        </View>
      </View>

      {/* Feed Content */}
      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionTitle}>My Feed</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <TextInput 
              placeholder="Search"
              style={styles.searchInput}
            />
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Posts */}
        <View style={styles.postsContainer}>
          {posts.map(post => (
            <View key={post.id} style={styles.post}>
              {/* Post Header */}
              <View style={styles.postHeader}>
                <Image 
                  source={{ uri: post.user.avatar }}
                  style={styles.avatar}
                />
                <Text style={styles.username}>{post.user.name}</Text>
              </View>

              {/* Post Content */}
              <Text style={styles.postContent}>{post.content}</Text>
              <Image 
                source={{ uri: post.image }}
                style={styles.postImage}
              />

              {/* Post Actions */}
              <View style={styles.postActions}>
                <TouchableOpacity 
                  style={[
                    styles.actionButton,
                    likedPosts[post.id] && styles.likedButton
                  ]}
                  onPress={() => handleLike(post.id)}
                >
                  <Heart 
                    size={20} 
                    color={likedPosts[post.id] ? '#ff3b30' : '#666'}
                    fill={likedPosts[post.id] ? '#ff3b30' : 'none'}
                  />
                  <Text 
                    style={[
                      styles.actionText,
                      likedPosts[post.id] && styles.likedText
                    ]}
                  >
                    {post.likes} likes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => {
                    setSelectedPost(post);
                    setIsCommenting(true);
                  }}
                >
                  <MessageCircle size={20} color="#666" />
                  <Text style={styles.actionText}>{post.comments.length} comments</Text>
                </TouchableOpacity>
              </View>

              {/* Comments Preview */}
              {post.comments.length > 0 && (
                <View style={styles.commentsPreview}>
                  {post.comments.slice(0, 2).map(comment => (
                    <View key={comment.id} style={styles.commentItem}>
                      <Image 
                        source={{ uri: comment.avatar }}
                        style={styles.commentAvatar}
                      />
                      <View style={styles.commentContent}>
                        <Text style={styles.commentUsername}>{comment.username}</Text>
                        <Text style={styles.commentText}>{comment.content}</Text>
                        <Text style={styles.commentTimestamp}>{comment.timestamp}</Text>
                      </View>
                    </View>
                  ))}
                  {post.comments.length > 2 && (
                    <TouchableOpacity 
                      onPress={() => {
                        setSelectedPost(post);
                        setIsCommenting(true);
                      }}
                    >
                      <Text style={styles.viewMoreComments}>
                        View all {post.comments.length} comments
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Comments Modal */}
      <Modal
        visible={isCommenting}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsCommenting(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Comments</Text>
              <TouchableOpacity 
                onPress={() => setIsCommenting(false)}
                style={styles.closeButton}
              >
                <X size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.commentsList}>
              {selectedPost?.comments.map(comment => (
                <View key={comment.id} style={styles.commentItem}>
                  <Image 
                    source={{ uri: comment.avatar }}
                    style={styles.commentAvatar}
                  />
                  <View style={styles.commentContent}>
                    <Text style={styles.commentUsername}>{comment.username}</Text>
                    <Text style={styles.commentText}>{comment.content}</Text>
                    <Text style={styles.commentTimestamp}>{comment.timestamp}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>

            <View style={styles.commentInput}>
              <TextInput
                style={styles.input}
                placeholder="Add a comment..."
                value={newComment}
                onChangeText={setNewComment}
                multiline
              />
              <TouchableOpacity 
                style={styles.sendButton}
                onPress={handleAddComment}
              >
                <Send size={24} color="#0B8043" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  communityIcon: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    marginRight: 12,
  },
  searchInput: {
    backgroundColor: '#fce7fe',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  addButton: {
    width: 44,
    height: 44,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postsContainer: {
    paddingHorizontal: 16,
  },
  post: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  username: {
    fontSize: 16,
    fontWeight: '500',
  },
  postContent: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    fontSize: 16,
    lineHeight: 24,
  },
  postImage: {
    width: '100%',
    height: 240,
    backgroundColor: '#f0f0f0',
  },
  postActions: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#666',
  },
  likedButton: {
    transform: [{scale: 1}],
  },
  likedText: {
    color: '#ff3b30',
  },
  commentsPreview: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  commentContent: {
    flex: 1,
  },
  commentUsername: {
    fontWeight: '600',
    marginBottom: 2,
  },
  commentText: {
    fontSize: 14,
    lineHeight: 20,
  },
  commentTimestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  viewMoreComments: {
    color: '#666',
    fontSize: 14,
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  commentsList: {
    flex: 1,
    padding: 16,
  },
  commentInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    maxHeight: 100,
  },
  sendButton: {
    padding: 8,
  },
});