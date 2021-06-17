const defaultConfig = {
    gameSpeed: 100,
    boardBorder: "black",
    boardBackground: "white",
    snakeBorder: "darkblue",
    foodColor: "lightgreen",
    foodBorder: "darkgreen",
    border: "black",
    background: "white",
    snakeColor: "lightblue",
    snakeHeadColor: "red",
    snakeBorderColor: "darkblue",
    wallsOn: false
};

const configOptions = [
    {
        id: "gameSpeed",
        title: "Game Speed",
        defaultValue: 20,
        options: [
            {
                value: 200,
                text: "Slow"
            },
            {
                value: 100,
                text: "Normal"
            },
            {
                value: 50,
                text: "Fast"
            },
            {
                value: 20,
                text: "Very Fast"
            }
        ]
    },
    {
        id: "snakeColor",
        title: "Snake Color",
        defaultValue: "lightblue",
        options: [
            {
                value: "black",
                text: "Black"
            },
            {
                value: "lightblue",
                text: "Light Blue"
            },
            {
                value: "blue",
                text: "Blue"
            }
        ]
    },
    {
        id: "foodColor",
        title: "Food Color",
        defaultValue: "lightgreen",
        options: [
            {
                value: "red",
                text: "Red"
            },
            {
                value: "lightgreen",
                text: "Light Green"
            },
            {
                value: "blue",
                text: "Blue"
            }
        ]
    },
    {
        id: "wallsOn",
        title: "Walls On",
        defaultValue: true,
        options: [
            {
                value: true,
                text: "Yes"
            },
            {
                value: false,
                text: "No"
            }
        ]
    }
];
export {defaultConfig, configOptions};
