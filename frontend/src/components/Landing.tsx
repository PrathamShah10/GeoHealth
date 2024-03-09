import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import AOS from "aos";
import "aos/dist/aos.css";

const Landing = () => {
  const [text] = useTypewriter({
    words: ['Explore Insights from Around the World', ' Navigating the World of Well-being Together', 'Bridging the Gap in Personalized Health Information and Community Support', 'Your Guide to Informed Health Choices'],
    loop: 10,
    onLoopDone: () => console.log(`loop completed after 3 runs.`)
  })

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);


  return (
    <div className="landpage w-screen h-screen font-custom text-xl font-semibold  ">
      <div className="uppersvg h-80 pt-1">
        <h1 className="title font-Danc text-5xl italic text-white text-center mt-8  ">Geo Health</h1>
        <h1 className="insight font-Nan text-white text-center mt-8 text-4xl">Where Insights and Interaction Converge</h1>
        
        <div className='App font-Rubik text-white text-center mt-2 text-xl'>
          <span>{text}</span>
          <Cursor cursorColor='white' />
        </div>
        <NavLink to="/signin" className="w-40 m-auto" >
          <div className="startedbut bg-white pt-2 mt-10 text-center w-40 h-12 z-100 rounded-full shadow-md">
            <h1 className="text-gray-600">Get Started</h1>
          </div>
        </NavLink>
      </div>

      <div className="lowersvg h-max w-screen p-1  ">
        <img data-aos="fade-up-right" src="./worldh.png" className="worldh m-auto ml-[58%] -mb-32 -mt-40 relative drop-shadow-xl " alt="" />
        <div className="-z-30  flex justify-center">
          <img data-aos="zoom-in" src="./fitness.png" className="fitness h-96 drop-shadow-4xl -mr-[6.7rem] z-20 " alt="" />
          <div className="compbg w-auto h-max shadow-md p-6 bg-white z-10 relative rounded-2xl">
            <img src="./mainbg.png" className="comp z-30 ml-auto mr-auto w-[40rem] rounded" alt="" />
          </div>
          <img data-aos="fade-left"
     data-aos-offset="300"
     src="./phone.png" className="phone h-96 drop-shadow-3xl -ml-40 z-20 mt-40" alt="" />
        </div>

      </div>
      <hr className="w-5/6 m-auto mt-12" />
      <div className="content flex w-4/6 m-auto  justify-evenly mt-12">
        <div  data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000" className="flexitem w-1/3">
          <img src="./locality.png" className="imgsc shadow-md rounded-full p-2 w-16 m-auto -mb-2 z-40 relative" alt="" />
          <p className="flexp w-5/6 z-10 m-auto shadow-lg h-40">personalized information about diseases and it’s outbreaks in regions of close vicinity.</p>
        </div>
        <div  data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000" className="flexitem w-1/3">
          <img src="./news2.png " className="imgsc shadow-md rounded-full p-2 w-16 m-auto -mb-2 z-40 relative " alt="" />
          <p className="flexp w-5/6 z-10 m-auto shadow-lg h-40">Regional wise News headlines on Health related information.</p>
        </div>
        <div data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000" className="flexitem w-1/3">
          <img src="./hospital.png" className="imgsc shadow-md rounded-full p-2 w-16 m-auto -mb-2 z-40 relative " alt="" />
          <p className="flexp w-5/6 z-10 m-auto shadow-lg h-40">Building a chat based community for sharing Health insights.</p>
        </div>

      </div>
      <hr className="w-full mt-24" />
      <div className="bottom w-full h-40 p-1">
        <h1 className="text-white text-center mt-2 font-Danc italic">Geo Health</h1>
        <div className="w-[15rem]  m-auto mt-2 flex justify-around">
          <img src="./github.png" className="imgsc shadow-md rounded-full p-2 h-12 " alt="" />
          <img src="./google.png" className="imgsc shadow-md rounded-full p-2 h-12 " alt="" />
          <img src="./research.png" className="imgsc shadow-md rounded-full p-2 h-12 " alt="" />
        </div>
        <div className="flex justify-evenly w-1/4 m-auto mt-2 ">
            <h1 className="text-white text-md font-Nan font-medium">HOME</h1>
            <h1 className="text-white text-md font-Nan font-medium">ABOUT</h1>
            <h1 className="text-white text-md font-Nan font-medium">CONTACT</h1>
            <h1 className="text-white text-md font-Nan font-medium">SIGNIN</h1>
        </div>
      </div>





      {/* <div className="navb bg-white p-6 w-screen h-20 shadow-sm flex justify-between">
        <img className="logo h-10 ml-4" src="./logos.png" alt="" />
        <div className="links flex w-1/2 justify-evenly text-sea-green-600" >
          <button className="Home px-10 hover:shadow-md py-0 rounded-full text-sea-green-600 hover:text-white hover:bg-gradient-to-r from-sea-green-600 to-olive-700 ..." >
            <Link to="/">
              Home
            </Link>
          </button>
          <button className="SignIn px-10 hover:shadow-md py-0 rounded-full    hover:text-white hover:bg-gradient-to-r from-sea-green-600 to-olive-700 ... ">
            <Link to="/signin">
              SignIn
            </Link></button>
          <button className="About px-10 hover:shadow-md py-0 rounded-full text-sea-green-600 hover:text-white hover:bg-gradient-to-r from-sea-green-600 to-olive-700 ...">About</button>
        </div>
      </div> */}
      {/* <div className="landpagecont flex">
        <div className="cont-left w-1/2">
          <div className="group">
            <img className="logo3 h-40 mt-24 ml-24" src="./logo3.png" alt="" />
            <div className="extrainfo ml-32 text-4xl text-gray-600">
              <p >Personalized</p>
              <p >location based </p>
              <p >Insights</p>
            </div>
            <img className="transition-colors duration-300 ease-in-out group-hover:width-full h-7 ml-32 mt-10" src="./line.png" alt="" />
            <button className="group-hover:text-2xl text-xl mt-10 ml-32 w-48  shadow-lg text-white p-4 rounded-full bg-gradient-to-r from-sea-green-600 to-olive-700 ...">
            <Link to="/signin">
              Join Now
            </Link>
            </button>
          </div>
        </div>
        <div className="cont-right w-1/2 flex">
          <div className="images w-2/3">
          <div>
              <img className="h-96" src="./food.png" alt="" />
            </div>
           
            <div className="note flex">
              
              <img className="imgc -mt-20 ml-auto h-72 -mr-32 shadow-lg relative z-10 rounded-full" src="./cartoon.jpg " alt="" />
            </div>
            <div>
              <img className="h-72 -mt-20"  src="./protocols.png" alt="" />
            </div>
           
          </div>
          <div className="sidebar ml-auto mr-0 w-1/3 h-screen bg-gradient-to-r from-olive-600 to-sea-green-600 ..."></div>

        </div>
      </div> */}
    </div>
  );
}

export default Landing;
