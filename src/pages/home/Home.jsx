import { HeaderText, HomeImg, ImgDiv } from "./Home.style";
import axios from "axios";
import { useState } from "react";
import Header from "../../components/header/Header";
import Cards from "../../components/cards/Cards";
import homeSvg from "../../assets/home.svg";

const Home = () => {
  const mealType = ["Breakfast", "Lunch", "Dinner", "Snack", "Teatime"];
  const [query, setQuery] = useState("egg");
  const [recipes, setRecipes] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(mealType[0]);

  const APP_ID = process.env.REACT_APP_APP_ID;
  const APP_KEY = process.env.REACT_APP_APP_KEY;

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&mealType=${selectedMeal}`;

  const getData = async () => {
    if (query) {
      try {
        const { data } = await axios.get(url);

        setRecipes(data.hits);
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please Enter your meal");
    }
  };

  return (
    <div>
      <Header
        setQuery={setQuery}
        setSelectedMeal={setSelectedMeal}
        mealType={mealType}
        getData={getData}
      />
      {!recipes && (
        <ImgDiv>
          <HomeImg src={homeSvg} />
        </ImgDiv>
      )}
      {recipes?.length === 0 && (
        <HeaderText>The Food can not be found</HeaderText>
      )}
      {recipes?.length > 0 && <Cards recipes={recipes} />}
      
    </div>
  );
};

export default Home;
