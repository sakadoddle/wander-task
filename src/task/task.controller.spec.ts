import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskDTO } from './dto/task.dto';
import { Task } from './entities/task.entity';
import { BadRequestException } from '@nestjs/common';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  const mockUserRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });

  it('should return filtered tasks based on priority and status', async () => {
    const priority = 1;
    const status = 'Pending';
    const filteredTasks: TaskDTO[] = [
      {
        id: '1',
        title: 'Task 1',
        desc: 'Description 1',
        priority: 1,
        status: 'Pending',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '2',
        title: 'Task 2',
        desc: 'Description 2',
        priority: 1,
        status: 'Pending',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    jest.spyOn(service, 'findAll').mockResolvedValue(filteredTasks);

    const result = await controller.findAll({ priority, status });

    expect(result).toEqual({ data: filteredTasks, success: true });
  });

  it('should throw BadRequestException if query parameters other than priority and status are provided', async () => {
    const queryParams = {
      priority: 1,
      status: 'Pending',
      invalidParam: 'value',
    };

    await expect(controller.findAll(queryParams)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw BadRequestException if status value is not "pending", "in progress", or "completed"', async () => {
    const body = {
      title: 'Task 1',
      desc: 'Description 1',
      priority: 1,
      status: 'invalid data',
    };

    await expect(() => controller.create(body)).rejects.toThrow(
      BadRequestException,
    );
  });
});
