import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPosts } from '../actions/index';

class PostsIndex extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchPosts();
    }

    renderPosts(post) {
        return (
            <div key={post.id} className="card w-100 mb-3">
                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.content}</p>
                    <Link to={`/posts/${post.id}`}>Read more</Link>
                </div>
            </div>
        )
    }

    render() {
        if (!this.props.posts) {
            return (
                <div>Loading...</div>
            )
        }

        return (
            <div>
                <h2 className="mb-4">Posts: </h2>

                <div className="row">
                    {Object.values(this.props.posts).map((post) => this.renderPosts(post))}
                </div>
            </div>
        )
    }
}

function mapStateToProps({posts}) {
    return {posts}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchPosts}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsIndex)