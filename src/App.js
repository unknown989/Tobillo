import { useEffect, useState } from 'react';
import './App.css';
import Image from "./TOBILLO.png"

function Card({ name, image, type, deleteCallback, modifyCallback }) {
  return (<div className='card'>
    <button className='delete' onClick={deleteCallback}>DELETE</button>
    <button className='modify' onClick={modifyCallback}>MODIFY</button>
    <div className="image"><img src={image} />
    </div>
    <div className="name">
      <h1>{name}</h1>
    </div>
  </div>
  )
}
function AddCard({ callback }) {
  return <div onClick={() => callback()} className='card add'>
    <div className='image'><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="128" height="128" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg></div>
    <div className='name'><h1>Add</h1></div>
  </div>
}

function PopUp({ callback, _name = "", _image = "" }) {
  const [name, setName] = useState(_name);
  const [image, setImage] = useState(_image);
  return <div className='popup'>
    <input type="text" value={name} onInput={(e) => setName(e.target.value)} placeholder='name...' />
    <input type="text" value={image} onInput={(e) => setImage(e.target.value)} placeholder='image...' />
    <button onClick={() => { callback(name, image) }}>Submit</button>
  </div >
}

function App() {
  const [openAddPopUp, setOpenAddPopUp] = useState(false);
  const [openModifyPopUp, setOpenModifyPopUp] = useState(false);
  const [data, setData] = useState(JSON.parse(localStorage.getItem("images_data")) || [
    {
      id: 0,
      name: "John emo",
      image: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.dumpaday.com%2Fwp-content%2Fuploads%2F2019%2F12%2Fpictures-10-2.jpg&f=1&nofb=1",
      type: "Image",
    },
    {
      id: 1,
      name: "Call Urf",
      image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmemeguy.com%2Fphotos%2Fimages%2Fjust-some-random-profile-photo-on-okcupid-136668.png&f=1&nofb=1",
      type: "Image"
    }
  ])

  const [currentModifiedData, setCurrentModifiedData] = useState({ name: "", image: "", id: "" });
  useEffect(() => {
    localStorage.setItem("images_data", JSON.stringify(data));
  }, [data])

  const add = (name, image) => {
    if (!name || !image) {
      setOpenAddPopUp(false);
    } else {
      setData([...data, {
        id: data.length,
        name,
        image,
        type: "Image"
      }])
      setOpenAddPopUp(false);
    }
  }
  const deleteCard = (id) => {
    const newdata = data.filter((d) => d.id !== id);
    setData(newdata)
  }
  const modifyCard = (name, image) => {
    if (name === currentModifiedData.name && image === currentModifiedData.image) {
    } else {
      var newdata = data.filter((d) => d.id !== currentModifiedData.id);
      newdata.push({ id: currentModifiedData.id, name, image });
      newdata.sort((a, b) => a.id - b.id);
      setData(newdata);
    }
    setOpenModifyPopUp(false);
  }

  return (
    <div className="App">
      {openAddPopUp && <PopUp callback={add} />}
      {openModifyPopUp && <PopUp _name={currentModifiedData.name} _image={currentModifiedData.image} callback={modifyCard} />}
      <div className={`background ${(openAddPopUp || openModifyPopUp) && "locked"} `}>
      </div>
      <nav className={`navbar ${(openAddPopUp || openModifyPopUp) && "locked"}`}>
        <div className='logo'><img src={Image} /></div>
        <div className='elements'>
          <button className='selected'>HOME</button>
          <button>ABOUT</button>
          <button>CONTACT</button>
        </div>
      </nav>
      <div className={`container ${(openAddPopUp || openModifyPopUp) && "locked"} `}>
        {data.map((p) => {
          return <Card name={p.name} modifyCallback={() => { setCurrentModifiedData(p); setOpenModifyPopUp(true) }} deleteCallback={() => deleteCard(p.id)} image={p.image} type={p.type} key={p.id} />
        })}
        <AddCard callback={() => { setOpenAddPopUp(true) }} />
        <div className='space'></div>
      </div>
    </div>
  );
}

export default App;

