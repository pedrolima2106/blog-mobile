import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

export default function CustomButton({
  title,
  onPress,
  color = '#007bff',
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: color },
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },

  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});