/*
 * @Author: {zhengzhuang}
 * @Date: 2022-08-10 11:12:38
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2022-08-10 11:20:55
 * @Description: 
 */

/**
 * @Name: 查找id子节点
 * @param {Object} treeObj  目标树
 * @param {*} targetNode    目标节点id
 * @returns
 */
export const getNodeRoute = (treeObj, targetNode) => {
  const nodePathArray: any = [];

  function getNodeUrl(tree: any, targetId: any) {
    for (let index = 0; index < tree.length; index++) {
      if (tree[index].children) {
        const endRecursiveLoop = getNodeUrl(tree[index].children, targetId);
        if (endRecursiveLoop) {
          nodePathArray.push(tree[index]);
          return true;
        }
      }
      if (tree[index].path === targetId) {
        nodePathArray.push(tree[index]);
        return true;
      }
    }
  }
  getNodeUrl(treeObj, targetNode);

  return nodePathArray.reverse();
};