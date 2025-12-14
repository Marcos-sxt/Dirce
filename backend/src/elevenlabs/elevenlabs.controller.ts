import {
  Controller,
  Post,
  Body,
  Res,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { ElevenlabsService } from './elevenlabs.service';

@Controller('elevenlabs')
export class ElevenlabsController {
  constructor(private readonly elevenlabsService: ElevenlabsService) {}

  @Post('speech-to-text')
  @UseInterceptors(FileInterceptor('audio'))
  async speechToText(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Arquivo de áudio é obrigatório');
    }

    const text = await this.elevenlabsService.speechToText(file.buffer);
    return { text };
  }

  @Post('text-to-speech')
  async textToSpeech(
    @Body('text') text: string,
    @Res() res: Response,
    @Body('voiceId') voiceId?: string,
    @Body('flash') flash?: boolean,
  ) {
    if (!text) {
      throw new BadRequestException('Texto é obrigatório');
    }

    const audioBuffer = flash
      ? await this.elevenlabsService.textToSpeechFlash(text, voiceId)
      : await this.elevenlabsService.textToSpeech(text, voiceId);

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', audioBuffer.length);
    res.send(audioBuffer);
  }
}
