import React, { Component } from "react";
import { withFormik, Form, Field } from "formik";

const form_id = "form_id";
class adminForm extends Component {
  editOnClick = (event) => {
    event.preventDefault();
    const data = !this?.props?.status?.edit;
    this.props.setStatus({
      edit: data,
    });
  };

  cancelOnClick = (event) => {
    event.preventDefault();
    this.props.resetForm();
    this.props.setStatus({
      edit: false,
    });
  };

  _renderAction() {
    return (
      <React.Fragment>
        <div>
          {this?.props?.status?.edit ? (
            <React.Fragment>
              <button type="submit" form={form_id}>
                Save
              </button>
              <button
                onClick={this.cancelOnClick}
                style={{ marginLeft: "8px" }}
              >
                Cancel
              </button>
            </React.Fragment>
          ) : (
            <button onClick={this.editOnClick}>Edit</button>
          )}
        </div>
      </React.Fragment>
    );
  }

  _renderFormView = () => {
    return (
      <React.Fragment>
        <div>
          <label>Subject</label>
          <div>
            <label type="text" name="subject">
              {this?.props?.fields?.subject}
            </label>
          </div>
        </div>
        <div>
          <label>Question</label>
          <div>
            <label type="text" name="question">
              {this?.props?.fields?.question}
            </label>
          </div>
        </div>
        <div>
          <label>Answer</label>
          <div>
            <label type="text" name="answer">
              {this?.props?.fields?.answer}
            </label>
          </div>
        </div>
      </React.Fragment>
    );
  };

  _renderFormInput = () => {
    return (
      <React.Fragment>
        <div>
          <label>Subject</label>
          <div>
            <Field type="text" name="subject" placeholder="Subject" />
          </div>
        </div>
        <div>
          <label>Question</label>
          <div>
            <Field type="text" name="question" placeholder="Question" />
          </div>
        </div>
        <div>
          <label>Answer</label>
          <div>
            <Field type="text" name="answer" placeholder="Answer" />
          </div>
        </div>
      </React.Fragment>
    );
  };

  render() {
    return (
      <React.Fragment>
        <h2>Formik Form</h2>
        {this._renderAction()}
        <Form id={form_id}>
          {this?.props?.status?.edit
            ? this._renderFormInput()
            : this._renderFormView()}
        </Form>
        <h4>Current value</h4>
        <div>
          <pre>
            <code>{JSON.stringify(this.props.fields, null, 2)}</code>
          </pre>
        </div>
      </React.Fragment>
    );
  }
}

const FormikForm = withFormik({
  mapPropsToStatus: (props) => {
    return {
      edit: props?.edit || false,
    };
  },
  mapPropsToValues: (props) => {
    return {
      subject: props.fields.subject,
      question: props.fields.question,
      answer: props.fields.answer,
    };
  },
  enableReinitialize: true,
  handleSubmit: (values, { props, ...actions }) => {
    props.updateFields(values);
    actions.setStatus({
      edit: false,
    });
  },
})(adminForm);

export default FormikForm;
