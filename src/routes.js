/**
=========================================================
* Argon Dashboard 2 PRO MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Argon Dashboard 2 PRO MUI are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Argon Dashboard 2 PRO MUI containers
import Home from "containers/home";
import Default from "containers/dashboards/default";
import MainScreen from "containers/MainScreen";
import OrdersC from "containers/Orders/index";
import NewUser from "containers/pages/users";
import Settings from "containers/pages/account/settings";
import Ordering from "containers/reports/ordering";
import SignInIllustration from "containers/authentication/sign-in";
import SignUpIllustration from "containers/authentication/sign-up";
import Error404 from "containers/authentication/error/404";
import Error500 from "containers/authentication/error/500";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import NewForm from "containers/MainScreen/component/NewForm";

const routes = [
  {
    type: "route",
    name: "Home",
    key: "home",
    route: "/home",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-tv-2" />,
    component: <Home />,
    requiresAuth: true,
  },
  {
    type: "route",
    name: "Main Screen",
    key: "main-screen",
    route: "/main-screen",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-tv-2" />,
    component: <MainScreen />,
    requiresAuth: true,
  },
  {
    type: "",
    name: "Edit Credit Header",
    key: "header",
    route: "/edit-credit-header",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-tv-2" />,
    component: <NewForm />,
    requiresAuth: true,
  },
  {
    type: "collapse",
    name: "Orders",
    key: "orders",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-shop" />,
    collapse: [
      {
        type: "route",
        name: "View",
        key: "view",
        route: "/orders/view",
        component: <OrdersC />,
        requiresAuth: true,
      },

      {
        type: "route",
        name: "Confiramations",
        key: "confirmations",
        route: "/orders/confirmations",
        component: <OrdersC />,
        requiresAuth: true,
      },
    ],
  },
  {
    type: "collapse",
    name: "User Management",
    key: "ums",
    icon: <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-ungroup" />,
    collapse: [
      {
        type: "route",
        name: "New User",
        key: "new-user",
        route: "/ums/new-user",
        component: <NewUser />,
        requiresAuth: true,
      },
      // {
      //   name: "User Profile",
      //   key: "settings",
      //   route: "/ums/settings",
      //   component: <Settings />,
      // },
    ],
  },
  {
    type: "collapse",
    name: "Reports",
    key: "report",
    icon: <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-ungroup" />,
    collapse: [
      {
        type: "route",
        name: "Ordering",
        key: "ordering",
        route: "/report/ordering",
        component: <Ordering />,
        requiresAuth: true,
      },
    ],
  },
  {
    type: "collapse",
    name: "Authentication",
    key: "authentication",
    icon: <ArgonBox component="i" color="error" fontSize="14px" className="ni ni-single-copy-04" />,
    collapse: [
      {
        type: "route",
        name: "Sign In",
        key: "sign-in",
        route: "/authentication/sign-in",
        component: <SignInIllustration />,
        requiresAuth: false,
      },
      {
        name: "Sign Up",
        key: "sign-up",
        route: "/authentication/sign-up",
        component: <SignUpIllustration />,
        requiresAuth: false,
      },
      {
        name: "Error",
        key: "error",
        collapse: [
          {
            name: "Error 404",
            key: "error-404",
            route: "/authentication/error/404",
            component: <Error404 />,
            requiresAuth: false,
          },
          {
            name: "Error 500",
            key: "error-500",
            route: "/authentication/error/500",
            component: <Error500 />,
            requiresAuth: false,
          },
        ],
      },
    ],
  },
  { type: "divider", key: "divider-1" },
];

export default routes;
