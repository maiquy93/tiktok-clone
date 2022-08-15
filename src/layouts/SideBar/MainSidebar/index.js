import classNames from "classnames/bind";
import styles from "./SideBar.module.scss";
import Menu from "../Menu/Menu";
import MenuItems from "../Menu/MenuItems";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faPeopleGroup,
  faPodcast,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function MainSideBar() {
  return (
    <aside className={cx("wrapper")}>
      <Menu>
        <MenuItems
          to="/"
          title="For you"
          icon={<FontAwesomeIcon icon={faHouse} />}
        />
        <MenuItems
          to="/following"
          title="Following"
          icon={<FontAwesomeIcon icon={faPeopleGroup} />}
        />{" "}
        <MenuItems
          to="/live"
          title="Live"
          icon={<FontAwesomeIcon icon={faPodcast} />}
        />
      </Menu>
      <p>home</p>
    </aside>
  );
}

export default MainSideBar;
