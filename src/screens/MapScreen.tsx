import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Map'>;

interface Coordinate {
  latitude: number;
  longitude: number;
  timestamp?: number;
}

const MapScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const mapRef = useRef<MapView | null>(null);
  const [location, setLocation] = useState<Coordinate | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<Coordinate[]>([]);
  const [distance, setDistance] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const locationSubscription = useRef<Location.LocationSubscription | null>(null);

  useEffect(() => {
    requestPermission();
    return stopTracking;
  }, []);

  const requestPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Location access is required to use this feature.');
    }
  };

  const startTracking = async () => {
    setIsTracking(true);
    setElapsedTime(0);
    setRouteCoordinates([]);
    setDistance(0);

    const startTime = Date.now();
    timerRef.current = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    locationSubscription.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 1,
        timeInterval: 1000,
      },
      (loc) => {
        const coord = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          timestamp: loc.timestamp,
        };

        setLocation(coord);
        setRouteCoordinates((prev) => {
          const updated = [...prev, coord];
          if (updated.length >= 2) {
            const last = updated[updated.length - 2];
            const dist = calculateDistance(last, coord);
            setDistance((prevDist) => prevDist + dist);
          }
          return updated;
        });

        mapRef.current?.animateToRegion({
          latitude: coord.latitude,
          longitude: coord.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      }
    );
  };

  const stopTracking = () => {
    if (locationSubscription.current) {
      locationSubscription.current.remove();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsTracking(false);

    navigation.navigate('WorkoutComplete', {
      distance: distance.toFixed(2),
      duration: elapsedTime,
      routeCoordinates,
    });
  };

  const calculateDistance = (start: Coordinate, end: Coordinate): number => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; // Earth radius in km
    const dLat = toRad(end.latitude - start.latitude);
    const dLon = toRad(end.longitude - start.longitude);
    const lat1 = toRad(start.latitude);
    const lat2 = toRad(end.latitude);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation
        initialRegion={{
          latitude: location?.latitude || 37.78825,
          longitude: location?.longitude || -122.4324,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <Polyline coordinates={routeCoordinates} strokeWidth={4} strokeColor="#3b82f6" />
        {routeCoordinates.length > 0 && (
          <Marker coordinate={routeCoordinates[0]} title="Start" />
        )}
      </MapView>

      <View style={styles.stats}>
        <Text>Time: {formatTime(elapsedTime)}</Text>
        <Text>Distance: {distance.toFixed(2)} km</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: isTracking ? '#ef4444' : '#10b981' }]}
        onPress={isTracking ? stopTracking : startTracking}
      >
        <Text style={styles.buttonText}>{isTracking ? 'Stop' : 'Start'} Workout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  stats: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 8,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  button: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    padding: 16,
    borderRadius: 50,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MapScreen;
