import React, {Component, PropTypes} from 'react'
import Dimensions from 'gComponents/utility/react-dimensions';
import Edges from './edges';
import $ from 'jquery'
import _ from 'lodash'

let upto = (n) => Array.apply(null, {length: n}).map(Number.call, Number)
//Listens to events for changes to row heights and column width
@Dimensions()
export default class EdgeContainer extends Component {
  displayName: 'EdgeContainer'

  static propTypes = {
    containerWidth: PropTypes.number,
    rowHeights: PropTypes.array.isRequired,
    edges: PropTypes.array.isRequired,
    refs: PropTypes.object.isRequired,
    rowCount: PropTypes.number.isRequired,
  }

  state = {
    columnWidth: null
  }
  componentWillUpdate(newProps) {
    if (newProps.containerWidth !== this.props.containerWidth){
      this.getColumnWidth()
    }
  }

  getColumnWidth() {
    const width = $('.FlowGridCell') && $('.FlowGridCell')[0] && $('.FlowGridCell')[0].offsetWidth
    this.setState({columnWidth: width})
  }

  render() {
    const {edges} = this.props
    const {columnWidth} = this.state

    const rowHeights = this.props.rowHeights
    const containerHeight = _.get(rowHeights, 'length') && rowHeights.reduce((a,b) => a + b)
    return (
      <Edges
          columnWidth={columnWidth}
          containerHeight={containerHeight}
          edges={edges}
          rowHeights={rowHeights}
      />
    )
  }
}
