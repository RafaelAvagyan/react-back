import { useState, useEffect } from "react";
import styles from "./App.module.css";

function App() {
    const [todods, setTodos] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos/")
            .then((response) => response.json())
            .then((json) => setTodos(json));
    }, []);

    return (
        <div className={styles.container}>
            <h1 style={{ color: "white" }}>Todos Title</h1>
            {todods.map(({ title, id }) => (
                <div className={styles.todo} key={id}>
                    {title}
                </div>
            ))}
        </div>
    );
}

export default App;
