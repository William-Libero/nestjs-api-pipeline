import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import forFeatureDb from '../../db/for-feature.db';
import { ConfigModule } from '@nestjs/config';
import { CreateUserDto } from '../user/dto/create-user.dto';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
        MongooseModule.forFeature(forFeatureDb),
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('creates a users with the following email wiliamliberos@gmail.com', async () => {
    const data: CreateUserDto = {
      firstName: 'William',
      lastName: 'Libero',
      email: 'wiliamliberos@gmail.com',
      password: '123456',
    };

    const user = await controller.create(data);
    expect(user).toBe('Usuário cadastrado com sucesso!');
  });

  it('should return the wiliamliberos@gmail.com user array', async () => {
    const user = await controller.findOne('wiliamliberos@gmail.com');
    expect(user['email']).toBe('wiliamliberos@gmail.com');
  });

  it('should not return the wiliamliberos@gmail.com user array', async () => {
    const user = await controller.findOne('williamliberos@gmail.com');
    expect(user).toBe('Tivemos problemas em encontrar o seu usuário!');
  });
});
