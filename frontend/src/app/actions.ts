"use server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim()).filter(Boolean);

export async function handleSignOut() {
  const { signOut } = await import("@/auth");
  await signOut();
}

export async function updateProposalStatus(formData: FormData) {
  // Security: verify caller is an authenticated admin
  const session = await auth();
  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
    throw new Error("Unauthorized");
  }

  const idStr = formData.get("id")?.toString();
  const status = formData.get("status")?.toString();
  if (!idStr || !status) return;

  // Validate status value to prevent arbitrary DB writes
  if (!['approved', 'rejected'].includes(status)) {
    throw new Error("Invalid status value");
  }

  await prisma.event_proposals.update({
    where: { id: parseInt(idStr) },
    data: { status }
  });

  revalidatePath("/admin");
}
