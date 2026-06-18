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

// ==========================================
// BUILT-IN E-COMMERCE PRODUCTS & ORDERS
// ==========================================

type ProductProps = {
  pageId: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  stock?: number;
};

export async function createProduct({ pageId, name, description, price, image, stock = 0 }: ProductProps) {
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
    const product = await db.product.create({
      data: {
        pageId,
        name,
        description,
        price,
        image,
        stock,
      },
    });
    revalidateTag(page.subdomain);
    return { success: true, product };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function getProducts(pageId: string) {
  try {
    const products = await db.product.findMany({
      where: { pageId },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, products };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function deleteProduct(productId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user.id;
  if (!userId) return { success: false, msg: "User not signed in" };

  const product = await db.product.findUnique({
    where: { id: productId },
    include: { page: true },
  });
  if (!product || product.page.userId !== userId) {
    return { success: false, msg: "Access Denied" };
  }

  try {
    await db.product.delete({
      where: { id: productId },
    });
    revalidateTag(product.page.subdomain);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

// ==========================================
// DYNAMIC NO-CODE COLLECTIONS
// ==========================================

type CollectionProps = {
  pageId: string;
  name: string;
  slug: string;
  fields: any; // Record<string, string> (e.g. { location: "text", price: "number" })
};

export async function createCollection({ pageId, name, slug, fields }: CollectionProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user.id;
  if (!userId) return { success: false, msg: "User not signed in" };

  const page = await db.page.findFirst({
    where: { id: pageId, userId },
  });
  if (!page) return { success: false, msg: "Access Denied" };

  const existingCol = await db.collection.findUnique({
    where: {
      pageId_slug: { pageId, slug },
    },
  });
  if (existingCol) return { success: false, msg: "Collection with this slug already exists" };

  try {
    const collection = await db.collection.create({
      data: {
        pageId,
        name,
        slug,
        fields,
      },
    });
    revalidateTag(page.subdomain);
    return { success: true, collection };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function getCollections(pageId: string) {
  try {
    const collections = await db.collection.findMany({
      where: { pageId },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, collections };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function createCollectionItem({ collectionId, data }: { collectionId: string; data: any }) {
  try {
    const item = await db.collectionItem.create({
      data: {
        collectionId,
        data,
      },
      include: { collection: { include: { page: true } } },
    });
    revalidateTag(item.collection.page.subdomain);
    return { success: true, item };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
