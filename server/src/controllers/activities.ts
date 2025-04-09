import Elysia, {t} from "elysia";
import {elysiaLogger} from "../internal-exports";
import {type TDailyWeatherCode, rankActivities} from "../utils/funcs";

export const activitiesController = new Elysia({prefix: "/activities"}).get(
  "/:lat/:lng",
  async (ctx) => {
    const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${ctx.params.lat}&longitude=${ctx.params.lng}&daily=weathercode&timezone=auto`;
    try {
      const response = await fetch(weatherApiUrl);
      const data = await response.json();
      return rankActivities(data.daily as TDailyWeatherCode);
    } catch (error) {
      elysiaLogger.error(error);
      return {
        error: (error as Error).message,
      };
    }
  },
  {
    params: t.Object({
      lat: t.Number(),
      lng: t.Number(),
    }),
  },
);
