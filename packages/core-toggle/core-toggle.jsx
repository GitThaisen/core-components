import React from 'react'
import coreToggle from '../core-toggle/core-toggle'
import {exclude} from '../utils'

const DEFAULTS = {open: null, popup: null}

export default class Toggle extends React.Component {
  componentDidMount () { coreToggle(this.el.firstElementChild) } // Mount client side only to avoid rerender
  componentDidUpdate () { coreToggle(this.el.firstElementChild) } // Must mount also on update in case content changes
  render () {
    return React.createElement('div', exclude(this.props, DEFAULTS, {ref: (el) => (this.el = el)}),
      React.Children.map(this.props.children, (child, adjacent) => adjacent
        ? React.cloneElement(child, {'hidden': !this.props.open})
        : React.cloneElement(child, {
          'aria-expanded': String(Boolean(this.props.open)),
          'aria-haspopup': String(Boolean(this.props.popup))
        })
      )
    )
  }
}
