import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TasksService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('TasksService')
 
  onModuleInit() {
    this.$connect();
    this.logger.log('data base connected');
    
  }

  
  create(createTaskDto: CreateTaskDto) {
    return this.task.create({
      data: createTaskDto
    });

  }

  findAll() {
    return this.task.findMany({});
  }

  async findOne(id: number) {
    const task = await this.task.findFirst({
      where: {id}
    });

    if (!task) {
      throw new NotFoundException(`Tarea con id: ${ id } no encontrado`);
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.findOne(id);

    return this.task.update({
      where: { id: id },
      data: updateTaskDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.task.delete({
      where: { id }
    });
  }
}
