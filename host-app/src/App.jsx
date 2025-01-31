import React, { Suspense } from "react";
const TodoForm = React.lazy(() => import("todoform_app/TodoForm"));
const TodoList = React.lazy(() => import("todolist_app/TodoList"));
import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="container"> 
      <Toaster position="top-center" reverseOrder={false}/>
      <Header />
      <Routes>
        <Route path="/" element={<Suspense fallback={<h1>Loading...</h1>}><TodoList /></Suspense>} />
        <Route path="/add" element={<Suspense fallback={<h1>Loading...</h1>}><TodoForm /></Suspense>} />
        <Route path="/edit/:id" element={<Suspense fallback={<h1>Loading...</h1>}><TodoForm type='edit'/></Suspense>} />
      </Routes>
    </div>
  );
};
export default App;
