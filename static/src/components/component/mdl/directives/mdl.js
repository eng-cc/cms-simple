export default {
  bind () {
    if (window.componentHandler) {
      componentHandler.upgradeElements(this.el)
    }
  }
}
