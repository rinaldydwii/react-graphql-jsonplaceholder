import React, { Component } from "react";
import { View } from "../../components";

class CreateAlbumView extends Component {
    render() {
        return (
            <View smallContainer>
                <section>
                    <div className="section__title">
                        <h2 className="text-center">Create New Album</h2>
                    </div>
                    <form className="form">
                        <div className="form__row">
                            <label for="title">Title</label>
                            <input 
                                placeholder="Title" 
                                name="title" 
                                // value={value ? value.name : ""} 
                                // onChange={onChange ? onChange.name : null} 
                                type="text" 
                            />
                        </div>
                        <div className="form__row">
                            <div className="form__space"></div>
                            <button className="button button__small">Create Album</button>
                        </div>
                    </form>
                </section>
            </View>
        );
    }
}

export default CreateAlbumView;