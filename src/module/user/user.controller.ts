// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      await this.userService.create(createUserDto);
      return 'Usuário cadastrado com sucesso!';
    } catch (error) {
      console.log(error);
      return 'Tivemos problemas em cadastrar o seu usuário!';
    }
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  @Get(':email')
  async findOne(@Param('email') email: string) {
    try {
      const user = await this.userService.findOne(email);
      const returnContent =
        user == null ? 'Tivemos problemas em encontrar o seu usuário!' : user;

      return returnContent;
    } catch (error) {
      console.log(error);
      return 'Tivemos problemas em encontrar o seu usuário!';
    }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
