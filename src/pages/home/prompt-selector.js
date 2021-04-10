import React from "react";
import { firebase } from "firebaseConfig";
import _ from "lodash";

import styled from "styled-components";
import { tokens } from "styles/variables";

import { PromptSelectorMenu } from "pages/home/prompt-selector-menu";

export const PromptSelector = () => {
  const [selection, setSelection] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [colors, setColors] = React.useState([]);
  const [allPrompts, setAllPrompts] = React.useState([]);
  const [promptLists, setPromptLists] = React.useState();

  React.useEffect(() => {
    const db = firebase.firestore();

    db.collection("categories").onSnapshot((snapshot) => {
      const categoriesData = [];
      snapshot.forEach((doc) => categoriesData.push(doc.data()));

      setCategories(categoriesData);
    });

    db.collection("colors").onSnapshot((snapshot) => {
      const colorsData = [];
      snapshot.forEach((doc) => colorsData.push(doc.data()));

      setColors(colorsData);
    });

    db.collection("prompts").onSnapshot((snapshot) => {
      const promptsData = [];
      snapshot.forEach((doc) =>
        promptsData.push({ ...doc.data(), id: doc.id })
      );

      setAllPrompts(promptsData);
    });

    setLists();
  }, [allPrompts.length]);

  const setLists = () => {
    const categoryList = [];
    categories.forEach((category) => {
      if (category.name !== "") {
        categoryList.push(category.name);
      }
    });

    const categoryObj = {};
    categoryList.forEach(
      (category) =>
        (categoryObj[category] = _.filter(allPrompts, { category: category }))
    );

    setPromptLists(categoryObj);
  };

  const onSelect = (e) => {
    const selectedValue = e.target.value;

    if (!_.isEmpty(promptLists)) {
      const randomNr = Math.floor(
        Math.random() * promptLists[selectedValue]?.length
      );
      const selectionResult = promptLists[selectedValue][randomNr];
      const updateSelectedList = promptLists[selectedValue].filter(
        (val, index) => index !== randomNr
      );

      setSelection(selection.concat(selectionResult));
      setPromptLists({
        ...promptLists,
        [selectedValue]: updateSelectedList,
      });
    }
  };

  const clear = () => {
    setSelection([]);
    setLists();
  };

  const getListStatus = () => {
    const statusObj = {};

    if (categories && promptLists) {
      categories.forEach((category) => {
        if (promptLists[category.name]) {
          statusObj[category.name] = promptLists[category.name].length;
        }
      });
    }

    return statusObj;
  };

  const removeCard = (prompt) => {
    setPromptLists({
      ...promptLists,
      [prompt.category]: promptLists[prompt.category].concat(prompt),
    });
    setSelection(
      selection.filter((val) => {
        return val.id !== prompt.id;
      })
    );
  };

  return (
    <div>
      <PromptSelectorMenu
        onClick={onSelect}
        categories={categories}
        listStatus={getListStatus()}
        colors={colors}
      />

      <div>
        {selection.length > 0 && (
          <PromptGrid
            selection={selection}
            removeCard={removeCard}
            categories={categories}
            colors={colors}
          />
        )}
      </div>

      <ClearPrompts onClick={clear}>
        <i className="fa fa-trash"></i> <span>Clear Selection</span>
      </ClearPrompts>
    </div>
  );
};

const ClearPrompts = styled.div`
  position: fixed;
  right: -126px;
  width: 180px;
  height: 80px;
  top: 45%;
  background-color: ${tokens.colorRed};
  border-radius: 80px 0% 0 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: right;
  padding: 10px 10px 10px 20px;
  transition: right 0.2s ease;
  cursor: pointer;
  box-sizing: border-box;

  i {
    font-size: 26px;
    margin-right: 26px;
  }
  span {
    font-size: 1.2rem;
  }
  &:hover {
    right: 0px;
    transition: right 0.2s ease;
  }
`;

const PromptGrid = ({ selection, removeCard, categories, colors }) => {
  return (
    <PromptGridWrapper>
      {selection.map((prompt, index) => {
        const categoryObj = _.find(
          categories,
          (category) => category.name === prompt.category
        );

        const colorObj = _.find(
          colors,
          (color) => color.name === categoryObj.color
        );

        return (
          <PromptCard key={`prompt-${index}`} $color={colorObj?.value}>
            <DeleteCard
              onClick={() => {
                removeCard(prompt);
              }}
            >
              <i className="fa fa-times"></i>
            </DeleteCard>
            {/* <div className="image">
							<img src={prompt.imageUrl ? prompt.imageUrl : 'images/placeholder.png'} alt="" />
						</div> */}
            <CardTitle>{prompt.description}</CardTitle>
            <CardCategory>{prompt.category}</CardCategory>
          </PromptCard>
        );
      })}
    </PromptGridWrapper>
  );
};

const PromptGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 1fr;
  column-gap: 10px;
  row-gap: 15px;

  @media (max-width: 552px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;
const PromptCard = styled.div`
  position: relative;
  background-color: white;
  color: ${tokens.colorPrimary};
  text-align: center;
  border: 5px solid
    ${(props) => props.$color || lighten(0.3, tokens.colorPrimary)};
  border-radius: 10px;
  padding: 30px 20px 20px;
  display: grid;
  align-items: center;
  grid-template-rows: 1fr 40px 30px;
  grid-template-areas: "description" "category";
`;
const DeleteCard = styled.div`
  position: absolute;
  top: 8px;
  right: 15px;
  font-size: 26px;
  cursor: pointer;

  &:hover {
    color: ${tokens.colorRed};
  }
`;
const CardTitle = styled.div`
  grid-area: description;
  font-size: 1.5rem;
  text-transform: lowercase;
`;

const CardCategory = styled.div`
  grid-area: category;
  font-size: 1rem;
  text-transform: uppercase;
  font-style: italic;
`;
