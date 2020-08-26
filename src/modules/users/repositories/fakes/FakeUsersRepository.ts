import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();
    const createdDate = new Date();

    Object.assign(user, {
      id: uuid(),
      ...userData,
      created_at: createdDate,
      updated_at: createdDate,
    });

    this.users.push(user);

    return Promise.resolve({ ...user });
  }

  public findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return Promise.resolve(findUser);
  }

  public findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return Promise.resolve(findUser);
  }

  public save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    const savedDate = new Date();

    if (findIndex < 0) {
      Object.assign(user, { created_at: savedDate, updated_at: savedDate });
      this.users.push(user);
    } else {
      Object.assign(user, { updated_at: savedDate });
      this.users[findIndex] = user;
    }

    return Promise.resolve(user);
  }
}

export default FakeUsersRepository;
