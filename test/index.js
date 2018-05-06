// @flow

import {describe, it} from 'mocha'
import * as React from 'react'
import {mount} from 'enzyme'
import {expect} from 'chai'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

import WithStyles from '../src'

const theme = createMuiTheme()

describe('WithStyles', () => {
  it('works on initial mount', () => {
    const styles = theme => ({
      root: {
        backgroundColor: theme.palette.primary.light,
      },
    })

    let root: ?HTMLDivElement

    const StyledComponent = () => (
      <WithStyles styles={styles}>
        {({classes}) => (
          <div ref={c => root = c} className={classes.root} />
        )}
      </WithStyles>
    )

    mount(
      <MuiThemeProvider theme={theme}>
        <StyledComponent />
      </MuiThemeProvider>
    )
    if (!root) throw new Error('expected root to be defined')
    expect(getComputedStyle(root).backgroundColor).to.equal('rgb(121, 134, 203)')
  })
  it('works when styles are changed', () => {
    const lightStyles = theme => ({
      root: {
        backgroundColor: theme.palette.primary.light,
      },
    })
    const darkStyles = {
      root: {
        backgroundColor: theme.palette.primary.dark,
      },
    }

    let root: ?HTMLDivElement

    const StyledComponent = ({styles}) => (
      <WithStyles styles={styles}>
        {({classes}) => (
          <div ref={c => root = c} className={classes.root} />
        )}
      </WithStyles>
    )

    const wrapper = mount(
      <MuiThemeProvider theme={theme}>
        <StyledComponent styles={lightStyles} />
      </MuiThemeProvider>
    )
    if (!root) throw new Error('expected root to be defined')
    expect(getComputedStyle(root).backgroundColor).to.equal('rgb(121, 134, 203)')

    wrapper.setProps((
      <MuiThemeProvider theme={theme}>
        <StyledComponent styles={darkStyles} />
      </MuiThemeProvider>
    ).props)

    if (!root) throw new Error('expected root to be defined')
    expect(getComputedStyle(root).backgroundColor).to.equal('rgb(48, 63, 159)')
  })
})

