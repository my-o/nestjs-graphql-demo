import { Injectable } from '@nestjs/common';
import { User } from './entity/user';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserInput, CreateUserInput, DeleteUserInput } from './dto/input';
import { GetUserArgs, GetUsersArgs } from './dto/args';

@Injectable()
export class UsersService {
  private users: User[] = [];

  // get user
  public getUser(getUserArgs: GetUserArgs): User {
    return this.users.find((user) => user.userId === getUserArgs.userId);
  }

  // get users
  public getUsers(getUsersArgs: GetUsersArgs): User[] {
    return getUsersArgs.userIds.map((userId) => this.getUser({ userId }));
  }

  // create
  public createUser(createUserData: CreateUserInput): User {
    const user: User = {
      userId: uuidv4(),
      ...createUserData,
    };

    this.users.push(user);

    return user;
  }

  // update
  public updateUser(updateUserData: UpdateUserInput): User {
    const user = this.users.find(
      (user) => user.userId === updateUserData.userId,
    );

    Object.assign(user, updateUserData);

    return user;
  }

  // delete
  public deleteUser(deleteUserData: DeleteUserInput): User {
    const userIndex = this.users.findIndex(
      (user) => user.userId === deleteUserData.userId,
    );

    const user = this.users[userIndex];
    this.users.splice(userIndex);

    return user;
  }
}
