import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const tags = await db.tag.findMany();
        return NextResponse.json(tags, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" + error }, { status: 500 });  
    }
}