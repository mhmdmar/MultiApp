import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import logger from "./logger";
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("api");
    app.enableCors();
    logger.setLogLevel("debug");
    await app.listen(3000);
}

bootstrap()
    .then(() => {
        console.log("App started");
    })
    .catch(e => {
        console.log("Error - ", e);
    });
