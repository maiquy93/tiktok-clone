import styles from "./home.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import MainSideBar from "layouts/SideBar/MainSidebar";
import VideoItem from "Component/videoItem/VideoItem";

const cx = classNames.bind(styles);

function Home() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(2);
  const [noMore, setnoMore] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/videos?limit=3&page=1`)
      .then(res => {
        setData(res.data.docs);
      })
      .catch(err => console("Can not connect"));
  }, []);
  //function render video
  const renderVideo = data => {
    return data.map(video => {
      return <VideoItem key={video._id} video={video} />;
    });
  };
  //fetch data
  const fetchData = () => {
    axios.get(`http://localhost:8000/videos?limit=3&page=${page}`).then(res => {
      setData([...data, ...res.data.docs]);
      setPage(prev => prev + 1);
      setnoMore(false);
    });
  };

  return (
    <div className={cx("home-page")}>
      <div className={cx("home-bar")}>
        <MainSideBar />
      </div>
      <div className={cx("home-content")}>
        <InfiniteScroll
          dataLength={data.length} //This is important field to render the next data
          next={fetchData}
          hasMore={noMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {renderVideo(data)}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Home;
