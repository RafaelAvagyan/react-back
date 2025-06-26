import React, { useState, useEffect } from "react";
import styles from "./TodoWithJsonServer.module.css";

const TodoWithJsonServer = () => {
    const [post, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCraetinPost, setIsCraetingPost] = useState(false);
    const [isUpdatePost, setIsUpdatePost] = useState(false);
    const [search, setSearch] = useState("");
    const [isSortedAsc, setIsSortedAsc] = useState(true);
    const [namePost, setNamePost] = useState("");
    const [searchDebounced, setSearchDebounced] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearchDebounced(search);
        }, 300);

        return () => clearTimeout(timeout);
    }, [search]);

    const filteredPosts = () => {
        const filtered = post.filter((item) =>
            item.name.toLowerCase().includes(searchDebounced.toLowerCase())
        );

        return filtered.sort((a, b) => {
            if (isSortedAsc) {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });
    };

    useEffect(() => {
        setIsLoading(true);
        fetch("http://localhost:3000/posts")
            .then((res) => res.json())
            .then((json) => setPosts(json))
            .finally(() => setIsLoading(false));
    }, []);

    const handleAddPost = () => {
        setIsCraetingPost(true);

        if (namePost.trim().length > 0) {
            fetch("http://localhost:3000/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json;charset=utf-8" },
                body: JSON.stringify({
                    name: namePost,
                    price: 5500,
                }),
            })
                .then((response) => response.json())
                .then((json) => {
                    setPosts((prev) => [...prev, json]);
                })
                .finally(() => setIsCraetingPost(false));
        }

        setNamePost("");
    };

    const handleUpdatePost = (id) => {
        setIsUpdatePost(true);

        fetch(`http://localhost:3000/posts/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify({
                price: 3500,
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                setPosts((prev) =>
                    prev.map((item) => (item.id === json.id ? json : item))
                );
            })
            .finally(() => setIsUpdatePost(false));
    };

    const handleDeletePost = (id) => {
        fetch(`http://localhost:3000/posts/${id}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then(() => {
                setPosts((prev) => prev.filter((item) => item.id !== id));
            });
    };

    return (
        <div className={styles.container}>
            <input
                placeholder="Поиск"
                title="Поиск"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <input
                placeholder="Имя поста"
                value={namePost}
                onChange={(e) => setNamePost(e.target.value)}
            />
            <button disabled={isCraetinPost} onClick={handleAddPost}>
                Добавить пост
            </button>
            {isLoading ? (
                <div className={styles.loader}></div>
            ) : (
                filteredPosts().map((item) => (
                    <div key={item.id} className={styles.posts}>
                        <div className={styles.post}>
                            {item.name} - {item.price}
                        </div>
                        <button
                            disabled={isUpdatePost}
                            onClick={() => handleUpdatePost(item.id)}
                        >
                            Update post
                        </button>
                        <button onClick={() => handleDeletePost(item.id)}>
                            Delete post
                        </button>
                    </div>
                ))
            )}
            {post.length ? (
                <button onClick={() => setIsSortedAsc(!isSortedAsc)}>
                    Сортировать {isSortedAsc ? "Я–A" : "A–Я"}
                </button>
            ) : (
                ""
            )}
        </div>
    );
};

export default TodoWithJsonServer;
