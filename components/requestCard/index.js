import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const RequestCard = ({ item, onCardPress, onExecutorPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onCardPress}
      style={styles.card}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        {item.executor?.name && (
          <Text style={styles.executorTitle}>
            Исполнитель:{" "}
            <TouchableWithoutFeedback onPress={onExecutorPress}>
              <Text style={styles.executor}>{item.executor.name}</Text>
            </TouchableWithoutFeedback>
          </Text>
        )}
        {item?.rating && (
          <View style={styles.ratingContainer}>
            {[...Array(item.rating)].map((_, index) => (
              <FontAwesome key={index} name="star" size={16} color="#FFD700" />
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default RequestCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  category: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  executorTitle: {
    fontSize: 13,
    color: "#666",
    marginTop: 6,
  },
  executor: {
    fontSize: 13,
    color: "#007AFF",
    marginTop: 6,
  },
  ratingContainer: {
    flexDirection: "row",
    marginTop: 6,
  },
});
