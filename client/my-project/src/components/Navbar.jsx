const Navbar = () => {
  return (
    <nav className="bg-white p-4 shadow-md">
      <div className=" mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-red-500">Pinterest</div>

        {/* Search Bar */}
        {/* <div className="flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="p-2 border rounded-md focus:outline-none"
          />
          <button className="bg-red-500 text-white ml-2 p-2 rounded-md">Search</button>
        </div> */}

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          <button className="bg-red-500 text-white p-2 rounded-md">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
