import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddProductComponent } from './add-product/add-product.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { ListEventComponent } from './list-event/list-event.component';
import { ListFooterComponent } from './list-footer/list-footer.component';
import { ListOrderComponent } from './list-order/list-order.component';
import { ListProductComponent } from './list-product/list-product.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

import { HomeComponent } from './home/home.component';
import { ListQuestionComponent } from './list-question/list-question.component';
import { ListCommentComponent } from './list-comment/list-comment.component';
import { ListReportsComponent } from './list-reports/list-reports.component';
import { AdInformationComponent } from './ad-information/ad-information.component';
import { ListSexComponent } from './list-sex/list-sex.component';
import { ListSizeComponent } from './list-size/list-size.component';
import { ListColorComponent } from './list-color/list-color.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdLoginComponent } from './ad-login/ad-login.component';
import { IndexComponent } from './index/index.component';
import { CartComponent } from './cart/cart.component';
import { InformationComponent } from './information/information.component';
import { OrderComponent } from './order/order.component';
import { ClientOrderDetailComponent } from './client-order-detail/client-order-detail.component';
import { ClientListQuestionComponent } from './client-list-question/client-list-question.component';
import { ReportsComponent } from './reports/reports.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { SearchProductComponent } from './search-product/search-product.component';
import { BillComponent } from './components/bill/bill.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [

  { 
    path: '', component: IndexComponent,
    children:
    [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component: HomeComponent },
      { path: 'information', component: InformationComponent },
      { path: 'product-detail/:name/:id', component: ProductDetailComponent },
      { path: 'cart', component: CartComponent },
      { path: 'order', component: OrderComponent },
      { path: 'order-detail/:id', component: ClientOrderDetailComponent },
      { path: 'list-question', component: ClientListQuestionComponent },
      { path: 'list-comment', component: ClientListQuestionComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'search/:name', component: SearchComponent },
      { path: 'search-product/:name', component: SearchProductComponent },
    ]
  },

  { path: 'login', component: LoginComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'tao-van-ban', component: ContactComponent },

  { path: 'admin-login', component: AdLoginComponent },

  { 
    path: 'admin', component: AdminComponent,
    children:
    [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: DashboardComponent },
      { path: 'list-category', component: ListCategoryComponent },
      { path: 'list-product', component: ListProductComponent },
      { path: 'list-product/add-product', component: AddProductComponent },
      { path: 'list-product/edit-product/:id', component: EditProductComponent },
      { path: 'list-order', component: ListOrderComponent },
      { path: 'list-order/order-detail/:id', component: OrderDetailComponent },
      
      { path: 'list-event', component: ListEventComponent },
      { path: 'list-footer', component: ListFooterComponent },
      { path: 'list-question', component: ListQuestionComponent },
      { path: 'list-comment', component: ListCommentComponent },
      { path: 'list-report', component: ListReportsComponent },
      { path: 'list-sex', component: ListSexComponent },
      { path: 'list-size', component: ListSizeComponent },
      { path: 'list-color', component: ListColorComponent },
      { path: 'information', component: AdInformationComponent },
      { path: '**', component: PageNotFoundComponent }

    ]
  },
  
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
