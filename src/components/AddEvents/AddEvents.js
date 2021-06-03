import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddEvents = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [imageURL, setIMageURL] = useState(null);

  const onSubmit = (data) => {
    console.log(data);
    const eventData = {
      username: data.username,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      imageURL: imageURL,
    };
    const url = `http://localhost:5200/api/user/signup/`;

    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(eventData),
    }).then((res) => console.log("server side response", res));
  };

  const handleImageUpload = (event) => {
    console.log(event.target.files[0]);
    const imageData = new FormData();
    imageData.set("key", "18ade17cde2c79bfba3f1032fe60cd36");
    imageData.append("image", event.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        console.log(response);
        setIMageURL(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <h1>Add your awesome Event here</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" name="username" ref={register} />
        <input type="email" name="email" ref={register} />
        <input type="password" name="password" ref={register} />
        <input type="confirmPassword" name="confirmPassword" ref={register} />
        <br />
        <input name="image" type="file" onChange={handleImageUpload} />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export default AddEvents;
