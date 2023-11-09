import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

const Navbar = React.lazy(() => import("../components/Navbar"));
const Feed = React.lazy(() => import("../components/Feed"));
const PinDetail = React.lazy(() => import("../components/PinDetail"));
const CreatePin = React.lazy(() => import("../components/CreatePin"));
const Search = React.lazy(() => import("../components/Search"));

function Pins({ user }) {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className='px-2 md:px-5'>
      <div className='bg-gray-50'>
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={user}
        />
      </div>
      <div className='h-full'>
        <Routes>
          <Route path='/' element={<Feed />} />
          <Route path='/category/:categoryId' element={<Feed />} />
          <Route
            path='/pin-detail/:pinId'
            element={<PinDetail user={user} />}
          />
          <Route path='/Create-pin' element={<CreatePin user={user} />} />
          <Route
            path='/search'
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default Pins;
