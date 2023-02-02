import { Request, Response } from 'express';
import { Model } from 'sequelize';
import User from '../models/User.js';
import HasFollower from '../models/HasFollower.js';
import  {
  user as userType,
  hasFollower as hasFollowerType
} from '../types/types.js';

class FollowerController {
  public static follow = async (req: Request, res: Response) => {
    const { username } = req.params;
    const { userData } = req.body;

    try {
      const user = await User.findOne({ where: { username } }) as Model<userType, userType>;
      if (!user) return res.status(404).json({ status: 'Error', message: 'User not found' });
      const hasFollower = await HasFollower.findOne({ where: { followed_user_id: user.dataValues.id, follower_user_id: userData.id } }) as Model<hasFollowerType, hasFollowerType>;
      if (hasFollower) return res.status(400).json({ status: 'Error', message: `You already following ${username}`});
      if (user.dataValues.id === userData.id) return res.status(400).json({ status: 'Error', message: 'You can\'t follow yourself' });
      await HasFollower.create({ followed_user_id: user.dataValues.id, follower_user_id: userData.id });
    } catch(e) {
      console.log(e);
      return res.status(500).json({ status: 'Error', message: 'Internal server error' });
    }

    return res.status(200).json({ status: 'Ok', message: 'Successfully follow user' });
  };

  public static unfollow = async (req: Request, res: Response) => {
    const { username } = req.params;
    const { userData } = req.body;

    try {
      const user = await User.findOne({ where: { username } }) as Model<userType, userType>;
      if (!user) return res.status(404).json({ status: 'Error', message: 'User not found' });
      if (user.dataValues.id === userData.id) return res.status(400).json({ status: 'Error', message: 'You can\'t unfollow yourself' });
      const hasFollower = await HasFollower.findOne({ where: { follower_user_id: user.dataValues.id, following_user_id: userData.id } }) as Model<hasFollowerType, hasFollowerType>;
      if (!hasFollower) return res.status(400).json({ status: 'Error', message: `You're not following ${username}` });
      await HasFollower.destroy({ where: { follower_user_id: user.dataValues.id, following_user_id: userData.id } });
    } catch(e) {
      console.log(e);
      return res.status(500).json({ status: 'Error', message: 'Internal server error' });
    }

    return res.status(200).json({ status: 'Error', message: 'Successfully unfollow user' });
  };
}

export default FollowerController;