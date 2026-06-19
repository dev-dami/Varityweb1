"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidateTag } from "next/cache";

// ==========================================
// FORM SUBMISSIONS
// ==========================================

export async function createSubmission(pageId: string, data: any) {
  try {
    const page = await db.page.findUnique({
      where: { id: pageId },
      include: { integrations: true },
    });

    if (!page) {
      return { success: false, msg: "Page not found" };
    }

    // Save submission
    const submission = await db.formSubmission.create({
      data: {
        pageId,
        data,
      },
    });

    // Execute active integrations
    const activeIntegrations = page.integrations.filter((i) => i.active);

    for (const integration of activeIntegrations) {
      if (integration.type === "webhook" && integration.target) {
        // Send webhook trigger in background
        fetch(integration.target, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "Varityweb-Webhook-Engine/1.0",
          },
          body: JSON.stringify({
            event: "form.submitted",
            timestamp: new Date().toISOString(),
            page: {
              id: page.id,
              title: page.title,
              subdomain: page.subdomain,
            },
            submission: {
              id: submission.id,
              data,
            },
          }),
        }).catch((err) => {
          console.error(`Failed to send webhook to ${integration.target}:`, err);
        });
      } else if (integration.type === "email" && integration.target) {
        // Mock email notification
        console.log(`[EMAIL ALERT] Sending alert to ${integration.target} for submission ${submission.id}:`, data);
      } else if (integration.type === "whatsapp" && integration.target) {
        // Mock WhatsApp alert
        console.log(`[WHATSAPP ALERT] Sending alert to ${integration.target} for submission ${submission.id}:`, data);
      }
    }

    revalidateTag(page.subdomain);
    return { success: true, submission };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function getSubmissions(pageId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user.id;
  if (!userId) return { success: false, msg: "User not signed in" };

  // Verify ownership
  const page = await db.page.findFirst({
    where: { id: pageId, userId },
  });
  if (!page) return { success: false, msg: "Access Denied" };

  try {
    const submissions = await db.formSubmission.findMany({
      where: { pageId },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, submissions };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function getAllUserSubmissions() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user.id;
  if (!userId) return { success: false, msg: "User not signed in" };

  try {
    const submissions = await db.formSubmission.findMany({
      where: {
        page: {
          userId,
        },
      },
      include: {
        page: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, submissions };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function deleteSubmission(submissionId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user.id;
  if (!userId) return { success: false, msg: "User not signed in" };

  const submission = await db.formSubmission.findUnique({
    where: { id: submissionId },
    include: { page: true },
  });

  if (!submission || submission.page.userId !== userId) {
    return { success: false, msg: "Access Denied" };
  }

  try {
    await db.formSubmission.delete({
      where: { id: submissionId },
    });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

// ==========================================
// INTEGRATIONS
// ==========================================

type IntegrationProps = {
  pageId: string;
  type: string;
  target: string;
  active?: boolean;
};

export async function createIntegration({ pageId, type, target, active = true }: IntegrationProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user.id;
  if (!userId) return { success: false, msg: "User not signed in" };

  const page = await db.page.findFirst({
    where: { id: pageId, userId },
  });
  if (!page) return { success: false, msg: "Access Denied" };

  try {
    const integration = await db.integration.create({
      data: {
        pageId,
        type,
        target,
        active,
      },
    });
    revalidateTag(page.subdomain);
    return { success: true, integration };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function updateIntegration(
  integrationId: string,
  data: Partial<{ target: string; active: boolean }>
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user.id;
  if (!userId) return { success: false, msg: "User not signed in" };

  const integration = await db.integration.findUnique({
    where: { id: integrationId },
    include: { page: true },
  });

  if (!integration || integration.page.userId !== userId) {
    return { success: false, msg: "Access Denied" };
  }

  try {
    const updated = await db.integration.update({
      where: { id: integrationId },
      data,
    });
    revalidateTag(integration.page.subdomain);
    return { success: true, integration: updated };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function deleteIntegration(integrationId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user.id;
  if (!userId) return { success: false, msg: "User not signed in" };

  const integration = await db.integration.findUnique({
    where: { id: integrationId },
    include: { page: true },
  });

  if (!integration || integration.page.userId !== userId) {
    return { success: false, msg: "Access Denied" };
  }

  try {
    await db.integration.delete({
      where: { id: integrationId },
    });
    revalidateTag(integration.page.subdomain);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function getIntegrations(pageId: string) {
  try {
    const integrations = await db.integration.findMany({
      where: { pageId },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, integrations };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function getAllUserIntegrations() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user.id;
  if (!userId) return { success: false, msg: "User not signed in" };

  try {
    const integrations = await db.integration.findMany({
      where: {
        page: {
          userId,
        },
      },
      include: {
        page: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, integrations };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
