import Board from "@/components/Board/Board";
import Home from "@/components/Home/Home";
import MemoryBoard from "@/components/MemoryGame/MemoryBoard";
import Gallery from "@/components/IconsGallery/Gallery";
const routes = [
    {path: "/", component: Home},
    {path: "*", component: Home},
    {path: "/board", component: Board},
    {path: "/memoryGame", component: MemoryBoard},
    {path: "/gallery", component: Gallery}
];

export default routes;
