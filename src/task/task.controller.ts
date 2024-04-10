import {
  Controller,
  Query,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    try {
      await this.taskService.create(createTaskDto);

      return {
        success: true,
        message: 'Task Created Successfully',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async findAll(@Query() filters?: { priority?: number; status?: string }) {
    try {
      this.validateFilters(filters);
      const data = await this.taskService.findAll(filters);
      return {
        success: true,
        data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.taskService.findOne(id);
      return {
        success: true,
        data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      await this.taskService.update(id, updateTaskDto);
      return {
        success: true,
        message: 'Task Updated Successfully',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.taskService.remove(id);
      return {
        success: true,
        message: 'Task Deleted Successfully',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private validateFilters(filters: any): {
    priority?: number;
    status?: string;
  } {
    const allowedKeys = ['priority', 'status'];
    const validFilters: any = {};

    for (const key in filters) {
      if (!allowedKeys.includes(key)) {
        throw new BadRequestException();
      }
      validFilters[key] = filters[key];
    }

    return validFilters;
  }
}
