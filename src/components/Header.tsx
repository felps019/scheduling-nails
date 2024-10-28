import React from 'react'

const Header = () => {
  return (
    <>
      <header className="flex items-start justify-start sm:m-6 sm:w-54 sm:h-10 drop-shadow-lg">
        <h1 className="font-poppins text-custom-name sm:text-3xl tracking-wider drop-shadow-lg">
          Amandita Nails
        </h1>
      </header>
      <main className="flex justify-center items-center sm:w-54 sm:h-8 sm:m-4">
        <h2 className="font-playfairDisplaySC sm:text-lg text-custom-name tracking-wider font-black flex justify-center items-center sm:w-54 sm:h-8 sm:m-4">
          AGENDA DE CLIENTES
        </h2>
      </main>
    </>
  )
}

export default Header
