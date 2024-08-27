import { SSTConfig } from "sst";
import { NextjsSite, Table, Api, Bucket } from "sst/constructs";
import * as cdk from "aws-cdk-lib";

const ROOT_DOMAIN_NAME = "indiajapanguide.com";
const DOMAIN_NAME = `${ROOT_DOMAIN_NAME}`;

export default {
  config(_input) {
    return {
      name: "IndoJap",
      region: "us-east-1",
    };
  }, 
  stacks(app) {
    app.stack(function Site({ stack }) {
      // Create a hosted zone on your domain name
      const hostedZone = new cdk.aws_route53.HostedZone(stack, "HostedZone", {
        zoneName: ROOT_DOMAIN_NAME,
      });

      // Create an SSL certificate linked to the hosted zone
      const certificate = new cdk.aws_certificatemanager.Certificate(stack, "Certificate", {
        domainName: DOMAIN_NAME,
        validation: cdk.aws_certificatemanager.CertificateValidation.fromDns(hostedZone),
      });

      // Create a table for events
      const eventTable = new Table(stack, "Event_Table", {
        fields: {
          eventId: "string",
          title: "string",
          desc: "string",
          dateTime: "string",
          location: "string",
          price: "string",
          imageURL: "string",
          posterURL:"string",
          categories: "string",
          postContent: "string",
          createdAt: "number",
        },
        primaryIndex: { partitionKey: "eventId" },
      });

      // Create a table for blogs
      const blogTable = new Table(stack, "Blog_Table", {
        fields: {
          blogId: "string",
          title: "string",
          content: "string",
          imageURL: "string",
          category: "string",
          readingTime:"string",
          author: "string",
          createdAt: "number",
          updatedAt: "number",
        },
        primaryIndex: { partitionKey: "blogId" },
      });

      // Create an API for CRUD operations
      const api = new Api(stack, "Api", {
        defaults: {
          function: {
            bind: [eventTable, blogTable],
            environment: {
              EMAIL_USER: process.env.EMAIL_USER || "",
              EMAIL_PASS: process.env.EMAIL_PASS || "",
            },
          },
        },
        // Enable CORS for all methods
        cors: {
          allowOrigins: ["*"],
          allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
          allowHeaders: ["*"],
        },
        routes: {
          // Events routes
          "GET /events": "src/app/_lambda/events/handler.GET",
          "POST /events": "src/app/_lambda/events/handler.POST",
          "GET /events/{eventId}": "src/app/_lambda/events/handler.GET_EVENT_BY_ID",
          "PUT /events/{eventId}": "src/app/_lambda/events/handler.PUT_EVENT_BY_ID",
          "DELETE /events/{eventId}": "src/app/_lambda/events/handler.DELETE_EVENT_BY_ID",
          // "GET /events/search": "src/app/_lambda/events/handler.SEARCH_EVENTS",

          // Blogs routes
          "GET /blogs": "src/app/_lambda/blogs/handler.GET",
          "POST /blogs": "src/app/_lambda/blogs/handler.POST",
          "GET /blogs/{blogId}": "src/app/_lambda/blogs/handler.GET_BLOG_BY_ID",
          "PUT /blogs/{blogId}": "src/app/_lambda/blogs/handler.PUT_BLOG_BY_ID",
          "DELETE /blogs/{blogId}": "src/app/_lambda/blogs/handler.DELETE_BLOG_BY_ID",
        },
      });

      // Create an S3 bucket for image uploads
      const bucket = new Bucket(stack, "ImageUploads");

      // Bind Next.js site to AWS
      const site = new NextjsSite(stack, "site", {
        bind: [eventTable, blogTable, api, bucket],
        customDomain: {
          domainName: DOMAIN_NAME,
          cdk: {
            hostedZone,
            certificate,
          },
        },
      });
      site.attachPermissions([eventTable, blogTable]);

      stack.addOutputs({
        SiteUrl: site.url,
        ApiEndpoint: api.url,
      });
    });
  },
} satisfies SSTConfig;
