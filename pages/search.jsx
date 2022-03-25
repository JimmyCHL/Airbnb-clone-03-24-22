import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";

const Search = ({ searchResults }) => {
  let router = useRouter();
  const { location, startDate, endDate, noOfGuests } = router.query;
  const [range, setRange] = useState("");

  useEffect(() => {
    //router.query would be undefined until the page is loaded and after all renders and renders are done in the end.
    if (router.query.hasOwnProperty("location")) {
      if (
        !location ||
        !startDate ||
        !endDate ||
        Number(noOfGuests) === 0 ||
        isNaN(Number(noOfGuests))
      ) {
        router.push("/");
        return;
      }

      if (isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) {
        router.push("/?error=invalidDate");
      } else {
        const formattedStartDate = format(
          new Date(startDate || Date.now()),
          "dd MMMM yy"
        );
        const formattedEndDate = format(
          new Date(endDate || Date.now()),
          "dd MMMM yy"
        );
        const range = `${formattedStartDate} - ${formattedEndDate}`;
        setRange(range);
      }
    }
  }, [router, location, startDate, endDate, noOfGuests]);

  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${noOfGuests}`} />

      <main className="flex">
        <section className="flex-1 pt-8 px-4">
          <p className="text-xs">
            300+ Stays - {range} - for {noOfGuests} guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6 whitespace-nowrap">
            Stays in {location}
          </h1>

          <div className="flex flex-wrap mb-5 gap-3 text-gray-800">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More Filters</p>
          </div>

          <div className="flex flex-col">
            {searchResults?.map(
              (
                { img, location, title, description, star, price, total },
                index
              ) => (
                <InfoCard
                  key={index}
                  img={img}
                  location={location}
                  title={title}
                  description={description}
                  star={star}
                  price={price}
                  total={total}
                />
              )
            )}
          </div>
        </section>
        <section className="hidden xl:inline-flex sticky top-[92px] xl:min-w-[600px] h-[500px] ">
          <Map searchResults={searchResults} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );

  return {
    props: {
      searchResults,
    },
  };
}
