import React, { Component } from "react";
import { firebase } from "firebaseConfig";
import _ from "lodash";
import CategoryCreate from "./category-create";
import CategoryUpdate from "./category-update";
import "./settings-categories.css";

class SettingsCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      colors: [],
      editedList: [],
      selectedCategories: {},
      showCreateForm: false,
      showCreateBtn: true,
    };

    this.onDelete = this.onDelete.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.openCreateForm = this.openCreateForm.bind(this);
  }

  componentDidMount() {
    const db = firebase.firestore();
    db.collection("categories").onSnapshot((snapshot) => {
      const categoriesData = [];
      snapshot.forEach((doc) =>
        categoriesData.push({ ...doc.data(), id: doc.id })
      );

      this.setState({
        categories: categoriesData,
        editedList: _.sortBy(categoriesData, "title"),
      });
    });

    db.collection("colors").onSnapshot((snapshot) => {
      const colorsData = [];
      snapshot.forEach((doc) => colorsData.push(doc.data()));

      this.setState({
        colors: _.sortBy(colorsData, "title"),
      });
    });
  }

  onDelete(e, categoryId) {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this category?")) {
      const db = firebase.firestore();
      db.collection("categories").doc(categoryId).delete();
    }
  }

  selectCategory(category) {
    const { selectedCategory } = this.state;

    if (_.isEmpty(selectedCategory) || !_.isEqual(category, selectedCategory)) {
      this.setState({
        selectedCategory: category,
        showCreateBtn: false,
        showCreateForm: false,
      });
    }
  }

  closeForm() {
    this.setState({
      selectedCategory: {},
      showCreateForm: false,
      showCreateBtn: true,
    });
  }

  openCreateForm() {
    this.setState({
      showCreateForm: true,
      showCreateBtn: false,
    });
  }

  handleSort(prop) {
    this.setState({
      editedList: _.sortBy(this.state.editedList, prop),
    });
  }

  render() {
    const {
      editedList,
      selectedCategory,
      showCreateForm,
      showCreateBtn,
      colors,
    } = this.state;

    return (
      <>
        <div className="category-list">
          <div className="column left">
            <div className="category-filters">
              <div className="sorting">
                Sort by:
                <div
                  className="btn btn-primary btn-in-form"
                  onClick={() => this.handleSort("title")}
                >
                  Title
                </div>
                <div
                  className="btn btn-primary btn-in-form"
                  onClick={() => this.handleSort("name")}
                >
                  Name
                </div>
                <div
                  className="btn btn-primary btn-in-form"
                  onClick={() => this.handleSort("color")}
                >
                  Color
                </div>
              </div>
            </div>
            {editedList.map((category) => {
              const colorObj = _.find(
                colors,
                (color) => color.name === category.color
              );

              return (
                <div
                  key={category.id}
                  className={`category ${
                    _.isEqual(category, selectedCategory) ? "selected" : ""
                  }`}
                  onClick={() => {
                    this.selectCategory(category);
                  }}
                >
                  <div className="title">{category.title}</div>
                  <div className="name">{category.name}</div>
                  <div className="color">
                    {category.color}{" "}
                    <span style={{ backgroundColor: colorObj?.value }}></span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="column right">
            <div className="category-actions">
              {showCreateBtn && (
                <div
                  onClick={() => {
                    this.openCreateForm();
                  }}
                  className="btn-create-category"
                >
                  <i className="fa fa-plus"></i>
                  <h3>Create Category</h3>
                </div>
              )}

              {showCreateForm && <CategoryCreate closeForm={this.closeForm} />}

              {!_.isEmpty(selectedCategory) && (
                <CategoryUpdate
                  category={selectedCategory}
                  closeForm={this.closeForm}
                />
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SettingsCategories;
