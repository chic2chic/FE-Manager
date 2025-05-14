import { GetConversionResponse } from "@/types/api/ApiResponseType";
import { http, HttpResponse } from "msw";

export const ConversionList: GetConversionResponse = {
  low: [
    { name: "POSTER SET", interested: 230, purchased: 20, conversionRatio: 9 },
    {
      name: "KRUNK ORANGE",
      interested: 220,
      purchased: 60,
      conversionRatio: 27,
    },
    { name: "POSTER SET", interested: 200, purchased: 90, conversionRatio: 45 },
    {
      name: "KRUNK ORANGE",
      interested: 210,
      purchased: 120,
      conversionRatio: 57,
    },
    {
      name: "POSTER SET",
      interested: 170,
      purchased: 100,
      conversionRatio: 59,
    },
    {
      name: "KRUNK ORANGE",
      interested: 200,
      purchased: 130,
      conversionRatio: 65,
    },
  ],
  high: [
    {
      name: "KRUNK ORANGE",
      interested: 200,
      purchased: 240,
      conversionRatio: 120,
    },
    {
      name: "POSTER SET",
      interested: 170,
      purchased: 180,
      conversionRatio: 106,
    },
    {
      name: "KRUNK ORANGE",
      interested: 210,
      purchased: 160,
      conversionRatio: 76,
    },
    {
      name: "POSTER SET",
      interested: 200,
      purchased: 110,
      conversionRatio: 55,
    },
    {
      name: "KRUNK ORANGE",
      interested: 230,
      purchased: 120,
      conversionRatio: 52,
    },
    { name: "POSTER SET", interested: 220, purchased: 90, conversionRatio: 41 },
  ],
};

export const ConversionReadHandlers = [
  http.get("/popups/:popupId/dashboard/conversion-ratio", () => {
    return HttpResponse.json(
      {
        success: true,
        status: 200,
        data: ConversionList,
        // data: { low: [], high: [] },
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );
  }),
];
