/**
 * 二叉搜索树
 */
function BinarySearchTree() {
  // 构造节点
  var Node = function (key) {
    this.key = key
    this.left = null
    this.right = null
  }

  // 二叉树的根节点
  var root = null

  var insertNode = (root, node) => {
    if (node.key < root.key) {
      if (root.left === null) {
        root.left = node
      } else {
        insertNode(root.left, node)
      }
    } else {
      if (root.right === null) {
        root.right = node
      } else {
        insertNode(root.right, node)
      }
    }
  }

  // 插入节点
  this.insert = key => {
    let newNode = new Node(key)
    if (root === null) {
      root = newNode
    } else {
      insertNode(root, newNode)
    }
  }

  inOrderTraverseNode = (node, callback) => {
    if (node) {
      inOrderTraverseNode(node.left, callback)
      callback(node.key)
      inOrderTraverseNode(node.right, callback)
    }
  }

  // 中序遍历
  this.inOrderTraverse = callback => {
    inOrderTraverseNode(root, callback)
  }

  preOrderTraverseNode = (node, callback) => {
    if (node) {
      callback(node.key)
      preOrderTraverseNode(node.left, callback)
      preOrderTraverseNode(node.right, callback)
    }
  }

  // 前序遍历
  this.preOrderTraverse = callback => {
    preOrderTraverseNode(root, callback)
  }

  postOrderTraverseNode = (node, callback) => {
    if (node) {
      postOrderTraverseNode(node.left, callback)
      postOrderTraverseNode(node.right, callback)
      callback(node.key)
    }
  }

  // 后序遍历
  this.postOrderTraverse = callback => {
    postOrderTraverseNode(root, callback)
  }

  var minNode = node => {
    if (node) {
      while (node && node.left) {
        node = node.left
      }

      return node.key
    }

    return null
  }

  // 最小节点
  this.min = () => {
    return minNode(root)
  }

  var maxNode = node => {
    if (node) {
      while (node && node.right) {
        node = node.right
      }

      return node.key
    }

    return null
  }

  // 最大节点
  this.max = () => {
    return maxNode(root)
  }

  var searchNode = (node, key) => {
    if (node === null) {
      return false
    }

    if (key < node.key) {
      return searchNode(node.left, key)
    } else if (key > node.key) {
      return searchNode(node.right, key)
    } else {
      return true
    }
  }

  // 查找节点
  this.search = key => {
    return searchNode(root, key)
  }

  var findMinNode = node => {
    if (node) {
      while (node && node.left) {
        node = node.left
      }

      return node
    }

    return null
  }

  var removeNode = (node, key) => {
    if (node === null) {
      return null
    }

    if (key < node.key) {
      node.left = removeNode(node.left, key)
    } else if (key > node.key) {
      node.right = removeNode(node.right, key)
    } else {
      if (node.left === null && node.right === null) {
        node = null
        return node
      }

      if (node.left === null) {
        node = node.right
        return node
      } else if (node.right === null) {
        node = node.left
        return node
      }

      var aux = findMinNode(node.right)
      node.key = aux.key
      node.right = removeNode(node.left, aux.key)
      return node
    }
  }

  // 删除节点
  this.remove = key => {
    removeNode(root, key)
  }
}

var binarySearchTree = new BinarySearchTree()
var nodes = [8, 3, 10, 1, 6, 14, 4, 7, 13]
nodes.forEach(key => {
  binarySearchTree.insert(key)
})

var arr = []
var callback = key => {
  arr.push(key)
}

binarySearchTree.inOrderTraverse(callback)
console.log('中序遍历: ' + arr.join(' -> '))
arr = []
binarySearchTree.preOrderTraverse(callback)
console.log('前序遍历: ' + arr.join(' -> '))
arr = []
binarySearchTree.postOrderTraverse(callback)
console.log('后序遍历: ' + arr.join(' -> '))

console.log('Min: ' + binarySearchTree.min())
console.log('Max: ' + binarySearchTree.max())

console.log(binarySearchTree.search(7) ? 'key 7 is found' : 'key 7 is not found')
console.log(binarySearchTree.search(9) ? 'key 9 is found' : 'key 9 is not found')

binarySearchTree.remove(3)