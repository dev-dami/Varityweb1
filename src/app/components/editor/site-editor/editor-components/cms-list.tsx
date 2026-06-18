"use client";

import React, { useEffect, useState } from "react";
import { EditorElement, useEditor } from "@/app/providers/editor-provider";
import { getPosts } from "@/lib/actions/cms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Database } from "lucide-react";

type Props = {
  element: EditorElement;
};

export default function CMSListElement({ element }: Props) {
  const { siteId } = useEditor();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      if (!siteId) return;
      const res = await getPosts(siteId);
      if (res.success && res.posts) {
        setPosts(res.posts);
      }
      setLoading(false);
    }
    loadPosts();
  }, [siteId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 w-full border border-dashed border-border rounded-lg bg-card">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground mr-2" />
        <span className="text-sm text-muted-foreground">Loading CMS Dynamic Data...</span>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 w-full border border-dashed border-border rounded-lg bg-card text-center">
        <Database className="w-8 h-8 text-muted-foreground mb-2" />
        <h4 className="font-semibold text-foreground">CMS Dynamic Collection List</h4>
        <p className="text-xs text-muted-foreground max-w-xs mt-1">
          This container displays items from your site CMS. Open the CMS tab in the left sidebar to add blog posts or articles!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full p-4">
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover border-b border-border bg-muted"
            />
          ) : (
            <div className="w-full h-48 bg-muted flex items-center justify-center text-muted-foreground border-b border-border">
              <span className="text-sm">No Image</span>
            </div>
          )}
          <CardHeader className="p-4 pb-2">
            <div className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider">
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
            <CardTitle className="text-lg font-bold text-foreground line-clamp-1 mt-1">
              {post.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
              {post.content || "No content provided."}
            </p>
            <div className="text-[11px] font-semibold text-primary mt-4 inline-flex items-center gap-1 hover:underline cursor-pointer">
              Read Article →
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
