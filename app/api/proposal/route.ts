import { NextResponse } from "next/server";
import { addDoc, collection } from "firebase/firestore";
import { getFirestoreDb, getFirebaseStorage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import type { ProposalSubmission } from "@/app/proposal/types";

const COLLECTION_NAME = "proposals";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const company = formData.get("company") as string;
    const phone = formData.get("phone") as string;
    const service = formData.get("service") as string;
    const budget = formData.get("budget") as string;
    const details = formData.get("details") as string;
    const file = formData.get("file") as File | null;

    if (!name?.trim() || !email?.trim() || !service?.trim() || !details?.trim()) {
      return NextResponse.json(
        { error: "Name, email, service, and project details are required." },
        { status: 400 }
      );
    }

    let proposalFileUrl: string | undefined;

    if (file && file.size > 0) {
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        return NextResponse.json(
          { error: "File size should be less than 10MB" },
          { status: 400 }
        );
      }

      const storage = getFirebaseStorage();
      const storageRef = ref(storage, `proposals/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      proposalFileUrl = await getDownloadURL(snapshot.ref);
    }

    const db = getFirestoreDb();
    const doc: Omit<ProposalSubmission, "_id"> = {
      name: name.trim(),
      email: email.trim(),
      company: company?.trim() || "",
      phone: phone?.trim() || "",
      service: service.trim(),
      budget: budget?.trim() || "",
      details: details.trim(),
      proposalFileUrl,
      createdAt: new Date(),
      read: false,
      status: "pending",
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), doc);

    return NextResponse.json(
      { success: true, id: docRef.id },
      { status: 201 }
    );
  } catch (err) {
    console.error("Proposal API error:", err);
    return NextResponse.json(
      { error: "Failed to submit proposal. Please try again." },
      { status: 500 }
    );
  }
}
