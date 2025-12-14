import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  // Habilitar CORS para o frontend
  const frontendUrl = configService.get('FRONTEND_URL');
  const allowedOrigins = frontendUrl 
    ? [frontendUrl]
    : ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:5173']; // Suporta Next.js, Vite padrão, e Vite customizado
  
  app.enableCors({
    origin: (origin, callback) => {
      // Em desenvolvimento, aceitar localhost em qualquer porta
      if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://localhost:')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });
  
  const port = configService.get('PORT') || 3001;
  await app.listen(port);
  console.log(`🚀 Backend rodando em http://localhost:${port}`);
}
bootstrap();
