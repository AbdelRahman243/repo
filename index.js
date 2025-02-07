import fetchAsteroidData from './asteroidFetcher.js';
import analyzeAsteroidData from './asteroidAnalyzer.js';

const API_KEY = "3dxfgJ93mrzwhqzjDD7kvpalnQ0n5cuiMeSvO4Dj";

(async () => {
    const asteroidDiameters = await fetchAsteroidData(API_KEY);
    analyzeAsteroidData(asteroidDiameters);
})();