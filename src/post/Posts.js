import React, { Component } from "react";
import { list, listpersonalize } from "./apiPost";
import DefaultPost from "../images/adspace.jpg";
import { Link } from "react-router-dom";
import { isAuthenticated } from '../auth';

class Posts extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            post: [],
            page: 1,
            search: "",
            user: ""
        };
    }

    loadPosts = page => {
        list(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data });
            }
        });
    };

    componentDidMount() {
        this.loadPosts(this.state.page);
    }

    loadMore = number => {
        this.setState({ page: this.state.page + number });
        this.loadPosts(this.state.page + number);
    };

    loadLess = number => {
        this.setState({ page: this.state.page - number });
        this.loadPosts(this.state.page - number);
    };

    onchange = e => {
        this.setState({ search: e.target.value });
    }

    loadPost = page => {
        listpersonalize(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ post: data });
            }
        });
    };

    renderPostPersonalize = post => {
        return (
            <div className="row">
                {post.map((post, i) => {
                    const posterId = post.postedBy
                        ? `/user/${post.postedBy._id}`
                        : "";
                    const posterName = post.postedBy
                        ? post.postedBy.name
                        : " Unknown";
                    const postpersonalize = post.postedBy._id;
                    return (

                        <div className="card col-md-4" key={i}>
                            <div className="card-body">
                                <img
                                    src={`${
                                        process.env.REACT_APP_API_URL
                                        }/post/photo/${post._id}`}
                                    alt={post.title}
                                    onError={i =>
                                        (i.target.src = `${DefaultPost}`)
                                    }
                                    className="img-thunbnail mb-3"
                                    style={{ height: "200px", width: "100%" }}
                                />
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">
                                    {post.body.substring(0, 100)}
                                </p>
                                <br />
                                <p className="font-italic mark">
                                    Posted by{" "}
                                    <Link to={`${posterId}`}>
                                        {posterName}{" "}
                                    </Link>
                                    on {new Date(post.created).toDateString()}
                                </p>
                                <Link
                                    to={`/post/${post._id}`}
                                    className="btn btn-raised btn-primary btn-sm"
                                >
                                    Read more
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    renderPosts = posts => {
        return (
            <div className="row">
                {posts.map((post, i) => {
                    const posterId = post.postedBy
                        ? `/user/${post.postedBy._id}`
                        : "";
                    const posterName = post.postedBy
                        ? post.postedBy.name
                        : " Unknown";

                    const { search } = this.state;
                    var code = post.title.toLowerCase()


                    if (search !== "" && post.title.toLowerCase().indexOf(search.toLowerCase()) && post.tag1.toLowerCase().indexOf(search.toLowerCase()) && post.tag2.toLowerCase().indexOf(search.toLowerCase()) === -1) {
                        return null
                    }
                    if (search == "0") {
                        return null
                    }
                    return (
                        <div className="card col-md-4" key={i}>
                            <div className="card-body">
                                <img
                                    src={`${
                                        process.env.REACT_APP_API_URL
                                        }/post/photo/${post._id}`}
                                    alt={post.title}
                                    onError={i =>
                                        (i.target.src = `${DefaultPost}`)
                                    }
                                    className="img-thunbnail mb-3"
                                    style={{ height: "200px", width: "100%" }}
                                />
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">
                                    {post.body.substring(0, 100)}
                                </p>
                                <br />
                                <p className="font-italic mark">
                                    Posted by{" "}
                                    <Link to={`${posterId}`}>
                                        {posterName}{" "}
                                    </Link>
                                    on {new Date(post.created).toDateString()}
                                </p>
                                <Link
                                    to={`/post/${post._id}`}
                                    className="btn btn-raised btn-primary btn-sm"
                                >
                                    Read more
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    render() {
        const { posts, page, post } = this.state;
        return (
            <div className="container">


                {isAuthenticated() && (
                    <>
                        <h2 className="mt-5 mb-5">
                            Personalization of user
                        </h2>
                        <div className="container">
                            {this.loadPost(page)}
                            {this.renderPostPersonalize(post)}
                        </div>

                    </>
                )}

                {/* <div className="container">
                    {this.renderPostPersonalize(post)}
                </div> */}

                <br></br>
                <h2 className="mt-5 mb-5">
                    {!posts.length ? "No more posts!" : "Recent Posts"}
                </h2>

                <div className="col">
                    <input style={{ height: "50px", width: "500px" }} icon="search" placeholder="Search food name and ingredient" onChange={this.onchange} />
                </div>
                <br></br>
                {this.renderPosts(posts)}

                {page > 1 ? (
                    <button
                        className="btn btn-raised btn-warning mr-5 mt-5 mb-5"
                        onClick={() => this.loadLess(1)}
                    >
                        Previous ({this.state.page - 1})
                    </button>
                ) : (
                        ""
                    )}

                {posts.length ? (
                    <button
                        className="btn btn-raised btn-success mt-5 mb-5"
                        onClick={() => this.loadMore(1)}
                    >
                        Next ({page + 1})
                    </button>
                ) : (
                        ""
                    )}
            </div>
        );
    }
}

export default Posts;
