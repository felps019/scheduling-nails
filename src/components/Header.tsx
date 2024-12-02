import React from 'react'

const Header = () => {
  return (
    <>
      <header className="flex items-start justify-start mobile:m-auto mobile:w-54 mobile:h-10 mobile-m:m-4 drop-shadow-lg">
        <h1 className="font-poppins text-custom-name mobile:text-3xl mobile:m-4 tracking-wider drop-shadow-lg">
          Amandita Nails
        </h1>
      </header>
      <main className="flex justify-center items-center mobile:w-54 mobile:h-8 mobile:mt-6">
        <h2 className="font-playfairDisplaySC mobile:text-lg text-custom-name tracking-wider font-black flex justify-center items-center mobile:w-54 mobile:h-8 ">
          AGENDA DE CLIENTES
        </h2>
      </main>
    </>
  )
}

export default Header
