import { createBrowserRouter, useNavigate } from "react-router-dom";
import App from "./App";
//import AboutPage from "./assets/Pages/aboutPage";
//import ContactUs from "./assets/Pages/ContactUs";
//import ProductList from "./assets/products/ProductList";
import NotFound from "./assets/Shared/NotFound";
//import ProductInfo from "./assets/products/ProductInfoPage";
import RegestrationPage from "./assets/Pages/Auth/Regestration";
import LoginPage from "./assets/Pages/Auth/LoginPage";
import { Link } from 'react-router-dom';
import AppointmentList from "./assets/Pages/Views/AppointmentsList";
import AppointmentsInfo from "./assets/Components/AppointmentsInfo";
import ContactUs from "./assets/Pages/ContactUs";
import AllAppointments from "./dashboard//views/books/AllAppointments";
import AddAppointment from "./dashboard/views/books/AddAppointment";
import UpdateAppointment, { UpdateAppointmenyLoader } from "./dashboard/views/books/UpdateAppointment";
import Dashboard from "./dashboard/Dashboard";
import Appointments from "./dashboard/views/books/Appointments";
import AllTravelers from "./dashboard/views/Users/AllTravelers";
import Traveler from "./dashboard/views/Users/Traveler";
import AddTraveler from "./dashboard/views/Users/AddTraveler";
import AppointmentRequests from "./dashboard/views/Requests/AppointmentRequests";
import Requests from "./dashboard/views/Requests/Request";
import RequestsHistory from "./dashboard/views/Requests/RequestsHistory";
import UpdateRequests from "./dashboard/views/Requests/UpdateRequests";
export const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "",
        element: <AppointmentList /> ,
      },
      {
        path: "/AppointmentList",
        element: <AppointmentList />,
      },
      {
        path: "/ContactUs",
        element: <ContactUs />,
      },
      
      {
        
        path: "*",
        element: <NotFound />,
      },
     {
        path: "/AppointmentsInfo/:id",
        element: <AppointmentsInfo />,
      },
      
      ,{
        path: "/LoginPage",
        element: <LoginPage />,
      },
      {
        path: "/Register",
        element: <RegestrationPage />,
      },
     
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "appointments",
        element: <Appointments />,
        children: [
          {
            index: true,
            element: <AllAppointments />,
          },
          {
            path: "add_appointment",
            element: <AddAppointment />
          },
          {
            path: "update_appointment/:id",
            loader: UpdateAppointmenyLoader,
            element: <UpdateAppointment />
          },
        ]
      },
      {
        path: "traveler",
        element: <Traveler />,
        children: [
          {
            index: true,
            element: <AllTravelers />,
          },
          {
            path: "add_traveler",
            element: <AddTraveler />
          },
          {
            path: "update_appointment/:id",
            loader: UpdateAppointmenyLoader,
            element: <UpdateAppointment />
          },
        ]
      },
        {
            path: "requests",
            element: <Requests />,
            children: [
              {
                index: true,
                element: <AppointmentRequests />,
              },
              {
                path: "history_requests",
                element: <RequestsHistory />
              },
              {
                path: "update_request/:email",
                loader: UpdateAppointmenyLoader,
                element: <UpdateRequests />
              },
            ]
        },
    ]
  },
 
]);
