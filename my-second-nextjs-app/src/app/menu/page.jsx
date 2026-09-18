import React, { Suspense } from "react";
import FoodCard from "../components/FoodCard";

const foodsPromise = fetch(
  "https://phi-lab-server.vercel.app/api/v1/lab/foods/top-foods",
).then((res) => res.json());

const FoodList = async () => {
  const data = await foodsPromise;
  const foods = data.data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5">
      {foods.map((food) => (
        <FoodCard key={food.id} food={food} />
      ))}
    </div>
  );
};

const MenuPage = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center my-6">Menu Page</h2>

      <Suspense fallback={<p className="text-center">Loading foods...</p>}>
        <FoodList />
      </Suspense>
    </div>
  );
};

export default MenuPage;
