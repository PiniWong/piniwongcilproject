// 工具集合


// 数组分组
const groupBy = (array, f, returnObject = true) => {
  const groups = {}
  array.forEach(el => {
    if (el.parentId === 0) {
      groups[el.menuId] = []
    }
    // const group = JSON.stringify(f(el))
    const group = f(el)
    groups[group] = groups[group] || []
    groups[group].push(el)
  })
  if (returnObject) {
    return groups
  } else {
    let g = Object.keys(groups).map(function(group) {
      return groups[group]
    })
    return g
  }
}
// 生成树形菜单数据
const getTreeData = source => {
  const cloneData = JSON.parse(JSON.stringify(source))
  const checkedKeys = []
  const menu = cloneData.filter(father => {
    father.scopedSlots = { title: 'name' }
    father.title = father.name
    father.key = father.id
    if (father.parentId !== 0 && father.checked) {
      checkedKeys.push(father.id)
    }
    const branchArr = cloneData.filter(child => {
      return father.id === child.parentId
    })
    branchArr.length > 0 ? (father.children = branchArr) : ''
    return father.parentId === 0
  })
  return {
    menu,
    checkedKeys
  }
}
// 判断数据类型
const checkType = (val) => {
  return Object.prototype.toString.call(val).slice(8, -1)
}
// 对象数组去重
const uniqueObjArray = (arr, key) => {
  var hash = {}
  const newArr = arr.reduce((item, next) => {
    hash[next[key]] ? '' : (hash[next[key]] = true && item.push(next))
    return item
  }, [])
  return newArr
}
const util = {
  authLogin,
  groupBy,
  getTreeData,
  checkType,
  uniqueObjArray
}
// 自定义表单验证规则
const validator = {
  phone: (rule, value, emit) => {
    if (typeof value === 'undefined' || value === '') {
      emit()
      return
    }
    if (!/^1\d{10}$/.test(value)) {
      emit('请输入正确的手机号码')
    } else {
      emit()
    }
  },
  email:(rule, value, emit)=>{
    if (typeof value === 'undefined' || value === '') {
      emit()
      return
    }
    if(!/^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/.test(value)){
      emit('请输入正确的邮箱')
    }else{
      emit()
    }
  },
  QQ:(rule, value, emit)=>{
    if (typeof value === 'undefined' || value === '') {
      emit()
      return
    }
    if(!/^[1-9][0-9]{4,}$/.test(value)){
      emit('请输入正确的QQ号码')
    }else{
      emit()
    }
  },
  idCard: (rule, value, emit) => {
    if (typeof value === 'undefined' || value === '') {
      emit()
      return
    }
    if (!/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|[Xx])$/.test(value)) {
      emit('请输入正确的身份证')
    } else {
      emit()
    }
  },
  number: (rule, value, emit) => {
    // if (!/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)) {
    if (typeof value === 'undefined' || value === '') {
      emit()
      return
    }
    if (!/^[0-9]+\.{0,1}[0-9]{0,2}$/.test(value)) {
      emit('请输入数字')
    } else {
      emit()
    }
  },
  //  验证整数
  digits: (rule, value, emit) => {
    if (typeof value === 'undefined' || value === '') {
      emit()
      return
    }
    if (!/^\d+$/.test(value)) {
      emit('请输入整数')
    } else {
      emit()
    }
  },
  // 验证正整数
  positiveInteger: (rule, value, emit) => {
    if (typeof value === 'undefined' || value === '') {
      emit()
    }
    if (!/^[1-9]\d*$/.test(value)) {
      emit('请输入正整数')
    } else {
      emit()
    }
  }
  // 验证密码 8-16 大小写 + 数字 /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/
}

export { util, validator }
