
export const types = {
	GET_INITIAL_SETTINGS: 'GET_INITIAL_SETTINGS',
	CHANGE_COLOR_SCHEME: 'CHANGE_COLOR_SCHEME',
	CHANGE_IMAGES_SHOWING: 'CHANGE_IMAGES_SHOWING',
	CHANGE_LETTER_SPACING: 'CHANGE_LETTER_SPACING',
	CHANGE_FONT: 'CHANGE_FONT',
	RESET_SETTINGS: 'RESET_SETTINGS',

};

export const defaultSpecialSettings = {
	curColorScheme: 'standard',
	isShowImage: '',
	letterSpacing: '',
	font: ''
};

const initialState = {
	colorSchemes: {
		standard: {
			backgroundColor: '',
			textColor: '',
		},
		contrast: {
			backgroundColor: '#f3f3f3',
			textColor: '#000',
		},
		inversion: {
			backgroundColor: '#000',
			textColor: '#fff',
		},
	},
	...defaultSpecialSettings,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case types.GET_INITIAL_SETTINGS:
			return {
				...state,
				...action.payload
			};

		case types.CHANGE_COLOR_SCHEME:
			return {
				...state,
				curColorScheme: action.payload
			};

		case types.CHANGE_IMAGES_SHOWING:
			return {
				...state,
				isShowImage: action.payload
			};

		case types.CHANGE_LETTER_SPACING:
			return {
				...state,
				letterSpacing: action.payload
			};

		case types.CHANGE_FONT:
			return {
				...state,
				font: action.payload
			};

		case types.RESET_SETTINGS:
			return {
				...state,
				...defaultSpecialSettings
			};

		default:
			return state;
	}
}
