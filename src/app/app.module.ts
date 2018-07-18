import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';

import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { PhotoThumbnailComponent } from './photos/photo-thumbnail/photo-thumbnail.component';
import { ElementOnScreenTriggerDirective } from './core/element-on-screen-trigger.directive';
import { PagingComponent } from './core/paging/paging.component';
import { NavigationBarComponent } from './core/navigation/navigation-bar/navigation-bar.component';
import { SearchInputComponent } from './core/navigation/search-input/search-input.component';
import { FilterToolboxComponent } from './core/navigation/filter-toolbox/filter-toolbox.component';
import { PhotosListSearchComponent } from './photos/photos-list/photos-list-search/photos-list-search.component';
import { PhotosListUserComponent } from './photos/photos-list/photos-list-user/photos-list-user.component';
import { PhotoDetailsComponent } from './photos/photo-details/photo-details.component';
import { ErrorModalComponent } from './core/error/error-modal/error-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    PhotoThumbnailComponent,
    ElementOnScreenTriggerDirective,
    PagingComponent,
    NavigationBarComponent,
    SearchInputComponent,
    FilterToolboxComponent,
    PhotosListSearchComponent,
    PhotosListUserComponent,
    PhotoDetailsComponent,
    ErrorModalComponent
  ],
	entryComponents: [
		ErrorModalComponent
	],
  imports: [
    BrowserModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
