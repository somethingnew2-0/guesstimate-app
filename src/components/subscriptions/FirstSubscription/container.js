import React, {Component, PropTypes} from 'react'
import * as firstSubscriptionActions from 'gModules/first_subscription/actions.js'
import FirstSubscription from './FirstSubscription.js'
import {subStage} from 'gModules/first_subscription/state_machine.js'
import {connect} from 'react-redux'
import {trackPurchaseSuccess} from 'servers/segment/index.js'
import * as spaceActions from 'gModules/spaces/actions.js'

function mapStateToProps(state) {
  return {
    me: state.me,
    firstSubscription: state.firstSubscription
  }
}

@connect(mapStateToProps)
export default class FirstSubscriptionContainer extends Component {
  displayName: 'FirstSubscriptionContainer'

  componentDidMount() {
    firstSubscriptionActions.flowStageReset()

    if (!this._paymentAccountExists()) {
      this.props.dispatch(firstSubscriptionActions.fetchIframe({
        user_id: this.props.me.id,
        plan_id: this.props.planId
      }))
    }
  }

  _onPaymentSuccess() {
    this.props.dispatch(firstSubscriptionActions.postSynchronization({
      user_id: this.props.me.id
    }))
    trackPurchaseSuccess(this.props.planId)
  }

  _onPaymentCancel() { this.props.dispatch(firstSubscriptionActions.flowStageCancel()) }

  _paymentAccountPortalUrl() { return _.get(this.props.me, 'profile.account._links.account') }
  _paymentAccountExists() { return !!_.get(this.props.me, 'profile.has_payment_account') }

  _iframeUrl() { return _.get(this.props.firstSubscription, 'iframe.href') || '' }
  _iframeWebsiteName() { return _.get(this.props.firstSubscription, 'iframe.website_name') || '' }
  _flowStage() { return subStage(this.props.firstSubscription) }

  _onNewModel() { this.props.dispatch(spaceActions.create()) }

  render() {
    return (
      <FirstSubscription
        planId={this.props.planId}
        flowStage={this._flowStage()}
        paymentAccountPortalUrl={this._paymentAccountPortalUrl()}
        iframeUrl={this._iframeUrl()}
        iframeWebsiteName={this._iframeWebsiteName()}
        onPaymentSuccess={this._onPaymentSuccess.bind(this)}
        onPaymentCancel={this._onPaymentCancel.bind(this)}
        onNewModel={this._onNewModel.bind(this)}
        isTest={false}
      />
    )
  }
}
