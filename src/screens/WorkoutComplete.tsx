import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type WorkoutCompleteRouteProp = RouteProp<RootStackParamList, 'WorkoutComplete'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'WorkoutComplete'>;

const WorkoutComplete = () => {
  const route = useRoute<WorkoutCompleteRouteProp>();
  const navigation = useNavigation<NavigationProp>();

  const { distance, duration, routeCoordinates } = route.params;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🎉 Workout Complete!</Text>

      <Text style={styles.label}>Distance:</Text>
      <Text style={styles.value}>{distance} km</Text>

      <Text style={styles.label}>Time:</Text>
      <Text style={styles.value}>{formatTime(duration)}</Text>

      <Text style={styles.label}>Route Points Logged:</Text>
      <Text style={styles.value}>{routeCoordinates.length}</Text>

      <Button title="Start New Workout" onPress={() => navigation.navigate('Map')} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    marginTop: 16,
    color: '#888',
  },
  value: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
});

export default WorkoutComplete;
