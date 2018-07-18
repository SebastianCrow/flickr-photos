import {Component, Output, EventEmitter} from '@angular/core';
import {FlickrApiService} from "../../../api/flickr-api.service";
import {License} from "../../../model/License";

interface ColorInfo {
	code: string;
	name: string;
}

/**
 * Select elements allowing to choose the search filters (color & license)
 */
@Component({
  selector: 'filter-toolbox',
  templateUrl: './filter-toolbox.component.html',
  styleUrls: ['./filter-toolbox.component.scss']
})
export class FilterToolboxComponent {

	@Output() public changed: EventEmitter<any> = new EventEmitter();

	public colors: ColorInfo[] = [
		{code: "-1", name: "Any color"},
		{code: "0", name: "Red"},
		{code: "1", name: "Dark Orange"},
		{code: "2", name: "Orange"},
		{code: "3", name: "School Bus Yellow"},
		{code: "4", name: "Lemon Yellow"},
		{code: "5", name: "Green"},
		{code: "6", name: "Dark Lime Green"},
		{code: "7", name: "Cyan"},
		{code: "8", name: "Blue"},
		{code: "9", name: "Violet"},
		{code: "a", name: "Pink"},
		{code: "b", name: "Pale Pink"},
		{code: "c", name: "White"},
		{code: "d", name: "Gray"},
		{code: "e", name: "Black"}
	];

	public licenses: License[] = [];

	private color: string;

	private license: string;

	constructor(private flickrApiService: FlickrApiService) {
		this.flickrApiService.getLicenses()
			.subscribe(data => {
				if (this.flickrApiService.handleError(data)) return;

				const anyLicense = [new License(-1, "Any license")];
				this.licenses = anyLicense.concat(
					FilterToolboxComponent.mapLicenses((<any>data).licenses.license)
				);
			});
	}

	public onColorChange(color: string) {
		this.color = color != "-1" ? color : undefined;
		this.emitChangedEvent();
	}

	public onLicenseChange(license: string) {
		this.license = license != "-1" ? license : undefined;
		this.emitChangedEvent();
	}

	private emitChangedEvent(): void {
		this.changed.emit({
			color: this.color,
			license: this.license
		})
	}

	private static mapLicenses(licenses: any): License[] {
		const licenseModels: License[] = [];

		for (const license of licenses) {
			const licenseModel = License.fromData(license);
			licenseModels.push(licenseModel);
		}

		return licenseModels;
	}
}
