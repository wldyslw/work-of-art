import {
  Controller,
  Dependencies,
  Get,
  Post,
  Body,
  Bind,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
@Dependencies(AppService)
export class AppController {
  constructor(appService) {
    this.appService = appService;
  }

  @Get('liked')
  getLiked() {
    return this.appService.getLiked();
  }

  @Post('liked')
  @Bind(Body('entry'))
  toggleLiked(entry) {
    return this.appService.toggleLiked(entry);
  }

  @Get('feedback')
  getFeedback() {
    return this.appService.getFeedback();
  }

  @Post('feedback')
  addFeedback(details) {
    return this.appService.addFeedback(details);
  }
}
