import React from 'react';
import './css/LandingMain.css';
import Formike from './Formike';
import { Scrollbars } from 'react-custom-scrollbars';
import accountContext from '../../context/account/myContext';
import SitePresentation from './SitePresentation';
import useTimer from '../../hooks/useTimer';

const MovingContainer = (props) => {
  const style = {
    position: 'absolute',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    width: '200%',
    height: '100%',
    left: props.page ? '-100%' : '0%',
    // transform: `translateX(${props.page ? '-100%' : '0%'}) `,

    transition: 'left .5s',
    // border: "1px solid red",
  };
  return (
    <div style={style}>
      <Formike type="LOGIN" />
      <Formike type="CONTACT" />
    </div>
  );
};
// console.log("/////a/aaaazaz/ss/xs//a/x//xxa/x/s////x///x//");

const LandingMain = () => {
  const contextAccount = React.useContext(accountContext);

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [page, setPage] = React.useState(0);

  const resizeEvent = () => {
    setWindowWidth(window.innerWidth);
    console.log('resizeEvent');
  };

  React.useEffect(() => {
    window.title = 'Simas Zurauskas | Home';
    window.addEventListener('resize', resizeEvent);
    return () => {
      window.removeEventListener('resize', resizeEvent);
    };
  }, []);

  const parseLines = (num) => {
    let arr = [];
    for (let i = 0; i < num; i++) {
      arr.push(<div className={`box  col-${i}`} key={i}></div>);
    }
    return arr;
  };
  const randomNum = (num) => {
    const rand = Math.floor(Math.random() * (num - 0 + 1)) + 0;
    return rand;
  };

  const addClassShine = (num) => {
    const target = document.querySelector(`.col-${randomNum(num)}`);
    // target.classList.add("shine");
    try {
      target.style.opacity = 0.8;
      // console.log(target);
      setTimeout(() => (target.style.opacity = 0.2), randomNum(15) * 1000);
    } catch (error) {
      // console.log(error);
    }
  };

  const mongoose = document.querySelector('.lil-mongoose');
  useTimer(1, 1, (period) => {
    randomNum(4) === 1 && addClassShine(parseInt(windowWidth / 40));
    // console.log(period);
    if (period === 60) mongoose.classList.add('lil-mongoose-rise');
  });

  const mongooseHide = () => {
    console.log('hide');
    mongoose.classList.add('lil-mongoose-hide');
  };
  return (
    <React.Fragment>
      <div className="landing-main">
        <div className="top-bar-shader">
          {parseLines(parseInt(windowWidth / 40))}
        </div>

         <div className="title">
           <h1 className="simas"></h1>
           <div>
            <h1 className="full-stack">Social Media Sand-Box</h1>
            <h1 className="full-stack-second">Social Media Sand-Box</h1>
          </div>
        </div>

        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            className={`landing-box box-2 ${
              !contextAccount.accountState.logged && 'box-padding'
            }  `}
          >
            <div className={`lil-mongoose`} onMouseOver={mongooseHide}></div>
            <div className="box-content">
              {true ? (
                <MovingContainer page={page} />
              ) : (
                <Formike type="LOGIN" />
              )}
              <div className="form-navigaror">
                <div
                  onClick={() => setPage(0)}
                  className="form-navigator-button-hide"
                >
                  <div
                    className={
                      page
                        ? 'form-navigator-button '
                        : 'form-navigator-button pulsating-circle'
                    }
                  ></div>
                </div>
                <div
                  onClick={() => setPage(1)}
                  className="form-navigator-button-hide"
                >
                  <div
                    className={
                      page
                        ? 'form-navigator-button pulsating-circle'
                        : 'form-navigator-button'
                    }
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <p>
            <span>2020 </span>SimasZurauskas@gmail.com
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LandingMain;
