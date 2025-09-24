import axios from "axios";
import { lazy, Suspense, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import authSlice from "./store/reducers/auth";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AppLayoutLoader } from "./components/layout/Loaders";
import { server } from "./constants/config";
import { SocketProvider } from "./Socket";

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

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${server}/api/v1/user/profile`, {
          withCredentials: true
        })
        
        dispatch(userExists(res.data.user));
      } catch (error) {
        toast(error.response.data.message);
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

        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/chats" element={<ChatManagement />} />
        <Route path="/admin/messages" element={<MessageManagement />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster position="top-center" />
    </Suspense>
  </BrowserRouter>
}

export default App