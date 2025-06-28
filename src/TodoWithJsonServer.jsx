import React, { useState, useEffect } from "react";
import styles from "./TodoWithJsonServer.module.css";
import { Link } from "react-router-dom";

const TodoWithJsonServer = () => {
    const [post, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCraetinPost, setIsCraetingPost] = useState(false);
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
                            <Link
                                className={styles.link}
                                to={`/post/${item.id}`}
                            >
                                {item.name}
                            </Link>
                        </div>
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
