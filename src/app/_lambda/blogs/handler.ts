import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
  GetCommand,
  DeleteCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb"; 
import { v4 as uuidv4 } from "uuid";
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
    const { title, content, imageURL, category, readingTime, author } = body;

    if (!title || !content || !author) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Title, content, and author are required!",
        }),
      };
    }

    // Create a new item in the DynamoDB table
    const putCommand = new PutCommand({
      TableName: Table.Blog_Table.tableName,
      Item: {
        blogId: uuidv4(),
        title,
        content,
        imageURL,
        category,
        readingTime,
        author,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    });

    await db.send(putCommand);

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Blog submitted successfully!",
      }),
    };
  } catch (error) {
    console.error("Error submitting blog:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "An error occurred while submitting the blog.",
      }),
    };
  }
};

export const GET = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const queryParams = event.queryStringParameters || {};
    const searchableFields = [
      'title', 'content', 'category', 'author'
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
        TableName: Table.Blog_Table.tableName,
        FilterExpression: filterExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
      });
    } else {
      scanCommand = new ScanCommand({
        TableName: Table.Blog_Table.tableName,
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
    console.error("Error fetching blogs:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "An error occurred while fetching blogs.",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};
// export const GET = async (
//   event: APIGatewayProxyEvent
// ): Promise<APIGatewayProxyResult> => {
//   try {
//     const scanCommand = new ScanCommand({
//       TableName: Table.Blog_Table.tableName,
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
//     console.error("Error fetching blogs:", e);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({
//         message: "An error occurred while fetching blogs.",
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//   }
// };

// Get single blog by ID
export const GET_BLOG_BY_ID: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  console.log("In Get Blog By Id function");

  const blogId = event.pathParameters?.blogId;

  if (blogId) {
    const getCommand = new GetCommand({
      TableName: Table.Blog_Table.tableName,
      Key: { blogId },
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
        body: `Blog with id: ${blogId} not found`,
      };
    }
  } else {
    return {
      statusCode: 400,
      body: "Invalid request",
    };
  }
};

// Update a blog by ID
export const PUT_BLOG_BY_ID: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  const blogId = event.pathParameters?.blogId;
  const body = JSON.parse(event.body || "");

  const { title, content, imageURL, category, readingTime, author } = body;

  try {
    const updateCommand = new UpdateCommand({
      TableName: Table.Blog_Table.tableName,
      Key: { blogId },
      UpdateExpression:
        "set #title = :title, #content = :content, #imageURL = :imageURL, #category = :category, #readingTime = :readingTime, #author = :author, #updatedAt = :updatedAt",
      ExpressionAttributeNames: {
        "#title": "title",
        "#content": "content",
        "#imageURL": "imageURL",
        "#category": "category",
        "#readingTime": "readingTime",
        "#author": "author",
        "#updatedAt": "updatedAt",
      },
      ExpressionAttributeValues: {
        ":title": title,
        ":content": content,
        ":imageURL": imageURL,
        ":category": category,
        ":readingTime": readingTime,
        ":author": author,
        ":updatedAt": Date.now(),
      },
    });

    await db.send(updateCommand);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Blog with id: ${blogId} updated successfully`,
      }),
    };
  } catch (error) {
    console.error("Error updating blog:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "An error occurred while updating the blog.",
      }),
    };
  }
};

// Delete a blog by ID
export const DELETE_BLOG_BY_ID: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  const blogId = event.pathParameters?.blogId;

  try {
    const deleteCommand = new DeleteCommand({
      TableName: Table.Blog_Table.tableName,
      Key: { blogId },
    });

    await db.send(deleteCommand);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Blog with id: ${blogId} deleted successfully`,
      }),
    };
  } catch (error) {
    console.error("Error deleting blog:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "An error occurred while deleting the blog.",
      }),
    };
  }
};
