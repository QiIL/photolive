'use strict';
import { STRING, INTEGER, DATE, NOW, JSONB, ARRAY } from 'sequelize';

export default (sequelize, DataTypes) => {
  const Albums = sequelize.define(
    'Albums',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: INTEGER,
        allowNull: false
      }, // 用户id
      name: {
        type: STRING(50),
        allowNull: false,
        defaultValue: ''
      }, // 活动名
      avatar: {
        type: STRING(512),
        allowNull: false,
        defaultValue: ''
      }, // 活动封面图
      banners: {
        type: ARRAY(STRING(512)),
        allowNull: false,
        defaultValue: []
      }, // banner url
      activity_time: {
        type: DATE,
        allowNull: false,
        defaultValue: NOW
      }, // 活动时间(用户配置)
      location: {
        type: STRING(200),
        allowNull: false,
        defaultValue: ''
      }, // 活动地点
      album_type: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0
      }, // 相册服务类别()
      css_type: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 1
      }, // 相册样式类别
      interactive_setting: {
        type: JSONB,
        allowNull: false,
        defaultValue: {
          comment: false,
          like: false,
          photo_message: true,
          hot_photo: false,
          count_down: false
        }
      }, // 互动功能设置
      water_mark: {
        type: STRING(512),
        allowNull: false,
        defaultValue: ''
      }, // 水印url
      created_at: {
        type: DATE,
        allowNull: false,
        defaultValue: NOW
      }, // 建立时间
      expired_at: {
        type: DATE,
        allowNull: false
      } // 过期时间
    }, {}
  );

  Albums.associate = Models => {
    Models.Albums.hasMany(Models.Tags, { foreignKey: 'album_id' });
    Models.Albums.hasMany(Models.Images, { foreignKey: 'album_id' });
    Models.Albums.belongsTo(Models.Users, { foreignKey: 'user_id' });
  };

  return Albums;
};