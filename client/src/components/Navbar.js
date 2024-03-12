const Navbar = ({ id }) => {
  return (
    <>
      <div>
        <nav className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex w-full sm:items-stretch sm:justify-start">
                <div className="flex w-2/5 flex-shrink-0 items-center text-white text-xl font-medium">
                  Notes Making App
                </div>
                <div className="w-4/5 flex items-end justify-center hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <a
                      href="/"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      aria-current="page"
                    >
                      {
                        id && id === 'create' ? ("Create Notes") : ("Edit Note")
                      }
                    </a>
                    <a
                      href="/notes"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    >
                      View Notes
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
