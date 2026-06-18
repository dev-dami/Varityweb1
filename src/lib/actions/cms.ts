"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidateTag } from "next/cache";

type PostProps = {
  pageId: string;
  title: string;
  slug: string;
  content: string;
  image?: string;
};

export async function createPost({ pageId, title, slug, content, image }: PostProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user.id;
  if (!userId) return { success: false, msg: "User not signed in" };

  // Verify ownership of the page
  const page = await db.page.findFirst({
    where: { id: pageId, userId: userId },
  });
  if (!page) return { success: false, msg: "Access Denied" };

  // Verify unique slug
  const existingPost = await db.blogPost.findUnique({
    where: {
      pageId_slug: { pageId, slug },
    },
  });
  if (existingPost) return { success: false, msg: "Slug is already in use for this site" };

  try {
    const post = await db.blogPost.create({
      data: {
        pageId,
        title,
        slug,
        content,
        image,
      },
    });
    revalidateTag(page.subdomain);
    return { success: true, post };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function updatePost(
  postId: string,
  data: Partial<{ title: string; slug: string; content: string; image: string }>
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user.id;
  if (!userId) return { success: false, msg: "User not signed in" };

  // Find the post and verify ownership
  const post = await db.blogPost.findUnique({
    where: { id: postId },
    include: { page: true },
  });
  if (!post || post.page.userId !== userId) {
    return { success: false, msg: "Access Denied" };
  }

  try {
    const updatedPost = await db.blogPost.update({
      where: { id: postId },
      data,
    });
    revalidateTag(post.page.subdomain);
    return { success: true, post: updatedPost };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function deletePost(postId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user.id;
  if (!userId) return { success: false, msg: "User not signed in" };

  const post = await db.blogPost.findUnique({
    where: { id: postId },
    include: { page: true },
  });
  if (!post || post.page.userId !== userId) {
    return { success: false, msg: "Access Denied" };
  }

  try {
    await db.blogPost.delete({
      where: { id: postId },
    });
    revalidateTag(post.page.subdomain);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function getPosts(pageId: string) {
  try {
    const posts = await db.blogPost.findMany({
      where: { pageId },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, posts };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
