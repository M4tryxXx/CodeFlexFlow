import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma-cache";

export async function POST(request, res) {
  let response;
  const { type, userId, messageIds, messageContent } = await request.json();

  try {
    switch (type) {
      case "getMessages":
        response = await prisma.user_notifications.findMany({
          where: {
            OR: [{ to_user_id: userId }, { from_user_id: userId }],
          },
          orderBy: {
            created_at: "desc",
          },
        });
        await prisma.$disconnect();
        break;
      case "markMessagesAsRead":
        response = await prisma.user_notifications.updateMany({
          where: {
            to_user_id: userId,
            id: { in: messageIds },
            read: false,
          },
          data: { read: true },
        });
        await prisma.$disconnect();
        break;
      case "sendMessage":
        response = await prisma.user_notifications.create({
          data: messageContent,
        });
        await prisma.$disconnect();
        break;
      default:
        throw new Error("Unknown task type");
    }

    return NextResponse.json({ success: true, data: response, status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
