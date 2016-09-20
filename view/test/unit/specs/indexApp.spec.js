import Vue from 'vue'
import indexApp from 'src/components/indexApp.vue'

describe('indexApp.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      components: { indexApp }
    }).$mount()
    expect(vm.$el.querySelector('.hello h1').textContent).to.contain('Hello World!')
  })
})
