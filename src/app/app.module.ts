import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TaskDataService } from './services/data/task-data.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DialogDetailsComponent } from './components/dialog-details/dialog-details.component';
import { LoginComponent } from './pages/login/login.component';
import { TodopageComponent } from './pages/todopage/todopage.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { TaskspageComponent } from './pages/taskspage/taskspage.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { HeaderComponent } from './components/header/header.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    SidebarComponent,
    DialogDetailsComponent,
    LoginComponent,
    TodopageComponent,
    TaskspageComponent,
    LineChartComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(TaskDataService),
    MatExpansionModule,
    MatButtonToggleModule,
    NzLayoutModule,
    NzIconModule,
    NzAvatarModule,
    NzBadgeModule,
    NzUploadModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
