import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from '../../src/task/task.controller';
import { TaskService } from '../../src/task/task.service';
import { TaskDTO } from '../../src/task/dto/task.dto';
import { BadRequestException } from '@nestjs/common';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService],
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

    expect(result).toEqual(filteredTasks);
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
});
