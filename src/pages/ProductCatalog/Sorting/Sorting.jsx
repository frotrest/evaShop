import css from './Sorting.module.css';
import { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import clsx from 'clsx';

export default class Sorting extends Component {
  render() {
    const { sortBy, itemsToShow } = this.props;
    return (
      <div className={clsx(css.sorting)}>
        <Formik
          enableReinitialize={true}
          initialValues={{
            sortBy: sortBy,
            itemsToShow: itemsToShow,
          }}
        >
          {({ handleChange }) => (
            <Form className={clsx(css.sorting__form)}>
              <Field
                as="select"
                name="sortBy"
                onChange={(e) => {
                  handleChange(e);
                  this.props.onSort(e.target.value);
                }}
                className={clsx(css.sorting__field)}
              >
                <option value="desc">Price (High to Low)</option>
                <option value="asc">Price (Low to High)</option>
              </Field>
              <Field
                as="select"
                name="itemsToShow"
                onChange={(e) => {
                  handleChange(e);
                  this.props.onShow(e.target.value);
                }}
                className={clsx(css.sorting__field, css.sorting__field2)}
              >
                <option value="10">10 </option>
                <option value="20">20</option>
                <option value="all">Show all</option>
              </Field>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
