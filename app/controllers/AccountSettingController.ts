import { Request, Response } from 'express';
import { Model } from 'sequelize';
import Database from '../core/Database.js';
import AccountSetting from '../models/AccountSetting.js';

class AccountSettingController {
  public static changeAcccontVisibility = async (req: Request, res: Response) => {
    const { auth } = req.body;
    const { user: authorizedUser } = auth;

    const transaction = await Database.transaction();
    let visibility: 'PUBLIC' | 'PRIVATE';
    try {
      const accountSetting = await AccountSetting.findOne({ where: { user_id: authorizedUser.id } }) as Model | null;
      if (!accountSetting) return res.status(404).json({ status: 'Error', message: 'Account setting not found' });
      visibility = accountSetting.dataValues.account_visibility;
      visibility = visibility === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC';
      await accountSetting.update({ account_visibility: visibility }, { transaction });
      await transaction.commit();
    } catch(e) {
      console.log(e);
      await transaction.rollback();
      return res.status(500).json({ status: 'Error', message: 'Internal server error' });
    }

    return res.status(200).json({ status: 'Ok', message: `Successfully changed account visibility to ${visibility === 'PUBLIC' ? 'public' : 'private'}` });
  };
}

export default AccountSettingController;