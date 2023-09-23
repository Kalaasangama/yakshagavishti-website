import React from "react";
import Achievement1 from "./Achievement1";

import Achievement2 from "./Achievement2";
import bg1 from "../Images/y4.jpg";
import bg2 from "../Images/diwali_7_c.jpg";
import a_img from '../Images/y4.jpg'


// import Achievement1 from "./Achievement1";

const Achievement = () => {
    return (
      <div>
        <Achievement1
          bg={bg1}
          achieveImg={a_img}
          hidden="block"
          head="Head 1"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. At doloremque consectetur fugit cumque rem omnis sed provident, sit eos voluptas, nostrum voluptates nisi blanditiis accusantium porro? Odio eos dignissimos voluptas!"
        />
        <Achievement2
          bg={bg2}
          achieveImg={a_img}
          head="Head 2"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. At doloremque consectetur fugit cumque rem omnis sed provident, sit eos voluptas, nostrum voluptates nisi blanditiis accusantium porro? Odio eos dignissimos voluptas!"
        />
        <Achievement1
          bg={bg1}
          achieveImg={a_img}
          hidden="invisible"
          head="Head 3"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. At doloremque consectetur fugit cumque rem omnis sed provident, sit eos voluptas, nostrum voluptates nisi blanditiis accusantium porro? Odio eos dignissimos voluptas!"
        />
        <Achievement2
          bg={bg2}
          achieveImg={a_img}
          head="head 4"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. At doloremque consectetur fugit cumque rem omnis sed provident, sit eos voluptas, nostrum voluptates nisi blanditiis accusantium porro? Odio eos dignissimos voluptas!"
        />
      </div>
    );
  };
  
export default Achievement;
