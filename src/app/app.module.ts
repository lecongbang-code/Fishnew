import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { ListProductComponent } from './list-product/list-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ListOrderComponent } from './list-order/list-order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { ListEventComponent } from './list-event/list-event.component';
import { ListFooterComponent } from './list-footer/list-footer.component';
import { ListQuestionComponent } from './list-question/list-question.component';
import { ListCommentComponent } from './list-comment/list-comment.component';
import { ListReportsComponent } from './list-reports/list-reports.component';
import { AdInformationComponent } from './ad-information/ad-information.component';
import { BillComponent } from './components/bill/bill.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListSexComponent } from './list-sex/list-sex.component';
import { ListSizeComponent } from './list-size/list-size.component';
import { ListColorComponent } from './list-color/list-color.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { Placement as PopperPlacement, Options } from '@popperjs/core';
import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AdLoginComponent } from './ad-login/ad-login.component';
import { ClientHeaderComponent } from './components/client-header/client-header.component';
import { ClientSidebarComponent } from './components/client-sidebar/client-sidebar.component';
import { ClientFooterComponent } from './components/client-footer/client-footer.component';
import { IndexComponent } from './index/index.component';
import { ClientCategoryComponent } from './components/client-category/client-category.component';
import { ClientBannerComponent } from './components/client-banner/client-banner.component';
import { ClientProductComponent } from './components/client-product/client-product.component';
import { ClientSliderComponent } from './components/client-slider/client-slider.component';
import { CartComponent } from './cart/cart.component';
import { InformationComponent } from './information/information.component';
import { OrderComponent } from './order/order.component';
import { ClientOrderDetailComponent } from './client-order-detail/client-order-detail.component';
import { ContactComponent } from './contact/contact.component';
import { ReportsComponent } from './reports/reports.component';
import { ClientListQuestionComponent } from './client-list-question/client-list-question.component';
import { ClientListCommentComponent } from './client-list-comment/client-list-comment.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { ForgotComponent } from './forgot/forgot.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxCaptchaModule } from 'ngx-captcha';

import { YouTubePlayerModule } from '@angular/youtube-player';
import { SearchProductComponent } from './search-product/search-product.component';
import { NgxPrintModule } from 'ngx-print';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { InterceptorService } from './loader/interceptor.service';
import { CookieService } from 'ngx-cookie-service';
import { ClipboardModule } from '@angular/cdk/clipboard';

// import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    AdminComponent,
    DashboardComponent,
    FooterComponent,
    ListCategoryComponent,
    ListProductComponent,
    AddProductComponent,
    EditProductComponent,
    ProductDetailComponent,
    ListOrderComponent,
    OrderDetailComponent,
    ListEventComponent,
    ListFooterComponent,
    ListQuestionComponent,
    ListCommentComponent,
    ListReportsComponent,
    AdInformationComponent,
    BillComponent,
    ListSexComponent,
    ListSizeComponent,
    ListColorComponent,
    PageNotFoundComponent,
    AdLoginComponent,
    ClientHeaderComponent,
    ClientSidebarComponent,
    ClientFooterComponent,
    IndexComponent,
    ClientCategoryComponent,
    ClientBannerComponent,
    ClientProductComponent,
    ClientSliderComponent,
    CartComponent,
    InformationComponent,
    OrderComponent,
    ClientOrderDetailComponent,
    ContactComponent,
    ReportsComponent,
    ClientListQuestionComponent,
    ClientListCommentComponent,
    SearchComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    ForgotComponent,
    RecoverPasswordComponent,
    SearchProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    AngularEditorModule,
    FormsModule,
    NgbModule,
    NgbPaginationModule, 
    NgxPaginationModule,
    NgbAlertModule,
    ReactiveFormsModule,
    ColorPickerModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxCaptchaModule,
    BrowserModule,
    YouTubePlayerModule,
    NgxPrintModule,
    NgxImageZoomModule,
    ClipboardModule
  ],
  providers: [
    Title,
    {
      provide:HTTP_INTERCEPTORS, useClass:InterceptorService, multi: true
    },
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
