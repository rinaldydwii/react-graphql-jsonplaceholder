import React from "react";
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

class ReadMoreButton extends React.Component {
    constructor() {
        super()
        this.state = {
            loading: false
        }
    }
    handleClick = async() => {
        this.setState({loading: true})
        await this.props.onClick()
        this.setState({loading: false})
    }
    render() {
        const {to} = this.props
        return (
            <div className="text-center">
                { to ? 
                ( <Link to={to} className="button button__read-more">See more</Link> ) : 
                    this.state.loading ? 
                    ( 
                        <div className="text-center">
                            <img src={require('../assets/loading.svg')} alt="loading" className="loading__image"/>
                        </div>
                    ) :
                    ( <button className="button button__read-more" onClick={this.handleClick}>See more</button> ) 
                }
            </div>
        )        
    }
}
    
export default ReadMoreButton;

ReadMoreButton.propTypes = {
    to: PropTypes.string,
    onClick: PropTypes.func
}