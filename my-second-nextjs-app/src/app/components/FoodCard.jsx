import React from "react";
import Image from "next/image";

const FoodCard = ({ food }) => {
  console.log(food.dish_name, food.image_link);
  return (
    <div className="border border-gray-300 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg hover:border-blue-500 transition duration-300">
      <Image
        src={food.image_link}
        alt={food.dish_name}
        width={500}
        height={500}
        className="w-full h-52 object-cover"
        unoptimized
      />

      <div className="p-5">
        <h2 className="text-lg font-bold text-gray-800">{food.dish_name}</h2>

        <p className="mt-2 text-gray-600">⭐ {food.rating}</p>

        <p className="mt-2 text-xl font-bold text-green-600">৳ {food.price}</p>
      </div>
    </div>
  );
};

export default FoodCard;
