import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost, deletePost} from "../actions/index";

class PostShow extends Component {

    componentDidMount(){
        const { id } = this.props.match.params;
        this.props.fetchPost(id);
    }

    onDelete() {
        const { id } = this.props.match.params;

        this.props.deletePost(id, () => {
            this.props.history.push('/')
        });
    }

    render() {
        const { post } = this.props;

        if (!post) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <h3>{post.title}</h3>
                <h6>Categories: {post.category}</h6>
                <p>{post.content}</p>
                <button className="bnt btn-danger" onClick={this.onDelete.bind(this)}>Delete</button>
            </div>
        )
    }
}

function mapStateToProps({posts}, ownProps) {
    return { post: posts[ownProps.match.params.id] }
}


export default connect(mapStateToProps, {fetchPost, deletePost})(PostShow);
