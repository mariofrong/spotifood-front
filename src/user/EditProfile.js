import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { read, update, updateUser } from './apiUser';
import { Redirect } from "react-router-dom";
import DefalutProfrile from '../images/avatar.jpg';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';

class EditProfile extends Component {

    constructor() {
        super()
        this.state = {
            id: "",
            name: "",
            email: "",
            password: "",
            redirectToProfile: false,
            error: "",
            fileSize: 0,
            loading: false,
            about: "",
            personalization: ""
        };
    }

    init = userId => {
        const token = isAuthenticated().token;
        read(userId, token)
            .then(data => {
                if (data.error) {
                    console.log({ redirectToProfile: true });
                } else {
                    this.setState({
                        id: data._id,
                        name: data.name,
                        email: data.email,
                        error: '',
                        about: data.about,
                        personalization: data.personalization
                    });
                }
            });
    };

    componentDidMount() {
        this.userData = new FormData()
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    isValid = () => {
        const { name, email, password, fileSize } = this.state
        if (fileSize == 160000) {
            this.setState({ error: "Only jpg/jpeg and png files are allowed!", loading: false });
            return false
        }
        if (fileSize > 150000) {
            this.setState({ error: "File size should be less than 150kb", loading: false });
            return false
        }
        if (name.length === 0) {
            this.setState({ error: "This name field can not empty", loading: false })
            return false
        }
        // email@domail.com
        if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
            this.setState({ error: "A valid Email is required", loading: false });
            return false
        }
        // 
        if (password.length >= 1 && password.length <= 5) {
            this.setState({ error: "Password must be at least 6 characters long", loading: false });
            return false;
        }
        return true;
    };

    handleChange = name => event => {
        const fileName = document.getElementById("fileName").value;
        const idxDot = fileName.lastIndexOf(".") + 1;
        var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
            //TO DO

        } else {
            this.setState({ error: "Only jpg and png files are allowed!", loading: false, fileSize: 160000 });
            return false
        }

        this.setState({ error: "" });
        const value = name === 'photo' ? event.target.files[0] : event.target.value;

        const fileSize = name === 'photo' ? event.target.files[0].size : 0;
        this.userData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;

            update(userId, token, this.userData).then(data => {
                if (data.error) {
                    this.setState({ error: data.error });
                    // if admin only redirect
                } else if (isAuthenticated().user.role === "admin") {
                    this.setState({
                        redirectToProfile: true
                    });
                } else {
                    // if same user update localstorage and redirect
                    updateUser(data, () => {
                        this.setState({
                            redirectToProfile: true

                        });
                    });
                }
            });
        }
    };

    editUserForm = (name, email, password, about, personalization) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Profile Photo</label>
                <input onChange={this.handleChange("photo")} id="fileName" type="file" accept="image/*" className="form-control"></input>
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={this.handleChange("name")} type="text" className="form-control" value={name}></input>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={this.handleChange("email")} type="email" className="form-control" value={email}></input>
            </div>
            <div className="form-group">
                <label className="text-muted">About</label>
                <textarea onChange={this.handleChange("about")} type="text" className="form-control" value={about}></textarea>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={this.handleChange("password")} type="password" className="form-control" value={password}></input>
            </div>
            <div className="form-group">
                <label className="text-muted">Personality</label>
                <select onChange={this.handleChange("personalization")} type="text" className="form-control" value={personalization}>
                    <option></option>
                    <option value="Veggie">Veggie</option>
                    <option value="Streetfood">Streetfood</option>
                    <option value="Healthyfood">Healthyfood</option>
                </select>

            </div>
            <Button onClick={this.clickSubmit} variant="contained"
                color="primary"
                size="large"
                startIcon={<SaveIcon />}>
                UPDATE
            </Button>
        </form>
    );

    render() {
        const { id, name, email, password, redirectToProfile, error, loading, about, personalization } = this.state
        if (redirectToProfile) {
            return <Redirect to={`/user/${id}`} />
        }

        const photoUrl = id ? `${process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}` : DefalutProfrile;

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit Profile</h2>

                <div className="alert alert-danger" style={{ display: error ? "" : 'none' }}>{error}</div>
                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading ...</h2> </div>) : ("")}

                <img
                    style={{ height: "200px", width: 'auto' }}
                    className="img-thumbnail"
                    onError={i => (i.target.src = `${DefalutProfrile}`)}
                    src={photoUrl} alt={name} />

                {this.editUserForm(name, email, password, about, personalization)}
            </div>
        );
    }
}

export default EditProfile;