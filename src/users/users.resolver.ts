import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { CreateUserInput } from './dto/input/create-user.input';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { User } from './entity/user';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  // inject users service
  constructor(private readonly usersService: UsersService) {}

  // queries
  @Query(() => User, { name: 'user', nullable: true })
  async gerUser(@Args() getUserArgs: GetUserArgs): Promise<User> {
    return this.usersService.getUser(getUserArgs);
  }

  @Query(() => [User], { name: 'users', nullable: 'items' })
  async getUsers(@Args() getUsersArgs: GetUsersArgs): Promise<User[]> {
    return this.usersService.getUsers(getUsersArgs);
  }

  // mutations
  @Mutation(() => User)
  async createUser(
    @Args('createUserData') createUserData: CreateUserInput,
  ): Promise<User> {
    return this.usersService.createUser(createUserData);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('updateUserData') updateUserData: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.updateUser(updateUserData);
  }

  @Mutation(() => User)
  async deleteUser(
    @Args('deleteUserDate') deleteUserData: DeleteUserInput,
  ): Promise<User> {
    return this.usersService.deleteUser(deleteUserData);
  }
}
