import { NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand, 
  PutCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { Table } from "sst/node/table";
import { Bucket } from "sst/node/bucket";
import { format } from "date-fns";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const db = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const s3 = new S3Client({});

// Creating event from 'dashboard/submit'
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Extract form data
    const title = formData.get("title")?.toString() || "";
    const desc = formData.get("desc")?.toString() || "";
    const dateTime = formData.get("dateTime")?.toString() || "";
    const location = formData.get("location")?.toString() || "";
    const price = formData.get("price")?.toString() || "";
    const categories = formData.get("categories")?.toString() || "";
    const content = formData.get("content")?.toString() || "";

    if (!title || !dateTime || !location) {
      return NextResponse.json("Title, location, Date & Time are required!", {
        status: 400,
      });
    }

    // Format the parsedDateTime
    const parsedDateTime = new Date(dateTime);
    const formattedDateTime = format(parsedDateTime, "EEE, MMM d '•' h:mm aa");

    // Handle image upload
    const image = formData.get("image") as File | null;
    let imageURL = "";

    if (image) {
      const fileExtension = image.name.split(".").pop() || "";
      const key = `${uuidv4()}.${fileExtension}`;

      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const putObjectCommand = new PutObjectCommand({
        Bucket: Bucket.ImageUploads.bucketName,
        Key: key,
        Body: buffer,
        ContentType: image.type,
      });

      await s3.send(putObjectCommand);
      imageURL = `https://${Bucket.ImageUploads.bucketName}.s3.amazonaws.com/${key}`;
    }

    // Handle poster upload
    const poster = formData.get("poster") as File | null;
    let posterURL = "";

    if (poster) {
      const fileExtension = poster.name.split(".").pop() || "";
      const key = `posters/${uuidv4()}.${fileExtension}`;

      const arrayBuffer = await poster.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const putObjectCommand = new PutObjectCommand({
        Bucket: Bucket.ImageUploads.bucketName,
        Key: key,
        Body: buffer,
        ContentType: poster.type,
      });

      await s3.send(putObjectCommand);
      posterURL = `https://${Bucket.ImageUploads.bucketName}.s3.amazonaws.com/${key}`;
    }

    // Created a new item in the DynamoDB table
    const putCommand = new PutCommand({
      TableName: Table.Event_Table.tableName,
      Item: {
        eventId: uuidv4(),
        title,
        desc,
        dateTime: formattedDateTime,
        location,
        price,
        imageURL, 
        posterURL,
        categories,
        postContent: content,
        createdAt: new Date().toLocaleDateString(),
      },
    });

    await db.send(putCommand);

    return NextResponse.json("Post submitted successfully!", { status: 201 });
  } catch (e) {
    console.error("Error submitting post:", e);
    return NextResponse.json("An error occurred while submitting the post.", {
      status: 500,
    });
  }
}

// Getting data from the DynamoDB
export const GET = async () => {
  try {
    const scanCommand = new ScanCommand({
      TableName: Table.Event_Table.tableName,
    });
    const { Items } = await db.send(scanCommand);

    return NextResponse.json(
      { Items, NoOfData: Items?.length || 0 },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error fetching events:", e);
    return NextResponse.json("An error occurred while fetching events.", {
      status: 500,
    });
  }
};

// import { NextResponse } from "next/server";
// import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// import {
//   DynamoDBDocumentClient,
//   GetCommand, 
//   PutCommand,
//   ScanCommand,
// } from "@aws-sdk/lib-dynamodb";
// import { v4 as uuidv4 } from "uuid";
// import { Table } from "sst/node/table";
// import { Bucket } from "sst/node/bucket";
// import { format } from "date-fns";
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// const db = DynamoDBDocumentClient.from(new DynamoDBClient({}));
// const s3 = new S3Client({});
// //creating event from 'dashboard/submit'
// export async function POST(req: Request) {
//   try {
//     const formData = await req.formData();

//     // Extract form data
//     const title = formData.get("title")?.toString() || "";
//     const desc = formData.get("desc")?.toString() || "";
//     const dateTime = formData.get("dateTime")?.toString() || "";
//     const location = formData.get("location")?.toString() || "";
//     const price = formData.get("price")?.toString() || "";
//     const categories = formData.get("categories")?.toString() || "";
//     const content = formData.get("content")?.toString() || "";

//     if (!title || !dateTime || !location) {
//       return NextResponse.json("Title, location, Date & Time are required!", {
//         status: 400,
//       });
//     }
//     // Format the parsedDateTime
//     const parsedDateTime = new Date(dateTime);
//     const formattedDateTime = format(parsedDateTime, "EEE, MMM d '•' h:mm aa");

//     // Handle image upload
//     const image = formData.get("image") as File | null;
//     let imageURL = "";

//     if (image) {
//       const fileExtension = image.name.split(".").pop() || "";
//       const key = `${uuidv4()}.${fileExtension}`;

//       const arrayBuffer = await image.arrayBuffer();
//       const buffer = Buffer.from(arrayBuffer);

//       const putObjectCommand = new PutObjectCommand({
//         Bucket: Bucket.ImageUploads.bucketName,
//         Key: key,
//         Body: buffer,
//         ContentType: image.type,
//       });
//       // https://dev-indojap-site-imageuploadsbucketc6e2667e-7t0ixg2zjveg.s3.amazonaws.com/13f9ee70-288f-4994-96c7-e68a3b54a8d4.jpg
//       await s3.send(putObjectCommand);
//       imageURL = `https://dev-indojap-site-imageuploadsbucketc6e2667e-7t0ixg2zjveg.s3.amazonaws.com/${key}`;
//     }

//     // Created a new item in the DynamoDB table
//     const putCommand = new PutCommand({
//       TableName: Table.Event_Table.tableName,
//       Item: {
//         eventId: uuidv4(),
//         title,
//         desc,
//         dateTime: formattedDateTime,
//         location,
//         price,
//         imageURL, 
//         categories,
//         postContent: content,
//         createdAt: new Date().toLocaleDateString(),
//       },
//     });

//     await db.send(putCommand);

//     return NextResponse.json("Post submitted successfully!", { status: 201 });
//   } catch (e) {
//     console.error("Error submitting post:", e);
//     return NextResponse.json("An error occurred while submitting the post.", {
//       status: 500,
//     });
//   }
// }

// //Getting data from the dynamoDB
// // export async function GET(req: Request) {
// //   try {
// //     const scanCommand = new ScanCommand({ TableName: Table.Events_Table.tableName });
// //     const { Items } = await db.send(scanCommand);

// //     // return NextResponse.json(Items, { status: 200 });
// //     return NextResponse.json(
// //       { Items, NoOfData: Items?.length || 0 },
// //       { status: 200 }
// //     );
// //   } catch (e) {
// //     console.error("Error fetching events:", e);
// //     return NextResponse.json("An error occurred while fetching events.", {
// //       status: 500,
// //     });
// //   }
// // }

// export const GET = async () => {
//   try {
//     const scanCommand = new ScanCommand({
//       TableName: Table.Event_Table.tableName,
//     });
//     const { Items } = await db.send(scanCommand);

//     return NextResponse.json(
//       { Items, NoOfData: Items?.length || 0 },
//       { status: 200 }
//     );
//   } catch (e) {
//     console.error("Error fetching events:", e);
//     return NextResponse.json("An error occurred while fetching events.", {
//       status: 500,
//     });
//   }
// };
