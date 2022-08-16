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

import AccountItem from "Component/SearchAccountItmes/AccountItem";
import { Link } from "react-router-dom";

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
      <div className={cx("login-container")}>
        <p className={cx("tips")}>
          Log in to follow creators, like videos, and view comments.
        </p>
        <button className={cx("login-btn")}>Login</button>
      </div>
      <div className={cx("suggest-container")}>
        <p className={cx("suggest-title")}>Suggested accounts</p>
        <div className={cx("acc-items")}>
          <AccountItem
            fullname="Nguyenhoahoa"
            nickname="hoaa"
            avatar="https://nguoi-noi-tieng.com/photo/tieu-su-hot-girl-tam-tit-1816.jpg"
            check={false}
            to="@hoaa"
            small
            bold
          />
          <AccountItem
            fullname="Nguyễn Thanh Tâm"
            nickname="tammy91"
            avatar="https://photo-cms-kienthuc.zadn.vn/zoom/800/uploaded/dinhcuc/2020_08_06/tam/lay-chong-roi-o-an-tam-tit-ngay-cang-dep-muot-mat-hinh-3.jpg"
            check={true}
            to="@tammy91"
            small
            bold
          />
          <AccountItem
            fullname="Nguyễn Thị Ngọc Huyền"
            nickname="huyenkiukiu"
            avatar="https://vcdn-giaitri.vnecdn.net/2022/01/06/ngoc-huyen-9-5089-1641465335.jpg"
            check={true}
            to="@huyenkiukiu"
            small
            bold
          />
          <AccountItem
            fullname="Mai Phương Thúy"
            nickname="phuongthuymai"
            avatar="https://st.nhipcaudautu.vn/staticFile/Subject/2020/01/17/thuy_171619149.jpg"
            check={true}
            to="@phuongthuymai"
            small
            bold
          />
          <AccountItem
            fullname="Bảo Trâm"
            nickname="tramvilla28"
            avatar="https://i.scdn.co/image/ab67616d0000b273261434fb8291748c9ce2558b"
            check={true}
            to="@tramvilla28"
            small
            bold
          />
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
          </div>
        </div>

        <div className={cx("about-container")}>
          <Link className={cx("about-item")} to="">
            About
          </Link>
          <Link className={cx("about-item")} to="">
            Community
          </Link>
          <Link className={cx("about-item")} to="">
            Contact
          </Link>
          <Link className={cx("about-item")} to="">
            Term
          </Link>
          <Link className={cx("about-item")} to="">
            Privacy
          </Link>
          <p className={cx("about-foot")}>2022 Tiktok</p>
        </div>
      </div>
    </aside>
  );
}

export default MainSideBar;
