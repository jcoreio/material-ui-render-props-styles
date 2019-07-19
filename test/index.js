// @flow

import { describe, it } from 'mocha'
import * as React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import createStyled, { type Classes, type ClassKeys } from '../src'

const theme = createMuiTheme({})
type Theme = typeof theme

describe('createStyled', () => {
  it('injects classes', () => {
    const styles = (theme: Theme) => ({
      root: {
        backgroundColor: theme.palette.primary.light,
      },
    })

    const classes: Classes<typeof styles> = { root: 'cls01' }
    classes.root

    let root: ?HTMLDivElement

    const Styled = createStyled<Theme, ClassKeys<typeof styles>>(styles)

    const StyledComponent = () => (
      <Styled>
        {({ classes }: { classes: Classes<typeof styles> }) => (
          <div ref={c => (root = c)} className={classes.root} />
        )}
      </Styled>
    )

    mount(
      <MuiThemeProvider theme={theme}>
        <StyledComponent />
      </MuiThemeProvider>
    )
    if (!root) throw new Error('expected ref to <div> to be defined')
    expect(getComputedStyle(root).backgroundColor).to.equal(
      'rgb(121, 134, 203)'
    )
  })
  it('injects theme when given withStyles: true', () => {
    const styles = (theme: Theme) => ({
      root: {
        backgroundColor: theme.palette.primary.light,
      },
    })

    let root: ?HTMLDivElement

    const Styled = createStyled<Theme, ClassKeys<typeof styles>>(styles, {
      withTheme: true,
    })

    const StyledComponent = () => (
      <Styled>
        {({
          classes,
          theme,
        }: {
          classes: Classes<typeof styles>,
          theme: Theme,
        }) => (
          <div
            ref={c => (root = c)}
            className={classes.foo}
            style={{ backgroundColor: theme.palette.primary.dark }}
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

    const Styled1 = createStyled<Theme, ClassKeys<typeof styles1>>(styles1, {
      name: 'One',
    })
    const Styled2 = createStyled<Theme, ClassKeys<typeof styles2>>(styles2, {
      name: 'Two',
    })

    const StyledComponent = () => (
      <Styled2>
        {({ classes }) => (
          <Styled1 classes={classes}>
            {({ classes }) => (
              <div ref={c => (root = c)} className={classes.root} />
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
