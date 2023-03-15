import React, {useState} from "react";
import { renderCardImage, WavesButton } from "utils.js/tools";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useSelector, useDispatch} from "react-redux";
import AddToCart from "utils.js/addToCart";
import {userAddToCart} from 'store/actions/user.action'
const Card = (props) => {
    const user = useSelector(state => state.users)
    const [modal, setModal] = useState(false)
    const [errorType, setErrorType] = useState(null)
    const dispatch = useDispatch()

    const handleAddToCart = (item) => {

        if (!user.auth) {
            setModal(true)
            setErrorType('auth')
            return false;
        } 

        if (!user.data.verified) {
            setModal(true)
            setErrorType('verify')
            return false
        }

        dispatch(userAddToCart(item))
    }

    const handleClose = () => setModal(false)

    return (
       <div className={`card_item_wrapper ${props.grid ? 'grid_bars' : ''}`}>
            <div
                className="image"
                style={{
                    background:`url(${renderCardImage(props.item.images)})`
                }}
            >
            </div>
            <div className="action_container">
                <div className="tags">
                    <div className="brand">{props.item.brand.name}</div>
                    <div className="name">{props.item.model}</div>
                    <div className="name">${props.item.price}</div>
                </div>
                
                {props.grid?
                    <div className="description">
                        <p>
                            {props.item.description}
                        </p>
                    </div>
                : null}

                <div className="actions">
                    <div className="button_wrapp">
                        <WavesButton 
                            type="default"
                            altClass="card_link"
                            title="View product"
                            linkTo={`/product_detail/${props.item._id}`}
                            style={{
                                fontWeight: 'bold'
                            }}
                        />
                       
                    </div>
                    <div className="btn_wrapp">
                    <WavesButton 
                            type="bag_link"
                            runAction={() => handleAddToCart(props.item)}
                            iconSize="23"
                        />
                    </div>

                </div>
            </div>
            <AddToCart 
                modal={modal}
                errorType={errorType}
                handleClose={handleClose}
            />
       </div>
    )
}

export default Card;