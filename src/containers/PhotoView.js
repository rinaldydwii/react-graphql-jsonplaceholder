import React, { Component } from "react";
// import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Container, Loading } from "../components";
// import { fetchPhoto } from "../actions/photoActions";

const GET_PHOTO = gql`
    query photo($id: ID!) {
        photo(id: $id) {
            id
            title
            url
            thumbnailUrl
        }
    }
`;

class PhotoView extends Component {
    // componentDidMount() {
    //     this.props.getPhoto(this.props.match.params.id)
    // }
    constructor() {
        super()
        this.state = {
            photoId: null
        }
    }
    componentDidMount() {
        this.setState({photoId: this.props.match.params.id})
    }
    render() {
        // const { photo } = this.props
        const id = this.state.photoId
        return (
            <Container className="view text-center">
                {
                    id ? (
                        <Query query={GET_PHOTO} variables={{id}}>
                            { ({loading, error, data}) => {
                                const photo = data.photo ? data.photo : null
                                return (
                                    <Loading loading={loading} error={error} >
                                        { photo ? (
                                            <React.Fragment>
                                                <div className="photo__image">
                                                    <img src={photo.url} alt={photo.title} />
                                                </div>
                                                <h1>{photo.title}</h1>
                                            </React.Fragment>
                                        ) : ""}
                                        
                                    </Loading>
                                )
                            } }
                        </Query>
                    ) : ""
                }
            </Container>
        );
    }
}

// const mapStateToProps = state => ({
//     photo: state.photoReducer.photo,
//     loading: state.photoReducer.loading,
//     finish: state.photoReducer.finish,
//     error: state.photoReducer.error,
// })
  
// const mapDispatchToProps = (dispatch) => ({
//     getPhoto: (id) => dispatch(fetchPhoto(id)),
// })
export default PhotoView;