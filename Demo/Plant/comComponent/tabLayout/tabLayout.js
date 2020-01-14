Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    tabList: Array,
    type: {
      value: 0,
      type: Number
    }
  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
    },
    detached() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  data: {
    // 这里是一些组件内部数据
    selectIndex: 0, //当前选中的tab
  },
  methods: {
    // 这里是一个自定义方法
    clickTab(e) {
      this.setData({
        selectIndex: e.currentTarget.dataset.index
      })
      this.triggerEvent('clickTab', e.currentTarget.dataset.index)
    },
  }
})