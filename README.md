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
import WithStyles from 'material-ui-render-props-styles'

const styles = theme => {
  root: {
    backgroundColor: theme.palette.primary.light,
  },
}

const PrimaryDiv = ({children}) => (
  <WithStyles styles={styles}>
    {({classes}) => (
      <div className={classes.root}>
        {children}
      </div>
    )}
  </WithStyles>
)
```

## Props

### `styles: Object | (theme: any) => Object`

The JSS styles passed to `withStyles(styles, [options])`

### `children: (options: {classes: Object, theme: any}) => React.Node`

The render function.  It's passed the `classes` injected by JSS, and
the `theme` injected by Material-UI (if `withTheme` is true), and should
return the content to display.

### `classes?: {[className: string]: string}`

Override class names for the inner component

### `withTheme?: boolean`

Whether to pass the theme to `children`.

### `name?: string`

The name of the style sheet. Useful for debugging. If the value isn't provided, it will try to fallback to the name of the component.

### `flip?: boolean`

When set to false, this sheet will opt-out the rtl transformation. When set to true, the styles are inversed. When set to null, it follows theme.direction

### `options?: Object`

Additional options for [`jss.createStyleSheet([styles], [options])`](http://cssinjs.org/js-api/#create-style-sheet)
