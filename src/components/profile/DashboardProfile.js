import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUserInfo, saveUserInfo } from "../../actions/user";

import FormField from "./FormField";
import FlashMessage from "../FlashMessage";

import "./DashboardProfile.css";

import formFieldData from "./formFieldData";
const mapStateToProps = state => ({
    token: state.authenticate.token,
    userInfo: state.user.info
});

class DashboardProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: this.props.userInfo,
            flashMessage: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { dispatch, token } = this.props;
        dispatch(fetchUserInfo(token))
            .then(info => {
                this.setState({
                    ...this.state,
                    info
                });
            })
            .catch(err => {
                throw err;
            });
    }

    onFieldChange(key, event) {
        console.log(key, event.target.value);
        this.setState({
            ...this.state,
            info: {
                ...this.state.info,
                [key]: event.target.value
            }
        });
        console.log("this.state", this.state);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { dispatch, token } = this.props;
        dispatch(saveUserInfo(this.state.info, token))
            .then(info => {
                this.setState({
                    ...this.state,
                    info,
                    flashMessage: {
                        type: "success",
                        text: "Your information was saved",
                        title: "Good news!"
                    }
                });
            })
            .catch(err => {
                console.dir(err);
                let errObj = { type: "error" };
                if (err.response.status === 401) {
                    errObj.text = "You don't have authorization to do that.";
                } else {
                    errObj.text = "Something went wrong. Try again.";
                }
                this.setState({
                    ...this.state,
                    flashMessage: errObj
                });
            });
    }

    render() {
        console.log(this);
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-4 col-md-4" />
                    <div className="col-sm-4 col-md-4">
                        {this.state.flashMessage
                            ? <FlashMessage
                                  message={this.state.flashMessage}
                                  closeMessage={() => {
                                      this.setState({
                                          ...this.state,
                                          flashMessage: null
                                      });
                                  }}
                              />
                            : null}
                        <form onSubmit={this.handleSubmit}>
                            {formFieldData.map((field, index) => (
                                <FormField
                                    key={index}
                                    label={field.label}
                                    type={field.type}
                                    id={field.id}
                                    placeholder={field.placeholder}
                                    value={
                                        this.state.info
                                            ? this.state.info[field.id]
                                            : ""
                                    }
                                    onChange={function(edit) {
                                        this.onFieldChange(field.id, edit);
                                    }.bind(this)}
                                />
                            ))}
                            <div className="btn-toolbar">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Submit changes
                                </button>
                                <button
                                    type="reset"
                                    className="btn btn-default"
                                    onClick={e => {
                                        e.preventDefault();
                                        this.setState({
                                            ...this.state,
                                            info: this.props.userInfo,
                                            flashMessage: {
                                                type: "notice",
                                                text: "Form reset to original values",
                                                title: "Cancelled:"
                                            }
                                        });
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-sm-4 col-md-4" />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(DashboardProfile);
