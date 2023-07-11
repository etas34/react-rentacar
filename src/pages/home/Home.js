import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import Vehicles from '../../components/vehicleList/VehicleList';
import './home.css';


const Home = () => {
    return (
        <div>
        <Navbar/>
        <Header/>
        
      <div className="homeContainer">
        
      <h1 className="homeTitle">Some cars you might like</h1>
      <Vehicles/>
      <Footer/>


      </div>
        </div>
        
    )
}

export default Home