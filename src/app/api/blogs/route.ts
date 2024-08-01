import { NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { Table } from "sst/node/table";
import { Bucket } from "sst/node/bucket";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { format } from "date-fns";
import mammoth from "mammoth";

const db = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const s3 = new S3Client({});

const calculateReadingTime = (text: string): string => {
  const wordsPerMinute = 200;
  const textLength = text.split(/\s+/).length;
  const minutes = Math.ceil(textLength / wordsPerMinute);
  return `${minutes} min read`;
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = formData.get("title")?.toString() || "";
    const category = formData.get("categories")?.toString() || "";
    let content = formData.get("content")?.toString() || "";
    const docxFile = formData.get("contentFile") as File | null; // Changed from 'docxFile' to 'contentFile'

    if (!title || !category || (!content && !docxFile)) {
      return NextResponse.json("Title, category, and content are required!", {
        status: 400,
      });
    }

    if (docxFile) {
      const arrayBuffer = await docxFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const result = await mammoth.convertToHtml({ buffer });
      content = result.value; // The converted HTML
    }

    const image = formData.get("featuredImage") as File | null;
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

      try {
        await s3.send(putObjectCommand);
        imageURL = `https://${Bucket.ImageUploads.bucketName}.s3.amazonaws.com/${key}`;
      } catch (s3Error) {
        console.error("Error uploading image to S3:", s3Error);
      }
    }

    const putCommand = new PutCommand({
      TableName: Table.Blog_Table.tableName,
      Item: {
        blogId: uuidv4(),
        title,
        category,
        content,
        imageURL,
        createdAt: format(new Date(), "MMMM dd, yyyy"),
        readingTime: calculateReadingTime(content),
      },
    });

    await db.send(putCommand);

    return NextResponse.json("Blog submitted successfully!", { status: 201 });
  } catch (e) {
    console.error("Error submitting blog:", e);
    return NextResponse.json("An error occurred while submitting the blog.", {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const scanCommand = new ScanCommand({
      TableName: Table.Blog_Table.tableName,
    });
    const { Items } = await db.send(scanCommand);

    return NextResponse.json(
      { Items, NoOfData: Items?.length || 0 },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error fetching blogs:", e);
    return NextResponse.json("An error occurred while fetching blogs.", {
      status: 500,
    });
  }
}

// import { NextResponse } from "next/server";
// import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// import { DynamoDBDocumentClient, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
// import { v4 as uuidv4 } from "uuid";
// import { Table } from "sst/node/table";
// import { Bucket } from "sst/node/bucket";
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { format } from "date-fns";
// import mammoth from "mammoth";

// const db = DynamoDBDocumentClient.from(new DynamoDBClient({}));
// const s3 = new S3Client({});

// const calculateReadingTime = (text: string): string => {
//   const wordsPerMinute = 200;
//   const textLength = text.split(/\s+/).length;
//   const minutes = Math.ceil(textLength / wordsPerMinute);
//   return `${minutes} min read`;
// };

// export async function POST(req: Request) {
//   try {
//     const formData = await req.formData();

//     const title = formData.get("title")?.toString() || "";
//     const category = formData.get("categories")?.toString() || "";
//     let content = formData.get("content")?.toString() || "";
//     const docxFile = formData.get("contentFile") as File | null; // Changed from 'docxFile' to 'contentFile'

//     if (!title || !category || (!content && !docxFile)) {
//       return NextResponse.json("Title, category, and content are required!", {
//         status: 400,
//       });
//     }

//     if (docxFile) {
//       const arrayBuffer = await docxFile.arrayBuffer();
//       const buffer = Buffer.from(arrayBuffer);
//       const result = await mammoth.convertToHtml({ buffer });
//       content = result.value; // The converted HTML
//     }

//     const image = formData.get("featuredImage") as File | null;
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

//       await s3.send(putObjectCommand);
//       imageURL = `https://dev-indojap-site-imageuploadsbucketc6e2667e-7t0ixg2zjveg.s3.amazonaws.com/${key}`;
//     }

//     const putCommand = new PutCommand({
//       TableName: Table.Blog_Table.tableName,
//       Item: {
//         blogId: uuidv4(),
//         title,
//         category,
//         content,
//         imageURL,
//         createdAt: format(new Date(), "MMMM dd, yyyy"),
//         readingTime: calculateReadingTime(content),
//       },
//     });

//     await db.send(putCommand);

//     return NextResponse.json("Blog submitted successfully!", { status: 201 });
//   } catch (e) {
//     console.error("Error submitting blog:", e);
//     return NextResponse.json("An error occurred while submitting the blog.", {
//       status: 500,
//     });
//   }
// }

// export async function GET() {
//   try {
//     const scanCommand = new ScanCommand({
//       TableName: Table.Blog_Table.tableName,
//     });
//     const { Items } = await db.send(scanCommand);

//     return NextResponse.json(
//       { Items, NoOfData: Items?.length || 0 },
//       { status: 200 }
//     );
//   } catch (e) {
//     console.error("Error fetching blogs:", e);
//     return NextResponse.json("An error occurred while fetching blogs.", {
//       status: 500,
//     });
//   }
// }

// import { NextResponse } from "next/server";
// import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// import {
//   DynamoDBDocumentClient,
//   PutCommand,
//   ScanCommand,
// } from "@aws-sdk/lib-dynamodb";
// import { v4 as uuidv4 } from "uuid";
// import { Table } from "sst/node/table";
// import { Bucket } from "sst/node/bucket";
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { format } from "date-fns";

// const db = DynamoDBDocumentClient.from(new DynamoDBClient({}));
// const s3 = new S3Client({});

// // Function to estimate reading time
// const calculateReadingTime = (text: string): string => {
//   const wordsPerMinute = 200;
//   const textLength = text.split(/\s+/).length;
//   const minutes = Math.ceil(textLength / wordsPerMinute);
//   return `${minutes} min read`;
// };

// // Creating a blog from 'dashboard/submit'
// export async function POST(req: Request) {
//   try {
//     const formData = await req.formData();

//     // Extract form data
//     const title = formData.get("title")?.toString() || "";
//     const category = formData.get("categories")?.toString() || "";
//     const content = formData.get("content")?.toString() || "";

//     if (!title || !category || !content) {
//       return NextResponse.json("Title, category, and content are required!", {
//         status: 400,
//       });
//     }

//     // Handle image upload
//     const image = formData.get("featuredImage") as File | null;
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
      
//       await s3.send(putObjectCommand);
//       imageURL = `https://dev-indojap-site-imageuploadsbucketc6e2667e-7t0ixg2zjveg.s3.amazonaws.com/${key}`;
//     }

//     // Create a new item in the DynamoDB table
//     const putCommand = new PutCommand({
//       TableName: Table.Blog_Table.tableName,
//       Item: {
//         blogId: uuidv4(),
//         title,
//         category,
//         content,
//         imageURL,
//         createdAt: format(new Date(), "MMMM dd, yyyy"),
//         readingTime: calculateReadingTime(content),
//       },
//     });

//     await db.send(putCommand);

//     return NextResponse.json("Blog submitted successfully!", { status: 201 });
//   } catch (e) {
//     console.error("Error submitting blog:", e);
//     return NextResponse.json("An error occurred while submitting the blog.", {
//       status: 500,
//     });
//   }
// }

// // Getting data from DynamoDB
// export async function GET() {
//   try {
//     const scanCommand = new ScanCommand({
//       TableName: Table.Blog_Table.tableName,
//     });
//     const { Items } = await db.send(scanCommand);

//     return NextResponse.json(
//       { Items, NoOfData: Items?.length || 0 },
//       { status: 200 }
//     );
//   } catch (e) {
//     console.error("Error fetching blogs:", e);
//     return NextResponse.json("An error occurred while fetching blogs.", {
//       status: 500,
//     });
//   }
// }
