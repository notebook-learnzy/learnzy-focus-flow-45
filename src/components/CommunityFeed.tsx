
import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Image, ThumbsUp, MessageCircle, Send, User } from "lucide-react";

interface Post {
  id: string;
  user: string;
  content: string;
  image?: string;
  likes: number;
  comments: { id: string; user: string; text: string }[];
}

const mockUsers = ["Alex", "Jamie", "Morgan", "Casey"];
const getRandomUser = () => mockUsers[Math.floor(Math.random() * mockUsers.length)];

const initialPosts: Post[] = [
  {
    id: "p1",
    user: "Alex",
    content: "Here's a tricky NEET question I solved today. Anyone else found it tough?",
    likes: 2,
    image: "",
    comments: [
      { id: "c1", user: "Jamie", text: "Looks tough! What's your approach?" }
    ]
  },
];

const CommunityFeed = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newContent, setNewContent] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  const handleCreatePost = () => {
    if (!newContent.trim() && !newImage) return;
    setPosts(prev => [
      {
        id: `p${Date.now()}`,
        user: getRandomUser(),
        content: newContent,
        image: "", // For demo, not persisting image file.
        likes: 0,
        comments: [],
      },
      ...prev,
    ]);
    setNewContent("");
    setNewImage(null);
  };

  const handleLike = (id: string) => {
    setPosts(prev => prev.map(post =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleComment = (postId: string) => {
    const comment = commentInputs[postId]?.trim();
    if (!comment) return;
    setPosts(prev => prev.map(post =>
      post.id === postId
        ? { ...post, comments: [...post.comments, { id: `c${Date.now()}`, user: getRandomUser(), text: comment }] }
        : post
    ));
    setCommentInputs(inputs => ({ ...inputs, [postId]: "" }));
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <h2 className="font-semibold text-lg mb-1">Community Feed</h2>
          <p className="text-sm text-gray-500 mb-2">Share questions, help peers, post screenshots, and support each other!</p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-3">
            <Input
              value={newContent}
              onChange={e => setNewContent(e.target.value)}
              placeholder="Share a question, tip, or screenshot link…"
              className="flex-1"
            />
            {/* Image upload: for demo UI, not fully implemented */}
            <label className="p-2 rounded cursor-pointer hover:bg-gray-100">
              <Image className="h-5 w-5 text-gray-500" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => setNewImage(e.target.files?.[0] || null)}
              />
            </label>
            <Button onClick={handleCreatePost} className="ml-2">Post</Button>
          </div>
        </CardContent>
      </Card>
      <div className="my-4 space-y-4">
        {posts.map(post => (
          <Card key={post.id}>
            <CardHeader className="flex flex-row items-center gap-2 py-3">
              <div className="bg-gray-100 rounded-full h-9 w-9 flex items-center justify-center text-gray-500"><User /></div>
              <div>
                <div className="font-medium">{post.user}</div>
              </div>
            </CardHeader>
            <CardContent>
              {post.content && <div className="mb-2">{post.content}</div>}
              {post.image && (
                <img src={post.image} alt="uploaded" className="max-h-40 rounded shadow mb-2" />
              )}
              <div className="flex gap-3 items-center mb-2">
                <Button variant="ghost" size="sm" onClick={() => handleLike(post.id)}>
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  {post.likes}
                </Button>
                <span className="text-xs text-gray-400">{post.comments.length} Comments</span>
              </div>
              <div>
                {post.comments.map((cmt) => (
                  <div key={cmt.id} className="flex items-center gap-2 text-sm mb-1">
                    <span className="bg-gray-200 px-2 py-1 rounded-full text-gray-700">{cmt.user}</span>
                    <span>{cmt.text}</span>
                  </div>
                ))}
              </div>
              <form
                onSubmit={e => { e.preventDefault(); handleComment(post.id); }}
                className="flex items-center gap-1 mt-2"
              >
                <Input
                  value={commentInputs[post.id] || ""}
                  onChange={e => setCommentInputs(inputs => ({ ...inputs, [post.id]: e.target.value }))}
                  placeholder="Write a comment…"
                  className="flex-1 text-xs"
                />
                <Button type="submit" variant="ghost" size="icon" className="text-gray-500">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default CommunityFeed;
