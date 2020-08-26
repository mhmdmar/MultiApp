import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import logger from "./logger";
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("api");
    app.enableCors();
    const debug = process.env.NODE_ENV === "development";
    logger.setLogLevel(debug ? "debug" : "none");
    await app.listen(3000);
}

bootstrap()
    .then(() => {
        logger.debug("App started");
    })
    .catch(e => {
        logger.error("App error - ", e);
    });
