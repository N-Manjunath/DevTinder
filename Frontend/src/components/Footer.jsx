import React from 'react'

const Footer = () => {
  return (
   <div className="min-h-screen flex flex-col">
  {/* Main content */}
  <main className="flex-grow">
    {/* your page content here */}
  </main>

  {/* Footer */}
  <footer className="footer bg-base-300 text-base-content p-4">
    <aside>
      <p>
        Copyright © {new Date().getFullYear()} - All rights reserved by ACME
        Industries Ltd
      </p>
    </aside>
  </footer>
</div>


  )
}

export default Footer
