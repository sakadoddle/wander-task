import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

const TaskStatus = ['pending', 'completed', 'in progress'];

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    if (
      createTaskDto &&
      createTaskDto.status &&
      !TaskStatus.includes(createTaskDto.status)
    ) {
      throw new HttpException(
        'Status can only be pending, completed or in progress',
        403,
      );
    }
    const userData = await this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(userData);
  }

  async findAll(filters: {
    priority?: number;
    status?: string;
  }): Promise<Task[]> {
    const { priority, status } = filters;
    let query = this.taskRepository.createQueryBuilder('task');

    if (priority !== undefined) {
      query = query.andWhere('task.priority = :priority', { priority });
    }

    if (status !== undefined) {
      query = query.andWhere('task.status = :status', { status });
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new HttpException('Task Not Found', 404);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    if (
      updateTaskDto &&
      updateTaskDto.status &&
      !TaskStatus.includes(updateTaskDto.status)
    ) {
      throw new HttpException(
        'Status can only be pending, completed or in progress',
        403,
      );
    }
    const existingUser = await this.findOne(id);
    const userData = this.taskRepository.merge(existingUser, updateTaskDto);
    return await this.taskRepository.save(userData);
  }

  async remove(id: string): Promise<Task> {
    const existingTask = await this.findOne(id);
    return await this.taskRepository.remove(existingTask);
  }
}
