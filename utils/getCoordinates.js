async function getCoordinates(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(address)}`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "LetsTravel/1.0 (suraj@example.com)",
      "Accept": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`Nomination error: ${response.status}`);
  }

  const data = await response.json();

  if (!data || data.length === 0) return null;

  return {
    lat: Number(data[0].lat),
    lng: Number(data[0].lon)
  };
}

module.exports = getCoordinates;
