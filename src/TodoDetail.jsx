import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const TodoDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdatePost, setIsUpdatePost] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:3000/posts/${id}`)
            .then((res) => res.json())
            .then((json) => setPost(json))
            .finally(() => setIsLoading(false));
    }, [id]);

    const handleUpdatePost = () => {
        setIsUpdatePost(true);

        fetch(`http://localhost:3000/posts/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify({
                price: 3500,
            }),
        })
            .then((response) => response.json())
            .then((json) => setPost(json))
            .finally(() => setIsUpdatePost(false));
    };

    const handleDeletePost = () => {
        fetch(`http://localhost:3000/posts/${id}`, {
            method: "DELETE",
        }).then(() => navigate("/"));
    };

    if (isLoading) return <div>Загрузка...</div>;
    if (!post) return <div>Задача не найдена</div>;

    return (
        <div style={{ padding: "20px" }}>
            <button onClick={() => navigate(-1)}>Назад</button>
            <h2>Подробности задачи</h2>
            <p>
                <strong>ID:</strong> {post.id}
            </p>
            <p>
                <strong>Название:</strong> {post.name}
            </p>
            <p>
                <strong>Цена:</strong> {post.price}
            </p>

            <button disabled={isUpdatePost} onClick={handleUpdatePost}>
                Update post
            </button>
            <button onClick={handleDeletePost}>Delete post</button>
        </div>
    );
};

export default TodoDetail;
