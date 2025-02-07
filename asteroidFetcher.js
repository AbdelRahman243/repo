import fetch from 'node-fetch';
import fs from 'fs/promises';

const API_KEY = '3dxfgJ93mrzwhqzjDD7kvpalnQ0n5cuiMeSvO4Dj';
const BASE_URL = 'https://api.nasa.gov/neo/rest/v1/feed';

export default async function fetchAsteroidData() {
    try {
        console.time('Fetching Time');

        const today = new Date();
        const sevenDaysLater = new Date();
        sevenDaysLater.setDate(today.getDate() + 7);

        const startDate = today.toISOString().split('T')[0];
        const endDate = sevenDaysLater.toISOString().split('T')[0];
        
        const url = `${BASE_URL}?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        let asteroidData = [];

        for (const date in data.near_earth_objects) {
            const asteroids = data.near_earth_objects[date];
            asteroids.forEach(asteroid => {
                asteroidData.push({
                    name: asteroid.name,
                    diameter: asteroid.estimated_diameter.kilometers.estimated_diameter_max,
                    velocity: parseFloat(asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour),
                    distance: parseFloat(asteroid.close_approach_data[0].miss_distance.kilometers),
                    hazardous: asteroid.is_potentially_hazardous_asteroid
                });
            });
        }

        asteroidData.sort((a, b) => b.diameter - a.diameter);

        await fs.writeFile('asteroidData.json', JSON.stringify(asteroidData, null, 2));

        console.log('Fetched Asteroid Data:', asteroidData);
        console.timeEnd('Fetching Time');
        return asteroidData;
    } catch (error) {
        console.error('Error fetching asteroid data:', error);
    }
}
