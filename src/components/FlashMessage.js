import React, { Component } from "react";

class FlashMessage extends Component {
    componentDidMount() {
        this.timer = setTimeout(this.props.closeMessage, this.props.timeout || 5000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    alertClass(type) {
        let classes = {
            error: "alert-danger",
            alert: "alert-warning",
            notice: "alert-info",
            success: "alert-success"
        };
        return classes[type] || classes.success;
    }

    render() {
        const message = this.props.message;
        const alertClassName = `alert ${this.alertClass(message.type)} fade in`;
        const text = ` ${message.text}`;
        const title = message.title || "Alert:";

        return (
            <div className={alertClassName} role="alert">
                <strong>{title}</strong>
                {text}
            </div>
        );
    }
}

export default FlashMessage;
