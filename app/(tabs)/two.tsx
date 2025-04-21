import { StyleSheet } from 'react-native';
import EditScreenInfo from '@/app/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import DreamList from '@/components/DreamList';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <DreamList/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
