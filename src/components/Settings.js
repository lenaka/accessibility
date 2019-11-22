import React, { PureComponent } from 'react';
import cn from 'classnames';
import EyeIcon from './Icon/Eye';
import './settings.css';

class Setting extends PureComponent {
	state = {
		isOpen: false,
	};

	open = () => {
		this.setState({
				isOpen: true,
		});
	};

	close = () => {
		this.state.isOpen && this.setState({
			isOpen: false,
		}, () => {
			const view = document.querySelector('.Setting__view');
			view && view.focus();
		});
	};

	changeImagesShowing = (value) => {
		const {
			isShowImage,
			changeImagesShowing ,
		} = this.props;
		if (isShowImage !== value) {
			changeImagesShowing(value);
		}
	};

	changeScheme = (value) => {
		const { curColorScheme, changeScheme } = this.props;
		if (curColorScheme !== value) {
			changeScheme(value);
		}
	};

	changeLetterSpacing = (value) => {
		const {
			letterSpacing ,
			changeLetterSpacing ,
		} = this.props;
		if (letterSpacing !== value) {
			changeLetterSpacing(value);
		}
	};

	changeFont = (value) => {
		const { font, changeFont } = this.props;
		if (font !== value) {
			changeFont(value);
		}
	};

	render() {
		const {
			curColorScheme,
			isShowImage,
			letterSpacing,
			font,
			resetSpecialSettings,
		} = this.props;
		const { isOpen } = this.state;

		const SettingStyle = cn(
			'Setting',
			{
				Setting_open: isOpen,
			},
		);

		return (
			<div className={SettingStyle}>
				<button
					tabIndex="0"
					title="для людей с инвалидностью"
					onKeyDown={e => e.keyCode === 13 && this.open(e)}
					onClick={this.open}
					className="Setting__view"
					type="button"
				>
					<EyeIcon />
				</button>

				{isOpen && <div
					className="Setting__dropdown"
					aria-hidden={!isOpen}
					role="dialog"
					ref={ref => this.dropdownRef = ref}
				>
					<div className="Setting__aside">
						<button
							title="Закрыть"
							onClick={this.close}
							className="Setting__close"
							type="button"
						>
							<svg
								version="1.1"
								id="Layer_1"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
							>
								<line fill="none" stroke="#666766" strokeWidth="2" strokeMiterlimit="10" x1="0.8" y1="0.8" x2="23.1" y2="23.1"/>
								<line fill="none" stroke="#666766" strokeWidth="2" strokeMiterlimit="10" x1="23.1" y1="0.9" x2="0.8" y2="23.2"/>
							</svg>

						</button>

						<button
							className="Setting__restart"
							onClick={resetSpecialSettings}
							type="button"
							title="Сбросить настройки"
						>
							<svg
								className="icon"
								height="20"
								viewBox="0 0 1024 1024"
								version="1.1"
						    xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M512 143.36c-225.28 0-409.6 184.32-409.6 409.6s184.32 409.6 409.6 409.6 409.6-184.32 409.6-409.6c0-102.4-35.84-194.56-97.28-266.24l-102.4 61.44c51.2 51.2 87.04 128 87.04 204.8 0 163.84-133.12 291.84-291.84 291.84S220.16 716.8 220.16 552.96 348.16 261.12 512 261.12v66.56c0 25.6 20.48 40.96 46.08 25.6l204.8-122.88c25.6-15.36 25.6-35.84 0-51.2l-204.8-122.88c-25.6-15.36-46.08-5.12-46.08 20.48v66.56z"
									fill="#939393"/>
							</svg>
						</button>
					</div>

					<div className="Setting__content">
						<div>Цвет:
							<button
								className={cn(
									'Setting__button Setting__button_color-standard',
									{ active: curColorScheme === 'standard' },
								)}
								onClick={() => this.changeScheme('standard')}
								title='Стандартный'
							>
								Стандартный
							</button>
							<button
								className={cn(
									'Setting__button Setting__button_color-contrast',
									{ active: curColorScheme === 'contrast' },
								)}
								onClick={() => this.changeScheme('contrast')}
								title='Контрастный'
							>
								Контрастный
							</button>
							<button
								className={cn(
									'Setting__button Setting__button_color-inversion',
									{ active: curColorScheme === 'inversion' },
								)}
								onClick={() => this.changeScheme('inversion')}
								title='Инверсия'
							>
								Инверсия
							</button>
						</div>

						<div>Изображения:
							<button
								className={cn(
									'Setting__button',
									{ active: !isShowImage },
								)}
								onClick={() => this.changeImagesShowing('')}
								title='Показывать'
							>
								Показывать
							</button>
							<button
								className={cn(
									'Setting__button',
									{ active: isShowImage },
								)}
								onClick={() => this.changeImagesShowing('none')}
								title='Не показывать'
							>
								Не показывать
							</button>
						</div>

						<div>Расстояние между буквами:
							<button
								className={cn(
									'Setting__button',
									{ active: !letterSpacing },
								)}
								onClick={() => this.changeLetterSpacing('')}
								title='Стандартное'
							>
								Стандартное
							</button>
							<button
								className={cn(
									'Setting__button Setting__button_spacing-middle',
									{ active: letterSpacing === '0.2em' },
								)}
								onClick={() => this.changeLetterSpacing('0.2em')}
								title='Среднее'
							>
								Среднее
							</button>
							<button
								className={cn(
									'Setting__button Setting__button_spacing-large',
									{ active: letterSpacing === '0.3em' },
								)}
								onClick={() => this.changeLetterSpacing('0.3em')}
								title='Большое'
							>
								Большое
							</button>
						</div>

						<div>Шрифт:
							<button
								className={cn(
									'Setting__button Setting__button_font',
									{ active: !font },
								)}
								onClick={() => this.changeFont('')}
								title='Без засечек'
							>
								А
							</button>
							<button
								className={cn(
									'Setting__button Setting__button_font Setting__button_other-font',
									{ active: font === 'Times New Roman' },
								)}
								onClick={() => this.changeFont('Times New Roman')}
								title='С засечками'
							>
								А
							</button>
						</div>
					</div>
				</div>}
			</div>
		);
	}
}

export default Setting;
