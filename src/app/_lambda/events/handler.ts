import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
  GetCommand,
  DeleteCommand,
  UpdateCommand, 
} from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { Table } from "sst/node/table";
import {
  APIGatewayEventRequestContextV2,
  APIGatewayProxyEvent,
  APIGatewayProxyEventV2,
  APIGatewayProxyEventV2WithRequestContext,
  APIGatewayProxyHandlerV2,
  APIGatewayProxyResult,
  APIGatewayProxyResultV2,
} from "aws-lambda";

const db = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const POST: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    const body = JSON.parse(event?.body || "");
    console.log(body);

    // Extract form data from the request body
    const { title, desc, dateTime, location, price, categories, content } =
      body;

    if (!title || !dateTime || !location) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Title, location, Date & Time are required!",
        }),
      };
    }

    // Format the date and time
    const formattedDateTime = new Date(dateTime).toISOString();

    // Create a new item in the DynamoDB table
    const putCommand = new PutCommand({
      TableName: Table.Event_Table.tableName,
      Item: {
        eventId: uuidv4(),
        title,
        desc,
        dateTime: formattedDateTime,
        location,
        price,
        categories,
        postContent: content,
        createdAt: new Date().toLocaleDateString(),
      },
    });

    await db.send(putCommand);

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Post submitted successfully!",
      }),
    };
  } catch (error) {
    console.error("Error submitting post:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "An error occurred while submitting the post.",
      }),
    };
  }
};
export const GET: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  try {
    const queryParams = event.queryStringParameters || {};
    const searchableFields = [
      'title', 'desc', 'location', 'price', 'categories', 'tags', 'postContent','eventId'
    ];

    let filterExpression = '';
    let expressionAttributeValues: { [key: string]: any } = {};
    let expressionAttributeNames: { [key: string]: string } = {};

    Object.entries(queryParams).forEach(([key, value], index) => {
      if (searchableFields.includes(key) && value) {
        const attributeName = `#${key}`;
        const attributeValue = `:${key}`;
        
        if (index > 0) filterExpression += ' AND ';
        filterExpression += `contains(${attributeName}, ${attributeValue})`;
        
        expressionAttributeNames[attributeName] = key;
        expressionAttributeValues[attributeValue] = value;
      }
    });

    let scanCommand: ScanCommand;

    if (filterExpression) {
      scanCommand = new ScanCommand({
        TableName: Table.Event_Table.tableName,
        FilterExpression: filterExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
      });
    } else {
      scanCommand = new ScanCommand({
        TableName: Table.Event_Table.tableName,
      });
    }

    const { Items } = await db.send(scanCommand);

    return {
      statusCode: 200,
      body: JSON.stringify({ Items, NoOfData: Items?.length || 0 }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.error("Error fetching events:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "An error occurred while fetching events.",
      }),
    };
  }
};

// export const GET = async (
//   event: APIGatewayProxyEvent
// ): Promise<APIGatewayProxyResult> => {
//   try {
//     const scanCommand = new ScanCommand({
//       TableName: Table.Event_Table.tableName,
//     });
//     const { Items } = await db.send(scanCommand);

//     return {
//       statusCode: 200,
//       body: JSON.stringify({ Items, NoOfData: Items?.length || 0 }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//   } catch (e) {
//     console.error("Error fetching events:", e);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({
//         message: "An error occurred while fetching events.",
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//   }
// };

//get single event by id
export const GET_EVENT_BY_ID: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  console.log("In Get Event By Id function");

  const eventId = event.pathParameters?.eventId;

  if (eventId) {
    const getCommand = new GetCommand({
      TableName: Table.Event_Table.tableName,
      Key: { eventId },
    });

    const { Item } = await db.send(getCommand);

    if (Item) {
      return {
        statusCode: 200,
        body: JSON.stringify(Item),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      };
    } else {
      return {
        statusCode: 404,
        body: `Event with id: ${eventId} not found`,
      };
    }
  } else {
    return {
      statusCode: 400,
      body: "Invalid request",
    };
  }
};

// Update an event by ID
export const PUT_EVENT_BY_ID: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  const eventId = event.pathParameters?.eventId;
  const body = JSON.parse(event.body || "");

  const { title, desc } = body;

  try {
    const updateCommand = new UpdateCommand({
      TableName: Table.Event_Table.tableName,
      Key: { eventId },
      UpdateExpression: "set #title = :title, #desc = :desc",
      ExpressionAttributeNames: {
        "#title": "title",
        "#desc": "desc",
      },
      ExpressionAttributeValues: {
        ":title": title,
        ":desc": desc,
      },
    });

    await db.send(updateCommand);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Event with id: ${eventId} updated successfully`,
      }),
    };
  } catch (error) {
    console.error("Error updating event:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "An error occurred while updating the event.",
      }),
    };
  }
};
// Delete an event by ID
export const DELETE_EVENT_BY_ID: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  const eventId = event.pathParameters?.eventId;

  try {
    const deleteCommand = new DeleteCommand({
      TableName: Table.Event_Table.tableName,
      Key: { eventId },
    });

    await db.send(deleteCommand);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Event with id: ${eventId} deleted successfully`,
      }),
    };
  } catch (error) {
    console.error("Error deleting event:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "An error occurred while deleting the event.",
      }),
    };
  }
};
// export const PUT_EVENT_BY_ID: APIGatewayProxyHandlerV2 = async (
//   event: APIGatewayProxyEventV2
// ): Promise<APIGatewayProxyResultV2> => {
//   const eventId = event.pathParameters?.eventId;
//   const body = JSON.parse(event.body || "");
//   const {
//     title,
//     desc,
//     dateTime,
//     location,
//     price,
//     imageURL,
//     categories,
//     postContent,
//   } = body;

//   try {
//     const updateCommand = new UpdateCommand({
//       TableName: Table.Events_Table.tableName,
//       Key: { eventId },
//       UpdateExpression: `set #title = :title, #desc = :desc, #dateTime = :dateTime, #location = :location, #price = :price, #imageURL = :imageURL, #categories = :categories, #postContent = :postContent`,
//       ExpressionAttributeNames: {
//         "#title": "title",
//         "#desc": "desc",
//         "#dateTime": "dateTime",
//         "#location": "location",
//         "#price": "price",
//         "#imageURL": "imageURL",
//         "#categories": "categories",
//         "#postContent": "postContent",
//       },
//       ExpressionAttributeValues: {
//         ":title": title,
//         ":desc": desc,
//         ":dateTime": dateTime,
//         ":location": location,
//         ":price": price,
//         ":imageURL": imageURL,
//         ":categories": categories,
//         ":postContent": postContent,
//       },
//     });

//     await db.send(updateCommand);

//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         message: `Event with id: ${eventId} updated successfully`,
//       }),
//     };
//   } catch (error) {
//     console.error("Error updating event:", error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({
//         message: "An error occurred while updating the event.",
//       }),
//     };
//   }
// }; 




// import { DynamoDBClient, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
// import {
//   DynamoDBDocumentClient,
//   PutCommand,
//   GetCommand,
//   DeleteCommand,
//   UpdateCommand, 
// } from "@aws-sdk/lib-dynamodb";
// import { v4 as uuidv4 } from "uuid";
// import {
//   APIGatewayEventRequestContextV2,
//   APIGatewayProxyEvent,
//   APIGatewayProxyEventV2,
//   APIGatewayProxyEventV2WithRequestContext,
//   APIGatewayProxyHandlerV2,
//   APIGatewayProxyResult,
//   APIGatewayProxyResultV2,
// } from "aws-lambda";
// import { Table } from "sst/node/table";

// const db = DynamoDBDocumentClient.from(new DynamoDBClient({}));

// export const POST: APIGatewayProxyHandlerV2 = async (event) => {
//   try {
//     const body = JSON.parse(event?.body || "");
//     console.log(body);

//     const { title, desc, dateTime, location, price, categories, content } = body;

//     if (!title || !dateTime || !location) {
//       return {
//         statusCode: 400,
//         body: JSON.stringify({
//           message: "Title, location, Date & Time are required!",
//         }),
//       };
//     }

//     const formattedDateTime = new Date(dateTime).toISOString();

//     const putCommand = new PutCommand({
//       TableName: Table.Event_Table.tableName,
//       Item: {
//         eventId: uuidv4(),
//         title,
//         desc,
//         dateTime: formattedDateTime,
//         location,
//         price,
//         categories,
//         postContent: content,
//         createdAt: new Date().toISOString(),
//       },
//     });

//     await db.send(putCommand);

//     return {
//       statusCode: 201,
//       body: JSON.stringify({
//         message: "Post submitted successfully!",
//       }),
//     };
//   } catch (error) {
//     console.error("Error submitting post:", error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({
//         message: "An error occurred while submitting the post.",
//       }),
//     };
//   }
// };

// export const GET = async (
//   event: APIGatewayProxyEvent
// ): Promise<APIGatewayProxyResult> => {
//   try {
//     const scanCommand = new ScanCommand({
//       TableName: Table.Event_Table.tableName,
//     });
//     const { Items } = await db.send(scanCommand);

//     return {
//       statusCode: 200,
//       body: JSON.stringify({ Items, NoOfData: Items?.length || 0 }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//   } catch (e) {
//     console.error("Error fetching events:", e);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({
//         message: "An error occurred while fetching events.",
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//   }
// };

// // Get single event by id
// export const GET_EVENT_BY_ID: APIGatewayProxyHandlerV2 = async (
//   event: APIGatewayProxyEventV2
// ): Promise<APIGatewayProxyResultV2> => {
//   console.log("In Get Event By Id function");

//   const eventId = event.pathParameters?.eventId;

//   if (eventId) {
//     const getCommand = new GetCommand({
//       TableName: Table.Event_Table.tableName,
//       Key: { eventId },
//     });

//     const { Item } = await db.send(getCommand);

//     if (Item) {
//       return {
//         statusCode: 200,
//         body: JSON.stringify(Item),
//         headers: {
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Origin": "*",
//           "Access-Control-Allow-Credentials": true,
//         },
//       };
//     } else {
//       return {
//         statusCode: 404,
//         body: `Event with id: ${eventId} not found`,
//       };
//     }
//   } else {
//     return {
//       statusCode: 400,
//       body: "Invalid request",
//     };
//   }
// };

// // Update an event by ID
// export const PUT_EVENT_BY_ID: APIGatewayProxyHandlerV2 = async (
//   event: APIGatewayProxyEventV2
// ): Promise<APIGatewayProxyResultV2> => {
//   const eventId = event.pathParameters?.eventId;
//   const body = JSON.parse(event.body || "");

//   const { title, desc } = body;

//   try {
//     const updateCommand = new UpdateCommand({
//       TableName: Table.Event_Table.tableName,
//       Key: { eventId },
//       UpdateExpression: "set #title = :title, #desc = :desc",
//       ExpressionAttributeNames: {
//         "#title": "title",
//         "#desc": "desc",
//       },
//       ExpressionAttributeValues: {
//         ":title": title,
//         ":desc": desc,
//       },
//     });

//     await db.send(updateCommand);

//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         message: `Event with id: ${eventId} updated successfully`,
//       }),
//     };
//   } catch (error) {
//     console.error("Error updating event:", error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({
//         message: "An error occurred while updating the event.",
//       }),
//     };
//   }
// };

// // Delete an event by ID
// export const DELETE_EVENT_BY_ID: APIGatewayProxyHandlerV2 = async (
//   event: APIGatewayProxyEventV2
// ): Promise<APIGatewayProxyResultV2> => {
//   const eventId = event.pathParameters?.eventId;

//   try {
//     const deleteCommand = new DeleteCommand({
//       TableName: Table.Event_Table.tableName,
//       Key: { eventId },
//     });

//     await db.send(deleteCommand);

//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         message: `Event with id: ${eventId} deleted successfully`,
//       }),
//     };
//   } catch (error) {
//     console.error("Error deleting event:", error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({
//         message: "An error occurred while deleting the event.",
//       }),
//     };
//   }
// };

// // Search events
// export const SEARCH_EVENTS: APIGatewayProxyHandlerV2 = async (
//   event: APIGatewayProxyEventV2
// ): Promise<APIGatewayProxyResultV2> => {
//   try {
//     const queryParams = event.queryStringParameters || {};

//     if (!queryParams || Object.keys(queryParams).length === 0) {
//       return {
//         statusCode: 400,
//         body: JSON.stringify({ message: "No query parameters provided" }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//     }

//     let filterExpression = "";
//     const expressionAttributeNames: { [key: string]: string } = {};
//     const expressionAttributeValues: { [key: string]: any } = {};

//     for (const key in queryParams) {
//       if (queryParams.hasOwnProperty(key)) {
//         filterExpression += `#${key} = :${key} AND `;
//         expressionAttributeNames[`#${key}`] = key;
//         expressionAttributeValues[`:${key}`] = queryParams[key];
//       }
//     }

//     // Remove trailing " AND "
//     filterExpression = filterExpression.slice(0, -5);

//     const params = {
//       TableName: Table.Event_Table.tableName,
//       FilterExpression: filterExpression,
//       ExpressionAttributeNames: expressionAttributeNames,
//       ExpressionAttributeValues: expressionAttributeValues,
//     };

//     const { Items } = await db.send(new ScanCommand(params));

//     return {
//       statusCode: 200,
//       body: JSON.stringify(Items),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//   } catch (e) {
//     console.error("Error searching events:", e);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({
//         message: "An error occurred while searching events.",
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//   }
// };

