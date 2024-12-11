import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import {DiaryService} from './diary.service';
import {DiaryPersist} from "./dto/DiaryPersist";
import {User} from "../decorator/current-user-decorator";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('/api/v1/diary')
@UseGuards(JwtAuthGuard)
export class DiaryController {
    constructor(private diaryService: DiaryService) {}

    @Post()
    async create(@User() user: any, @Body() data: DiaryPersist) {
        data.userId = user.id
        await this.diaryService.create(data);
    }

    @Get()
    async find(@User() user: any) {
        return this.diaryService.findAllByUserId(user.id);
    }

    @Put('/:id')
    async findAll(@User() user: any, @Param('id') id: number, @Body() data: DiaryPersist) {
        data.userId = user.id
        return this.diaryService.update(id, data);
    }

    @Get("/:id")
    async findById(@User() user: any, @Param('id') id: number) {
        return this.diaryService.findById(id);
    }

    @Delete("/:id")
    async delete(@User() user: any, @Param('id') id: number) {
        return this.diaryService.delete(id);
    }
}
