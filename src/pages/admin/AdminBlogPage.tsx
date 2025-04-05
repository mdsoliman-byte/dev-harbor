import React, { useState, useEffect } from "react";

type BlogPost = {
    id: number;
    title: string;
    content: string;
};

const AdminBlogPage: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [newPost, setNewPost] = useState<Partial<BlogPost>>({ title: "", content: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const API_URL = "https://api.example.com/posts";

    // Fetch all blog posts
    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error("Failed to fetch posts");
            }
            const data = await response.json();
            setPosts(data);
        } catch (err: any) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Create a new blog post
    const handleCreate = async () => {
        if (!newPost.title || !newPost.content) return;
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPost),
            });
            if (!response.ok) {
                throw new Error("Failed to create post");
            }
            const createdPost = await response.json();
            setPosts([...posts, createdPost]);
            setNewPost({ title: "", content: "" });
        } catch (err: any) {
            setError(err.message);
        }
    };

    // Delete a blog post
    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete post");
            }
            setPosts(posts.filter(post => post.id !== id));
        } catch (err: any) {
            setError(err.message);
        }
    };

    // Edit a blog post (set in state to show edit form)
    const handleEdit = (post: BlogPost) => {
        setEditingPost(post);
    };

    // Update a blog post
    const handleUpdate = async () => {
        if (!editingPost?.title || !editingPost?.content) return;
        try {
            const response = await fetch(`${API_URL}/${editingPost.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingPost),
            });
            if (!response.ok) {
                throw new Error("Failed to update post");
            }
            const updatedPost = await response.json();
            setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
            setEditingPost(null);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Admin Blog Page</h1>
            {error && <p style={{color: "red"}}>{error}</p>}
            {loading ? (
                <p>Loading posts...</p>
            ) : (
                <>
                    {/* Create Blog Post */}
                    <section style={{ marginBottom: "20px" }}>
                        <h2>Create Blog Post</h2>
                        <input 
                            type="text" 
                            placeholder="Title" 
                            value={newPost.title} 
                            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                            style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px" }}
                        />
                        <textarea 
                            placeholder="Content" 
                            value={newPost.content} 
                            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                            style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px", height: "100px" }}
                        ></textarea>
                        <button onClick={handleCreate}>Create</button>
                    </section>

                    {/* List Blog Posts */}
                    <section>
                        <h2>Blog Posts</h2>
                        {posts.map(post => (
                            <div key={post.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
                                <h3>{post.title}</h3>
                                <p>{post.content}</p>
                                <button onClick={() => handleEdit(post)} style={{ marginRight: "5px" }}>Edit</button>
                                <button onClick={() => handleDelete(post.id)}>Delete</button>
                            </div>
                        ))}
                        {posts.length === 0 && <p>No blog posts available.</p>}
                    </section>

                    {/* Edit Blog Post */}
                    {editingPost && (
                        <section style={{ marginTop: "20px", borderTop: "1px solid #ccc", paddingTop: "20px" }}>
                            <h2>Edit Blog Post</h2>
                            <input 
                                type="text" 
                                value={editingPost.title} 
                                onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                                style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px" }}
                            />
                            <textarea 
                                value={editingPost.content} 
                                onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                                style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px", height: "100px" }}
                            ></textarea>
                            <button onClick={handleUpdate} style={{ marginRight: "5px" }}>Update</button>
                            <button onClick={() => setEditingPost(null)}>Cancel</button>
                        </section>
                    )}
                </>
            )}
        </div>
    );
};

export default AdminBlogPage;