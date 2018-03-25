import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SigninPage } from '../pages/signin/signin';

import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../pages/home/home';

import { AuthService } from '../providers/auth-service/auth-service';

//import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, 
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              afAuth: AngularFireAuth,
              private authService: AuthService){

    afAuth.authState.subscribe(user => {
      if (user) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = SigninPage;
      }
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage }
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


  signOut() {
    this.authService.signOutFirebase()
      .then(() => {
        // navCtrl
      })
      .catch((error) => {
        console.error(error);
      });
  }

}

