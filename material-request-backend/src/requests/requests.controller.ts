import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { RequestsService } from './requests.service';

@Controller('requests')
export class RequestsController {

  constructor(private readonly requestsService: RequestsService) { }

  @Post()
  create(@Body() body: CreateRequestDto) {
    return this.requestsService.create(body);
  }

  @Get()
  findAll() {
    return this.requestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestsService.findOne(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: CreateRequestDto,
  ) {
    return this.requestsService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestsService.remove(Number(id));
  }

}