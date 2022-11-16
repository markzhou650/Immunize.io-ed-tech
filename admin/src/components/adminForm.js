import React, { Component } from "react";
import { withFormik, Form, Field } from "formik";
import axios from "axios";

// Source: https://blog.devgenius.io/reactjs-form-editable-473e48fb6c9e
// https://github.com/ekaleonardo619/form-toggle-edit-formik

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

  submitOnClick = (event) => {
    // event.preventDefault();
  };

  _renderAction() {
    return (
      <React.Fragment>
        <div className="form-statusbar">
          {this?.props?.status?.edit ? (
            <React.Fragment>
              <button
                className="btn btn-primary btn-sm"
                type="submit"
                form={form_id} /*onClick={this.cancelOnClick}*/
              >
                Save
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={this.cancelOnClick}
                style={{ marginLeft: "8px" }}
              >
                Cancel
              </button>
            </React.Fragment>
          ) : (
            <button
              className="btn btn-primary btn-sm"
              onClick={this.editOnClick}
            >
              Edit
            </button>
          )}
        </div>
      </React.Fragment>
    );
  }

  _renderFormView = () => {
    return (
      <React.Fragment>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Subject:</label>
          <div className="col-sm-10">
            <label type="text" name="subject" className="form-control">
              {this?.props?.fields?.subject}
            </label>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Question:</label>
          <div className="col-sm-10">
            <label type="text" name="question" className="form-control">
              {this?.props?.fields?.question}
            </label>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Answer:</label>
          <div className="col-sm-10">
            <label type="text" name="answer" className="form-control">
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
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Subject</label>
          <div className="col-sm-10">
            <Field
              type="text"
              name="subject"
              className="form-control"
              placeholder="Subject"
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Question</label>
          <div className="col-sm-10">
            <Field
              type="text"
              name="question"
              className="form-control"
              placeholder="Question"
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Answer</label>
          <div className="col-sm-10">
            <Field
              type="text"
              name="answer"
              className="form-control"
              placeholder="Answer"
            />
          </div>
        </div>
      </React.Fragment>
    );
  };

  render() {
    return (
      <React.Fragment>
        <h2>Add New Content:</h2>
        {this._renderAction()}
        <Form id={form_id}>
          {this?.props?.status?.edit
            ? this._renderFormInput()
            : this._renderFormView()}
        </Form>
        <h4>Current value:</h4>
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
    console.log("HERE!");
    const postData = async () => {
      try {
        const res = await axios.post(
          "http://localhost:42069/questions",
          values
        );
        console.log(`Status: ${res.status}`);
        console.log(`Body: ${res.data}`);
      } catch (err) {
        console.error(err);
      }
    };
    postData();
  },
})(adminForm);

export default FormikForm;
