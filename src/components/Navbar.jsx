function Navbar() {
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">AutoSuisseMarket</a>
            <form className="d-flex ms-auto">
            <button className="btn btn-outline-dark" type="submit">Einloggen</button>
            </form>
        </div>
    </nav>
  )
}

export default Navbar
