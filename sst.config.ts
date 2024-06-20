import { SSTConfig } from "sst";
import { NextjsSite, Table, Api, Bucket } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "IndoJap",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      //database to store all Events
      const table = new Table(stack, "Event_Table", {
        fields: {
          eventId: "string",
          title: "string",
          desc: "string",
          dateTime: "string",
          location: "string",
          price: "string",
          imageURL: "string",
          categories: "string",
          postContent: "string",
          createdAt: "number",
        },
        primaryIndex: { partitionKey: "eventId" },
      });

      //Api for CRUD operations
      const api = new Api(stack, "Api", {
        defaults: {
          function: {
            bind: [table],
          },
        },
        // Enable CORS for all methods
        cors: {
          allowOrigins: ["*"],
          allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
          allowHeaders: ["*"],
        },
        routes: {
          "GET /events": "src/app/_lambda/events/handler.GET",
          "POST /events": "src/app/_lambda/events/handler.POST",
          "GET /events/{eventId}":
            "src/app/_lambda/events/handler.GET_EVENT_BY_ID",
          "PUT /events/{eventId}":
            "src/app/_lambda/events/handler.PUT_EVENT_BY_ID",
          "DELETE /events/{eventId}":
            "src/app/_lambda/events/handler.DELETE_EVENT_BY_ID",
        },
      });

      //S3 bucket to store images in aws
      const bucket = new Bucket(stack, "ImageUploads");

      //Binding Nextjs to aws
      const site = new NextjsSite(stack, "site", {
        bind: [table, api, bucket],
      });
      site.attachPermissions([table]);

      stack.addOutputs({
        SiteUrl: site.url,
        ApiEndpoint: api.url,
      });
    });
  },
} satisfies SSTConfig;
