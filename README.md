# material-ui-render-props-styles

[![Build Status](https://travis-ci.org/jcoreio/material-ui-render-props-styles.svg?branch=master)](https://travis-ci.org/jcoreio/material-ui-render-props-styles)
[![Coverage Status](https://codecov.io/gh/jcoreio/material-ui-render-props-styles/branch/master/graph/badge.svg)](https://codecov.io/gh/jcoreio/material-ui-render-props-styles)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

[Render props](https://reactjs.org/docs/render-props.html) component wrapper for Material UI [`withStyles`](https://material-ui-next.com/customization/css-in-js/#withstyles-styles-options-higher-order-component) HoC

## Usage

```sh
npm install --save material-ui-render-props-styles
```

```js
import createStyled from 'material-ui-render-props-styles'

const styles = theme => {
  root: {
    backgroundColor: theme.palette.primary.light,
  },
}

// accepts same options as withStyles
const Styled = createStyled(styles)

const PrimaryDiv = ({children}) => (
  <Styled>
    {({classes}) => (
      <div className={classes.root}>
        {children}
      </div>
    )}
  </Styled>
)
```

## Props

### `children: (options: {classes: Object, theme: any}) => React.Node`

The render function.  It's passed the `classes` injected by JSS, and
the `theme` injected by Material-UI (if `withTheme` is true), and should
return the content to display.

### `classes?: {[className: string]: string}`

Override class names for the inner component
