import styles from "./suggestacc.module.scss";
import classNames from "classnames/bind";
import AccountItem from "Component/SearchAccountItmes/AccountItem";

const cx = classNames.bind(styles);
function SuggestAccount() {
  return (
    <>
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
    </>
  );
}

export default SuggestAccount;
