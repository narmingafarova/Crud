import { Route, Routes } from "react-router-dom";

import AppHeader from "./components/Header";
import UsersPage from "./pages/Users";
import HomePage from "./pages/HomePage";
import UserPostsPage from "./pages/Userposts";
import NotFoundPage from "./pages/NotFoundPage";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/users/:id/posts" element={<UserPostsPage/>}/>
        <Route path="/users" element={<UsersPage />} />
        <Route path="/" exact element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
