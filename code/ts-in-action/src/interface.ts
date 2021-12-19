/** 用户信息接口 */
interface UserInfo {
  /** 用户代号 */
  id: number,
  /** 用户名 */
  name: string
}
/** 后端返回用户数据接口 */
interface UserData {
  /** 用户数据 - 用户信息数组 */
  data: UserInfo[]
}

/**
 * 渲染函数
 * @param result 后端返回的用户数据
 */
function render(result: UserData) {
  result.data.forEach(v => {
    console.log(v.id, v.name)
  })
}

// --- 业务模拟 ---
// 1. 从后端获得数据结果
const result = {
  data: [
    { id: 1, name: '小明' },
    { id: 2, name: '小红' }
  ]
}
// 2. 渲染数据结构
render(result)
