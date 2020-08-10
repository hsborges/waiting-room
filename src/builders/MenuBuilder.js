import Menu from "@/components/Menu.vue";

export default class MenuBuilder {
  constructor() {
    this.props = {};
  }

  showVolume() {
    this.props.showVolume = true;
    return this;
  }

  showConfig() {
    this.props.showConfig = true;
    return this;
  }

  showHome() {
    this.props.showHome = true;
    return this;
  }

  build() {
    const props = this.props;

    return {
      render(h) {
        return h(Menu, { props });
      }
    };
  }
}
