import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    const updateAvatar = new UpdateUserAvatarService();

    if (request.file && request.file.filename) {
      const user = updateAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });

      return response.json(user);
    }
  }
}
