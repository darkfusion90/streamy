import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
    renderTextInput(formProps) {
        return (
            <div className="field">
                <label>{formProps.label}</label>
                <input {...formProps.input} required />
            </div>
        );
    }

    onFormSubmit = formValues => {
        this.props.onFormSubmit(formValues);
    }

    render() {
        return (
            <form className="ui form" onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
                <Field
                    name="title"
                    component={this.renderTextInput}
                    label="Enter Title" />
                <Field
                    name="description"
                    component={this.renderTextInput}
                    label="Enter Description" />

                <button className="ui primary button">{this.props.buttonText}</button>
            </form>
        );
    }
}


export default reduxForm(
    {
        form: 'streamForm'
    }
)(StreamForm);
