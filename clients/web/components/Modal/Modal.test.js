import React from 'react'
import { mount, shallow } from 'enzyme'
import Modal from './Modal'

describe('Modal Component', () => {
  it('should render', () => {
    const component = shallow(<Modal />)
    expect(component.find('.c-modal').exists()).toBe(true)
    expect(component.find('.c-modal-content').exists()).toBe(true)
    expect(component.find('.c-modal-button').exists()).toBe(true)
  })
  it('Should render the correct icon', () => {
    const testValue = 'test'
    const component = mount(<Modal icon={testValue} />)
    expect(component.find(`.fa-${testValue}`).exists()).toBe(true)
  })
  it('Should render the correct message', () => {
    const testValue = 'test'
    const component = shallow(<Modal>{testValue}</Modal>)
    expect(component.find('.c-modal-content').text()).toContain(testValue)
  })
  it('Should render 2 buttons only if there is a confirm function', () => {
    let component = shallow(<Modal />)
    expect(component.find('.c-modal-button')).toHaveLength(1)
    component = shallow(<Modal type="confirm" />)
    expect(component.find('.c-modal-button')).toHaveLength(2)
  })
  it('Should close when the OK or Cancel buttons are tapped', () => {
    const closeMock = jest.fn()
    const component = shallow(<Modal close={closeMock} />)
    const mockedEvent = { target: {}, preventDefault: () => {} }
    component.find('.c-modal-button').simulate('click', mockedEvent)
    expect(closeMock.mock.calls).toHaveLength(1)
  })
  it('Should confirm when the confirm button is tapped', () => {
    const confirmMock = jest.fn()
    const component = shallow(<Modal confirm={confirmMock} type="confirm" />)
    const mockedEvent = { target: {}, preventDefault: () => {} }
    component.find('.c-modal-button').at(1).simulate('click', mockedEvent)
    expect(confirmMock.mock.calls).toHaveLength(1)
  })
})
