import { CvService } from './cv.service';
import { CvEntity } from './entities/cv.entity';
import { Reflector } from '@nestjs/core';
import {  Get } from '@nestjs/common';
import {
	Body, CacheInterceptor, CacheKey, CacheTTL,
	Controller,
	Delete,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	UseGuards, UseInterceptors,
  } from '@nestjs/common'; 
import { AddCvDto } from './dto/Add-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';

@Controller('cv')
export class CvController {
  constructor(
    private cvService: CvService,
    private reflector: Reflector
  ) {}

  @Get()
  async getAllCvs(): Promise<CvEntity[]> {
    return await this.cvService.getCvs();
  }

  @Post()
  async addCv(
    @Body() addCvDto: AddCvDto,
  ): Promise<CvEntity> {
	console.log(addCvDto);
    return await this.cvService.addCv(addCvDto);
  }


  /*@Patch(':id')
  async updateCv(
    @Body() updateCvDto: UpdateCvDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CvEntity> {
    return await this.cvService.updateCv(id, updateCvDto);
  }*/


  /*@Patch()
  @UseGuards(JwtAuthGuard)
  async updateCv2(
    @Body() updateObject,
    @User() user
  ) {
    const {updateCriteria, updateCvDto} = updateObject
    return await this.cvService.updateCv2(updateCriteria, updateCvDto);
  }*/



}

