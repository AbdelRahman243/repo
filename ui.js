document.addEventListener("DOMContentLoaded", () => {
    const fetchDataBtn = document.getElementById("fetchData");
    const totalCountElem = document.getElementById("totalCount");
    const avgDiameterElem = document.getElementById("avgDiameter");
    const hazardousCountElem = document.getElementById("hazardousCount");
    const asteroidListElem = document.getElementById("asteroidList");

    fetchDataBtn.addEventListener("click", async () => {
        try {
            const response = await fetch("https://api.nasa.gov/neo/rest/v1/feed?start_date=2025-02-07&end_date=2025-02-14&api_key=DEMO_KEY");
            if (!response.ok) throw new Error("Failed to fetch data");
            
            const data = await response.json();
            const asteroids = [];
            
            for (const date in data.near_earth_objects) {
                data.near_earth_objects[date].forEach(asteroid => {
                    asteroids.push({
                        name: asteroid.name,
                        diameter: asteroid.estimated_diameter.kilometers.estimated_diameter_max,
                        velocity: asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour,
                        distance: asteroid.close_approach_data[0].miss_distance.kilometers,
                        hazardous: asteroid.is_potentially_hazardous_asteroid
                    });
                });
            }
            
            updateUI(asteroids);
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Failed to fetch asteroid data.");
        }
    });

    function updateUI(data) {
        const totalAsteroids = data.length;
        const totalDiameter = data.reduce((sum, asteroid) => sum + asteroid.diameter, 0);
        const hazardousCount = data.filter(asteroid => asteroid.hazardous).length;
        
        totalCountElem.textContent = totalAsteroids;
        avgDiameterElem.textContent = (totalDiameter / totalAsteroids).toFixed(2) + " km";
        hazardousCountElem.textContent = hazardousCount;
        
        asteroidListElem.innerHTML = "";
        data.forEach(asteroid => {
            const asteroidCard = document.createElement("div");
            asteroidCard.className = "bg-gray-800 p-4 rounded-xl shadow-lg text-white";
            asteroidCard.innerHTML = `
                <h3 class="text-lg font-bold">${asteroid.name}</h3>
                <p><strong>Diameter:</strong> ${asteroid.diameter.toFixed(2)} km</p>
                <p><strong>Velocity:</strong> ${parseFloat(asteroid.velocity).toFixed(2)} km/h</p>
                <p><strong>Distance:</strong> ${parseFloat(asteroid.distance).toFixed(2)} km</p>
                <p><strong>Hazardous:</strong> ${asteroid.hazardous ? "Yes" : "No"}</p>
            `;
            asteroidListElem.appendChild(asteroidCard);
        });
    }
});
