import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {PopularTeachersComponent} from './popular-teachers/popular-teachers.component';
import {HomeThreeTestimonialComponent} from './home-three-testimonial/home-three-testimonial.component';
import {HomeThreeComponent} from './home-three-main/home-three.component';
import {HomeThreeCtaComponent} from './home-three-cta/home-three-cta.component';
import {HomeThreeCoursesComponent} from './home-three-courses/home-three-courses.component';
import {HeroSliderComponent} from './hero-slider/hero-slider.component';
import {HeaderThreeComponent} from './header-three/header-three.component';
import {FooterComponent} from './footer/footer.component';
import {BrandAreaComponent} from './brand-area/brand-area.component';
import {AboutAreaComponent} from './about-area/about-area.component';
import {SwiperModule} from 'swiper/angular';
import {WhyAreaComponent} from './why-area/why-area.component';
import {BlogTwoComponent} from './blog-two/blog-two.component';
import {SignInMainComponent} from './sign-in/sign-in-main/sign-in-main.component';
import {SignInAreaComponent} from './sign-in/sign-in-area/sign-in-area.component';
import {HeaderTwoComponent} from './header-two/header-two.component';
import {FormsModule} from '@angular/forms';
import { BecomeTeacherComponent } from './become-teacher/become-teacher.component';


@NgModule({
    declarations: [
        PopularTeachersComponent,
        HomeThreeTestimonialComponent,
        WhyAreaComponent,
        BlogTwoComponent,
        HomeThreeComponent,
        HomeThreeCtaComponent,
        HomeThreeCoursesComponent,
        HeroSliderComponent,
        HeaderThreeComponent,
        FooterComponent,
        SignInMainComponent,
        HeaderTwoComponent,
        SignInAreaComponent,
        BrandAreaComponent,
        AboutAreaComponent,
        BecomeTeacherComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        SwiperModule,
        FormsModule,

    ],
    exports: [
        HeaderThreeComponent,
        HeaderTwoComponent,
        FooterComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EducalModule {
}
