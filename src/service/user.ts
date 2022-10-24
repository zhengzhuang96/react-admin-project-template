/*
 * @Author: {zhengzhuang}
 * @Date: 2022-07-28 13:36:53
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2022-08-12 17:49:36
 * @Description:
 */

// 登录
export const login = async (params: { mobile: string; password: string; key: string; id: string }) => {
  const res = await $request.post('/login', params)
  return {
    token: res.token,
  }
}