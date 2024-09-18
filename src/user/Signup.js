import React, { Component } from 'react';
import { signup } from '../auth';
import { Link } from 'react-router-dom';
class Signup extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
            email: "",
            dob: "",
            gender: "",
            password: "",
            personalization: "",
            error: ""
        };
    }

    handleChange = name => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    };

    clickSubmit = event => {
        event.preventDefault();
        const { name, email, password ,dob, gender, personalization} = this.state;
        const user = {
            name,
            email,
            dob,
            gender,
            password,
            personalization
        };
        // console.log(user);

        signup(user)
            .then(data => {
                if (data.error) this.setState({ error: data.error });
                else this.setState({
                    error: "",
                    name: "",
                    email: "",
                    dob: "",
                    gender: "",
                    password: "",
                    personalization: "",
                    open: true
                });
            });
    };

    signupForm = (name, email, password, dob, gender, personalization) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={this.handleChange("name")} type="text" className="form-control" value={name}></input>
            </div>
            <div className="form-group">
                <label className="text-muted">Date of Birth</label>
                <input onChange={this.handleChange("dob")} type="date" className="form-control" value={dob}></input>
            </div>
            <div className="form-group">
                <label className="text-muted">Gender</label>
                <select onChange={this.handleChange("gender")} className="form-control" value={gender}>
                    <option></option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>

            </div>
            <div className="form-group">
                <label className="text-muted">Type of food that you like</label>
                <select onChange={this.handleChange("personalization")} className="form-control" value={personalization}>
                    <option></option>
                    <option value="Veggie">Veggie</option>
                    <option value="Streetfood">Streetfood</option>
                    <option value="Healthyfood">Healthyfood</option>
                </select>

            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={this.handleChange("email")} type="email" className="form-control" value={email}></input>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={this.handleChange("password")} type="password" className="form-control" value={password}></input>
            </div>
            <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
                Submit
                    </button>
        </form>
    );

    render() {
        const { name, email, password, error, open } = this.state
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Register</h2>

                <div className="alert alert-danger" style={{ display: error ? "" : 'none' }}>{error}</div>

                <div className="alert alert-info" style={{ display: open ? "" : 'none' }}>New account is successfully created. Please <Link to="/signin">Sign In</Link>
                </div>

                {this.signupForm(name, email, password)}
            </div>
        );
    }
}

export default Signup;