import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  // Habilitar CORS para o frontend
  const frontendUrl = configService.get('FRONTEND_URL');
  const isProduction = configService.get('NODE_ENV') === 'production';
  
  // Em produção, aceitar domínios do Vercel e o FRONTEND_URL configurado
  // Em desenvolvimento, aceitar localhost
  const allowedOrigins = isProduction
    ? [
        frontendUrl,
      ].filter(Boolean)
    : ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:5173'];
  
  app.enableCors({
    origin: (origin, callback) => {
      // Sem origin (ex: mobile apps, Postman)
      if (!origin) {
        callback(null, true);
        return;
      }
      
      // Em desenvolvimento, aceitar localhost em qualquer porta
      if (!isProduction && origin.startsWith('http://localhost:')) {
        callback(null, true);
        return;
      }
      
      // Em produção, verificar se está na lista permitida ou é Vercel
      if (isProduction) {
        // Aceitar qualquer domínio do Vercel
        const isVercel = origin.includes('.vercel.app');
        
        // Verificar se está na lista de origens permitidas
        const isAllowed = allowedOrigins.some(allowed => origin === allowed);
        
        if (isVercel || isAllowed) {
          callback(null, true);
          return;
        }
      } else {
        // Desenvolvimento: aceitar se estiver na lista
        if (allowedOrigins.includes(origin)) {
          callback(null, true);
          return;
        }
      }
      
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  });
  
  const port = configService.get('PORT') || 3001;
  await app.listen(port);
  console.log(`🚀 Backend rodando em http://localhost:${port}`);
}
bootstrap();
