function App() {

  return (
    <div className="bg-slate-500 min-h-screen flex items-center justify-center">
    <Routes>
      <Route path="/" element= {<Home/>} />
      <Route path="/api/auth/register" element= {<Register/>} />
      <Route path="/api/auth/login" element= {<Login/>} />
    </Routes>
    </div>
  )
}

export default App;