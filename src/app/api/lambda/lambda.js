import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  PutCommand,
  DynamoDBDocumentClient,
  ScanCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const dbclient = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(dbclient);
const dbname = "EventsTable";

export const handler = async (event, context) => {
  let response;
  console.log(event);

  switch (event.httpMethod) {
    case "POST":
      try {
        const requestBody = JSON.parse(event.body);
        response = await saveEvent(requestBody);
      } catch (error) {
        console.error("Error parsing request body:", error);
        response = buildResponse(400, "Bad Request");
      }
      break;

    case "GET":
      response = await getEvents();
      break;
    case "PUT":
      const requestBody = JSON.parse(event.body);
      response = await updateEvent(
        requestBody.id,
        requestBody.updateKey,
        requestBody.updateValue
      );
      break;
    case "DELETE":
      response = await deleteEvent(JSON.parse(event.body).id);
      break;
    default:
      response = buildResponse(405, "Method Not Allowed");
  }
  return response;
};

async function deleteEvent(id) {
  const params = {
    TableName: dbname,
    Key: {
      id: id,
    },
    returnValues: "ALL_OLD",
  };

  try {
    const command = new DeleteCommand(params);
    const response = await docClient.send(command);

    return buildResponse(200, response);
  } catch (error) {
    console.error("Error deleting event:", error);
    return buildResponse(500, "Internal Server Error");
  }
}

async function updateEvent(id, updateKey, updateValue) {
  const params = {
    TableName: dbname,
    Key: {
      id: id,
    },
    UpdateExpression: `set #updateKey = :value`, // Using ExpressionAttributeNames
    ExpressionAttributeNames: {
      "#updateKey": updateKey, // Provide the actual attribute name as the value for the placeholder
    },
    ExpressionAttributeValues: {
      ":value": updateValue,
    },
    returnValues: "ALL_NEW",
  };

  try {
    const command = new UpdateCommand(params);
    const response = await docClient.send(command);
    return buildResponse(200, response);
  } catch (error) {
    console.error("Error Updating event:", error);
    return buildResponse(500, "Internal Server Error");
  }
}

async function getEvents() {
  const params = {
    TableName: dbname,
  };

  try {
    const command = new ScanCommand(params);
    const events = await docClient.send(command);

    return buildResponse(200, events.Items);
  } catch (error) {
    console.error("Error fetching items from DynamoDB:", error);
    throw error; // Rethrow the error to propagate it to the caller
  }
}

async function saveEvent(requestBody) {
  const params = {
    TableName: dbname,
    Item: requestBody,
  };

  try {
    const command = new PutCommand(params);
    await docClient.send(command);

    const body = {
      operation: "SAVE",
      message: "success",
      Item: requestBody,
    };
    return buildResponse(200, body);
  } catch (error) {
    console.error("Error saving event:", error);
    return buildResponse(500, "Internal Server Error");
  }
}

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}
