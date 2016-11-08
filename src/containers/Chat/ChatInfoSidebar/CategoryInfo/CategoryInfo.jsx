import React, { PropTypes } from 'react';
import { Select } from 'antd';

const Option = Select.Option;

const CategoryInfo = ({
  orderId,
  categories,
  selectedCategory,
  searchedCategory,
  putOrder,
  updateSearchedCategory,
}) => {
  const categoryOptions = categories.map((c, i) => (
    <Option
      key={i}
      value={c.title}
    >
      {c.title}
    </Option>
  ));

  const saveCategory = (value) => {
    let v = value;
    if (searchedCategory) {
      v = searchedCategory;
    }

    if (v === selectedCategory.title) {
      return false;
    }

    return putOrder({
      id: orderId,
      data: {
        category: v,
      },
    });
  };

  const onCategorySearch = (value) => updateSearchedCategory(value);

  return (
    <div>
      <Select
        style={{ width: '80%' }}
        value={selectedCategory ? selectedCategory.title : ''}
        showSearch
        searchPlaceholder="添加分类"
        onSearch={onCategorySearch}
        onChange={saveCategory}
        onBlur={saveCategory}
      >
        {categoryOptions}
      </Select>
    </div>
  );
};

CategoryInfo.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.object,
  orderId: PropTypes.number.isRequired,
  searchedCategory: PropTypes.string,
  putOrder: PropTypes.func.isRequired,
  updateSearchedCategory: PropTypes.func.isRequired,
};

export default CategoryInfo;
