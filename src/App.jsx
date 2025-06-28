import { Route, Routes } from "react-router-dom";
import TodoWithJsonServer from "./TodoWithJsonServer";
import TodoDetail from "./TodoDetail";
import NotFound from "./NotFound";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<TodoWithJsonServer />} />
            <Route path="/post/:id" element={<TodoDetail />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default App;
