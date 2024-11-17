import { extname, join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
// import * as dateFn from "date-fns";
import dateFormatter from "../../lib/dateFormater";
import { NextRequest, NextResponse } from "next/server";

function sanitizeFilename(filename) {
  return filename.replace(/[^a-zA-Z0-9_\u0600-\u06FF.]/g, "_");
}

export async function POST(request, res) {
  const formData = await request.formData();
  // console.log(formData);
  const file = formData.get("file");
  // console.log(file);
  if (!file) {
    return NextResponse.json(
      { error: "File blob is required." },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const pathDist = join(process.cwd(), "/public/images");
  const relativeUploadDir = dateFormatter.formatDate(new Date());
  const uploadDir = join(pathDist, relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (e) {
    if (e.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(
        "Error while trying to create directory when uploading a file\n",
        e
      );
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }
  }

  try {
    const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const fileExtension = extname(file.name);
    const originalFilename = file.name.replace(/\.[^/.]+$/, "");
    const sanitizedFilename = sanitizeFilename(originalFilename);
    const filename = `${sanitizedFilename}_${uniqueSuffix}${fileExtension}`;
    await writeFile(`${uploadDir}/${filename}`, new Uint8Array(buffer));

    const finalFilePath =
      "http://192.168.0.194:3000/images/" + `${relativeUploadDir}/${filename}`;
    return NextResponse.json(
      { done: "ok", filename: filename, httpfilepath: finalFilePath },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
