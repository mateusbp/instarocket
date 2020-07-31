import React, { Component } from 'react';
import io from 'socket.io-client';

import './feed.css';
import api from '../../services/api';

import more from '../../assets/more.svg';
import like from '../../assets/like.svg';
import comment from '../../assets/comment.svg';
import send from '../../assets/send.svg';

export default class Feed extends Component {
    state = {
        posts: [],
    };

    async componentDidMount() {
        this.registerToSocket()

        const response = await api.get('/posts')

        this.setState({ posts: response.data })
    };

    registerToSocket = () => {
        const socket = io('http://localhost:3333')

        socket.on('post', newPost => {
            this.setState({ posts: [newPost, ...this.state.posts] })
        })

        socket.on('like', likedPost => {
            this.setState({ posts: this.state.posts.map(post => post._id === likedPost._id ? likedPost : post) })
        })
    };

    handleLike = id => {
        api.post(`/posts/${id}/like`)
    };

    handleDelete = id => {
        api.delete(`/posts/${id}`)
    };

    render() {
        return (
            <section id="post-list">
                {this.state.posts.map(post => (
                    <article key={post._id}>
                        <header>
                            <div className="user-info">
                                <span>{post.author}</span>
                                <span className="place">{post.place}</span>
                            </div>
                            <button onClick={() => this.handleDelete(post._id)}>
                                <img src={more} alt="Mais" />
                            </button>
                        </header>
                        <img src={`http://localhost:3333/files/${post.image}`} alt="" />
                        <footer>
                            <div className="actions">
                                <button type="button" onClick={() => this.handleLike(post._id)}>
                                    <img src={like} alt="" />
                                </button>
                                <img src={comment} alt="" />
                                <img src={send} alt="" />
                            </div>
                            <strong>{post.likes} curtidas</strong>
                            <p>
                                {post.description}
                                <span>{post.hashtags}</span>
                            </p>
                        </footer>
                    </article>
                ))}
            </section>
        )
    }
}
