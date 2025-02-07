import fs from 'fs/promises';

export default async function analyzeAsteroidData(data) {
    if (!data || data.length === 0) {
        console.log("No asteroid data available.");
        return;
    }

    const totalAsteroids = data.length;
    const totalDiameter = data.reduce((sum, asteroid) => sum + asteroid.diameter, 0);
    const totalVelocity = data.reduce((sum, asteroid) => sum + parseFloat(asteroid.velocity), 0);
    const totalDistance = data.reduce((sum, asteroid) => sum + parseFloat(asteroid.distance), 0);
    const hazardousCount = data.filter(asteroid => asteroid.hazardous).length;

    const avgDiameter = (totalDiameter / totalAsteroids).toFixed(2);
    const avgVelocity = (totalVelocity / totalAsteroids).toFixed(2);
    const avgDistance = (totalDistance / totalAsteroids).toFixed(2);
    const hazardousPercentage = ((hazardousCount / totalAsteroids) * 100).toFixed(2);

    const maxDiameter = Math.max(...data.map(a => a.diameter)).toFixed(2);
    const minDiameter = Math.min(...data.map(a => a.diameter)).toFixed(2);
    const maxVelocity = Math.max(...data.map(a => parseFloat(a.velocity))).toFixed(2);
    const minVelocity = Math.min(...data.map(a => parseFloat(a.velocity))).toFixed(2);
    const maxDistance = Math.max(...data.map(a => parseFloat(a.distance))).toFixed(2);
    const minDistance = Math.min(...data.map(a => parseFloat(a.distance))).toFixed(2);

    console.table([
        { Metric: "Total Asteroids", Value: totalAsteroids },
        { Metric: "Average Diameter (km)", Value: avgDiameter },
        { Metric: "Min Diameter (km)", Value: minDiameter },
        { Metric: "Max Diameter (km)", Value: maxDiameter },
        { Metric: "Average Velocity (km/h)", Value: avgVelocity },
        { Metric: "Min Velocity (km/h)", Value: minVelocity },
        { Metric: "Max Velocity (km/h)", Value: maxVelocity },
        { Metric: "Average Distance (km)", Value: avgDistance },
        { Metric: "Min Distance (km)", Value: minDistance },
        { Metric: "Max Distance (km)", Value: maxDistance },
        { Metric: "Hazardous Asteroids", Value: hazardousCount },
        { Metric: "Hazardous Percentage (%)", Value: hazardousPercentage }
    ]);

    const report = {
        totalAsteroids,
        avgDiameter,
        minDiameter,
        maxDiameter,
        avgVelocity,
        minVelocity,
        maxVelocity,
        avgDistance,
        minDistance,
        maxDistance,
        hazardousCount,
        hazardousPercentage
    };

    try {
        await fs.writeFile('analysisReport.json', JSON.stringify(report, null, 2));
        console.log("Analysis report saved as 'analysisReport.json'");
    } catch (error) {
        console.error("Error saving analysis report:", error);
    }
}
