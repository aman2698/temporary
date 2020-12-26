import React, { useEffect, useState, Fragment } from "react";
import Tabletop from "tabletop";
import '../App.css'

const Home = () => {
    const [datas, setData] = useState([]);

    useEffect(() => {
        Tabletop.init({
          key: "1_6_FxBTmZiinPGpDrDJSUP1TcIxiOHCIDwQIw8_glcQ",
          simpleSheet: true
        })
          .then((data) => setData(data))
          .catch((err) => console.warn(err));
          console.log(datas);
      }, []);
    return (
        <Fragment>
             <h1 className="flex justify-center m-5">Data From Google Sheets</h1>
             <table className='m-auto' style={{width:"80%"}}>
             <tr>
    <th>State</th>
    <th>Confirmed</th>
    <th>Active</th>
    <th>Recovered</th>
    <th>Decrease</th>
  </tr>
        {datas.map((item, i) => (
         
         <tr key={i}>
           <td className='m-2'>{item.state}</td>
           <td>{item.confirmed}</td>
           <td>{item.active}</td>
           <td>{item.recovered}</td>
           <td>{item.decrease}</td>
         </tr>
         ))}
            </table>
        </Fragment>
    )
}

export default Home
