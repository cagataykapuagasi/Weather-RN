import { observable, action } from 'mobx';
import { dark, light } from 'res/colors';
import { ignore } from 'mobx-sync';

class App {
  @observable isDarkTheme = true;
  @observable
  colors = dark;

  @action
  onChangeTheme = () => {
    this.isDarkTheme = !this.isDarkTheme;
    this.colors = this.isDarkTheme ? dark : light;
  };
}

export default app = new App();
