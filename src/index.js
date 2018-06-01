// @flow

import * as React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'material-ui/styles/withStyles'

export type ExtractClasses = <T: Object>(styles: ((theme: any) => T) | T) => {[name: $Keys<T>]: string}
export type Classes<Styles: Object | (theme: any) => Object> = $Call<ExtractClasses, Styles>

export type Props<Theme, Styles: Object> = {
  classes?: ?$Shape<Classes<Styles>>,
  children: (props: {classes: Classes<Styles>, theme: Theme}) => React.Node,
}

export default function createStyled<Theme, Styles: Object>(
  styles: ((theme: Theme) => Styles) | Styles,
  options?: {
    withTheme?: ?boolean,
    name?: ?string,
    flip?: ?boolean,
  } = {},
): React.ComponentType<Props<Theme, Styles>> {
  function Styled(props: {
    classes: Classes<Styles>,
    theme: Theme,
    children: (props: {classes: Classes<Styles>, theme: Theme}) => React.Node,
  }): React.Node {
    const {children, ...other} = props
    return children(other)
  }
  Styled.propTypes = {
    children: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  }
  return withStyles(styles, options)(Styled)
}

