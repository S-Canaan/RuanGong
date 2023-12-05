// 云函数端代码
const cloud = require('wx-server-sdk');
cloud.init({env: cloud.DYNAMIC_CURRENT_ENV});
const db = cloud.database();

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext();

  // 查询用户信息是否已存在
  const userQuery = await db.collection("userInfo").where({ _openid: OPENID }).get();

  if (userQuery.data.length > 0) {
    // 用户信息已存在，直接返回
    return {
      code: 0,
      message: '获取用户信息成功',
      data: userQuery.data[0]
    };
  } else {
    // 用户信息不存在，保存用户信息
    const userInfo = event.userInfo;

    try {
      const result = await db.collection("userInfo").add({
        data:{
          _openid:OPENID,
          userInfo:userInfo
        }
      })

      return {
        code: 1,
        message: '保存用户信息成功',
        data: { 
          _id: result._id, 
          _openid: OPENID, 
          userInfo:userInfo
        }
      };
    } catch (error) {
      console.error('保存用户信息失败', error);
      return {
        code: -1,
        message: '保存用户信息失败',
        error: error
      };
    }
  }
};
