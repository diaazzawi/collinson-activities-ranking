const weatherCodeDescriptions: Record<string, string> = {
  "0": "Clear Sky",
  "1": "Mainly Clear",
  "2": "Partly Cloudy",
  "3": "Overcast",
  "45": "Fog",
  "48": "Depositing Rime Fog",
  "51": "Light Drizzley",
  "53": "Moderate Drizzle",
  "55": "Dense Drizzle",
  "56": "Light Freezing Drizzle",
  "57": "Dense Freezing Drizzle",
  "61": "Slight Rain",
  "63": "Moderate Rain",
  "65": "Heavy Rain",
  "66": "Light Freezing Rain",
  "67": "Heavy Freezing Rain",
  "71": "Slight Snow Fall",
  "73": "Moderate Snow Fall",
  "75": "Heavy Snow Fall",
  "77": "Snow Grains",
  "80": "Slight Rain",
  "81": "Moderate Rain Showers",
  "82": "Violent Rain Showers",
  "85": "Slight Snow Showers",
  "86": "Heavy Snow Showers",
  "95": "Slight or Moderate Thunderstorm",
  "96": "Thunderstorm With Slight Hail",
  "99": "Thunderstorm With Heavy hail",
};

const activityWeatherCodes: Record<string, number[]> = {
  // For definitions of the World Meteorological Organization (WMO) Weather codes (WW),
  // please refer to https://open-meteo.com/en/docs under "Weather variable documentation".
  skiing: [0, 71, 73, 75, 85, 86],
  surfing: [0, 1, 2, 3, 80, 81, 82],
  outdoor_sightseeing: [0, 1, 2, 3],
  indoor_sightseeing: [
    45, 48, 51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 71, 73, 75, 85, 86, 95, 96,
    99,
  ],
};

export type TDailyWeatherCode = {
  time: string[];
  weathercode: number[];
};

export type TActivityRanking = {
  [key: string]: number;
};

export type TActivityRankingResponse = {
  date: string;
  condition: string;
  ranking: TActivityRanking;
};

const sortRankings = (
  ranking: TActivityRanking,
  order: "asc" | "desc" = "desc",
) => {
  const sortedRanking = Object.entries(ranking)
    .sort(([keyA, valueA], [keyB, valueB]) => {
      return order === "asc" ? valueA - valueB : valueB - valueA;
    })
    .reduce(
      (acc, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {} as Record<string, number>,
    );

  return sortedRanking;
};

export const rankActivities = (
  daily: TDailyWeatherCode,
): TActivityRankingResponse[] => {
  const rankings: TActivityRankingResponse[] = daily.weathercode.map(
    (weatherCode: number, index: number) => {
      // The weather codes are categorized into different activities based on their suitability.
      // NOTE: A better scoring system can be implemented using a more complex algorithm based on
      // a well-established user survey or machine learning model.
      // For simplicity, I'm using a basic scoring system based on the following criteria:
      const ranking: TActivityRanking = {
        // 1. Skiing:
        //    a. Most enjoyable in snowy conditions (codes 71, 73, 75 for snowfall, 85, 86 for snow showers),
        //       or on clear days (code 0). These conditions score the highest ===> 5 points.
        //    b. If there is rain, freezing rain, or moderate weather conditions (e.g., codes between 61 and 77),
        //       skiing can still be somewhat enjoyable but less ideal ===> 3 points.
        //    c. Any other weather conditions (e.g., fog, thunderstorms) are not good for skiing ===> 0 points.
        Skiing: activityWeatherCodes.skiing.includes(weatherCode)
          ? 5
          : weatherCode >= 61 && weatherCode <= 77
            ? 3
            : 0,
        // 2. Surfing:
        //    a. Thrives in clear skies and partly cloudy conditions (codes 0, 1, 2, 3).
        //       Rain showers (codes 80, 81, 82) might also add excitement and are ranked highly ===> 5 points.
        //    b. Moderate rain, drizzle, or other tolerable conditions (codes between 51 and 67) can still offer
        //       some opportunity for surfing but are less desirable ===> 3 points.
        //    c. Freezing rain, snow, or thunderstorms are not suitable for surfing ===> 0 points.
        Surfing: activityWeatherCodes.surfing.includes(weatherCode)
          ? 5
          : weatherCode >= 51 && weatherCode <= 67
            ? 3
            : 0,
        // 3. Outdoor Sightseeing:
        //    a. Outdoor sightseeing benefits from sunny or calm weather (codes 0, 1, 2, 3).
        //       These conditions receive the highest score ===> 5 points.
        //    b. Fog or mild rain (codes 45-67) can make outdoor sightseeing tolerable but less enjoyable ===> 2 points.
        //    c. Severe weather conditions like thunderstorms or heavy snow make outdoor sightseeing unpleasant ===> 0 points.
        "Outdoor Sightseeing":
          activityWeatherCodes.outdoor_sightseeing.includes(weatherCode)
            ? 5
            : weatherCode >= 45 && weatherCode <= 67
              ? 2
              : 0,
        // 4. Indoor Sightseeing:
        //    a. Indoor activities are preferred during undesirable outdoor weather, such as rain (codes 51-67), snow (codes 71-86),
        //       fog (codes 45, 48), or thunderstorms (codes 95, 96, 99). These weather conditions are given the highest score ===> 5 points.
        //    b. Clear or calm weather (codes 0-3) might not favor indoor sightseeing as much but still score moderately ===> 2 points.
        //    c. Weather conditions that don't drive people indoors, like mild outdoor conditions, score the lowest ===> 0 points.
        "Indoor Sightseeing": activityWeatherCodes.indoor_sightseeing.includes(
          weatherCode,
        )
          ? 5
          : weatherCode >= 0 && weatherCode <= 3
            ? 2
            : 0,
      };

      const date = daily.time[index];

      const result: TActivityRankingResponse = {
        date,
        ranking: sortRankings(ranking),
        condition: weatherCodeDescriptions[weatherCode],
      };
      return result;
    },
  );

  return rankings;
};
