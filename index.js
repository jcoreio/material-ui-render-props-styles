'use strict'

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = createStyled

var _objectWithoutProperties2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectWithoutProperties')
)

var React = _interopRequireWildcard(require('react'))

var _propTypes = _interopRequireDefault(require('prop-types'))

var _withStyles = _interopRequireDefault(
  require('@material-ui/core/styles/withStyles')
)

function createStyled(styles) {
  var options =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}

  function Styled(props) {
    var children = props.children,
      other = (0, _objectWithoutProperties2.default)(props, ['children'])
    return children(other)
  }

  Styled.propTypes = {
    children: _propTypes.default.func.isRequired,
    classes: _propTypes.default.object.isRequired,
  }
  return (0, _withStyles.default)(styles, options)(Styled)
}
