import { ILocation } from "../interface/user";
import { stateCoordinates } from "../common/constants";
export const calculateDistance = (point1: ILocation, point2: ILocation): number => {
    const lat1 = point1.latitude;
    const lon1 = point1.longitude;
    const lat2 = point2.latitude;
    const lon2 = point2.longitude;

    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  };

// Function to find the nearest state
  export const findNearestState = (userLocation: ILocation): string | null => {
    let nearestState: string | null = null;
    let minDistance = Number.MAX_VALUE;

    stateCoordinates.forEach((state) => {
      const distance = calculateDistance(userLocation, state);
      if (distance < minDistance) {
        minDistance = distance;
        nearestState = state.state;
      }
    });
    return nearestState;
  };