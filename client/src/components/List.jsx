import React from "react";
import "../App.css";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";


const List = ({ contacts }) => {
  return (
    <>
      {contacts.map((person) => {
        const { _id, name, age, image } = person;
        return (
          <article key={_id} className="person">
            <img src={image} alt={name} />
            <div className="head">
              <h4>{name}</h4>
              <div>
                <HiOutlineDotsCircleHorizontal
                  style={{ color: "#1231c9", fontSize: "40" }}
                />
              </div>
              {/* <p>{age} years</p> */}
            </div>
          </article>
        );
      })}
    </>
  );
};

export default List;
