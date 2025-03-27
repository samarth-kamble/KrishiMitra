import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera } from 'lucide-react-native';

interface Product {
  id: string;
  name: string;
  location: string;
  price: string;
  image: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Nyanya chungu',
    location: 'Iringa',
    price: '25000 Tsh',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=300&auto=format'
  },
  {
    id: '2',
    name: 'Marage ya Njano',
    location: 'Iringa',
    price: '25000 Tsh',
    image: 'https://images.unsplash.com/photo-1515872474884-c6a1e5147d8e?q=80&w=300&auto=format'
  },
  {
    id: '3',
    name: 'Mchele',
    location: 'Mbeya',
    price: '25000 Tsh',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=300&auto=format'
  },
];

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* Profile Info */}
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format' }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.cameraButton}>
            <Camera size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.profileName}>Gwen Stacy</Text>
        <Text style={styles.profileLocation}>Mbozi, Iringa</Text>
      </View>

      {/* Products List */}
      <View style={styles.productsList}>
        {products.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productLocation}>{product.location}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.productPrice}>{product.price}</Text>
                <TouchableOpacity style={styles.buyButton}>
                  <Text style={styles.buyButtonText}>NUNUA</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
    backgroundColor: '#0B8043',
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0B8043',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  cameraButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#0B8043',
    padding: 8,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileLocation: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.9,
  },
  productsList: {
    padding: 16,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    padding: 12,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  productLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0B8043',
  },
  buyButton: {
    backgroundColor: '#0B8043',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});