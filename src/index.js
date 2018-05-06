// @flow

import * as React from 'react'
import {withStyles} from 'material-ui/styles'
import {createSelector} from 'reselect'

export type ExtractClasses = <T: Object>(styles: ((theme: any) => T) | T) => {[name: $Keys<T>]: string}
export type Classes<Styles: Object | (theme: any) => Object> = $Call<ExtractClasses, Styles>

export type Props<Theme, Styles: Object> = {
  styles: ((theme: Theme) => Styles) | Styles,
  withTheme?: boolean,
  name?: string,
  flip?: boolean,
  options?: Object,
  children: (props: {classes: {[name: $Keys<Styles>]: string}, theme: Theme}) => React.Node,
}

export default class WithStyles<Theme, Styles: Object> extends React.PureComponent<Props<Theme, Styles>> {
  _selectWrapper = createSelector(
    props => props.styles,
    props => Boolean(props.withTheme),
    props => props.name,
    props => Boolean(props.flip),
    props => props.options,
    (styles: any, withTheme: boolean, name: ?string, flip: boolean, options?: Object = {}): React.ComponentType<Object> => {
      const RenderWithStyles = ({classes, theme}) => (
        this.props.children({classes, theme})
      )
      return withStyles(styles, {
        withTheme,
        name,
        flip,
        ...options,
      })(RenderWithStyles)
    }
  )

  render(): React.Node {
    const Wrapper = this._selectWrapper(this.props)
    return <Wrapper />
  }
}

