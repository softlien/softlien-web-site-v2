import { NextResponse } from "next/server";
import { getFirestoreDb } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, position, message, cvUrl } = body;

    if (!name || !email || !position || !cvUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = getFirestoreDb();
    const docRef = await addDoc(collection(db, "applications"), {
      name,
      email,
      phone,
      position,
      message,
      cvUrl,
      status: "pending",
      createdAt: serverTimestamp(),
    });

    return NextResponse.json(
      { message: "Application submitted successfully", id: docRef.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Career Application Error:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
