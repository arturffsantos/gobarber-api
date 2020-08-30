import { inject, injectable } from 'tsyringe';

import IMailProvider from '@shared/container/providers/mailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  private usersRepository: IUsersRepository;

  private mailProvider: IMailProvider;

  constructor(
    @inject('UsersRepository') usersRepository: IUsersRepository,
    @inject('MailProvider') mailProvider: IMailProvider,
  ) {
    this.usersRepository = usersRepository;
    this.mailProvider = mailProvider;
  }

  public async execute({ email }: IRequest): Promise<void> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (!checkUserExists) {
      throw new AppError('User does not exist');
    }

    this.mailProvider.sendMail(
      email,
      'Pedido de recuperação de senha recebido.',
    );
  }
}

export default SendForgotPasswordEmailService;
