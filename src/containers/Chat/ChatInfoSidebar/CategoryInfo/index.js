import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { putOrder, updateSearchedCategory, updateCategory } from 'actions/order';
import CategoryInfo from './CategoryInfo';

const mapStateToProps = ({ order }) => ({
  orderId: order.selectedOrder.id,
  categories: order.categories,
  searchedCategory: order.searchedCategory,
  selectedCategory: order.selectedOrder.category || {},
});

const mapDisPatchToProps = (dispatch) => ({
  putOrder: bindActionCreators(putOrder, dispatch),
  updateSearchedCategory: bindActionCreators(updateSearchedCategory, dispatch),
  updateCategory: bindActionCreators(updateCategory, dispatch),
});

export default connect(mapStateToProps, mapDisPatchToProps)(CategoryInfo);
