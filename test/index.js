// @flow

import {describe, it} from 'mocha'
import * as React from 'react'
import {mount} from 'enzyme'
import {expect} from 'chai'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import createStyled from '../src'

const theme = createMuiTheme()

describe('createStyled', () => {
  it('injects classes', () => {
    const styles = theme => ({
      root: {
        backgroundColor: theme.palette.primary.light,
      },
    })

    let root: ?HTMLDivElement

    const Styled = createStyled(styles)

    const StyledComponent = () => (
      <Styled>
        {({classes}) => (
          <div ref={c => root = c} className={classes.root} />
        )}
      </Styled>
    )

    mount(
      <MuiThemeProvider theme={theme}>
        <StyledComponent />
      </MuiThemeProvider>
    )
    if (!root) throw new Error('expected ref to <div> to be defined')
    expect(getComputedStyle(root).backgroundColor).to.equal('rgb(121, 134, 203)')
  })
  it('injects theme when given withStyles: true', () => {
    const styles = theme => ({
      root: {
        backgroundColor: theme.palette.primary.light,
      },
    })

    let root: ?HTMLDivElement

    const Styled = createStyled(styles, {withTheme: true})

    const StyledComponent = () => (
      <Styled>
        {({classes, theme}) => (
          <div
            ref={c => root = c}
            className={classes.root}
            style={{backgroundColor: theme.palette.primary.dark}}
          />
        )}
      </Styled>
    )

    mount(
      <MuiThemeProvider theme={theme}>
        <StyledComponent />
      </MuiThemeProvider>
    )
    if (!root) throw new Error('expected ref to <div> to be defined')
    expect(getComputedStyle(root).backgroundColor).to.equal('rgb(48, 63, 159)')
  })
  it('merges passed classes', () => {
    const styles1 = theme => ({
      root: {
        backgroundColor: theme.palette.primary.light,
      },
    })
    const styles2 = theme => ({
      root: {
        backgroundColor: theme.palette.primary.dark,
      },
    })

    let root: ?HTMLDivElement

    const Styled1 = createStyled(styles1, {name: 'One'})
    const Styled2 = createStyled(styles2, {name: 'Two'})

    const StyledComponent = () => (
      <Styled2>
        {({classes}) => (
          <Styled1 classes={classes}>
            {({classes}) => (
              <div ref={c => root = c} className={classes.root} />
            )}
          </Styled1>
        )}
      </Styled2>
    )

    mount(
      <MuiThemeProvider theme={theme}>
        <StyledComponent />
      </MuiThemeProvider>
    )

    if (!root) throw new Error('expected ref to <div> to be defined')
    expect(root.className).to.match(/One-root-\d+ Two-root-\d+/)
  })
})
