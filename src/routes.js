import NoteBook from "@/components/Board/NoteBook";
import Home from "@/components/Home/Home";
import MemoryBoard from "@/components/MemoryGame/MemoryBoard";
import Gallery from "@/components/IconsGallery/Gallery";
import SnakeGameMainScreen from "@/components/SnakeGame/SnakeGameMainScreen";
import MazeBoard from "@/components/Maze/MazeBoard";
import ViewTest from "@/components/_ViewTest/ViewTest";
import TicTacToeMainScreen from "@/components/TicTacToe/TicTacToeMainScreen";
const routes = [
    {path: "/", component: Home},
    {path: "*", component: Home},
    {path: "/notebook", component: NoteBook},
    {path: "/memoryGame", component: MemoryBoard},
    {path: "/snakeGame", component: SnakeGameMainScreen},
    {path: "/mazeGame", component: MazeBoard},
    {path: "/ticTacToe", component: TicTacToeMainScreen},
    {path: "/gallery", component: Gallery},
    {path: "/test", component: ViewTest}
];

export default routes;
