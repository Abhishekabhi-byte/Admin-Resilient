import React from 'react'

const page = () => {
  return (
   <header className="w-full bg-black shadow-sm">
  <div className="flex items-center bg-white  justify-between p-5">

    {/* LOGO */}
    <div className="text-xl text-black-500 font-bold">
      <img src="globe.svg" alt="Logo" />
    </div>

    {/* LOGOUT */}
    <button
      className="
        bg-red-500
        hover:bg-red-600

        text-white

        px-4
        py-2

        rounded-lg

        transition
      "
    >
      Logout
    </button>

  </div>
</header>
  )
}

export default page
