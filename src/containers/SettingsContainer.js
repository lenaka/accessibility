import React, { Component } from 'react'
import { connect } from 'react-redux'
import Settings from '../components/Settings'
import {
	changeScheme,
	changeFont,
	changeImagesShowing,
	changeLetterSpacing,
	resetSpecialSettings,
} from '../actions/settings';

class SettingsContainer extends Component {
	render() {
		return <Settings {...this.props} />
	}
}

const mapStateToProps = ({ settings }) => { console.log('SS', {...settings}); return{
	...settings
}};
const mapDispatchToProps = dispatch => ({
	changeScheme: (scheme) => dispatch(changeScheme(scheme)),
	changeFont: (scheme) => dispatch(changeFont(scheme)),
	changeImagesShowing: (scheme) => dispatch(changeImagesShowing(scheme)),
	changeLetterSpacing: (scheme) => dispatch(changeLetterSpacing(scheme)),
	resetSpecialSettings: (scheme) => dispatch(resetSpecialSettings(scheme)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer)
