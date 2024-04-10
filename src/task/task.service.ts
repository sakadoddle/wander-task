import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const userData = await this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(userData);
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new HttpException('Task Not Found', 404);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const existingUser = await this.findOne(id);
    const userData = this.taskRepository.merge(existingUser, updateTaskDto);
    return await this.taskRepository.save(userData);
  }

  async remove(id: string): Promise<Task> {
    const existingTask = await this.findOne(id);
    return await this.taskRepository.remove(existingTask);
  }
}
