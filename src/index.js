// @flow

import * as React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

export type Classes<Styles> = $Call<
  <T>((any) => T | T) => { [name: $Keys<T>]: string },
  Styles
>
export type ClassKeys<Styles> = $Call<<T>((any) => T | T) => $Keys<T>, Styles>

export type Props<Theme, ClassKeys> = {
  classes?: ?$Shape<{ [ClassKeys]: string }>,
  children: (props: {
    classes: { [ClassKeys]: string },
    theme: Theme,
  }) => React.Node,
}

type ExtractOptions = <O>((styles: any, options: O) => any) => O

type Options = $Call<ExtractOptions, typeof withStyles>

export default function createStyled<Theme, ClassKeys>(
  styles: ((theme: Theme) => { [ClassKeys]: Object }) | { [ClassKeys]: Object },
  options?: Options = {}
): React.ComponentType<Props<Theme, ClassKeys>> {
  function Styled(props: {
    classes: { [ClassKeys]: string },
    theme: Theme,
    children: (props: {
      classes: { [ClassKeys]: string },
      theme: Theme,
    }) => React.Node,
  }): React.Node {
    const { children, ...other } = props
    return children(other)
  }
  Styled.propTypes = {
    children: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  }
  return withStyles(styles, options)(Styled)
}
