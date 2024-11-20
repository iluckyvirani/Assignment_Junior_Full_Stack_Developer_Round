/** @format */

import React, { useEffect, useState } from "react";
import { DashboardCards } from "../../Component/Cards";
import HOC from "../../Layout/HOC";
import { getApi } from "../../Repository/Repository";


const Dashboard = () => {
  const [response, setResponse] = useState({});

  useEffect(() => {
    getApi({
      url: "api/book/getall/book",
      setResponse,
    });

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  const card = [
    {
      title: "Total Books",
      number: response?.totalItems || 0,
      icon: <i className="fa-solid fa-book text-2xl text-[#03AED2]"></i>,
      bg: "#03AED2",
      link: "/all-books",
    },

  ];

  return (
    <>
      <section className="CardDiv_Container">
        {card.map((card, index) =>
          card.title ? (
            <DashboardCards
              bg={card.bg}
              link={card.link}
              title={card.title}
              number={card.number}
              icon={card.icon}
              key={index}
            />
          ) : (
            <div style={{ width: "350px" }}></div>
          )
        )}
      </section>{" "}
    </>
  );
};

export default HOC(Dashboard);
