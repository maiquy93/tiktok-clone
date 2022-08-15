import Home from "../Component/Pages/Home";
import Following from "../Component/Pages/Following";
import Upload from "../Component/Pages/Upload";
import Profile from "../Component/Pages/Profile";
import Live from "Component/Pages/Live/Live";

//public route
const publicRoute = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/following",
    component: Following,
  },
  {
    path: "/upload",
    component: Upload,
    layout: null,
  },
  {
    path: "/@:nickname",
    component: Profile,
  },
  {
    path: "/live",
    component: Live,
  },
];
//private route
const privateRoute = [];
export { publicRoute, privateRoute };
