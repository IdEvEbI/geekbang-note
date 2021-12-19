# 接口

## 1. 接口的定义

接口可以用来约束**对象**、**函数**、以及**类**的结构和类型，**接口是代码协作的契约**，我们必须遵守，而且不能改变。

## 2. 快速体验

1. 定义**用户信息接口**和**后端返回用户数据接口**：

   ```ts
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
   ```

2. 模拟**渲染函数**，在控制台输出后端返回的用户数据：

   ```ts
   /**
    * 渲染函数
    * @param result 后端返回的用户数据
    */
   function render(result: UserData) {
     result.data.forEach(v => {
       console.log(v.id, v.name)
     })
   }
   ```

3. **业务模拟** - 从后端获得数据结果，调用 `render` 函数渲染输出：

   ```ts
   // 1. 从后端获得数据结果
   const result = {
     data: [
       { id: 1, name: '小明' },
       { id: 2, name: '小红' }
     ]
   }

   // 2. 渲染数据结构
   render(result)
   ```
