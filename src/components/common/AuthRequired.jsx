import React from "react";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";

export default function (ComposedComponent) {
    class AuthRequired extends React.Component {

        static getDerivedStateFromProps(props) {
            if (!props.isAuthenticated) {
                props.history.push("/auth");
            }
        }

        componentDidUpdate(nextProps) {
            if (!nextProps.isAuthenticated) {
                this.props.history.push("/auth");
            }
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    const mapStateToProps = state => ({ isAuthenticated: state.authorization.isAuthenticated })

    return withRouter(connect(mapStateToProps, null)(AuthRequired))
}