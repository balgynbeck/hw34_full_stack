import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';

@ApiTags('Boards')
@ApiBearerAuth()
@UseGuards(JwtAccessGuard)
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новую доску' })
  @ApiResponse({ status: 201, description: 'Доска успешно создана' })
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все доски' })
  @ApiResponse({ status: 200, description: 'Список всех досок' })
  findAll() {
    return this.boardsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить доску по ID с задачами' })
  @ApiParam({ name: 'id', type: Number, description: 'ID доски' })
  @ApiResponse({ status: 200, description: 'Доска с задачами' })
  @ApiResponse({ status: 404, description: 'Доска не найдена' })
  findOne(@Param('id') id: string) {
    return this.boardsService.findOne(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить доску по ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID доски' })
  @ApiResponse({ status: 200, description: 'Доска удалена' })
  @ApiResponse({ status: 404, description: 'Доска не найдена' })
  remove(@Param('id') id: string) {
    return this.boardsService.remove(+id);
  }
}
