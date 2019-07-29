import React from 'react';
import { connect } from "react-redux";

import "./SideNav.css";
import { selectCategory, fetchCategories } from '../../redux/categories/actions';

export class SideNav extends React.PureComponent {

    render() {
      const { items } = this.props.categories;

      return (
          <div className="side">
            <h2>Categories</h2>
            <div className="navbar">
              <ul>                  
                {this.renderCategories(items)}
              </ul>
            </div>
          </div>
      );
    }

    componentDidMount() {
      this.props.getAllCategories();
    }

    ///////////////////////////////////////////////////////////////////////
    //  RENDER METHODS
    ///////////////////////////////////////////////////////////////////////
    renderCategories(categories) {
      const { activeCategory } = this.props.categories;

      return categories.map((category, i) => {
        let style = (activeCategory === category.id) ? 'active_link' : '';
        return (<li className={style} key={category.id} onClick={() => this.handleSelectCategory(category.id)}>{category.name}</li>)
      })
    }

    ///////////////////////////////////////////////////////////////////////
    //  EVENT HANDLERS
    ///////////////////////////////////////////////////////////////////////
    handleSelectCategory = (categoryId) => {
      this.props.selectCategory(categoryId)
    }

}

///////////////////////////////////////////////////////////////////////
//  REDUX CONNECTION
///////////////////////////////////////////////////////////////////////
function mapDispatchToProps(dispatch) {
  return {
    getAllCategories: () => dispatch(fetchCategories()),
    selectCategory: (categoryId) => dispatch(selectCategory(categoryId))
  };
}

function mapStateToProps(state) {
  const { categories } = state;
  const categoriesToJS = categories.toJS();

  return {
    categories : categoriesToJS.categories,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);