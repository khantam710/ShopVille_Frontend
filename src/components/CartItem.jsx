import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { mobile, tablet } from '../responsive'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { deletecart, updatecart } from '../redux/actions/cartAction';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Container = styled.div`
    ${mobile({ padding: '20px' })}
`;
// ... [Other styled-components unchanged]

const CartItem = ({ item }) => {
  const userID = useSelector(state => state.user.currentUser._id);
  const dispatch = useDispatch();

  const [quan, setQuan] = useState(item.quantity);
  const [itemPrice, setPrice] = useState(item.price);

  // Updated price whenever quantity changes
  useEffect(() => {
    const newPrice = quan * (item.price / item.quantity);
    setPrice(newPrice);

    const updatePayload = {
      ...item,
      quantity: quan,
      price: newPrice
    };

    dispatch(updatecart(updatePayload));

    // Track quantity update
    if (window.clevertap) {
      window.clevertap.event.push("Quantity Updated in Cart", {
        "Product ID": item.productID,
        "Name": item.title,
        "Category": item.category,
        "Updated Quantity": quan,
        "Color": item.color,
        "Size": item.size,
        "Price per Unit": item.price / item.quantity,
        "Total Price": newPrice,
        "Image": item.image
      });
      console.log("CleverTap: Quantity Updated in Cart event sent");
    }
  }, [quan]);

  // Quantity increment/decrement handler
  const quanHandler = useCallback((operation) => {
    if (operation === 'add') {
      setQuan(prev => prev + 1);
    } else if (operation === 'remove' && quan > 1) {
      setQuan(prev => prev - 1);
    }
  }, [quan]);

  // Item removal
  const handleRemoveFromCart = () => {
    dispatch(deletecart({ _id: item._id }));

    if (window.clevertap) {
      window.clevertap.event.push("Removed from Cart", {
        "Product ID": item.productID,
        "Name": item.title,
        "Category": item.category,
        "Price": item.price,
        "Quantity": item.quantity,
        "Color": item.color,
        "Size": item.size,
        "Image": item.image
      });
      console.log("CleverTap: Removed from Cart event sent");
    }
  };

  return (
    <Container>
      <Product>
        <ProductDetail>
          <Link to={`/product/${item.productID}`}>
            <Image src={item.image} />
          </Link>
          <Details>
            <ProductName> <b>Product:</b> {item.title} </ProductName>
            <ProductColor>
              <b>Color:</b><Color color={item.color} />
            </ProductColor>
            <ProductSize><b>Size:</b> {item.size} </ProductSize>
          </Details>
        </ProductDetail>
        <PriceDetail>
          <ProductUpdate>
            <ProductQuantity>
              <AddIcon onClick={() => quanHandler('add')} style={{ cursor: 'pointer' }} />
              <Quantity>{quan}</Quantity>
              <RemoveIcon onClick={() => quanHandler('remove')} style={{ cursor: 'pointer' }} />
            </ProductQuantity>
            <DeleteIcon style={{ cursor: 'pointer' }} onClick={handleRemoveFromCart} />
          </ProductUpdate>
          <ProductPrice>₹ {itemPrice}</ProductPrice>
        </PriceDetail>
      </Product>
      <Hr />
    </Container>
  );
};

export default React.memo(CartItem);
