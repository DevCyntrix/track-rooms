import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);
  app.enableCors({
    origin: "*"
  })

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}

bootstrap();

function setupSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('Track-Rooms')
    .setDescription('The Track-Rooms API')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);
}
