import {Directive, ElementRef, Output, EventEmitter} from '@angular/core';

/**
 * Directive notifying when an element appears on the screen
 */
@Directive({
	selector: '[elementOnScreenTrigger]'
})
export class ElementOnScreenTriggerDirective {

	/**
	 * Element appears on the screen
	 * @type {EventEmitter}
	 */
	@Output() public appeared: EventEmitter<void> = new EventEmitter();

	/**
	 * Last visibility of the element
	 * @type {boolean}
	 */
	private lastVisibility: boolean = false;

	///

	constructor(private element: ElementRef) {

		const wrapperElement = this.element.nativeElement.parentElement;

		const evaluateVisibility = () => {
			const visible = ElementOnScreenTriggerDirective.isVisibleOnScreen(element);
			if (visible && visible !== this.lastVisibility)
			{
				this.appeared.emit();
			}
			this.lastVisibility = visible;
		};

		// Scroll
		wrapperElement.addEventListener('scroll', evaluateVisibility);

		// TODO: Listen for a resize of the element/window (an element can appear on screen then)
	}

	private static isVisibleOnScreen(element: ElementRef): boolean {

		const rect = element.nativeElement.getBoundingClientRect();

		if (rect.width === 0 && rect.height === 0) {
			return false;
		}

		const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
		return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
	}
}
