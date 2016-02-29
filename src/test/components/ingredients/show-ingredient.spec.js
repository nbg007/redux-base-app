import expect from 'expect'
import React from 'react'
import { createRenderer } from 'react-addons-test-utils'
import ShowIngredient from '../../components/ingredients/show-ingredient'
import expectJSX from 'expect-jsx';

expect.extend(expectJSX);

function setup() {
  const props = {
    notifications: [{id: '1', name: 'sugar', stock: 23}],
    t: expect.createSpy(),
    toggleModal: expect.createSpy(),
    modal: {id: 'notifications', isOpen: true}
  }
  const renderer = createRenderer()
  const component = renderer.render(<Notifications {...props}/>)
  return {
    component: renderer.getRenderOutput(),
    props: props
  }
}

describe('Notifications component', () => {
  describe('structural test', () => {
    it('is a div element', () => {
      const {component} = setup()
      expect(component.type).toEqual('div')
    })
    it('should render a div element', () => {
      const {component} = setup()
      expect(component.props.className).toEqual('notifications')
    })
    it('should have one notification component', () => {
      const { component } = setup()  
      expect(component.props.children[1].props.children[1].props.children.length).toEqual(1)
      expect(component.props.children[1].props.children[1].props.children[0].type).toEqual(Notification)
    })
    // Not sure about this test. Why this is useful? it is very coupled to html implementation
    it('should render the right structure', () => {
      const {component, props: {notifications: [{id, name, stock}], t, modal}} = setup()
      expect(component).toEqualJSX(
        <div className='notifications'>
          <button onClick={() => toggleModal(modal.id)}>{t("notifications.title")}</button>
          <Modal
            isOpen={modal.isOpen}
            style={customStyles} >

            <h3>{t('notifications.title')}</h3>
            <li>
              <Notification stock={stock} name={name} key={id} t={t}/>
            </li>
            <button onClick={() => props.toggleModal()}>{t('notifications.closeButton')}</button>
          </Modal>
        </div>
      )
    })
  })
  describe('behaviour test', () => {
    it('should call toggle modal when click on button', () => {
      const { component, props } = setup()
      component.props.children[0].props.onClick()
      expect(props.toggleModal).toHaveBeenCalled()
    })
  })
})
