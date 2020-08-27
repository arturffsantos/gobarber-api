import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'john@test.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('john@test.com');
    expect(user.password).toBeUndefined();
    expect(user.created_at).toBeTruthy();
    expect(user.updated_at).toBeTruthy();
    expect(user.created_at).toEqual(user.updated_at);
  });

  it('should not be able to create a new user with duplicated email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'john@test.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');

    await expect(
      createUserService.execute({
        name: 'John Junior',
        email: 'john@test.com',
        password: 'abcdef',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
