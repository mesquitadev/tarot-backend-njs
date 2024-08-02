import {Body, Controller, Get, Post, UseGuards,} from '@nestjs/common';
import {ApiaryService} from './apiary.service';
import {ApiaryPersist} from "./dto/ApiaryPersist";
import {User} from "../decorator/current-user-decorator";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('/api/v1/apiary')
@UseGuards(JwtAuthGuard)
export class ApiaryController {
    constructor(private apiaryService: ApiaryService) {}

    @Get()
    async find(@User() user: any) {
        return this.apiaryService.findAllByUserId(user.id);
    }

    @Get('/all')
    async findAll() {
        return this.apiaryService.findAll();
    }

    @Post()
    async create(@User() user: any, @Body() data: ApiaryPersist) {
        data.userId = user.id
        await this.apiaryService.create(data);
    }
}
