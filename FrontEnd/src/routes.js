import Board from "@/components/Board/Board";
import Home from "@/components/Home/Home";
import MemoryBoard from "@/components/MemoryGame/MemoryBoard";
const routes = [
    {path: "/", component: Home},
    {path: "*", component: Home},
    {path: "/board", component: Board},
    {path: "/memoryGame", component: MemoryBoard}
];

export default routes;
