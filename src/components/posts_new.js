import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createPost } from "../actions/index";
import { Link } from 'react-router-dom';

class PostsNew extends Component {

    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push('/')
        });
    }

    renderField(field) {
        const { meta: {touched, error} } = field;

        const classFormGroup = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={classFormGroup}>
                <label>{field.label}:</label>

                <input
                    type="text"
                    className="form-control"
                    {...field.input}
                />

                <span className="help-block text-danger">{touched ? error : ''}</span>
            </div>
        )
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    name="title"
                    label="Title"
                    component={this.renderField}
                />
                <Field
                    name="category"
                    label="Category"
                    component={this.renderField}
                />
                <Field
                    name="content"
                    label="Post content"
                    component={this.renderField}
                />
                <button className="btn btn-primary" type="submit">Add post</button>
                <Link className="btn btn-danger ml-2" to="/">Cancel</Link>
            </form>
        )
    }
}

function validate(values) {
    console.log('values', values);

    const errors = {};

    if (!values.title){
        errors.title = 'Enter a title'
    }

    if (!values.category){
        errors.category = 'Enter a category'
    }

    if (!values.content){
        errors.content = 'Enter a content'
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    connect(null, { createPost })(PostsNew)
);