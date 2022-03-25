import React from "react";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";

const InfoCard = ({
  img,
  location,
  title,
  description,
  star,
  price,
  total,
}) => {
  return (
    <div className="afterMobile:flex py-7 px-2 border-b cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t">
      <div className="relative w-full h-48 afterMobile:h-24 afterMobile:w-40 md:h-52 md:w-[300px] ">
        <Image
          src={img}
          layout="fill"
          objectFit="cover"
          alt="place-pic"
          className="rounded-xl"
        />
      </div>

      <div className="flex flex-col flex-1 afterMobile:pl-5 mt-2 afterMobile:mt-0">
        <div className="flex justify-between">
          <p>{location}</p>
          <HeartIcon className="h-7 cursor-pointer" />
        </div>
        <h4 className="text-xl">{title}</h4>
        <div className="border-b w-10 pt-2" />
        <p className="pt-2 text-sm text-gray-500 flex-1">{description}</p>

        <div className="flex justify-between items-end pt-5">
          <p className="flex items-center">
            <StarIcon className="h-5 text-red-400" />
            {star}
          </p>
          <div>
            <p className="text-lg font-semibold lg:text-2xl pb-2">{price}</p>
            <p className="font-extralight text-right">{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
