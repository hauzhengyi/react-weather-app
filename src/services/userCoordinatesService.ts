export const getUserCoordinates = async (): Promise<{
  lat: number;
  lon: number;
}> => {
  // Geolocation not supported
  if (!navigator.geolocation) {
    throw new Error("Geolocation is not supported by this browser.");
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => reject(new Error(`Geolocation error: ${err.message}`))
    );
  });
};
