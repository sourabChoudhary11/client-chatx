import axios from "axios";
import { lazy, Suspense, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import authSlice from "./store/reducers/auth";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AppLayoutLoader } from "./components/layout/Loaders";
import { server } from "./constants/config";

const Home = lazy(() => import("./pages/Home"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement"));
const MessageManagement = lazy(() => import("./pages/admin/MessageManagement"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));

const App = () => {
  const dispatch = useDispatch();
  const { user, loader } = useSelector(state => state.auth);
  const { userExists } = authSlice.actions;
  const toasterId = useRef();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${server}/api/v1/user/profile`, {
          withCredentials: true
        })
        
        dispatch(userExists(res.data.user));
      } catch (error) {
        toasterId.current = toast(error.response.data.message);
      }
    }
    fetchData();
  }, [])

  return loader ? <AppLayoutLoader /> : <BrowserRouter>
    <Suspense fallback={<AppLayoutLoader />}>
      <Routes>
        <Route element={
            <ProtectedRoute user={user} redirect={"/login"} />
        }>
          <Route path="/" element={<Home />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/chat/:chatId" element={<Chat />} />
        </Route>

        <Route path="/login" element={<ProtectedRoute user={!user} redirect={"/"}>
          <Login />
        </ProtectedRoute>} />

        <Route path="/admin" element={<AdminLogin toasterId={toasterId.current} />} />
        <Route path="/admin/dashboard" element={<Dashboard toasterId={toasterId.current} />} />
        <Route path="/admin/users" element={<UserManagement toasterId={toasterId.current} />} />
        <Route path="/admin/chats" element={<ChatManagement toasterId={toasterId.current} />} />
        <Route path="/admin/messages" element={<MessageManagement toasterId={toasterId.current} />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster position="top-center" />
    </Suspense>
  </BrowserRouter>
}

export default App