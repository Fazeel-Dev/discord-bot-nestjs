import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomLogger } from './common/logger/custom-logger.service';
import { AppModule } from './app.module';
import *as K from './common/constants';
import { SuccessResponseInterceptor } from './interceptors/success-response.interceptor';
import { swaggerAuth } from './middlewares/swagger-auth.middleware';
import { name, description, version } from 'package.json';

async function bootstrap() {
  const logger = new CustomLogger('Main');
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ bodyLimit: K.MAX_JSON_REQUEST_SIZE }),
    { rawBody: true }
  );

  app.setGlobalPrefix(K.API_PREFIX);
  app.useLogger(logger);
  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalInterceptors(new SuccessResponseInterceptor());
  app.enableCors({
    origin: true,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    credentials: true,
  });
  
  const config = app.get<ConfigService>(ConfigService);
  const port = config.get('config.server.port');
  const env = config.get('config.server.env');
  const swaggerServer = config.get('config.swagger.server');
  const localhost = config.get('config.server.localhost');

  if (swaggerServer === 'true') {
    app.use(['/docs', '/docs.json'], swaggerAuth);
    const options = new DocumentBuilder()
      .setTitle(name)
      .setDescription(description)
      .addBearerAuth()
      .setVersion(version)
      .addServer(`http://${localhost}:${port}`, 'Local Dev Server')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/docs', app, document);

    await app.listen(port, K.LOCALHOST);
    logger.log(`Listening on port ${port}, running in ${env} environment`);
  }
}
bootstrap();
