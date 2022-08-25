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
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { loginStateSelector } from "redux/selector";

import SuggestAccount from "Component/Suggest_account/SuggestAccount";
import LoginPopup from "Component/LoginPopup/LoginPopup";
import Followingacc from "Component/Followingacc/Followingacc";

const cx = classNames.bind(styles);

function MainSideBar() {
  const loginState = useSelector(loginStateSelector);

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
      {!loginState.value ? (
        <div className={cx("login-container")}>
          <LoginPopup />
        </div>
      ) : (
        <div className={cx("following-container")}>
          <Followingacc />
        </div>
      )}
      <div className={cx("suggest-container")}>
        <SuggestAccount />
      </div>
      <div className={cx("discover-container")}>
        <p className={cx("discover-title")}>Discover</p>
        <div className={cx("list")}>
          <span className={cx("border")}>
            <Link className={cx("discover-item")} to="">
              #trending
            </Link>
          </span>
          <span className={cx("border")}>
            <Link className={cx("discover-item")} to="">
              #colammoicoan
            </Link>
          </span>
          <span className={cx("border")}>
            <Link className={cx("discover-item")} to="">
              #thuthach
            </Link>
          </span>
          <span className={cx("border")}>
            <Link className={cx("discover-item")} to="">
              #amnhac
            </Link>
          </span>
          <span className={cx("border")}>
            <Link className={cx("discover-item")} to="">
              #mackedoi
            </Link>
          </span>
          <span className={cx("border")}>
            <Link className={cx("discover-item")} to="">
              #trending1
            </Link>
          </span>
          <span className={cx("border")}>
            <Link className={cx("discover-item")} to="">
              #trending2
            </Link>
          </span>
          <span className={cx("border")}>
            <Link className={cx("discover-item")} to="">
              #trending3
            </Link>
          </span>
          <span className={cx("border")}>
            <Link className={cx("discover-item")} to="">
              #trending4
            </Link>
          </span>
        </div>
      </div>
      <div className={cx("sidebar-footer")}>
        <div className={cx("about-container")}>
          <Link className={cx("about-item")} to="">
            About
          </Link>
          <p className={cx("breaker")}></p>
          <Link className={cx("about-item")} to="">
            Community
          </Link>
          <p className={cx("breaker")}></p>
          <Link className={cx("about-item")} to="">
            Contact
          </Link>
          <p className={cx("breaker")}></p>
          <Link className={cx("about-item")} to="">
            Term
          </Link>
          <p className={cx("breaker")}></p>
          <Link className={cx("about-item", "privacy")} to="">
            Privacy
          </Link>
          <p className={cx("breaker")}></p>
        </div>
        <div className="copyright">
          <p className={cx("about-foot")}>2022 My first project</p>
        </div>
      </div>
    </aside>
  );
}

export default MainSideBar;
