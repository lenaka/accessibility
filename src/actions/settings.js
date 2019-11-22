import cssVarsPonyfill from 'css-vars-ponyfill';
import { types, defaultSpecialSettings } from '../reducers/settings';

// Note: css-variables polyfill for ie9+
cssVarsPonyfill({
	silent: true
});

const updateVars = (getState, values) => {
	const newValues = { ...values };

	const {
		isShowImage, letterSpacing, font, curColorScheme, colorSchemes
	} = getState().settings || {};
	const colorScheme = newValues.curColorScheme && newValues.curColorScheme !== curColorScheme
		? colorSchemes[newValues.curColorScheme]
		: colorSchemes[curColorScheme];

	delete newValues.curColorScheme;
	cssVarsPonyfill({
		silent: true,
		variables: {
			...colorScheme,
			isShowImage,
			letterSpacing,
			font,
			...newValues
		}
	});
};

export const changeScheme = colorScheme => (dispatch, getState) => {
	localStorage.setItem('curColorScheme', colorScheme);
	updateVars(getState, { curColorScheme: colorScheme });

	dispatch(setScheme(colorScheme));
};

const setScheme = colorScheme => ({
	type: types.CHANGE_COLOR_SCHEME,
	payload: colorScheme
});

export const changeImagesShowing = isShowImage => (dispatch, getState) => {
	localStorage.setItem('--isShowImage', isShowImage);
	updateVars(getState, { isShowImage });

	dispatch({
		type: types.CHANGE_IMAGES_SHOWING,
		payload: isShowImage
	});
};

export const changeLetterSpacing = letterSpacing => (dispatch, getState) => {
	localStorage.setItem('--letterSpacing', letterSpacing);
	updateVars(getState, { letterSpacing });

	dispatch({
		type: types.CHANGE_LETTER_SPACING,
		payload: letterSpacing
	});
};

export const changeFont = font => (dispatch, getState) => {
	localStorage.setItem('--font', font);
	updateVars(getState, { font });

	dispatch({
		type: types.CHANGE_FONT,
		payload: font
	});
};

export const resetSpecialSettings = () => (dispatch, getState) => {
	const {
		settings: {
			curColorScheme,
			isShowImage,
			letterSpacing,
			font
		}
	} = getState();

	updateVars(getState, { defaultSpecialSettings });
	if (curColorScheme !== 'standard') {
		dispatch(changeScheme('standard'));
	}
	if (isShowImage) {
		dispatch(changeImagesShowing(''));
	}
	if (letterSpacing) {
		dispatch(changeLetterSpacing(''));
	}
	if (font) {
		dispatch(changeFont(''));
	}

	return {
		type: types.RESET_SETTINGS
	};
};

export const getInitialSpecialSettings = () => (dispatch) => {
	const colorScheme = localStorage.getItem('colorScheme') || 'standard';
	const isShowImage = localStorage.getItem('--isShowImage') || '';
	const letterSpacing = localStorage.getItem('--letterSpacing') || '';
	const font = localStorage.getItem('--font') || '';

	if (colorScheme !== 'standard') {
		dispatch(changeScheme(colorScheme));
	}
	if (isShowImage) {
		dispatch(changeImagesShowing(isShowImage));
	}
	if (letterSpacing) {
		dispatch(changeLetterSpacing(letterSpacing));
	}
	if (font) {
		dispatch(changeFont(font));
	}
};
