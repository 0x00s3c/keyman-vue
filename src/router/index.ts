import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Forms from "../views/Forms.vue";
import Contractor from "../views/Get-Contractor.vue";
import GetContractorKeypickup from "../views/GetContractorKeypickup.vue";
import GetIDContractor from "../views/Get-ID-Contractor.vue";
import PostContractorKeypickups from "../views/PostContractorKeypickup.vue";
import GetKeyinfos from "../views/Get-Keyinfos.vue";
import Tables from "../views/Tables.vue";
import UIElements from "../views/UIElements.vue";
import Login from "../views/Login.vue";
import Modal from "../views/Modal.vue";
import Chart from "../views/ChartView.vue";
import Card from "../views/CardView.vue";
import Blank from "../views/BlankView.vue";
import NotFound from "../views/NotFound.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { layout: "empty" },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/forms",
    name: "Forms",
    component: Forms,
  },
  {
    path: "/contractor",
    name: "Contractor",
    component: Contractor,
  },
  {
    path: "/get-contractor-keypickups",
    name: "GetContractorKeypickups",
    component: GetContractorKeypickup,
  },
  {
    path: "/get-id-contractor",
    name: "GetIDContractor",
    component: GetIDContractor,
  },
  {
    path: "/post-contractor-keypickups",
    name: "PostContractorKeypickups",
    component: PostContractorKeypickups,
  },
  {
    path: "/get-keyinfos",
    name: "GetKeyinfos",
    component: GetKeyinfos,
  },
  {
    path: "/cards",
    name: "Cards",
    component: Card,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/ui-elements",
    name: "UIElements",
    component: UIElements,
  },
  {
    path: "/modal",
    name: "Modal",
    component: Modal,
  },
  {
    path: "/charts",
    name: "Chart",
    component: Chart,
  },
  {
    path: "/blank",
    name: "Blank",
    component: Blank,
  },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
