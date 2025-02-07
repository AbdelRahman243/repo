export default function analyzeAsteroidData(data) {
    if (!data || data.length === 0) {
        console.log("No asteroid data available.");
        return;
    }

    const totalAsteroids = data.length;
    const totalDiameter = data.reduce((sum, asteroid) => sum + asteroid.diameter, 0);
    const totalVelocity = data.reduce((sum, asteroid) => sum + parseFloat(asteroid.velocity), 0);
    const totalDistance = data.reduce((sum, asteroid) => sum + parseFloat(asteroid.distance), 0);
    const hazardousCount = data.filter(asteroid => asteroid.hazardous).length;

    console.log(`Total Asteroids: ${totalAsteroids}`);
    console.log(`Average Diameter: ${(totalDiameter / totalAsteroids).toFixed(2)} km`);
    console.log(`Average Velocity: ${(totalVelocity / totalAsteroids).toFixed(2)} km/h`);
    console.log(`Average Distance: ${(totalDistance / totalAsteroids).toFixed(2)} km`);
    console.log(`Potentially Hazardous Asteroids: ${hazardousCount}`);
}
