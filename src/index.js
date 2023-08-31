import "./utils/dotenv.js";
import App from "./app/app.js";
import Database from "./db/database.js";

// Middlewares
import performanceLoggerMiddleware from "./middlewares/performance-logger.js";
import bodyParserMiddleware from "./middlewares/body-parser.js";
import statusMiddleware from "./middlewares/status.js";
import sendMiddleware from "./middlewares/send.js";
import queryParamsMiddleware from "./middlewares/query-params.js";

// Routers
import peopleRouter from "./modules/people/people.controller.js";
import messsagesRouter from "./modules/messages/messages.controller.js";
import pathRouter from "./modules/path/path.controller.js";

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "127.0.0.1";

async function start() {
    const app = new App({ prefix: "/api" });
    const db = Database.Create();

    // await db.connect();

    app.extend(
        performanceLoggerMiddleware({ redTime: 1000 }), // should go first
        statusMiddleware,
        sendMiddleware,
        queryParamsMiddleware,
        bodyParserMiddleware
    );

    app.compose(peopleRouter.getRoutes());
    app.compose(messsagesRouter.getRoutes());
    app.compose(pathRouter.getRoutes());

    app.post((_, res) => {
        res.send("Welcome to Devchallenge Network API");
    });

    const server = app.listen({ port: PORT, host: HOST }, () => {
        console.info(`🚀 Server started on ${server.address().address}:${PORT}`);
    });

    server.on("close", async () => {
        await db.closeConnection();
    });
}

start();
