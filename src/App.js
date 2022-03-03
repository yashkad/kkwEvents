import "./App.css";
import Card from "./components/Card";
import Footer from "./components/Footer";
import ImageUpload from "./components/ImageUpload";
import { storage } from "./firebase/firebase";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App main">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<Footer />} />
      </Routes>
      <Footer />
    </div>

    // <div className="App main">
    //   <div className="mx-5 my-5 ">
    //     <ImageUpload />
    //   </div>
    // </div>

    // <div className="">
    //   <section className="hero is-small is-primary">
    //     <div className="hero-body">
    //       <p className="title">Event listing project</p>
    //       <p className="subtitle">Mca Department</p>
    //     </div>
    //   </section>

    //   <div className="columns p-5 ">
    //     <div className=" column is-2 container is-fluid has-background-primary-light">
    //       First column
    //     </div>
    //     <div className=" column  has-background-grey-lighter container is-fluid is-flex-direction-row ">
    //       {[1, 2, 3].map((i) => {
    //         return <Card />;
    //       })}
    //       {/* <section className="hero is-success is-fullheight">
    //         <div className="hero-body">
    //           <div className="container">
    //             <h1 className="title">Fullheight title</h1>
    //             <h2 className="subtitle">Fullheight subtitle</h2>
    //           </div>
    //         </div>
    //       </section> */}
    //     </div>
    //   </div>
    //   <Footer />
    // </div>
  );
}

export default App;
