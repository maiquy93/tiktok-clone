import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { memo, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faSearch,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./search.module.scss";
import classNames from "classnames/bind";
import { useState, useEffect, useRef, useMemo } from "react";

import * as request from "utils/request";
import { Wrapper } from "Component/Popper";
import AccountItem from "Component/SearchAccountItmes/AccountItem";
import { useDebounce } from "hooks";

const cx = classNames.bind(styles);
function Searchbox() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [onFocusIput, setOnFocusInput] = useState(true);
  const [loading, setLoading] = useState(false);

  const debounceValue = useDebounce(searchValue, 500);

  const [show, setShow] = useState(false);
  const onShow = useMemo(
    () => onFocusIput && searchResult.length > 0,
    [onFocusIput, searchResult]
  );

  useEffect(() => {
    setShow(onShow);
  }, [onShow]);

  const inputRef = useRef();

  //Call API
  useEffect(() => {
    //Su ly khoang trang
    if (!debounceValue.trim()) {
      setSearchResult([]);
      return;
    }
    const getSearchAPI = async () => {
      try {
        setLoading(true);
        const res = await request.get(`users/search`, {
          params: {
            q: debounceValue,
            type: "less",
          },
        });
        setSearchResult(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getSearchAPI();
  }, [debounceValue]);

  const handleChange = useCallback(e => {
    const inputValue = e.target.value;
    if (!inputValue.startsWith(" ")) {
      setSearchValue(inputValue);
    }
  }, []);
  const handleResultShow = () => {
    setOnFocusInput(false);
  };
  const handleSubmit = e => {};

  return (
    <span>
      <Tippy
        onClickOutside={handleResultShow}
        visible={show}
        interactive
        render={attrs => (
          <div className={cx("search-result")} tabIndex="-1" {...attrs}>
            {show && (
              <Wrapper>
                <h3 className={cx("search-title")}>Account</h3>
                {searchResult.map(result => {
                  return (
                    <AccountItem
                      key={result.id}
                      fullname={result.full_name}
                      nickname={result.nickname}
                      avatar={result.avatar}
                      check={result.tick}
                      to={`@${result.nickname}`}
                    />
                  );
                })}
              </Wrapper>
            )}
          </div>
        )}
      >
        <div className={cx("search-box")}>
          <input
            ref={inputRef}
            value={searchValue}
            placeholder="Search account and video"
            onChange={e => handleChange(e)}
            onFocus={() => setOnFocusInput(true)}
          />
          {!!searchValue && !loading && (
            <button
              className={cx("close")}
              onClick={() => {
                setSearchValue("");
                inputRef.current.focus();
              }}
            >
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}
          {loading && (
            <span className={cx("loading")}>
              <FontAwesomeIcon icon={faSpinner} />
            </span>
          )}
          <span className={cx("speration")}></span>
          <button
            className={cx("search-btn")}
            onMouseDown={e => e.preventDefault()}
            onClick={e => handleSubmit(e)}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </Tippy>
    </span>
  );
}

export default memo(Searchbox);
