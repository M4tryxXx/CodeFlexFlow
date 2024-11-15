import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest, res: any) {
  // const { type, userId, messageIds, messageContent } = await request.json();

  // console.log("request", request.body);

  // try {
  //   let response;
  //   switch (type) {
  //     case "getMessages":
  //       response = await prisma.user_notifications.findMany({
  //         where: {
  //           OR: [{ to_user_id: userId }, { from_user_id: userId }],
  //         },
  //         orderBy: {
  //           created_at: "desc",
  //         },
  //       });
  //       break;
  //     case "markMessagesAsRead":
  //       response = await prisma.user_notifications.updateMany({
  //         where: {
  //           to_user_id: userId,
  //           id: { in: messageIds },
  //           read: false,
  //         },
  //         data: { read: true },
  //       });
  //       break;
  //     case "sendMessage":
  //       response = await prisma.user_notifications.create({
  //         data: messageContent,
  //       });
  //       break;
  //     default:
  //       throw new Error("Unknown task type");
  //   }

  //   res.status(200).json({ success: true, data: response });
  // } catch (error: any) {
  //   res.status(500).json({ success: false, error: error.message });
  // } finally {
  //   await prisma.$disconnect();
  // }
  return NextResponse.json({ done: "ok" }, { status: 200 });
}
