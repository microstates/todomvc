import { expect } from 'chai'
import { h, mount } from 'bore'

describe('todo-mvc component', function() {
  it('renders', function() {
    return mount(<todo-mvc name="This is a test" />).wait(wrapper => {
      const { node: p } = wrapper.one('p')

      expect(p.innerHTML).to.equal('Hello, this is a test!')
    })
  })
})
