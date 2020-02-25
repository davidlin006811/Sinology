import React, { Component } from "react";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import { connect } from "react-redux";
import arrowDefault from "../../img/arrow_right.svg";
import arrowSelect from "../../img/arrow_select.svg";
import menuBanner from "../../img/menu_banner.jpg";
class MenuWrap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const sideChanged =
      this.props.children.props.right !== nextProps.children.props.right;

    if (sideChanged) {
      this.setState({ hidden: true });

      setTimeout(() => {
        this.show();
      }, this.props.wait);
    }
  }

  show() {
    this.setState({ hidden: false });
  }

  render() {
    let style;

    if (this.state.hidden) {
      style = { display: "none" };
    } else
      return (
        <div style={style} className={this.props.side}>
          {this.props.children}
        </div>
      );
  }
}
class SlideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMenu: "slide",
      side: "right",
      menus: [],
      selectedSubMenu: 0,
      selectedMainMenuId: 1,
      openSubMenu: false
    };
  }
  selectMainMenu = id => {
    if (id === this.state.selectedMainMenuId) {
      let open = !this.state.openSubMenu;
      this.setState({
        openSubMenu: open
      });
    } else if (id === 1) {
      this.setState({
        selectedMainMenuId: id,
        openSubMenu: false
      });
    } else {
      this.setState({
        selectedMainMenuId: id,
        openSubMenu: true
      });
    }
  };

  getMenu = () => {
    const { menuItems } = this.props;
    //const Menu = BurgerMenu[this.state.currentMenu];
    let menu;
    let items;
    if (menuItems.length > 0) {
      items = menuItems.map(item => {
        let subItems;
        if (
          item.sub_category.length > 0 &&
          item.cate_id === this.state.selectedMainMenuId
        ) {
          if (this.state.openSubMenu) {
            subItems = item.sub_category.map(sub_item => {
              return (
                <li key={sub_item.cate_id} className="nav-sub-item">
                  <Link to={sub_item.url}>{sub_item.title}</Link>
                </li>
              );
            });
          }
          let iconClass = this.state.openSubMenu
            ? "nav-item-active-img"
            : "nav-item-deactive-img";
          return (
            <div
              key={item.cate_id}
              className="nav-item-active"
              onClick={() => {
                this.selectMainMenu(item.cate_id);
              }}
            >
              <div className="clearfix">
                <div className="nav-title">{item.title}</div>
                <div className="nav-icon">
                  <img
                    id="iconImg"
                    src={arrowSelect}
                    alt="英國漢學院 img"
                    className={iconClass}
                  />
                </div>
              </div>
              <ul>{subItems}</ul>
            </div>
          );
        } else {
          if (item.cate_id !== 1) {
            return (
              <div
                key={item.cate_id}
                className="nav-item"
                onClick={() => {
                  this.selectMainMenu(item.cate_id);
                }}
              >
                <div className="nav-title">{item.title}</div>
                <div className="nav-icon">
                  <img src={arrowDefault} alt="英國漢學院 img" />
                </div>
              </div>
            );
          } else {
            let itemClass =
              this.state.selectedMainMenuId === item.cate_id
                ? "nav-item-active"
                : "nav-item";
            return (
              <Link
                to="/"
                key={item.cate_id}
                className={itemClass}
                onClick={() => {
                  this.selectMainMenu(item.cate_id);
                }}
                style={{ paddingTop: "15px" }}
              >
                {item.title}
              </Link>
            );
          }
        }
      });
      menu = (
        <MenuWrap wait={20} side={this.state.side}>
          <Menu id={this.state.currentMenu} width={"63%"} right>
            <img
              src={menuBanner}
              alt="英國漢學院 img"
              className="menu-banner"
            />
            {items}
          </Menu>
        </MenuWrap>
      );
    }
    return menu;
  };

  render() {
    const { menuItems } = this.props;

    return (
      <div id="outer-container" style={{ height: "100%" }}>
        {this.getMenu()}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    menuItems: state.homeReducer.menuItems
  };
}
export default connect(mapStateToProps)(SlideMenu);
