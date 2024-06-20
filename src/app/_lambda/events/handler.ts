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

export const GET = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const scanCommand = new ScanCommand({
      TableName: Table.Event_Table.tableName,
    });
    const { Items } = await db.send(scanCommand);

    return {
      statusCode: 200,
      body: JSON.stringify({ Items, NoOfData: Items?.length || 0 }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (e) {
    console.error("Error fetching events:", e);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "An error occurred while fetching events.",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};

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
