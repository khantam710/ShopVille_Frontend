import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { mobile, tablet } from '../responsive';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { deletecart, updatecart } from '../redux/actions/cartAction';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Container = styled.div`
  ${mobile({ padding: '20px' })}
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  ${tablet({ flex: 3 })}
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
  ${mobile({ width: '130px', height: '140px' })}
  ${tablet({ width: '130px', height: '140px' })}
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  ${mobile({ fontSize: '15px' })}
`;

const ProductName = styled.span``;

const ProductColor = styled.div`
  display: flex;
`;

const Color = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-left: 10px;
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${mobile({ flexDirection: 'row' })}
`;

const ProductUpdate = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-right: 40px;
  width: 200px;
  justify-content: space-between;
  ${mobile({ margin: '0px', justifyContent: 'space-between', flexDirection: 'row-reverse' })}
`;

const ProductQuantity = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Quantity = styled.div`
  border: 1px solid gray;
  height: 40px;
  width: 40px;
  font-size: 24px;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  ${mobile({ margin: '0px 10px ' })}
`;

const ProductPrice = styled.div`
  font-size: 24px;
`;

const Hr = styled.hr`
  background-color: #e1e1e1;
  border: none;
  height: 2px;
`;

const CartItem = ({ item }) => {
  const cartItem = useSelector(state => state.cart);
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

  // const updatePayload = {
  //   ...item,
  //   quantity: quan,
  //   price: itemPrice
  // };

  // const quanHandler = useCallback((operation) => {
  //   if (operation === 'add') {
  //     setQuan(quan + 1);
  //   } else {
  //     if (quan > 1) {
  //       setQuan(quan - 1);
  //     }
  //   }
  // }, [quan]);

  // useEffect(() => {
  //   setPrice(quan * (item.price / item.quantity));
  //   dispatch(updatecart(updatePayload));
  // }, [quan]);

// Remove from Cart Event
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
            <ProductName><b>Product:</b> {item.title}</ProductName>
            <ProductColor>
              <b>Color:</b><Color color={item.color} />
            </ProductColor>
            <ProductSize><b>Size:</b> {item.size}</ProductSize>
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
