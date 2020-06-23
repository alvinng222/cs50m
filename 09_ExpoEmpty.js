import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class ExpoEmpty extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>09_ExpoEmpty, for testing</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', backgroundColor: '#ecf0f1' },
  paragraph: { fontSize: 18, textAlign: 'center' },
});
