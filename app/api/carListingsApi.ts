import { fetchAPIResponse } from "./apiRequest";

export const fetchCarsAPI = (carAPIurl: string, init: RequestInit) => fetchAPIResponse(carAPIurl, init);