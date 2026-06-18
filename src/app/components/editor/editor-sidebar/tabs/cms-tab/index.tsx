"use client";

import React, { useEffect, useState } from "react";
import { useEditor } from "@/app/providers/editor-provider";
import { getPosts, createPost, updatePost, deletePost } from "@/lib/actions/cms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Database, Plus, Trash2, Edit2, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function CMSTab() {
  const { siteId } = useEditor();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadPosts();
  }, [siteId]);

  const loadPosts = async () => {
    if (!siteId) return;
    setLoading(true);
    const res = await getPosts(siteId);
    if (res.success && res.posts) {
      setPosts(res.posts);
    }
    setLoading(false);
  };

  const handleOpenCreate = () => {
    setEditingPost(null);
    setTitle("");
    setSlug("");
    setImage("");
    setContent("");
    setDialogOpen(true);
  };

  const handleOpenEdit = (post: any) => {
    setEditingPost(post);
    setTitle(post.title);
    setSlug(post.slug);
    setImage(post.image || "");
    setContent(post.content || "");
    setDialogOpen(true);
  };

  const generateSlug = (val: string) => {
    return val
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingPost) {
      setSlug(generateSlug(val));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug) {
      toast.error("Title and slug are required");
      return;
    }

    setSubmitting(true);
    if (editingPost) {
      // Update
      const res = await updatePost(editingPost.id, {
        title,
        slug,
        image,
        content,
      });
      if (res.success) {
        toast.success("Post updated successfully!");
        setDialogOpen(false);
        loadPosts();
      } else {
        toast.error(res.msg || "Failed to update post");
      }
    } else {
      // Create
      const res = await createPost({
        pageId: siteId,
        title,
        slug,
        content,
        image,
      });
      if (res.success) {
        toast.success("Post created successfully!");
        setDialogOpen(false);
        loadPosts();
      } else {
        toast.error(res.msg || "Failed to create post");
      }
    }
    setSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this CMS post?")) return;
    const res = await deletePost(id);
    if (res.success) {
      toast.success("Post deleted successfully!");
      loadPosts();
    } else {
      toast.error(res.msg || "Failed to delete post");
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between border-b border-border pb-2">
        <div className="flex items-center gap-1.5 text-foreground font-semibold">
          <Database className="w-4 h-4 text-muted-foreground" />
          <span>CMS Posts</span>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="h-8 gap-1" onClick={handleOpenCreate}>
              <Plus className="w-3.5 h-3.5" /> Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] border-border bg-card text-foreground">
            <DialogHeader>
              <DialogTitle>{editingPost ? "Edit CMS Post" : "Create CMS Post"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-1">
                <Label htmlFor="post-title">Post Title</Label>
                <Input
                  id="post-title"
                  placeholder="e.g. My First Blog Post"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="post-slug">Slug Path</Label>
                <Input
                  id="post-slug"
                  placeholder="my-first-blog-post"
                  value={slug}
                  onChange={(e) => setSlug(generateSlug(e.target.value))}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="post-image">Featured Image URL</Label>
                <Input
                  id="post-image"
                  placeholder="https://example.com/image.png"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="post-content">Post Content</Label>
                <Textarea
                  id="post-content"
                  placeholder="Write your article or product details here..."
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full gap-2" disabled={submitting}>
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {editingPost ? "Save Changes" : "Publish Post"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center p-6 border border-dashed border-border rounded-lg bg-card/50">
          <p className="text-xs text-muted-foreground">No posts created yet.</p>
          <Button size="sm" variant="outline" className="mt-3 gap-1" onClick={handleOpenCreate}>
            <Plus className="w-3.5 h-3.5" /> Add First Post
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-3 max-h-[calc(100vh-180px)] overflow-y-auto">
          {posts.map((post) => (
            <Card key={post.id} className="border border-border bg-card/60 shadow-none hover:bg-muted/30 transition-colors">
              <CardContent className="p-3 flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-xs text-foreground truncate">{post.title}</h4>
                  <p className="text-[10px] text-muted-foreground truncate font-mono">/{post.slug}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-7 h-7 text-muted-foreground hover:text-foreground"
                    onClick={() => handleOpenEdit(post)}
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-7 h-7 text-muted-foreground hover:text-destructive"
                    onClick={() => handleDelete(post.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
