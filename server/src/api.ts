import Elysia from "elysia";
import {activitiesController} from "./controllers/activities";

export const api = new Elysia({
  prefix: "/api",
}).use(activitiesController);
