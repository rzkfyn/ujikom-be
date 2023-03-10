import { DataTypes } from 'sequelize';
import Database from '../core/Database.js';

const PostLike = Database.define('PostLike', {
  post_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  }
},{
  paranoid: true
});

export default PostLike;
