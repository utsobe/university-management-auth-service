import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateUserId } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated increamental id
  const id = await generateUserId();
  user.id = id;
  // default password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  const createdUser = User.create(user);
  if (!createdUser) {
    throw new ApiError(400, 'Faild to create user');
  }
  return createdUser;
};

export const UserService = {
  createUser,
};
