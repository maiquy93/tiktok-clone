import Tippy from "@tippyjs/react/headless";
import styles from "./Option.module.scss";
import classNames from "classnames/bind";

import Wrapper from "../Wrapper";
import Optionlist from "./Optionlist";
import LanguageOption from "./LanguageOption";
import { useState } from "react";

const cx = classNames.bind(styles);
const defaultFn = () => {};
function Option({ children, items = [], handleChange = defaultFn }) {
  const [history, setHistory] = useState([{ data: items }]);
  //ban dau current.data = items
  // console.log(history);

  const current1 = history[history.length - 1];
  const renderlist = () => {
    return current1.data.map((item, index) => {
      const isParent = !!item.children;
      return (
        <Optionlist
          key={index}
          data={item}
          onClick={() => {
            if (isParent) {
              setHistory(prev => [...prev, item.children]);
              // sau khi setState current.data = children.data
            } else {
              handleChange(item);
            }
          }}
        >
          {item.title}
        </Optionlist>
      );
    });
  };
  return (
    <Tippy
      hideOnClick={false}
      interactive
      delay={[10, 300]}
      arrow
      placement="bottom-end"
      render={attrs => (
        <div className={cx("menu-list")} tabIndex="-1" {...attrs}>
          <Wrapper>
            {history.length > 1 && (
              <LanguageOption
                title={current1.title}
                onBack={() => {
                  setHistory(prev => prev.slice(0, prev.length - 1));
                }}
              />
            )}
            <div className={cx("menu-body")}>{renderlist()}</div>
          </Wrapper>
        </div>
      )}
      onHide={() => {
        setHistory(prev => prev.slice(0, 1));
      }}
    >
      {children}
    </Tippy>
  );
}

export default Option;
