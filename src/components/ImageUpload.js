import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";

const ImageUpload = (props) => {
  const storage = getStorage();

  let [file, setFile] = useState();
  let [img, setImg] = useState(null);
  let [error, setError] = useState(null);
  let acceptFormat = ["image/png", "image/jpeg"];
  let [progress, setProgress] = useState(1);

  const [arr, setArr] = useState([]);
  const [urlArr, setUrlArr] = useState([]);

  const onChangeHandler = (e) => {
    setImg(URL.createObjectURL(e.target.files[0]));
    const files = e.target.files;
    if (acceptFormat.includes(files[0].type)) {
      setFile(files);
    }
  };

  const handleUpload = () => {
    const storageRef = ref(storage, "kkw");
    const childRef = ref(storage, `kkw/${file[0].name}`);

    uploadBytes(childRef, file[0]).then((snapshot) => {
      console.log("Uploaded a blob or file!", snapshot);
      var pr =
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(pr);
    });

    console.log("File : ", file[0].name);
  };

  const downloadFile = (path) => {
    let url =
      "gs://project-kkw.appspot.com/" + (path ? path : "kkw/tempImage.png");

    // const pathReference = ref(storage, "kkw/tempImage");

    const gsReference = ref(storage, url);

    getDownloadURL(ref(storage, `${path ? path : ""}`))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();

        // Or inserted into an <img> element
        const img = document.getElementById("myimg");
        img.setAttribute("src", url);
      })
      .catch((error) => {
        throw error;
        // Handle any errors
      });
  };

  const listFiles = () => {
    const listRef = ref(storage, "kkw/");
    const temp = [];
    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
          console.log("folderRef : ", folderRef);
        });
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          console.log("itemRef : ", itemRef);
          console.log("paht", itemRef.fullPath);
          temp.push(itemRef);
        });
        setArr([...temp]);
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        throw error;
      });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {true && (
        <div className="box block box-color ">
          <figure className="image is-2by1 ">
            <img id="myimg" src={img} className="" />
          </figure>
        </div>
      )}

      {/* <div>{<img id="myimg" alt="img" />}</div> */}

      <div className="file is-success is-justify-content-center p-5 ">
        <label className="file-label ">
          <input
            className="file-input"
            type="file"
            accept="image/*"
            name="resume"
            onChange={onChangeHandler}
          />
          <span className="file-cta">
            <span className="file-icon">
              <i className="fas fa-upload"></i>
            </span>
            <span className="file-label">Choose a file…</span>
          </span>
          {file && (
            <span className="file-name has-text-primary-dark">
              {file[0].name}
            </span>
          )}
        </label>
      </div>

      {/* {file && <ProgressBar file={file} setFile={setFile} />} */}

      {/* <div className=" box mx-6 my-2">
        <progress
          className="progress is-success"
          value={progress + ""}
          max="100"
        >
          50%
        </progress>
      </div> */}

      {file && (
        <button
          className="button is-primary is-large m-5"
          onClick={handleUpload}
        >
          upload
        </button>
      )}

      <button className="button is-large m-5" onClick={listFiles}>
        List
      </button>

      <div>
        {arr.map((i, index) => {
          console.log(i);
          return (
            <li
              key={index}
              className="button m-5"
              onClick={() => {
                downloadFile(i.fullPath);
              }}
            >
              {i.fullPath}
            </li>
          );
        })}
      </div>
        
    <h1>{urlArr.length}</h1>
    <div>
        {
            urlArr.map((item,index)=>{
                return(
                    <img src={item}/>
                )
            })
        }
    </div>

    </form>
  );
};

export default ImageUpload;
