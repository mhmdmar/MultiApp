import NoteBook from "@/components/Board/NoteBook";
import Home from "@/components/Home/Home";
import MemoryBoard from "@/components/MemoryGame/MemoryBoard";
import Gallery from "@/components/IconsGallery/Gallery";
import SnakeGame from "@/components/SnakeGame/SnakeGame";
import MazeBoard from "@/components/Maze/MazeBoard";
const routes = [
    {path: "/", component: Home},
    {path: "*", component: Home},
    {path: "/notebook", component: NoteBook},
    {path: "/memoryGame", component: MemoryBoard},
    {path: "/snakeGame", component: SnakeGame},
    {path: "/mazeGame", component: MazeBoard},
    {path: "/gallery", component: Gallery}
];

export default routes;
